import { NextResponse } from "next/server";
import { UnCashFactory } from "../../../../models/сashSend";

export const POST = async (request: Request) => {
  const reqData = await request.json();
  try {
    const cash = await UnCashFactory(reqData.sendTo);
    cash.create(reqData);
    return NextResponse.json({ message: "Звіт відправлено" }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error is created", err },
      { status: 500 }
    );
  }
};
