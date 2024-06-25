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

  const updateData: Partial<Driver> = {
    adress,
    city,
    zipcode,
    latitude,
    longitude,
    endingdate: new Date(endingdate),
    startingdate: new Date(startingdate),
    quantity: Number.parseInt(quantity),
    groupId: Number.parseInt(groupId),
    userId: Number.parseInt(userId),
  };

  try {
    const driverUpdate: Driver = await prisma.driver.create({
      data: {
        adress,
        city,
        zipcode,
        startingdate,
        endingdate,
        latitude,
        longitude,
        quantity: Number.parseInt(quantity),
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
    return NextResponse.json({ data: driverUpdate }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ erreur: error }, { status: 500 });
  }
}
