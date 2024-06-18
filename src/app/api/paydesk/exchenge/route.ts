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
    const date = new Date();

    const exchenge = await Exchenge.create(exchengeModel);

    const payDesk = await PayDesk.findOne({
      department: req.department,
      updatedAt: { $lte: date },
    });
    if (!payDesk) {
      return NextResponse.json({ message: "Касу не знайдено" });
    }

    await PayDesk.findOneAndUpdate(
      {
        department: req.department,
        updatedAt: { $lte: date },
      },
      {
        [selectedCurrency]: +payDesk[selectedCurrency] + +exchenge.value,
        uah: +payDesk.uah + +exchenge.totalValue,
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
