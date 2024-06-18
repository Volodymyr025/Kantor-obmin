import { NextResponse } from "next/server";
import { conectToDB } from "@/lib/conectToDB";
import Rate from "../../../../../models/rate";

export const POST = async (request: Request) => {
  try {
    await conectToDB();
    const reqData = await request.json();
    const date = new Date();

    const transformData = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

    const rate = await Rate.find({
      department: reqData.department.toString(),
      createdAt: { $gte: transformData },
    });
    const lastRate = rate.slice(-1);

    const findRate = lastRate.map((rate) => rate[reqData.selected]);

    return NextResponse.json(findRate);
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error to find rate", err },
      { status: 500 }
    );
  }
};
