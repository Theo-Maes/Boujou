import { prisma } from "@/libs";
import { Event } from "@prisma/client";
import { constants } from "fs";
import { access, unlink, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";
import sharp from "sharp";

interface EventFormData {
  name: string;
  description: string;
  endingDate: string;
  startingDate: string;
  address: string;
  city: string;
  zipCode: string;
  latitude: string;
  longitude: string;
  categoryId: string;
  price: string;
  url: string;
  cancelledAt: string | null;
  validatedAt: string | null;
}

export async function PATCH(req: Request, params: { params: { id: string } }) {
  const id = Number.parseInt(params.params.id);
  const data = await req.formData();

  const file: File | null = data.get("image") as unknown as File;
  let path: string = "";

  if (file) {
    try {
      const eventFind: Event | null = await prisma.event.findUnique({
        where: {
          id: id,
        },
      });
      if (eventFind) {
        path = join(process.cwd(), "public", eventFind.image);
      }
      await access(path, constants.F_OK);
      await unlink(path);
    } catch (error) {
      return NextResponse.json({ erreur: error }, { status: 500 });
    }
    path = join(
      process.cwd(),
      "public",
      "event",
      Date.now() + file.name
    ).replace(" ", "_");
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const resizedImageBuffer = await sharp(buffer).resize(1600, 924).toBuffer();
    await writeFile(path, resizedImageBuffer);
  }

  const {
    name,
    description,
    endingDate,
    startingDate,
    address,
    city,
    zipCode,
    latitude,
    longitude,
    categoryId,
    price,
    url,
    validatedAt,
    cancelledAt,
  } = Object.fromEntries(data.entries()) as unknown as EventFormData;

  const isAddressModified =
    address !== undefined || city !== undefined || zipCode !== undefined;

  const existingLat = data.get("latitude") as string;
  const existingLong = data.get("longitude") as string;
  let lat: string = "";
  let long: string = "";

  if (isAddressModified) {
    try {
      const eventGeoData = await fetch(
        `https://geocode.maps.co/search?q=${encodeURIComponent(
          address + "," + zipCode + "," + city
        )}&api_key=${process.env.GEOCODE_API}`
      );

      const eventGeoDataJSon = await eventGeoData.json();
      lat = eventGeoDataJSon[0].lat;
      long = eventGeoDataJSon[0].lon;
    } catch (error) {
      return NextResponse.json({ erreur: error }, { status: 500 });
    }
  } else {
    lat = existingLat;
    long = existingLong;
  }

  const endingDateDateTime = new Date(endingDate);
  const startingDateDateTime = new Date(startingDate);

  const updateData: Partial<Event> = {
    ...(name && { name }),
    ...(description && { description }),
    ...(endingDate && { endingDate: endingDateDateTime }),
    ...(startingDate && { startingDate: startingDateDateTime }),
    ...(address && { address }),
    ...(city && { city }),
    ...(zipCode && { zipCode }),
    ...(latitude && { latitude: lat }),
    ...(longitude && { longitude: long }),
    ...(longitude && { longitude }),
    ...(categoryId && { categoryId: Number.parseInt(categoryId) }),
    ...(url && { url }),
    ...(price && { price: Number.parseInt(price) }),
    image: file
      ? path.replace(join(process.cwd(), "public"), "").replace(/\\/g, "/")
      : undefined,
  };

  try {
    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      return NextResponse.json(
        { erreur: "Evénement non trouvé" },
        { status: 404 }
      );
    }

    if (validatedAt !== undefined) {
      //updateData.validatedAt = event.validatedAt ? null : new Date();
      updateData.validatedAt = event.validatedAt
        ? null
        : new Date(Number(validatedAt));
    }

    if (cancelledAt !== undefined) {
      //updateData.cancelledAt = event.cancelledAt ? null : new Date();
      updateData.cancelledAt = event.cancelledAt
        ? null
        : new Date(Number(cancelledAt));
    }

    const eventUpdated: Event | null = await prisma.event.update({
      data: updateData,
      where: { id: id },
    });

    return NextResponse.json({ data: eventUpdated }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ erreur: error }, { status: 500 });
  }
}
