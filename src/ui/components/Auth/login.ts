"use server";
import User from "../../../../models/user";
import { conectToDB } from "@/lib/conectToDB";
import { ActionResult } from "next/dist/server/app-render/types";
import { comparePasswords } from "./hash";
import { closeSession, createAuthSession } from "./lucia";
import { redirect } from "next/navigation";

export const login = async (
  prevState: any,
  formData: FormData
): Promise<ActionResult> => {
  const formUser = formData.get("userName");
  const formPassword = formData.get("password") as string;
  const formDepartment = formData.get("department") as string;
  await conectToDB(formDepartment);
  const findUserByName = await User.findOne({ name: formUser });
  const findDepartment = await User.findOne({
    name: formUser,
    department: formDepartment,
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

  if (!findDepartment) {
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
