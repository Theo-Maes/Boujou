import { prisma } from "@/libs";
import { Host } from "@prisma/client";
import { NextResponse } from "next/server";

interface HostFormData {
  adress: string;
  city: string;
  endingdate: string;
  latitude: string;
  longitude: string;
  quantity: string;
  startingdate: string;
  zipcode: string;
  groupId: string;
  userId: string;
}

export async function POST(req: Request) {
  const data = await req.formData();

  const {
    adress,
    city,
    zipcode,
    latitude,
    longitude,
    endingdate,
    startingdate,
    quantity,
    groupId,
    userId,
  } = Object.fromEntries(data.entries()) as unknown as HostFormData;

  const group = await prisma.group.findUnique({
    where: {
      id: Number.parseInt(groupId),
    },
  });

  if (!group) {
    return NextResponse.json({ error: "aucun groupe trouvé" }, { status: 404 });
  }

  const userInGroup = await prisma.userGroup.findFirst({
    where: {
      groupId: Number.parseInt(groupId),
      userId: Number.parseInt(userId),
    },
  });

  if (!userInGroup) {
    return NextResponse.json(
      { error: " l'utilisateur ne fait pas partie du groupe " },
      { status: 403 }
    );
  }

  const host = await prisma.host.findFirst({
    where: {
      userId: Number.parseInt(userId),
      groupId: Number.parseInt(groupId),
    },
  });

  if (host) {
    return NextResponse.json(
      { error: " l'utilisateur est déjà un Host dans ce groupe " },
      { status: 403 }
    );
  }

  try {
    const newHost: Host = await prisma.host.create({
      data: {
        adress,
        city,
        endingdate,
        latitude,
        longitude,
        quantity: Number.parseInt(quantity),
        startingdate,
        zipcode,
        group: {
          connect: {
            id: Number.parseInt(groupId),
          },
        },
        user: {
          connect: {
            id: Number.parseInt(userId),
          },
        },
      },
    });
    return NextResponse.json({ data: newHost }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ erreur: error }, { status: 500 });
  }
}
