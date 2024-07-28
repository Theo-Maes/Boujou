import { prisma } from "@/libs";
import { Event } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const eventFind: Event[] = await prisma.event.findMany({
      include: { category: true, groups: true },
    });

    const filteredEvents = eventFind.filter(
      (event) => event.validatedAt !== null
    );

    filteredEvents.forEach((event) => {
      event.image = event.image.replace(/\\/g, "/");
    });

    return NextResponse.json(
      { data: filteredEvents, drafts: eventFind },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ erreur: error }, { status: 500 });
  }
}
