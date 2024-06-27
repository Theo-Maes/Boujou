import { prisma } from "@/libs";
import { Group } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const groupFind: Group[] = await prisma.group.findMany({
      include: {
        creator: true,
        event: true,
        members: { include: { user: true } },
        drivers: {
          include: { user: true, passengers: { include: { user: true } } },
        },
        hosts: {
          include: {
            user: true,
            hostedUsers: { include: { user: true } },
          },
        },
      },
    });
    return NextResponse.json({ data: groupFind }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ erreur: error }, { status: 500 });
  }
}
