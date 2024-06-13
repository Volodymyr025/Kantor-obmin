import { NextResponse } from "next/server";
import { conectToDB } from "@/lib/conectToDB";
import Report from "../../../../models/report";
import { updatePayDeskData } from "./updateReport";

export const POST = async (request: Request) => {
  try {
    const reqData = await request.json();
    await conectToDB();

    const date = new Date();

    const transformData = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

    const startOfDay = new Date(transformData).setHours(0, 0, 0, 0);
    const endOfDay = new Date(transformData).setHours(23, 59, 59, 999);

    const report = await Report.find({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
      department: reqData.department,
    });

    if (report.length) {
      return NextResponse.json(
        { message: "Сьогоднішній звіт вже відправлено" },
        { status: 201 }
      );
    }

    await Report.create(reqData);
    await updatePayDeskData(reqData);

    return NextResponse.json({ message: "Звіт відправлено" }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error is created", err },
      { status: 500 }
    );
  }
};

export const PATCH = async (request: Request) => {
  try {
    await conectToDB();
    const report = await Report.find();
    return NextResponse.json(report);
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error to find report", err },
      { status: 500 }
    );
  }
};
