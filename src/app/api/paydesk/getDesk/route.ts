import { NextResponse } from "next/server";
import { conectToDB } from "@/lib/conectToDB";
import GeneralDesk from "../../../../../models/generalPayDesk";

export const POST = async (request: Request) => {
  try {
    await conectToDB();
    const req = await request.json();

    const allDesk = await GeneralDesk.find({ department: req });

    return NextResponse.json(allDesk);
  } catch {
    return NextResponse.json({ messege: "Помилка при отримані даних" });
  }
};
