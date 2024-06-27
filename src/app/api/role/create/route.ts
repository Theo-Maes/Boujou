import { prisma } from "@/libs";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.formData();
  const { name } = Object.fromEntries(data.entries()) as unknown as Role;

  try {
    const newRole: Role = await prisma.role.create({
      data: {
        name: name,
      },
    });
    return NextResponse.json({ data: newRole }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ erreur: error }, { status: 500 });
  }
}
