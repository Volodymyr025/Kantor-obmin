import { NextResponse } from "next/server";
import UnCashMen from "../../../../models/сashSend";
import { conectToDB } from "@/lib/conectToDB";

export const GET = async (request: Request) => {
  try {
    const report = await UnCashMen.find();
    return NextResponse.json(report);
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error to find report", err },
      { status: 500 }
    );
  }
};
