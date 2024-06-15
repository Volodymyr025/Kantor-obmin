import { NextResponse } from "next/server";
import { conectToDB } from "@/lib/conectToDB";
import Rate from "../../../../models/rate";

export const PATCH = async (request: Request) => {
  try {
    await conectToDB();
    const reqData = await request.json();
    const date = new Date();

    const transformData = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

    const startOfDay = new Date(transformData).setHours(0, 0, 0, 0);
    const endOfDay = new Date(transformData).setHours(23, 59, 59, 999);

    const rate = await Rate.find({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
      department: reqData.department,
    });

    return NextResponse.json(rate);
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

    await Rate.create(reqData);

    return NextResponse.json({ message: "Курси поставлено" }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error is created", err },
      { status: 500 }
    );
  }
};
