import { NextResponse } from "next/server";
import { conectToDB } from "@/lib/conectToDB";
import PayDesk from "../../../../../models/payDesk";

export const POST = async (request: Request) => {
  try {
    const { department } = await request.json();
    await conectToDB();
    const payDesk = await PayDesk.findOne({ department: department });

    if (!payDesk) {
      return NextResponse.json([]);
    }
    return NextResponse.json([payDesk]);
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error to find report", err },
      { status: 500 }
    );
  }
};
