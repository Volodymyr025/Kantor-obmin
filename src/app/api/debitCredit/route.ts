import { NextResponse } from "next/server";
import { conectToDB } from "@/lib/conectToDB";
import DebitCredit from "../../../../models/debitCredit";
import PayDesk from "../../../../models/payDesk";
import { equal } from "assert";

export const POST = async (request: Request) => {
  try {
    const req = await request.json();

    const currency = await req.currency;
    await conectToDB();
    const payDesk = await PayDesk.findOne({ department: req.department });
    if (!payDesk) {
      await PayDesk.create({
        department: req.department,
        user: req.user,
        uah: 0,
        usd: 0,
        eur: 0,
        gbp: 0,
        pln: 0,
        cad: 0,
        chf: 0,
        sek: 0,
        czk: 0,
        nok: 0,
        gold: 0,
      });
      return NextResponse.json({ message: "Касу створено" });
    }

    if (+payDesk[currency] + +req.value < 0) {
      return NextResponse.json({
        message: "Недостатньо валюти в касі",
      });
    }

    await DebitCredit.create(req);

    await PayDesk.findOneAndUpdate(
      { department: req.department },
      { [currency]: +payDesk[currency] + +req.value }
    );

    return NextResponse.json({ message: "Виконано" }, { status: 201 });
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
    const debitCredit = await DebitCredit.find();
    return NextResponse.json(debitCredit);
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error to find DebitCredit", err },
      { status: 500 }
    );
  }
};
