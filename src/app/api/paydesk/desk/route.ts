import { NextResponse } from "next/server";
import { conectToDB } from "@/lib/conectToDB";
import PayDesk from "../../../../../models/payDesk";

export const POST = async (request: Request) => {
  try {
    const { department } = await request.json();
    await conectToDB();
    if (department === "Administration") {
      const payDesk = await PayDesk.find();
      const lastDataByDepartment = payDesk.reduce((acc, current) => {
        const department = current.department;
        const date = new Date(current.data);
        if (!acc[department] || date > new Date(acc[department].data)) {
          acc[department] = current;
        }
        return acc;
      }, {});
      const result = Object.values(lastDataByDepartment);
      return NextResponse.json(result);
    }
    const payDesk = await PayDesk.find({ department: department });
    const lastOneDesk = payDesk.slice(-1);

    return NextResponse.json(lastOneDesk);
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error to find report", err },
      { status: 500 }
    );
  }
};
