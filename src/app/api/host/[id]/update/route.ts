import { prisma } from "@/libs";
import { Host } from "@prisma/client";
import { NextResponse } from "next/server";

interface HostFormData {
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

export async function PATCH(req: Request, params: { params: { id: string } }) {
  const id = Number.parseInt(params.params.id);
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

  const updateData: Partial<Host> = {
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
    const driverUpdate: Host = await prisma.host.update({
      where: {
        id: id,
      },
      data: updateData,
    });
    return NextResponse.json({ data: driverUpdate }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ erreur: error }, { status: 500 });
  }
}
