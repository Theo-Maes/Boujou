import { prisma } from "@/libs";
import { Host, HostedUser, UserGroup } from "@prisma/client";
import { NextResponse } from "next/server";

interface DriverPassengerFormData {
  userId: string;
}

export async function POST(req: Request, params: { params: { id: string } }) {
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
    return NextResponse.json({ error: "le Host nexiste pas" }, { status: 404 });
  }

  if (host.userId == Number.parseInt(userId)) {
    return NextResponse.json(
      { error: "le Host ne peut pas rejoindre son propre logement" },
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

  const nbHostUser: Number = await prisma.hostedUser.count({
    where: {
      hostId: hostId,
    },
  });

  if (nbHostUser == host.quantity) {
    return NextResponse.json(
      { error: "le logement est déjà plein" },
      { status: 403 }
    );
  }

  const isAlreadyHostedUser: HostedUser | null =
    await prisma.hostedUser.findFirst({
      where: {
        hostId: hostId,
        userId: Number.parseInt(userId),
      },
    });

  if (isAlreadyHostedUser) {
    return NextResponse.json(
      { error: "l'utilisateur est déjà dans le logement" },
      { status: 403 }
    );
  }

  try {
    const joiningHost: HostedUser = await prisma.hostedUser.create({
      data: {
        host: {
          connect: {
            id: hostId,
          },
        },
        user: {
          connect: {
            id: Number.parseInt(userId),
          },
        },
      },
    });
    return NextResponse.json({ data: joiningHost }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ erreur: error }, { status: 500 });
  }
}

//verif le join de plusieurs user and le leave et normalement plus qu'a merge mais pas de reseau téléphonique 4g ou fibre a partir de 00h45 donc sad j'ai attendu mais 1h du mat je vais dodo du coup
