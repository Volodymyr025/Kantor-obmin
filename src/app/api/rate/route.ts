import { NextResponse } from "next/server";
import { conectToDB } from "@/lib/conectToDB";
import Rate from "../../../../models/rate";
import { kyivTime } from "../../../../models/timeKyiv";

export const PATCH = async (request: Request) => {
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

    return NextResponse.json(lastRate);
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error to find rate", err },
      { status: 500 }
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const reqData = await request.json();
    await conectToDB();

    reqData.createdAt = kyivTime;
    reqData.updatedAt = kyivTime;

    await Rate.create(reqData);

    return NextResponse.json({ message: "Курси поставлено" }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error is created", err },
      { status: 500 }
    );
  }
};
