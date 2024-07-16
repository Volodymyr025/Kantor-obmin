import { NextResponse } from "next/server";
import PayDesk from "../../../../../models/payDesk";
import { conectToDB } from "@/lib/conectToDB";

export const POST = async (request: Request) => {
  try {
    await conectToDB();
    const req = await request.json();

    const allDesk = await PayDesk.find({ department: req });

    return NextResponse.json(allDesk);
  } catch {
    return NextResponse.json({ messege: "Помилка при отримані даних" });
  }
};
