import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  let dbName = "";
  const data = await req.json();
  if (data.includes("Чортків")) {
    dbName = "Chortkiv";
  }
  if (data.includes("Тернопіль")) {
    dbName = "Ternopil";
  }
  const url = `mongodb+srv://volgankevych:N2ojKuOJBAKdcDP0@kantor.vphvwe5.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Kantor`;
  try {
    await mongoose.connect(url);
    return NextResponse.json({ message: "conected" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Field to conected" }, { status: 201 });
  }
};
