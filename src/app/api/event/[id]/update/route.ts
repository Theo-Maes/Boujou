import { prisma } from "@/libs";
import { Event } from "@prisma/client";
import { unlink, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";

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
      await unlink(path);
    } catch (error) {
      return NextResponse.json({ erreur: error }, { status: 500 });
    }

    path = join(process.cwd(), "public", "event", Date.now() + file.name);
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
    url,
  } = Object.fromEntries(data.entries()) as unknown as Event;

  const updateData: Partial<Event> = {
    ...(name && { name }),
    ...(description && { description }),
    ...(endingDate && { endingDate }),
    ...(startingDate && { startingDate }),
    ...(address && { address }),
    ...(city && { city }),
    ...(zipCode && { zipCode }),
    ...(latitude && { latitude }),
    ...(longitude && { longitude }),
    ...(categoryId && { categoryId }),
    ...(url && { url }),
    image: file ? path.replace(join(process.cwd(), "public"), "") : undefined,
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
