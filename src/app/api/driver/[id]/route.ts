import { prisma } from "@/libs";
import { Driver } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request, params: { params: { id: string } }) {
  const id = Number.parseInt(params.params.id);
  try {
    const DriverFind: Driver | null = await prisma.driver.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
        group: true,
        passengers: {
          include: { user: true },
        },
      },
    });
    return NextResponse.json({ data: DriverFind }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ erreur: error }, { status: 500 });
  }
}
