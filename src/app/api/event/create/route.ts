import { prisma } from "@/libs";
import { Event } from "@prisma/client";
import { unlink, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import sharp from "sharp";

interface EventFormData {
  name: string;
  description: string;
  endingDate?: string | undefined | null;
  startingDate: string;
  address: string;
  city: string;
  zipCode: string;
  categoryId: string;
  price: string;
  url?: string;
}

export async function POST(req: NextRequest) {
  const data = await req.formData();

  const file: File | null = data.get("image") as unknown as File;
  if (!file) {
    return NextResponse.json({ erreur: "No file" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const resizedImageBuffer = await sharp(buffer).resize(1600, 924).toBuffer();

  const path = join(
    process.cwd(),
    "public",
    "event",
    Date.now() + file.name
  ).replace(" ", "_");
  await writeFile(path, resizedImageBuffer);

  try {
    const {
      name,
      description,
      endingDate,
      startingDate,
      address,
      city,
      zipCode,
      categoryId,
      url,
      price,
    } = Object.fromEntries(data.entries()) as unknown as EventFormData;

    const eventGeoData = await fetch(
      `https://geocode.maps.co/search?q=${encodeURIComponent(
        address + "," + zipCode + "," + city
      )}&api_key=${process.env.GEOCODE_API}`
    );

    let lat = "0";
    let long = "0";
    const eventGeoDataJSon = await eventGeoData.json();

    if (
      eventGeoDataJSon.length > 0 &&
      eventGeoDataJSon[0].lat &&
      eventGeoDataJSon[0].lon
    ) {
      lat = eventGeoDataJSon[0].lat;
      long = eventGeoDataJSon[0].lon;
    }

    let endingDateDateTime;
    if (endingDate || endingDate !== "") {
      endingDateDateTime = new Date(Number(endingDate));
    } else {
      endingDateDateTime = "";
    }
    const startingDateDateTime = new Date(Number(startingDate));

    const avatarPath = path
      .replace(join(process.cwd(), "public"), "")
      .replace(/\\/g, "/");

    const newEvent: Event = await prisma.event.create({
      data: {
        name: name,
        description: description,
        url: url ? url : null,
        endingDate: endingDateDateTime,
        startingDate: startingDateDateTime,
        address: address,
        city: city,
        zipCode: zipCode,
        latitude: lat,
        longitude: long,
        image: avatarPath,
        price: Number.parseInt(price),
        category: {
          connect: {
            id: Number.parseInt(categoryId),
          },
        },
      },
    });

    return NextResponse.json({ newEvent }, { status: 201 });
  } catch (error) {
    if (file) await unlink(path);
    console.error(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
