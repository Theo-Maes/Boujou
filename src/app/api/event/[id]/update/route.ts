import { prisma } from "@/libs";
import { Event } from "@prisma/client";
import { constants } from "fs";
import { access, unlink, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";

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
    path = join(process.cwd(), "public", "event", Date.now() + file.name).replace(" ", "_");
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(path, buffer);
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
  } = Object.fromEntries(data.entries()) as unknown as EventFormData;
  
  const eventGeoData = await fetch(
    `https://geocode.maps.co/search?q=${encodeURIComponent(
      address + "," + zipCode + "," + city
    )}&api_key=${process.env.GEOCODE_API}`
  );

  const eventGeoDataJSon = await eventGeoData.json();
  const lat = eventGeoDataJSon[0].lat;
  const long = eventGeoDataJSon[0].lon;

  const endingDateDateTime = new Date(Number(endingDate));     
  const startingDateDateTime = new Date(Number(startingDate));

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
    image: file ? path.replace(join(process.cwd(), "public"), "").replace(/\\/g, "/") : undefined,
  };


  try {
    const eventUpdated: Event | null = await prisma.event.update({
      data: updateData,
      where: { id: id },
    });
    return NextResponse.json({ data: eventUpdated }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ erreur: error }, { status: 500 });
  }
}