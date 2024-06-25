import { prisma } from "@/libs";
import { Host } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, params: { params: { id: string } }) {
  const id = Number.parseInt(params.params.id);
  try {
    const hostDelete: Host = await prisma.driver.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ data: hostDelete }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ erreur: error }, { status: 500 });
  }
}
