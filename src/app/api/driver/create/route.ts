import { prisma } from "@/libs";
import { Driver } from "@prisma/client";
import { NextResponse } from "next/server";

interface DriverFormData {
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
  } = Object.fromEntries(data.entries()) as unknown as DriverFormData;

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

  const driver = await prisma.driver.findFirst({
    where: {
      userId: Number.parseInt(userId),
      groupId: Number.parseInt(groupId),
    },
  });

  if (driver) {
    return NextResponse.json(
      { error: " l'utilisateur est déjà un driver dans ce groupe " },
      { status: 403 }
    );
  }

  const eventGeoData = await fetch(
    `https://geocode.maps.co/search?q=${encodeURIComponent(
      adress + "," + zipcode + "," + city
    )}&api_key=${process.env.GEOCODE_API}`
  );

  let lat = "0";
  let long = "0";
  const eventGeoDataJSon = await eventGeoData.json();

  if (eventGeoDataJSon.length > 0 && eventGeoDataJSon[0].lat && eventGeoDataJSon[0].lon) {
    lat = eventGeoDataJSon[0].lat;
    long = eventGeoDataJSon[0].lon;
  }

  try {
    const newDriver: Driver = await prisma.driver.create({
      data: {
        adress,
        city,
        endingdate,
        latitude: lat,
        longitude: long,
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
