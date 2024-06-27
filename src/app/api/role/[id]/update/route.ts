import { prisma } from "@/libs";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, params: { params: { id: string } }) {
  const id = Number.parseInt(params.params.id);
  const data = await req.formData();
  const { name } = Object.fromEntries(data.entries()) as unknown as Role;
  try {
    const roleUpdate: Role = await prisma.role.update({
      data: {
        name: name,
      },
      where: {
        id: id,
      },
    });
    return NextResponse.json({ data: roleUpdate }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ erreur: error }, { status: 500 });
  }
}
