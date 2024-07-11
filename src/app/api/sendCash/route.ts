import { NextResponse } from "next/server";
import PayDesk from "../../../../models/payDesk";
import { conectToDB } from "@/lib/conectToDB";
import UnCashMen from "../../../../models/сashSend";

export const POST = async (request: Request) => {
  const reqData = await request.json();
  try {
    await conectToDB();

    const [payDesk] = await PayDesk.find({ department: reqData.department });

    const result = [reqData].reduce((acc: any, reqVal: any) => {
      return {
        uah: acc.uah - reqVal.uah,
        usd: acc.usd - reqVal.usd,
        eur: acc.eur - reqVal.eur,
        gbp: acc.gbp - reqVal.gbp,
        pln: acc.pln - reqVal.pln,
        cad: acc.cad - reqVal.cad,
        chf: acc.chf - reqVal.chf,
        sek: acc.sek - reqVal.sek,
        czk: acc.czk - reqVal.czk,
        nok: acc.nok - reqVal.nok,
        gold: acc.gold - reqVal.gold,
      };
    }, payDesk);

    const lessThenHaveValue = Object.values(result).some(
      (value: any) => value < 0
    );
    if (lessThenHaveValue) {
      return NextResponse.json({
        message: "Недостатньо валюти в касі",
      });
    }

    await PayDesk.findOneAndUpdate(
      { _id: payDesk._id },
      {
        uah: result.uah,
        usd: result.usd,
        eur: result.eur,
        gbp: result.gbp,
        pln: result.pln,
        cad: result.cad,
        chf: result.chf,
        sek: result.sek,
        czk: result.czk,
        nok: result.nok,
        gold: result.gold,
      }
    );
    console.log(reqData);
    await UnCashMen.create(reqData);

    return NextResponse.json(
      { message: "Інкасацію відправлено" },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error is created", err },
      { status: 500 }
    );
  }
};
