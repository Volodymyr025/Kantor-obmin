import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const data = await req.json();
  let dbName = data;
  if (data.includes("Чортків")) {
    dbName = "Chortkiv";
  }
  if (data.includes("Тернопіль")) {
    dbName = "Ternopil";
  }
  const url = `${process.env.mongoUrl}${dbName}?retryWrites=true&w=majority&appName=Kantor`;
  try {
    await mongoose.connect(url);
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
