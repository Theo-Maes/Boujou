import { PrismaClient } from "@prisma/client";
import {
  events as eventMocks,
  users as userMocks,
} from "../__tests__/__mocks__/mockData";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
// // async function clearDb() {
// //   console.log("remove db entities");
// //   await prisma.userGroup.deleteMany({});
// //   await prisma.group.deleteMany({});
// //   await prisma.event.deleteMany({});
// //   await prisma.category.deleteMany({});
// //   await prisma.user.deleteMany({});
// //   await prisma.driverPassenger.deleteMany({});
// //   await prisma.role.deleteMany({});

// //   // Réinitialiser les séquences (PostgreSQL)
// //   await prisma.$executeRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`;
// //   await prisma.$executeRaw`ALTER SEQUENCE "Group_id_seq" RESTART WITH 1`;
// //   await prisma.$executeRaw`ALTER SEQUENCE "Event_id_seq" RESTART WITH 1`;
// //   await prisma.$executeRaw`ALTER SEQUENCE "Category_id_seq" RESTART WITH 1`;
// //   await prisma.$executeRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`;
// //   await prisma.$executeRaw`ALTER SEQUENCE "Role_id_seq" RESTART WITH 1`;
// //   await prisma.$executeRaw`ALTER SEQUENCE "Host_id_seq" RESTART WITH 1`;
// //   await prisma.$executeRaw`ALTER SEQUENCE "Driver_id_seq" RESTART WITH 1`;
// //   //   await prisma.driverPassenger.deleteMany({});
// //   //   await prisma.hostedUser.deleteMany({});
// //   //   await prisma.host.deleteMany({});
// //   //   await prisma.driver.deleteMany({});

// //   //   await prisma.user.deleteMany({});
// //   //   await prisma.role.deleteMany({});

// //   // Réinitialiser les séquences (PostgreSQL)
// //   //   await prisma.$executeRaw`ALTER SEQUENCE "UserGroup_id_seq" RESTART WITH 1`;
// //   //   await prisma.$executeRaw`ALTER SEQUENCE "Group_id_seq" RESTART WITH 1`;
// //   //   await prisma.$executeRaw`ALTER SEQUENCE "Event_id_seq" RESTART WITH 1`;
// //   //   await prisma.$executeRaw`ALTER SEQUENCE "Category_id_seq" RESTART WITH 1`;

// //   //   //   await prisma.$executeRaw`ALTER SEQUENCE "DriverPassenger_id_seq" RESTART WITH 1`;
// //   //   //   await prisma.$executeRaw`ALTER SEQUENCE "HostedUser_id_seq" RESTART WITH 1`;
// //   //   //   await prisma.$executeRaw`ALTER SEQUENCE "Host_id_seq" RESTART WITH 1`;
// //   //   //   await prisma.$executeRaw`ALTER SEQUENCE "Driver_id_seq" RESTART WITH 1`;

// //   //   await prisma.$executeRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`;
// //   //   await prisma.$executeRaw`ALTER SEQUENCE "Role_id_seq" RESTART WITH 1`;

// //   //   await prisma.$executeRaw`ALTER SEQUENCE "Event_id_seq" RESTART WITH 1`;
// // }
// // export async function main() {
// //   await clearDb();
// //   // Création des rôles
// //   console.log("create role verification 12");
// //   const userRole = await prisma.role.create({
// //     data: { name: "User" },
// //   });

// //   const adminRole = await prisma.role.create({
// //     data: { name: "Admin" },
// //   });

// //   // Création des utilisateurs
// //   const hashedPassword = await bcrypt.hash("Secret123#", 10);
// //   const users = await prisma.user.createMany({
// //     data: [
// //       {
// //         fullname: "John Doe",
// //         email: "john.doe@example.com",
// //         password: hashedPassword,
// //         avatar: "john_avatar.png",
// //         firstName: "John",
// //         lastName: "Doe",
// //         roleId: adminRole.id,
// //         createdAt: new Date(),
// //       },
// //       {
// //         fullname: "Jane Smith",
// //         email: "jane.smith@example.com",
// //         password: hashedPassword,
// //         avatar: "jane_avatar.png",
// //         firstName: "Jane",
// //         lastName: "Smith",
// //         roleId: userRole.id,
// //         createdAt: new Date(),
// //       },
// //     ],
// //   });

// //   // Récupérer les utilisateurs créés
// //   const [john, jane] = await prisma.user.findMany();

// //   // Création des catégories
// //   const categories = await prisma.category.createMany({
// //     data: [{ name: "Music" }, { name: "Film" }, { name: "Food" }],
// //   });

// //   // Récupérer les catégories créées
// //   const [musicCategory, filmCategory, foodCategory] =
// //     await prisma.category.findMany();

// //   // Création des événements
// //   const events = await prisma.event.createMany({
// //     data: [
// //       {
// //         name: "Music Festival",
// //         startingDate: new Date("2024-07-01"),
// //         endingDate: new Date("2024-07-02"),
// //         latitude: "48.8566",
// //         longitude: "2.3522",
// //         image: "music_festival.jpg",
// //         city: "Paris",
// //         address: "Champs-Elysées",
// //         description: "A great music festival in Paris.",
// //         zipCode: "75008",
// //         validatedAt: new Date("2024-07-02"),
// //         price: 50,
// //         categoryId: musicCategory.id,
// //       },
// //       {
// //         name: "Film Festival",
// //         startingDate: new Date("2024-08-10"),
// //         endingDate: new Date("2024-08-12"),
// //         latitude: "34.0522",
// //         longitude: "-118.2437",
// //         image: "film_festival.jpg",
// //         city: "Los Angeles",
// //         address: "Hollywood Blvd",
// //         description: "A renowned film festival in LA.",
// //         zipCode: "90028",
// //         validatedAt: new Date("2024-07-02"),
// //         price: 75,
// //         categoryId: filmCategory.id,
// //       },
// //     ],
// //   });

// //   // Récupérer les événements créés
// //   const [musicFestival, filmFestival] = await prisma.event.findMany();

// //   // Création des groupes
// //   const groups = await prisma.group.createMany({
// //     data: [
// //       {
// //         userId: john.id,
// //         eventId: musicFestival.id,
// //       },
// //       {
// //         userId: jane.id,
// //         eventId: filmFestival.id,
// //       },
// //     ],
// //   });

// //   //Récupérer les groupes créés
// //   const [johnsGroup, janesGroup] = await prisma.group.findMany();

// //   //Création des chauffeurs
// //   const drivers = await prisma.driver.createMany({
// //     data: [
// //       {
// //         quantity: 4,
// //         city: "Paris",
// //         adress: "123 Rue de la Paix",
// //         zipcode: "75002",
// //         startingdate: new Date("2024-07-01"),
// //         endingdate: new Date("2024-07-02"),
// //         longitude: "2.3522",
// //         latitude: "48.8566",
// //         userId: john.id,
// //         groupId: johnsGroup.id,
// //       },
// //     ],
// //   });
// //   //Récupérer les chauffeurs
// //   const [johnDriver] = await prisma.driver.findMany();
// //   await prisma.driverPassenger.create({
// //     data: {
// //       driverId: johnDriver.id,
// //       userId: jane.id,
// //     },
// //   });

// //   //Création des hôtes
// //   const hosts = await prisma.host.createMany({
// //     data: [
// //       {
// //         quantity: 2,
// //         city: "Los Angeles",
// //         adress: "456 Hollywood Blvd",
// //         zipcode: "90028",
// //         startingdate: new Date("2024-08-10"),
// //         endingdate: new Date("2024-08-12"),
// //         longitude: "-118.2437",
// //         latitude: "34.0522",
// //         userId: jane.id,
// //         groupId: janesGroup.id,
// //       },
// //     ],
// //   });

// //   const [janeHost] = await prisma.host.findMany();
// //   // Création des relations HostedUser
// //   await prisma.hostedUser.create({
// //     data: {
// //       hostId: janeHost.id,
// //       userId: john.id,
// //     },
// //   });

// //   await prisma.$disconnect();
// //   console.log("reset has finish with db");
// // }

// // main().catch((e) => {
// //   console.error(e);
// //   process.exit(1);
// // });
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";
// import {
//   categories,
//   driverPassengers,
//   drivers,
//   events,
//   groups,
//   hostedUsers,
//   hosts,
//   roles,
//   users,
// } from "../__tests__/__mocks__/mockData";

// const prisma = new PrismaClient();

// // const roles = [
// //   { id: 1, name: "User" },
// //   { id: 2, name: "Admin" },
// // ];

// // const users = [
// //   {
// //     id: 1,
// //     fullname: "John Doe",
// //     email: "john.doe@example.com",
// //     password: "Secret123#",
// //     avatar: "john_avatar.png",
// //     firstName: "John",
// //     lastName: "Doe",
// //     roleId: 2, // Admin
// //   },
// //   {
// //     id: 2,
// //     fullname: "Jane Smith",
// //     email: "jane.smith@example.com",
// //     password: "Secret123#",
// //     avatar: "jane_avatar.png",
// //     firstName: "Jane",
// //     lastName: "Smith",
// //     roleId: 1, // User
// //   },
// // ];

// // const categories = [
// //   { id: 1, name: "Music" },
// //   { id: 2, name: "Film" },
// //   { id: 3, name: "Food" },
// // ];

// // const events = [
// //   {
// //     id: 1,
// //     name: "Music Festival",
// //     startingDate: new Date("2024-07-01"),
// //     endingDate: new Date("2024-07-02"),
// //     latitude: "48.8566",
// //     longitude: "2.3522",
// //     image: "music_festival.jpg",
// //     city: "Paris",
// //     address: "Champs-Elysées",
// //     description: "A great music festival in Paris.",
// //     zipCode: "75008",
// //     validatedAt: new Date("2024-07-02"),
// //     price: 50,
// //     categoryId: 1, // Music
// //   },
// //   {
// //     id: 2,
// //     name: "Film Festival",
// //     startingDate: new Date("2024-08-10"),
// //     endingDate: new Date("2024-08-12"),
// //     latitude: "34.0522",
// //     longitude: "-118.2437",
// //     image: "film_festival.jpg",
// //     city: "Los Angeles",
// //     address: "Hollywood Blvd",
// //     description: "A renowned film festival in LA.",
// //     zipCode: "90028",
// //     validatedAt: new Date("2024-07-02"),
// //     price: 75,
// //     categoryId: 2, // Film
// //   },
// // ];

// // const groups = [
// //   { id: 1, userId: 1, eventId: 1 }, // John's group for Music Festival
// //   { id: 2, userId: 2, eventId: 2 }, // Jane's group for Film Festival
// // ];

// // const drivers = [
// //   {
// //     id: 1,
// //     quantity: 4,
// //     city: "Paris",
// //     adress: "123 Rue de la Paix",
// //     zipcode: "75002",
// //     startingdate: new Date("2024-07-01"),
// //     endingdate: new Date("2024-07-02"),
// //     longitude: "2.3522",
// //     latitude: "48.8566",
// //     userId: 1, // John
// //     groupId: 1, // John's group
// //   },
// // ];

// // const hosts = [
// //   {
// //     id: 1,
// //     quantity: 2,
// //     city: "Los Angeles",
// //     adress: "456 Hollywood Blvd",
// //     zipcode: "90028",
// //     startingdate: new Date("2024-08-10"),
// //     endingdate: new Date("2024-08-12"),
// //     longitude: "-118.2437",
// //     latitude: "34.0522",
// //     userId: 2, // Jane
// //     groupId: 2, // Jane's group
// //   },
// // ];

// // const driverPassengers = [
// //   { driverId: 1, userId: 2 }, // Jane as a passenger with John as a driver
// // ];

// // const hostedUsers = [
// //   { hostId: 1, userId: 1 }, // John hosted by Jane
// // ];

// async function clearDb() {
//   console.log("remove db entities");
//   await prisma.userGroup.deleteMany({});
//   await prisma.group.deleteMany({});
//   await prisma.event.deleteMany({});
//   await prisma.category.deleteMany({});
//   await prisma.user.deleteMany({});
//   await prisma.driverPassenger.deleteMany({});
//   await prisma.role.deleteMany({});
//   await prisma.hostedUser.deleteMany({});
//   await prisma.host.deleteMany({});
//   await prisma.driver.deleteMany({});

//   // Réinitialiser les séquences (PostgreSQL)
//   await prisma.$executeRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`;
//   await prisma.$executeRaw`ALTER SEQUENCE "Group_id_seq" RESTART WITH 1`;
//   await prisma.$executeRaw`ALTER SEQUENCE "Event_id_seq" RESTART WITH 1`;
//   await prisma.$executeRaw`ALTER SEQUENCE "Category_id_seq" RESTART WITH 1`;
//   await prisma.$executeRaw`ALTER SEQUENCE "Role_id_seq" RESTART WITH 1`;
//   await prisma.$executeRaw`ALTER SEQUENCE "Host_id_seq" RESTART WITH 1`;
//   await prisma.$executeRaw`ALTER SEQUENCE "Driver_id_seq" RESTART WITH 1`;
// }

// export async function main() {
//   await clearDb();

//   // Création des rôles
//   for (const role of roles) {
//     await prisma.role.create({
//       data: role,
//     });
//   }

//   // Création des utilisateurs avec mot de passe hashé
//   for (const user of users) {
//     const hashedPassword = await bcrypt.hash(user.password, 10);
//     await prisma.user.create({
//       data: { ...user, password: hashedPassword },
//     });
//   }

//   // Création des catégories
//   for (const category of categories) {
//     await prisma.category.create({
//       data: category,
//     });
//   }

//   // Création des événements
//   for (const event of events) {
//     await prisma.event.create({
//       data: event,
//     });
//   }

//   // Création des groupes
//   for (const group of groups) {
//     await prisma.group.create({
//       data: group,
//     });
//   }

//   // Création des chauffeurs
//   for (const driver of drivers) {
//     await prisma.driver.create({
//       data: driver,
//     });
//   }

//   // Création des hôtes
//   for (const host of hosts) {
//     await prisma.host.create({
//       data: host,
//     });
//   }

//   // Création des relations DriverPassenger
//   for (const driverPassenger of driverPassengers) {
//     await prisma.driverPassenger.create({
//       data: driverPassenger,
//     });
//   }

//   // Création des relations HostedUser
//   for (const hostedUser of hostedUsers) {
//     await prisma.hostedUser.create({
//       data: hostedUser,
//     });
//   }

//   await prisma.$disconnect();
//   console.log("reset has finished with db");
// }

// // main().catch((e) => {
// //   console.error(e);
// //   process.exit(1);
// // });

async function clearDb() {
  console.log("remove db entities");
  await prisma.driverPassenger.deleteMany({});
  await prisma.userGroup.deleteMany({});
  await prisma.group.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.role.deleteMany({});
  await prisma.host.deleteMany({});
  await prisma.driver.deleteMany({});

  // Réinitialiser les séquences (PostgreSQL)
  await prisma.$executeRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE "Group_id_seq" RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE "Event_id_seq" RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE "Category_id_seq" RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE "Role_id_seq" RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE "Host_id_seq" RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE "Driver_id_seq" RESTART WITH 1`;
  async function truncate() {
    for (const tableName of ["Role", "Event", "Category"])
      await prisma.$queryRawUnsafe(
        `Truncate "${tableName}" restart identity cascade;`
      );
  }
}

export async function main() {
  await clearDb();

  console.log("Database cleared and sequences reset");

  // Création des rôles

  const userRole = await prisma.role.create({
    data: { name: "User" },
  });
  const adminRole = await prisma.role.create({
    data: { name: "Admin" },
  });
  console.log("Roles created");

  // Création des utilisateurs
  const hashedPassword = await bcrypt.hash("Secret123#", 10);

  const users = await prisma.user.createMany({
    data: [
      {
        ...userMocks[0],
        // fullname: "John Doe",
        // email: "john.doe@example.com",
        // avatar: "john_avatar.png",
        // firstName: "John",
        // lastName: "Doe",
        password: hashedPassword,
        roleId: adminRole.id,
        createdAt: new Date(),
      },
      {
        ...userMocks[1],
        // fullname: "Jane Smith",
        // email: "jane.smith@example.com",
        // avatar: "jane_avatar.png",
        // firstName: "Jane",
        // lastName: "Smith",
        password: hashedPassword,
        roleId: userRole.id,
        createdAt: new Date(),
      },
    ],
    skipDuplicates: true,
  });
  console.log("Users created");

  // Récupérer les utilisateurs créés
  const john = await prisma.user.findUnique({
    where: { email: "john.doe@example.com" },
  });
  const jane = await prisma.user.findUnique({
    where: { email: "jane.smith@example.com" },
  });

  // Création des catégories
  const categories = await prisma.category.createMany({
    data: [{ name: "Music" }, { name: "Film" }, { name: "Food" }],
  });
  console.log("Categories created");

  // Récupérer les catégories créées
  const [musicCategory, filmCategory] = await prisma.category.findMany();
  // Création des événements

  const events = await prisma.event.createMany({
    data: [
      {
        ...eventMocks[0],
        // id: 1,
        // name: eventMocks[0].name,
        // startingDate: eventMocks[0].startingDate,
        // endingDate: eventMocks[0].endingDate,
        // latitude: "48.8566",
        // longitude: "2.3522",
        // image: "music_festival.jpg",
        // city: eventMocks[0].city,
        // address: "Champs-Elysées",
        // description: "A great music festival in Paris.",
        // zipCode: "75008",
        // validatedAt: eventMocks[0].validatedAt,
        // price: 50,
        //categoryId: musicCategory.id,
      },
      {
        // id: 2,
        // name: "Film Festival",
        // startingDate: new Date("2024-08-10"),
        // endingDate: new Date("2024-08-12"),
        // latitude: "34.0522",
        // longitude: "-118.2437",
        // image: "film_festival.jpg",
        // city: "Los Angeles",
        // address: "Hollywood Blvd",
        // description: "A renowned film festival in LA.",
        // zipCode: "90028",
        // validatedAt: new Date("2024-07-02"),
        // price: 75,
        ...eventMocks[1],
        //categoryId: filmCategory.id,
      },
    ],
    skipDuplicates: true,
  });
  console.log("Events created");

  // Récupérer les événements créés
  const [musicFestival, filmFestival] = await prisma.event.findMany();

  // Création des groupes
  const groups = await prisma.group.createMany({
    data: [
      {
        userId: john!.id,
        eventId: musicFestival.id,
      },
      {
        userId: jane!.id,
        eventId: filmFestival.id,
      },
    ],
  });
  console.log("Groups created");

  // Récupérer les groupes créés
  const johnsGroup = await prisma.group.findFirst({
    where: {
      userId: john!.id,
    },
  });
  const janesGroup = await prisma.group.findFirst({
    where: {
      userId: jane!.id,
    },
  });

  // Création des chauffeurs
  const drivers = await prisma.driver.createMany({
    data: [
      {
        quantity: 4,
        city: "Paris",
        adress: "123 Rue de la Paix",
        zipcode: "75002",
        startingdate: new Date("2024-07-01"),
        endingdate: new Date("2024-07-02"),
        longitude: "2.3522",
        latitude: "48.8566",
        userId: john!.id,
        groupId: johnsGroup!.id,
      },
    ],
  });
  console.log("Drivers created");

  // Récupérer les chauffeurs
  const johnDriver = await prisma.driver.findFirst({
    where: { userId: john!.id },
  });
  // await prisma.driverPassenger.create({
  //   data: {
  //     driverId: johnDriver!.id,
  //     userId: jane!.id,
  //   },
  // });

  await prisma.driverPassenger.upsert({
    where: { driverId_userId: { driverId: johnDriver!.id, userId: jane!.id } },
    update: { driverId: johnDriver!.id, userId: jane!.id },
    create: { driverId: johnDriver!.id, userId: jane!.id },
  });

  // Création des hôtes
  const hosts = await prisma.host.createMany({
    data: [
      {
        quantity: 2,
        city: "Los Angeles",
        adress: "456 Hollywood Blvd",
        zipcode: "90028",
        startingdate: new Date("2024-08-10"),
        endingdate: new Date("2024-08-12"),
        longitude: "-118.2437",
        latitude: "34.0522",
        userId: jane!.id,
        groupId: janesGroup!.id,
      },
    ],
  });
  console.log("Hosts created");

  const janeHost = await prisma.host.findFirst({
    where: { userId: jane!.id },
  });
  // Création des relations HostedUser
  // await prisma.hostedUser.create({
  //   data: {
  //     hostId: janeHost!.id,
  //     userId: john!.id,
  //   },
  // });
  await prisma.hostedUser.upsert({
    where: {
      hostId_userId: {
        // Assurez-vous que ce nom de champ composite correspond à votre schéma
        hostId: janeHost!.id,
        userId: john!.id,
      },
    },
    update: {
      hostId: janeHost!.id,
      userId: john!.id,
    },
    create: {
      hostId: janeHost!.id,
      userId: john!.id,
    },
  });

  await prisma.driverPassenger.upsert({
    where: { driverId_userId: { driverId: johnDriver!.id, userId: jane!.id } },
    update: { driverId: johnDriver!.id, userId: jane!.id },
    create: { driverId: johnDriver!.id, userId: jane!.id },
  });
  await prisma.$disconnect();
  console.log("reset has finished with db");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
