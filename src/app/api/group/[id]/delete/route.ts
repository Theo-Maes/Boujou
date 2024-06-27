import { prisma } from "@/libs";
import { Group } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, params: { params: { id: string } }) {
  const id = Number.parseInt(params.params.id);

  const driver = await prisma.driver.findFirst({
    where: { id },
  })

  const hoster = await prisma.host.findFirst({
    where: { id },
  })

  // Delete all drivers of the group
  await prisma.driverPassenger.deleteMany({
    where: {
      driverId: driver?.id,
    },
  });

  // Delete all drivers of the group
  await prisma.driver.deleteMany({
    where: {
      groupId: id,
    },
  });

  // Delete all hosts members of the group
  await prisma.hostedUser.deleteMany({
    where: {
      hostId: hoster?.id,
    },
  });

  // Delete all hosts of the group
  await prisma.host.deleteMany({
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
