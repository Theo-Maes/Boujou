import {
  Driver,
  Event,
  Group,
  Host,
  PrismaClient,
  Role,
  User,
} from "@prisma/client";
import { events as eventMocks, users as userMocks } from "./mockData";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
async function clearDb() {
  console.log("remove db entities");

  const tables = [
    "DriverPassenger",
    "HostedUser",
    "UserGroup",
    "Group",
    "Event",
    "Category",
    "User",
    "Host",
    "Driver",
    "Role",
  ];

  for (const table of tables) {
    await prisma.$queryRawUnsafe(
      `TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE`
    );
  }
}
const createEvents = async (
  musicCategoryId: number,
  filmCategoryId: number
): Promise<{ musicFestival: Event; filmFestival: Event }> => {
  const { id: mid, ...musicMock } = eventMocks[0];
  const { id: fid, ...filmMock } = eventMocks[1];
  const { id: fdid, ...mock } = eventMocks[2];
  const { id: feid, ...mockEvreux } = eventMocks[3];
  const musicFestival = await prisma.event.create({
    data: {
      ...musicMock,
      categoryId: musicCategoryId,
    },
  });
  const filmFestival = await prisma.event.create({
    data: {
      ...filmMock,
      categoryId: filmCategoryId,
    },
  });
  await prisma.event.create({
    data: {
      ...mockEvreux,
      categoryId: musicCategoryId,
    },
  });
  await prisma.event.create({
    data: {
      ...mock,
      categoryId: musicCategoryId,
    },
  });
  return { musicFestival, filmFestival };
};

const createUsers = async (
  adminRole: Role,
  userRole: Role
): Promise<{ john: User; jane: User }> => {
  const johnMock = userMocks[0];
  const janeMock = userMocks[1];

  const hashedPassword = await bcrypt.hash("Secret123#", 10);

  const john = await prisma.user.create({
    data: {
      ...johnMock,
      roleId: adminRole.id,
      password: hashedPassword,
    },
  });

  const jane = await prisma.user.create({
    data: {
      ...janeMock,
      roleId: userRole.id,
      password: hashedPassword,
    },
  });
  console.log("Users created");
  return { john, jane };
};

const createGroup = async (
  festivals: { musicFestival: Event; filmFestival: Event },
  creators: { jane: User; john: User }
): Promise<{ johnGroup: Group; janeGroup: Group }> => {
  console.log("Groups created");
  const johnGroup = await prisma.group.create({
    data: {
      userId: creators.john!.id,
      eventId: festivals.musicFestival.id,
    },
  });

  const janeGroup = await prisma.group.create({
    data: {
      userId: creators.jane!.id,
      eventId: festivals.filmFestival.id,
    },
  });

  return { johnGroup, janeGroup };
};

const createDriver = async (john: User, johnGroup: Group): Promise<Driver> => {
  return await prisma.driver.create({
    data: {
      quantity: 4,
      city: "Paris",
      adress: "123 Rue de la Paix",
      zipcode: "75002",
      startingdate: new Date("2024-07-01"),
      endingdate: new Date("2024-07-02"),
      longitude: "2.3522",
      latitude: "48.8566",
      userId: john!.id,
      groupId: johnGroup!.id,
    },
  });
};

const createHost = async (jane: User, johnGroup: Group): Promise<Host> => {
  return prisma.host.create({
    data: {
      quantity: 2,
      city: "Los Angeles",
      adress: "456 Hollywood Blvd",
      zipcode: "90028",
      startingdate: new Date("2024-08-10"),
      endingdate: new Date("2024-08-12"),
      longitude: "-118.2437",
      latitude: "34.0522",
      userId: jane.id,
      groupId: johnGroup.id,
    },
  });
};

const createPassenger = async (
  driver: Driver,
  passenger: User
): Promise<void> => {
  await prisma.driverPassenger.create({
    data: {
      driverId: driver.id,
      userId: passenger.id,
    },
  });
};

const addUserToGroup = async (user: User, group: Group): Promise<void> => {
  await prisma.userGroup.create({
    data: {
      userId: user.id,
      groupId: group.id,
    },
  });
};
export async function main() {
  await clearDb();

  const userRole = await prisma.role.create({
    data: { name: "User" },
  });
  const adminRole = await prisma.role.create({
    data: { name: "Admin" },
  });

  const { john, jane } = await createUsers(adminRole, userRole);

  const categories = await prisma.category.createMany({
    data: [{ name: "Music" }, { name: "Film" }, { name: "Food" }],
  });
  const [musicCategory, filmCategory] = await prisma.category.findMany();

  const { musicFestival, filmFestival } = await createEvents(
    musicCategory.id,
    filmCategory.id
  );

  const { johnGroup, janeGroup } = await createGroup(
    { musicFestival, filmFestival },
    { john, jane }
  );

  await addUserToGroup(john, johnGroup);
  await addUserToGroup(jane, johnGroup);

  const johnDriver = await createDriver(john, johnGroup);

  await createPassenger(johnDriver, jane);

  const janeHost = await createHost(jane, johnGroup);

  //   await prisma.hostedUser.upsert({
  //     where: {
  //       hostId_userId: {
  //         // Assurez-vous que ce nom de champ composite correspond à votre schéma
  //         hostId: janeHost!.id,
  //         userId: john!.id,
  //       },
  //     },
  //     update: {
  //       hostId: janeHost!.id,
  //       userId: john!.id,
  //     },
  //     create: {
  //       hostId: janeHost!.id,
  //       userId: john!.id,
  //     },
  //   });

  await prisma.$disconnect();
  console.log("reset has finished with db");
}
