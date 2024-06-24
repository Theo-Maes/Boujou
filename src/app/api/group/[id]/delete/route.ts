import { prisma } from "@/libs";
import { Group } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, params: { params: { id: string } }) {
  const id = Number.parseInt(params.params.id);

  // Delete all drivers of the group
  await prisma.driver.deleteMany({
    where: {
      groupId: id,
    },
  });

  // Delete all members of the group
  await prisma.userGroup.deleteMany({
    where: {
      groupId: id,
    },
  });

  try {
    const groupDeleted: Group = await prisma.group.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({ data: groupDeleted }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ erreur: error }, { status: 500 });
  }
}
