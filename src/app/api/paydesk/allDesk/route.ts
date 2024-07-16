import { NextResponse } from "next/server";
import { conectToDB } from "@/lib/conectToDB";
import PayDesk from "../../../../../models/payDesk";
import ReportDesk from "../../../../../models/reportDesk";

export const POST = async (request: Request) => {
  try {
    const { department } = await request.json();
    await conectToDB();
    const [payDeskDepart] = await PayDesk.find({ department: department });
    const [payDeskOko] = await ReportDesk.find({ department: department });

    const allPayDesk = {
      _id: payDeskDepart._id,
      uah: payDeskDepart.uah + payDeskOko.uah,
      usd: payDeskDepart.usd + payDeskOko.usd,
      eur: payDeskDepart.eur + payDeskOko.eur,
      gbp: payDeskDepart.gbp + payDeskOko.gbp,
      pln: payDeskDepart.pln + payDeskOko.pln,
      cad: payDeskDepart.cad + payDeskOko.cad,
      chf: payDeskDepart.chf + payDeskOko.chf,
      sek: payDeskDepart.sek + payDeskOko.sek,
      czk: payDeskDepart.czk + payDeskOko.czk,
      nok: payDeskDepart.nok + payDeskOko.nok,
      gold: payDeskDepart.gold + payDeskOko.gold,
    };

    if (!allPayDesk) {
      return NextResponse.json([]);
    }

    return NextResponse.json([allPayDesk]);
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error to find report", err },
      { status: 500 }
    );
  }
};
