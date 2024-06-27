import { prisma } from "@/libs";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request, params: { params: { id: string } }) {
  const id = Number.parseInt(params.params.id);
  try {
    const roleFind: Role | null = await prisma.role.findUnique({
      where: {
        id: id,
      },
    });
    return NextResponse.json({ data: roleFind }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ erreur: error }, { status: 500 });
  }
}
