import { prisma } from "@/libs";
import { Event } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request, params: { params: { id: string } }) {
  const id = Number.parseInt(params.params.id);
  try {
    const eventFind: Event | null = await prisma.event.findUnique({
      where: {
        id: id,
      },
      include: {
        category: true,
        groups: {
          include: {
            drivers: {
              include: {
                user: true,
                passengers: { include: { user: true } },
              },
            },
            event: true,
            hosts: {
              include: { user: true, hostedUsers: { include: { user: true } } },
            },
            members: { include: { user: true } },
          },
        },
      },
    });

    if (!eventFind) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    if (eventFind.validatedAt === null) {
      return NextResponse.json({ message: "Event not validated" }, { status: 404 });
    }
    
    return NextResponse.json({ data: eventFind }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ erreur: error }, { status: 500 });
  }
}
