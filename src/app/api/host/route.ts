import { prisma } from "@/libs";
import { Host } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const hostfind: Host[] = await prisma.host.findMany({
      include: { user: true, group: true },
    });
    return NextResponse.json({ data: hostfind }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ erreur: error }, { status: 500 });
  }
}
