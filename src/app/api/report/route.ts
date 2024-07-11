import { NextResponse } from "next/server";
import { conectToDB } from "@/lib/conectToDB";
import Report from "../../../../models/report";
import ReportDesk from "../../../../models/reportDesk";

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

    const reportDesk = await ReportDesk.find({
      department: reqData.department,
    });

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

    if (!reportDesk.length) {
      await ReportDesk.create({
        uah: reqData.sellUah - reqData.buyUah,
        usd: reqData.sellUsd - reqData.buyUsd,
        eur: reqData.sellEur - reqData.buyEur,
        gbp: reqData.sellGbp - reqData.buyGbp,
        pln: reqData.sellPln - reqData.buyPln,
        cad: reqData.sellCad - reqData.buyCad,
        chf: reqData.sellChf - reqData.buyChf,
        sek: reqData.sellSek - reqData.buySek,
        czk: reqData.sellCzk - reqData.buyCzk,
        nok: reqData.sellNok - reqData.buyNok,
        gold: reqData.sellGold - reqData.buyGold,
        user: reqData.user,
        department: reqData.department,
      });
      await Report.create(reqData);

      return NextResponse.json({ message: "Виконано" }, { status: 201 });
    }

    const [reportDeskObj] = reportDesk;
    await ReportDesk.findOneAndUpdate(
      { department: reqData.department },
      {
        uah: reportDeskObj.uah + reqData.sellUah - reqData.buyUah,
        usd: reportDeskObj.usd + reqData.sellUsd - reqData.buyUsd,
        eur: reportDeskObj.eur + reqData.sellEur - reqData.buyEur,
        gbp: reportDeskObj.gbp + reqData.sellGbp - reqData.buyGbp,
        pln: reportDeskObj.pln + reqData.sellPln - reqData.buyPln,
        cad: reportDeskObj.cad + reqData.sellCad - reqData.buyCad,
        chf: reportDeskObj.chf + reqData.sellChf - reqData.buyChf,
        sek: reportDeskObj.sek + reqData.sellSek - reqData.buySek,
        czk: reportDeskObj.czk + reqData.sellCzk - reqData.buyCzk,
        nok: reportDeskObj.nok + reqData.sellNok - reqData.buyNok,
        gold: reportDeskObj.gold + reqData.sellGold - reqData.buyGold,
      }
    );
    await Report.create(reqData);

    return NextResponse.json({ message: "Виконано" }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error is created", err },
      { status: 500 }
    );
  }
};
