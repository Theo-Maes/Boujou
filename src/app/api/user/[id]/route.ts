import { prisma } from "@/libs";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request, params: { params: { id: string } }) {
  const id = Number.parseInt(params.params.id);
  try {
    const userFind: User | null = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return NextResponse.json({ data: userFind }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ erreur: error }, { status: 500 });
  }
}
