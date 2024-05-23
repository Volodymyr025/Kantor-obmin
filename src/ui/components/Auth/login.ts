"use server";
import User from "@/lib/Validation/user";
import { conectToDB } from "@/lib/conectToDB";
import { ActionResult } from "next/dist/server/app-render/types";
import { comparePasswords } from "./hash";
import { closeSession, createAuthSession } from "./lucia";
import { redirect } from "next/navigation";

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

  if (!findDepartament) {
    return {
      err: "Користувача не знайдено в даному відділені",
    };
  }
  await createAuthSession(findUserByName._id);
  redirect("/");
};

export const logOut = async () => {
  await closeSession();
  redirect("/login");
};
