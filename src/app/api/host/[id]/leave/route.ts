import { prisma } from "@/libs";
import { Host, HostedUser, UserGroup } from "@prisma/client";
import { NextResponse } from "next/server";

interface DriverPassengerFormData {
  userId: string;
}

export async function DELETE(req: Request, params: { params: { id: string } }) {
  const hostId: number = Number.parseInt(params.params.id);
  const data: FormData = await req.formData();

  const { userId } = Object.fromEntries(
    data.entries()
  ) as unknown as DriverPassengerFormData;

  const host: Host | null = await prisma.host.findUnique({
    where: {
      id: hostId,
    },
  });

  if (!host) {
    return NextResponse.json({ error: "le host nexiste pas" }, { status: 404 });
  }

  if (host.userId == Number.parseInt(userId)) {
    return NextResponse.json(
      { error: "le host ne peut pas quitter son propre logement" },
      { status: 403 }
    );
  }

  const groupId: number | null = host.groupId;

  if (groupId === null) {
    return NextResponse.json(
      { error: "le host n'est pas dans un groupe" },
      { status: 404 }
    );
  }

  const userGroup: UserGroup | null = await prisma.userGroup.findFirst({
    where: {
      groupId: groupId,
      userId: Number.parseInt(userId),
    },
  });

  if (!userGroup) {
    return NextResponse.json(
      { error: "l'utilisateur ne fait pas partie du groupe" },
      { status: 403 }
    );
  }

  const isHostedUser: HostedUser | null = await prisma.hostedUser.findFirst({
    where: {
      hostId: hostId,
      userId: Number.parseInt(userId),
    },
  });

  if (!isHostedUser) {
    return NextResponse.json(
      { error: "l'utilisateur n'est pas hébergé par se Host" },
      { status: 403 }
    );
  }

  try {
    const leavingHost: HostedUser = await prisma.hostedUser.delete({
      where: {
        hostId_userId: {
          hostId: hostId,
          userId: Number.parseInt(userId),
        },
      },
    });
    return NextResponse.json({ data: leavingHost }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ erreur: error }, { status: 500 });
  }
}
