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
  avatarUrl?: string;
}

export async function POST(req: NextRequest) {
  const data = await req.formData();

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
    avatarUrl,
  } = Object.fromEntries(data.entries()) as unknown as UserFormData;

  let buffer;
  let path;
  if (avatarUrl) {
    const response = await fetch(avatarUrl);
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to download image" },
        { status: 400 }
      );
    }
    const bytes = await response.arrayBuffer();
    buffer = Buffer.from(bytes);
    path = join(
      process.cwd(),
      "public",
      "avatar",
      Date.now() + "test" + ".jpg"
    );
    await writeFile(path, buffer);
  } else {
    let file: File;
    file = data.get("avatar") as unknown as File;
    if (!file) {
      file = new File([], "/public/avatar/1719296463884test.jpg");
      path = join(process.cwd(), file.name);
    } else {
      path = join(process.cwd(), "public", "avatar", Date.now() + file.name);
      const bytes = await file.arrayBuffer();
      buffer = Buffer.from(bytes);
      await writeFile(path, buffer);
    }
  }

  try {
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
    if (avatarUrl != null || (data.get("avatar") as unknown as File) != null) {
      unlink(path);
    }
    console.error(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
