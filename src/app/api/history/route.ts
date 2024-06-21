import { NextResponse } from "next/server";
import { conectToDB } from "@/lib/conectToDB";
import Exchenge from "../../../../models/exchange";

export const POST = async (request: Request) => {
  try {
    await conectToDB();
    const reqData = await request.json();

    const startOfDay = new Date(reqData.date).setHours(0, 0, 0, 0);
    const endOfDay = new Date(reqData.date).setHours(23, 59, 59, 999);

    const exchenges = await Exchenge.find({
      department: reqData.department.toString(),
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    return NextResponse.json(exchenges);
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error to find rate", err },
      { status: 500 }
    );
  }
};
