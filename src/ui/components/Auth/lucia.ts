"use server";
import { Lucia } from "lucia";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import mongoose from "mongoose";
import { conectToDB } from "@/lib/conectToDB";
import { cookies } from "next/headers";
import { ActionResult } from "next/dist/server/app-render/types";
import { redirect } from "next/navigation";
import { comparePasswords } from "./hash";
import User from "@/lib/Validation/user";

conectToDB("Chortkiv");

const adapter = new MongodbAdapter(
  mongoose.connection.collection("sessions"),
  mongoose.connection.collection("users")
);

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
  }
}

export const createAuthSession = async (userId: string) => {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
};

export const verifyAuth = async () => {
  const sessionCookie = cookies().get(lucia.sessionCookieName);
  if (!sessionCookie) {
    return {
      user: null,
      session: null,
    };
  }
  const result = await lucia.validateSession(sessionCookie.value);
  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {}

  return result;
};

export const login = async (
  prevState: any,
  formData: FormData
): Promise<ActionResult> => {
  await conectToDB("Chortkiv");
  const formUser = formData.get("userName");
  const formPassword = formData.get("password") as string;
  const formDepartament = formData.get("departament");

  const findUserByName = await User.findOne({ name: formUser });
  const findDepartament = await User.findOne({
    name: formUser,
    departament: formDepartament,
  });
  console.log(!!findDepartament);

  if (!findUserByName) {
    return {
      err: "За даним імя'м користувача не знайдено",
    };
  }
  if (formPassword.length <= 1) {
    return {
      err: "Поле з паролем пононо бути заповнене",
    };
  }

  const validPassword = await comparePasswords(
    formPassword,
    findUserByName.password
  );
  if (!validPassword) {
    return {
      err: "Неправильний пароль",
    };
  }

  if (findDepartament) {
    return {
      err: "Користувача не знайдено в даному відділені",
    };
  }
  await createAuthSession(findUserByName._id);
  redirect("/");
};

export const closeSession = async () => {
  const { session } = await verifyAuth();
  if (!session) {
    return {
      error: "User not authentication",
    };
  }
  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
};

export const logOut = async () => {
  console.log("dsad");
  await closeSession();
  redirect("/login");
};
