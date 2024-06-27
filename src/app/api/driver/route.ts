import { prisma } from "@/libs";
import { Driver } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const driverFind: Driver[] = await prisma.driver.findMany({
      include: { user: true, group: true },
    });
    return NextResponse.json({ data: driverFind }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ erreur: error }, { status: 500 });
  }
}
