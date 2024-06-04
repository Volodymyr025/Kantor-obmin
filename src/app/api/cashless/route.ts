import { NextResponse } from "next/server";
import UnCashMen from "../../../../models/сashSend";
import { conectToDB } from "@/lib/conectToDB";
import process from "process";
import PayDesk from "../../../../models/payDesk";

export interface CurrensyType {
  _id: string;
  usd: number;
  eur: number;
  gbp: number;
  pln: number;
  cad: number;
  chf: number;
  sek: number;
  czk: number;
  nok: number;
  gold: number;
}

export const GET = async (request: Request) => {
  try {
    const report = await UnCashMen.find({ process: "processing" });
    return NextResponse.json(report);
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error to find report", err },
      { status: 500 }
    );
  }
};

export const PATCH = async (request: Request) => {
  const req = await request.json();
  const [data] = req;
  try {
    const allPayDesk = await PayDesk.find({ department: data.sendTo });
    const [lastOneDesk] = allPayDesk.slice(-1);

    await req.map(async (obj: CurrensyType) => {
      await PayDesk.findOneAndUpdate(
        { _id: lastOneDesk._id },
        {
          usd: lastOneDesk.usd + obj.usd,
          eur: lastOneDesk.eur + obj.eur,
          gbp: lastOneDesk.gbp + obj.gbp,
          pln: lastOneDesk.pln + obj.pln,
          cad: lastOneDesk.cad + obj.cad,
          chf: lastOneDesk.chf + obj.chf,
          sek: lastOneDesk.sek + obj.sek,
          czk: lastOneDesk.czk + obj.czk,
          nok: lastOneDesk.nok + obj.nok,
          gold: lastOneDesk.gold + obj.gold,
        }
      );
      await UnCashMen.findOneAndUpdate(
        { _id: obj._id },
        { process: "complete" }
      );
    });
    return NextResponse.json({ message: "Інкасацію прийнято" });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Винекла помилка під час отримання інкасації", err },
      { status: 500 }
    );
  }
};
