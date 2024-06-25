import { prisma } from "@/libs";
import { User } from "@prisma/client";
import { unlink, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import bcrypt from "bcrypt";

interface UserFormData {
  fullname: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  adress?: string;
  zipcode?: string;
  city?: string;
  latitude?: string;
  longitude?: string;
  roleId: string;
  avatarUrl?: string;
}

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const {
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
    path = join(process.cwd(), "public", "avatar", Date.now() + ".jpg");
    await writeFile(path, buffer);
  } else {
    let file: File;
    file = data.get("avatar") as unknown as File;
    if (!file) {
      file = new File([], "/public/avatar/defaultAvatar.webp");
      path = join(process.cwd(), file.name);
    } else {
      path = join(process.cwd(), "public", "avatar", Date.now() + file.name);
      const bytes = await file.arrayBuffer();
      buffer = Buffer.from(bytes);
      await writeFile(path, buffer);
    }
  }

  const avatarPath = path.replace(join(process.cwd(), "public"), "").replace(/\\/g, "/");

  try {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
    const newUser: User = await prisma.user.create({
      data: {
        fullname: firstName + " " + lastName,
        email: email,
        password: hashedPassword,
        avatar: avatarPath,
        firstName: firstName,
        lastName: lastName,
        adress: adress,
        zipcode: zipcode,
        city: city,
        latitude: latitude || "0",
        longitude: longitude || "0",
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
