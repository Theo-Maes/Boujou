import { prisma } from "@/libs";
import { User } from "@prisma/client";
import { unlink, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";

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
    avatar,
    firstName,
    lastName,
    adress,
    zipcode,
    city,
    latitude,
    longitude,
    roleId,
  } = Object.fromEntries(data.entries()) as unknown as User;

  const updateData: Partial<User> = {
    ...(fullname && { fullname }),
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
    ...(roleId && { roleId }),
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
