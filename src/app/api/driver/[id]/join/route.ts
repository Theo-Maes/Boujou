import { prisma } from "@/libs";
import { Driver, DriverPassenger, UserGroup } from "@prisma/client";
import { NextResponse } from "next/server";

interface DriverPassengerFormData {
  userId: string;
}

export async function POST(req: Request, params: { params: { id: string } }) {
  const driverId: number = Number.parseInt(params.params.id);
  const data: FormData = await req.formData();

  const { userId } = Object.fromEntries(
    data.entries()
  ) as unknown as DriverPassengerFormData;

  const driver: Driver | null = await prisma.driver.findUnique({
    where: {
      id: driverId,
    },
  });

  if (!driver) {
    return NextResponse.json(
      { error: "le driver nexiste pas" },
      { status: 404 }
    );
  }

  if (driver.userId == Number.parseInt(userId)) {
    return NextResponse.json(
      { error: "le driver ne peut pas rejoindre son propre trajet" },
      { status: 403 }
    );
  }

  const groupId: number | null = driver.groupId;

  if (groupId === null) {
    return NextResponse.json(
      { error: "le driver n'est pas dans un groupe" },
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

  const nbDriverMember: Number = await prisma.driverPassenger.count({
    where: {
      driverId: driverId,
    },
  });

  if (nbDriverMember == driver.quantity) {
    return NextResponse.json(
      { error: "le covoiturage est déjà plein" },
      { status: 403 }
    );
  }

  const isAlreadyDriverPassenger: DriverPassenger | null =
    await prisma.driverPassenger.findFirst({
      where: {
        driverId: driverId,
        userId: Number.parseInt(userId),
      },
    });

  if (isAlreadyDriverPassenger) {
    return NextResponse.json(
      { error: "l'utilisateur est déjà passager du driver" },
      { status: 403 }
    );
  }

  try {
    const newDriverPassenger: DriverPassenger =
      await prisma.driverPassenger.create({
        data: {
          driver: {
            connect: {
              id: driverId,
            },
          },
          user: {
            connect: {
              id: Number.parseInt(userId),
            },
          },
        },
      });
    return NextResponse.json({ data: newDriverPassenger }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ erreur: error }, { status: 500 });
  }
}

//verif le join de plusieurs user and le leave et normalement plus qu'a merge mais pas de reseau téléphonique 4g ou fibre a partir de 00h45 donc sad j'ai attendu mais 1h du mat je vais dodo du coup
