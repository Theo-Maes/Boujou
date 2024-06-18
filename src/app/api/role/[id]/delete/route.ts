import { prisma } from "@/libs";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, params: { params: { id: string } }) {
  const id = Number.parseInt(params.params.id);
  try {
    const roleDeleted: Role | null = await prisma.role.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({ data: roleDeleted }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ erreur: error }, { status: 500 });
  }
}
