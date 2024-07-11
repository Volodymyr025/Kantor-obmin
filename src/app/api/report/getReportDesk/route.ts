import { conectToDB } from "@/lib/conectToDB";
import { NextResponse } from "next/server";
import ReportDesk from "../../../../../models/reportDesk";

export const POST = async (request: Request) => {
  try {
    const req = await request.json();
    await conectToDB();
    const okoPaydesk = await ReportDesk.findOne({ department: req.department });
    if (!okoPaydesk) {
      return NextResponse.json([]);
    }
    return NextResponse.json([okoPaydesk]);
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error get data", err },
      { status: 500 }
    );
  }
};
