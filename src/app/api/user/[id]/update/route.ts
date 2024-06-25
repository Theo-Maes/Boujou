import { prisma } from "@/libs";
import { User } from "@prisma/client";
import { unlink, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";

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
  avatar?: string;
}

export async function PATCH(req: Request, params: { params: { id: string } }) {
  const id = Number.parseInt(params.params.id);
  const data = await req.formData();

  const file: File | null = data.get("avatar") as unknown as File;
  let path: string = "";

  if (file) {
    try {
      const userFind: User | null = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      if (userFind) {
        path = join(process.cwd(), "public", userFind.avatar);
      }
      await unlink(path);
    } catch (error) {
      return NextResponse.json({ erreur: error }, { status: 500 });
    }

    path = join(process.cwd(), "public", "avatar", Date.now() + file.name);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(path, buffer);
  }

  const {
    fullname,
    email,
    password,
    firstName,
    lastName,
    avatar,
    adress,
    zipcode,
    city,
    latitude,
    longitude,
    roleId,
  } = Object.fromEntries(data.entries()) as unknown as UserFormData;

  const updateData: Partial<User> = {
    ...(fullname && { fullname: `${firstName} ${lastName}` }),
    ...(email && { email }),
    ...(password && { password }),
    ...(avatar && { avatar }),
    ...(firstName && { firstName }),
    ...(lastName && { lastName }),
    ...(adress && { adress }),
    ...(zipcode && { zipcode }),
    ...(city && { city }),
    ...(latitude && { latitude }),
    ...(longitude && { longitude }),
    ...(roleId && { roleId: Number.parseInt(roleId) }),
    avatar: file ? path.replace(join(process.cwd(), "public"), "").replace(/\\/g, "/") : undefined,
  };

  try {
    const userUpdated: User | null = await prisma.user.update({
      data: updateData,
      where: { id: id },
    });
    return NextResponse.json({ data: userUpdated }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ erreur: error }, { status: 500 });
  }
}
