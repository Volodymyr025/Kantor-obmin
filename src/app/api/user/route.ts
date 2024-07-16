import { conectToDB } from "@/lib/conectToDB";
import { NextResponse } from "next/server";
import User from "../../../../models/user";

export const GET = async (request: Request) => {
  try {
    await conectToDB();
    const userRole = await User.findOne();
    return NextResponse.json(userRole.department);
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error get data", err },
      { status: 500 }
    );
  }
};
