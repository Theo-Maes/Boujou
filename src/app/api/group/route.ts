import { prisma } from "@/libs";
import { Group } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const roleFind: Group[] = await prisma.group.findMany({
      include: { creator: true, event: true, members: true, drivers: true },
    });
    return NextResponse.json({ data: roleFind }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ erreur: error }, { status: 500 });
  }
}
