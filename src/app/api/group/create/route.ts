import { prisma } from "@/libs";
import { Group } from "@prisma/client";
import { NextResponse } from "next/server";

interface GroupFormData {
  userId: string;
  eventId: string;
}

export async function POST(req: Request) {
  const data = await req.formData();

  const { userId, eventId } = Object.fromEntries(
    data.entries()
  ) as unknown as GroupFormData;

  try {
    const newGroup: Group = await prisma.group.create({
      data: {
        creator: {
          connect: {
            id: Number.parseInt(userId),
          },
        },
        event: {
          connect: {
            id: Number.parseInt(eventId),
          },
        },
      },
    });
    return NextResponse.json({ data: newGroup }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ erreur: error }, { status: 500 });
  }
}
