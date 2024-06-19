import { NextResponse } from "next/server";
import { conectToDB } from "@/lib/conectToDB";
import Report from "../../../../models/report";
import PayDesk from "../../../../models/payDesk";

export const POST = async (request: Request) => {
  try {
    const req = await request.json();
    const currency = await req.currency;
    await conectToDB();

    const payDesk = await PayDesk.findOne({ department: req.department });
    if (!payDesk) {
      return NextResponse.json({ message: "Касу не знайдено" });
    }

    if (+payDesk[currency] + +req.value < 0) {
      return NextResponse.json({
        message: "Недостатньо валюти в касі",
      });
    }

    await Report.create(req);

    await PayDesk.findOneAndUpdate(
      { department: req.department },
      { [currency]: +payDesk[currency] + +req.value }
    );

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
