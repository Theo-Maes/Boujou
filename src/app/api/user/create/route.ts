import { prisma } from "@/libs";
import { User } from "@prisma/client";
import { unlink, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function POST(req: NextRequest) {
  const data = await req.formData();

  const file: File | null = data.get("file") as unknown as File;
  if (!file) {
    return NextResponse.json({ erreur: "No file" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = join(process.cwd(), "public", "avatar", Date.now() + file.name);
  await writeFile(path, buffer);
  try {
    const {
      username,
      isAdmin,
      email,
      password,
      avatar,
      firstName,
      lastName,
      adress,
      latitude,
      longitude,
      roleId,
    } = Object.fromEntries(data.entries()) as unknown as User;

    const newUser: User = await prisma.user.create({
      data: {
        username: username,
        isAdmin: isAdmin,
        email: email,
        password: password,
        avatar: avatar,
        firstName: firstName,
        lastName: lastName,
        adress: adress,
        latitude: latitude,
        longitude: longitude,
        role: {
          connect: {
            id: roleId,
          },
        },
      },
    });

    return NextResponse.json({ newUser }, { status: 201 });
  } catch (error) {
    if (file) await unlink(path);
    console.error(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
