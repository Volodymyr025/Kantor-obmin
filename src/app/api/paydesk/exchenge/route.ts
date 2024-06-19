import { NextResponse } from "next/server";
import { conectToDB } from "@/lib/conectToDB";
import PayDesk from "../../../../../models/payDesk";
import { CurrensyType } from "../../cashless/route";
import Exchenge from "../../../../../models/exchange";

export const PATCH = async (request: Request) => {
  const req = await request.json();
  const selectedCurrency = req.selectCurrency.toLowerCase().toString();

  const exchengeModel = {
    currency: selectedCurrency,
    department: req.department,
    user: req.user,
    operation: req.operation ? "sell" : "buy",
    value: +req.sumValue,
    totalValue: +req.totalValue,
  };

  try {
    await conectToDB();
    const payDesk = await PayDesk.findOne({
      department: req.department,
    });
    if (!payDesk) {
      return NextResponse.json({ message: "Касу не знайдено" });
    }
    if (+payDesk.uah + +req.totalValue < 0) {
      return NextResponse.json({
        message: "Недостатньо гривень в касі",
      });
    }
    if (+payDesk[selectedCurrency] + +req.sumValue < 0) {
      return NextResponse.json({
        message: "Недостатньо валюти в касі",
      });
    }

    const exchenge = await Exchenge.create(exchengeModel);

    await PayDesk.findOneAndUpdate(
      {
        department: req.department,
      },
      {
        [selectedCurrency]: (
          +payDesk[selectedCurrency] + +exchenge.value
        ).toFixed(2),
        uah: (+payDesk.uah + +exchenge.totalValue).toFixed(2),
      }
    );

    return NextResponse.json({ message: "Операція успішна" });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Винекла помилка під час обміну", err },
      { status: 500 }
    );
  }
};
