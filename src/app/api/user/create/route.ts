import { prisma } from "@/libs";
import { User } from "@prisma/client";
import { unlink, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

interface UserFormData {
  fullname: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  adress: string;
  zipcode: string;
  city: string;
  latitude: string;
  longitude: string;
  roleId: string;
}

export async function POST(req: NextRequest) {
  const data = await req.formData();

  const file: File | null = data.get("avatar") as unknown as File;
  if (!file) {
    return NextResponse.json({ erreur: "No file" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = join(process.cwd(), "public", "avatar", Date.now() + file.name);
  await writeFile(path, buffer);
  try {
    const {
      fullname,
      email,
      password,
      firstName,
      lastName,
      adress,
      zipcode,
      city,
      latitude,
      longitude,
      roleId,
    } = Object.fromEntries(data.entries()) as unknown as UserFormData;

    const newUser: User = await prisma.user.create({
      data: {
        fullname: fullname,
        email: email,
        password: password,
        avatar: path.replace(join(process.cwd(), "public"), ""),
        firstName: firstName,
        lastName: lastName,
        adress: adress,
        zipcode: zipcode,
        city: city,
        latitude: latitude,
        longitude: longitude,
        role: {
          connect: {
            id: Number.parseInt(roleId),
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
