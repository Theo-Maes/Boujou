import { prisma } from "@/libs";
import { Group } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request, params: { params: { id: string } }) {
  const id = Number.parseInt(params.params.id);
  try {
    const groupFind: Group | null = await prisma.group.findUnique({
      where: {
        id: id,
      },
      include: {
        event: true,
        members: {
          include: {
            user: true,
          },
        },
        drivers: {
          include: {
            user: true,
            passengers: {
              include: {
                user: true,
              },
            },
          },
        },
        hosts: {
          include: {
            user: true,
            hostedUsers: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });
    if (!groupFind) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }
    return NextResponse.json({ data: groupFind }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ erreur: error }, { status: 500 });
  }
}
