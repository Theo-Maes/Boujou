import { prisma } from "@/libs";
import { UserGroup } from "@prisma/client";
import { NextResponse } from "next/server";

interface UserGroupFormData {
  userId: string;
  groupId: string;
}

export async function POST(req: Request, params: { params: { id: string } }) {
  const groupId = Number.parseInt(params.params.id);
  const data = await req.formData();

  const { userId } = Object.fromEntries(
    data.entries()
  ) as unknown as UserGroupFormData;

  const userGroup = await prisma.userGroup.findFirst({
    where: {
      userId: Number.parseInt(userId),
      groupId: groupId,
    },
  });

  if (!userGroup) {
    return NextResponse.json(
      { erreur: "Vous n'êtes pas membre de ce groupe" },
      { status: 403 }
    );
  }

  try {
    const newGroup: UserGroup = await prisma.userGroup.create({
      data: {
        user: {
          connect: {
            id: Number.parseInt(userId),
          },
        },
        group: {
          connect: {
            id: groupId,
          },
        },
      },
    });
    return NextResponse.json({ data: newGroup }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ erreur: error }, { status: 500 });
  }
}
