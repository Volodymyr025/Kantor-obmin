import { NextResponse } from "next/server";
import { conectToDB } from "@/lib/conectToDB";
import Report from "@/lib/Validation/report";

export const POST = async (request: Request) => {
  try {
    const data = await request.json();
    await conectToDB("Chortkiv");

    const date = new Date();
    const today = {
      year: date.getFullYear(),
      month: `${date.getMonth() + 1}`.padStart(2, "0"),
      day: `${date.getDate()}`.padStart(2, "0"),
    };
    const onlyDate = `${today.year}-${today.month}-${today.day}`;

    const report = await Report.find({}, "createdAt");
    const lastAdded = report.slice(-1);

    const resultData = lastAdded.map((doc) => {
      const today = {
        year: doc.createdAt.getFullYear(),
        month: `${doc.createdAt.getMonth() + 1}`.padStart(2, "0"),
        day: `${doc.createdAt.getDate()}`.padStart(2, "0"),
      };
      const exystDate = `${today.year}-${today.month}-${today.day}`;
      return exystDate === onlyDate;
    });

    if (resultData[0]) {
      return NextResponse.json(
        { message: "Сьогоднішній звіт вже відправлено" },
        { status: 201 }
      );
    }

    await Report.create(data);
    return NextResponse.json({ message: "Звіт відправлено" }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error is created", err },
      { status: 500 }
    );
  }
};

export const GET = async (request: Request) => {
  try {
    await conectToDB("Chortkiv");
    const report = await Report.find();
    return NextResponse.json(report);
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error to find report", err },
      { status: 500 }
    );
  }
};
