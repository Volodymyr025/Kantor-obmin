import { NextResponse } from "next/server";
import { conectToDB } from "@/lib/conectToDB";
import DebitCredit from "../../../../../models/debitCredit";

export const POST = async (request: Request) => {
  try {
    await conectToDB();
    const reqData = await request.json();

    const startOfDay = new Date(reqData.date).setHours(0, 0, 0, 0);
    const endOfDay = new Date(reqData.date).setHours(23, 59, 59, 999);

    const searchResult = await DebitCredit.find({
      department: reqData.department.toString(),
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });
    console.log(searchResult, "res");
    if (searchResult.length <= 0) {
      throw new Error();
    }

    return NextResponse.json(searchResult);
  } catch (err: any) {
    return NextResponse.json(
      { message: "Нічого не знайдено", err },
      { status: 500 }
    );
  }
};
