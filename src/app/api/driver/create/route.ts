import { prisma } from "@/libs";
import { Driver } from "@prisma/client";
import { NextResponse } from "next/server";

interface DriverFormData {
  adress: string;
  city: string;
  description: string;
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
  } = Object.fromEntries(data.entries()) as unknown as DriverFormData;

  const group = await prisma.group.findUnique({
    where: {
      id: Number.parseInt(groupId),
    },
  });

  if (!group) {
    return NextResponse.json({ error: "aucun groupe trouvé" }, { status: 404 });
  }

  const userInGroup = await prisma.groupUser.findFirst({
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

  try {
    const newDriver: Driver = await prisma.driver.create({
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
    return NextResponse.json({ data: newDriver }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ erreur: error }, { status: 500 });
  }
}
