import { NextResponse } from "next/server";
import { CurrensyType } from "../cashless/route";
import PayDesk from "../../../../models/payDesk";
import { conectToDB } from "@/lib/conectToDB";
import UnCashMen from "../../../../models/сashSend";

export const POST = async (request: Request) => {
  const reqData = await request.json();
  try {
    await conectToDB();
    await UnCashMen.create(reqData);

    const payDesk = await PayDesk.find({ department: reqData.department });
    const [lastOneDesk] = payDesk.slice(-1);
    [reqData].map(async (obj: CurrensyType) => {
      await PayDesk.findOneAndUpdate(
        { _id: lastOneDesk._id },
        {
          usd: lastOneDesk.usd - obj.usd,
          eur: lastOneDesk.eur - obj.eur,
          gbp: lastOneDesk.gbp - obj.gbp,
          pln: lastOneDesk.pln - obj.pln,
          cad: lastOneDesk.cad - obj.cad,
          chf: lastOneDesk.chf - obj.chf,
          sek: lastOneDesk.sek - obj.sek,
          czk: lastOneDesk.czk - obj.czk,
          nok: lastOneDesk.nok - obj.nok,
          gold: lastOneDesk.gold - obj.gold,
        }
      );
    });
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
