import { prisma } from "@/libs";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const UserFind: User[] = await prisma.user.findMany({
      include: { role: true },
    });
    return NextResponse.json({ data: UserFind }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ erreur: error }, { status: 500 });
  }
}
