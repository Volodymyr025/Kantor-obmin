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
    await mongoose.createConnection(url).asPromise();
    return NextResponse.json(
      { message: `conected ${dbName}` },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: `Filed to conected ${dbName}` + err },
      { status: 401 }
    );
  }
};
