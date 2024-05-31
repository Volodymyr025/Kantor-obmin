import { NextResponse } from "next/server";
import { conectToDB } from "@/lib/conectToDB";
import UnCashMen, { UnCashFun } from "../../../../models/сashSend";
import mongoose from "mongoose";

export const POST = async (request: Request) => {
  const reqData = await request.json();
  try {
    const cash = await UnCashFun("Чортків");
    cash.create(reqData);
    return NextResponse.json({ message: "Звіт відправлено" }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error is created", err },
      { status: 500 }
    );
  }
};
