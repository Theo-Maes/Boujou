import { prisma } from "@/libs";
import { Group } from "@prisma/client";
import { NextResponse } from "next/server";

interface GroupUpdate {
  eventId: string;
  userId: string;
}

export async function PATCH(req: Request, params: { params: { id: string } }) {
  const id = Number.parseInt(params.params.id);
  const data = await req.formData();

  const { eventId, userId } = Object.fromEntries(
    data.entries()
  ) as unknown as GroupUpdate;

  const updateData: Partial<Group> = {
    ...(eventId && { eventId: parseInt(eventId) }),
    ...(userId && { userId: parseInt(userId) }),
  };

  try {
    const GroupUpdated: Group = await prisma.group.update({
      data: updateData,
      where: { id: id },
    });
    return NextResponse.json({ data: GroupUpdated }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ erreur: error }, { status: 500 });
  }
}
