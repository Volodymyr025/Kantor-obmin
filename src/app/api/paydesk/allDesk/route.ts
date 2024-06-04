import { NextResponse } from "next/server";
import { payDeskSchema } from "../../../../../models/payDesk";
import mongoose from "mongoose";

export const POST = async (request: Request) => {
  try {
    const { department } = await request.json();
    let dbName = department;
    if (department.includes("Чортків")) {
      dbName = "Chortkiv";
    }
    if (department.includes("Тернопіль")) {
      dbName = "Ternopil";
    }

    const url = `mongodb+srv://volgankevych:N2ojKuOJBAKdcDP0@kantor.vphvwe5.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Kantor`;
    const conect = await mongoose.createConnection(url).asPromise();
    const Desk = conect.model("PayDesk", payDeskSchema);

    const payDesk = await Desk.find({ department: department });
    const lastOneDesk = payDesk.slice(-1);

    return NextResponse.json(lastOneDesk);
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error to find report", err },
      { status: 500 }
    );
  }
};
