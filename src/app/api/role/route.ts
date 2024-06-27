import { prisma } from "@/libs";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const roleFind: Role[] = await prisma.role.findMany();
    return NextResponse.json({ data: roleFind }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ erreur: error }, { status: 500 });
  }
}
