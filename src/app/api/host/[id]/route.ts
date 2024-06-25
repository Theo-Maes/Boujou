import { prisma } from "@/libs";
import { Host } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request, params: { params: { id: string } }) {
  const id = Number.parseInt(params.params.id);
  try {
    const hostfind: Host | null = await prisma.host.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
        group: true,
        hostedUsers: {
          include: { user: true },
        },
      },
    });
    return NextResponse.json({ data: hostfind }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ erreur: error }, { status: 500 });
  }
}
