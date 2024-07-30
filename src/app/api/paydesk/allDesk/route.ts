import { NextResponse } from "next/server";
import { conectToDB } from "@/lib/conectToDB";
import PayDesk from "../../../../../models/payDesk";
import ReportDesk from "../../../../../models/reportDesk";
import GeneralDesk from "../../../../../models/generalPayDesk";
import { kyivTime } from "../../../../../models/timeKyiv";

export const POST = async (request: Request) => {
  try {
    const { department } = await request.json();
    await conectToDB();
    const [payDeskDepart] = await PayDesk.find({ department: department });
    const [payDeskOko] = await ReportDesk.find({ department: department });

    if (!payDeskDepart || !payDeskOko) {
      return NextResponse.json([]);
    }

    const allPayDesk = {
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
      createdAt: kyivTime,
      updatedAt: kyivTime,
      department,
    };

    const generalPayDesk = await GeneralDesk.findOne({ department });

    if (JSON.stringify(generalPayDesk) !== JSON.stringify(allPayDesk)) {
      if (!generalPayDesk) {
        await GeneralDesk.create(allPayDesk);
      } else await GeneralDesk.findOneAndUpdate({ department }, allPayDesk);
    }
    const newGeneralPayDesk = await GeneralDesk.findOne({ department });

    return NextResponse.json([newGeneralPayDesk]);
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error to find report", err },
      { status: 500 }
    );
  }
};
