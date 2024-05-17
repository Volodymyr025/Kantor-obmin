import { NextResponse } from "next/server";
import { conectToDB } from "@/lib/conectToDB";
import PayDesk from "@/lib/Validation/payDesk";

export const POST = async (request: Request) => {
  try {
    await conectToDB("Chortkiv");
    const payDesk = await PayDesk.find();
    const req = await request.json();
    const lastOneDesk = payDesk.slice(-1);
    if (!payDesk.length) {
      await PayDesk.create(req);
    } else {
      const combinedObject = [...lastOneDesk, ...[req]].reduce((pay, rep) => {
        return {
          usd: pay.usd + rep.usd,
          eur: pay.eur + rep.eur,
          gbp: pay.gbp + rep.gbp,
          pln: pay.pln + rep.pln,
          cad: pay.cad + rep.cad,
          chf: pay.chf + rep.chf,
          sek: pay.sek + rep.sek,
          czk: pay.czk + rep.czk,
          nok: pay.nok + rep.nok,
          gold: pay.gold + rep.gold,
          eqvUsd: pay.eqvUsd + rep.eqvUsd,
          eqvEur: pay.eqvEur + rep.eqvEur,
          eqvGbp: pay.eqvGbp + rep.eqvGbp,
          eqvPln: pay.eqvPln + rep.eqvPln,
          eqvCad: pay.eqvCad + rep.eqvCad,
          eqvChf: pay.eqvChf + rep.eqvChf,
          eqvSek: pay.eqvSek + rep.eqvSek,
          eqvCzk: pay.eqvCzk + rep.eqvCzk,
          eqvNok: pay.eqvNok + rep.eqvNok,
          eqvGold: pay.eqvGold + rep.eqvGold,
        };
      });
      await PayDesk.create(combinedObject);
    }

    return NextResponse.json(payDesk);
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error to find report", err },
      { status: 500 }
    );
  }
};
