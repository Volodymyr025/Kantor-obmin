import { NextResponse } from "next/server";
import { conectToDB } from "@/lib/conectToDB";
import PayDesk from "@/lib/Validation/payDesk";

export const GET = async (request: Request) => {
  try {
    await conectToDB("Chortkiv");
    const payDesk = await PayDesk.find();
    const lastOneDesk = payDesk.slice(-1);
    return NextResponse.json(lastOneDesk);
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error to find report", err },
      { status: 500 }
    );
  }
};
