import { prisma } from "@/libs";
import { User } from "@prisma/client";
import { unlink } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";

export async function DELETE(req: Request, params: { params: { id: string } }) {
  const id = Number.parseInt(params.params.id);
  try {
    const userDeleted: User | null = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    if (userDeleted) {
      const path = join(process.cwd(), "public", userDeleted.avatar).replace(
        /\\/g,
        "/"
      );
      if (
        userDeleted.avatar &&
        userDeleted.avatar !== "/avatar/defaultAvatar.webp"
      )
        await unlink(path);
    }
    return NextResponse.json({ data: userDeleted }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ erreur: error }, { status: 500 });
  }
}
