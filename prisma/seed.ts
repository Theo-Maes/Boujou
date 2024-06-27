import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function clearDb() {
  await prisma.userGroup.deleteMany({});
  await prisma.group.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});
  //   await prisma.driverPassenger.deleteMany({});
  //   await prisma.hostedUser.deleteMany({});
  //   await prisma.host.deleteMany({});
  //   await prisma.driver.deleteMany({});

  //   await prisma.user.deleteMany({});
  //   await prisma.role.deleteMany({});

  // Réinitialiser les séquences (PostgreSQL)
  //   await prisma.$executeRaw`ALTER SEQUENCE "UserGroup_id_seq" RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE "Group_id_seq" RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE "Event_id_seq" RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE "Category_id_seq" RESTART WITH 1`;

  //   await prisma.$executeRaw`ALTER SEQUENCE "DriverPassenger_id_seq" RESTART WITH 1`;
  //   await prisma.$executeRaw`ALTER SEQUENCE "HostedUser_id_seq" RESTART WITH 1`;
  //   await prisma.$executeRaw`ALTER SEQUENCE "Host_id_seq" RESTART WITH 1`;
  //   await prisma.$executeRaw`ALTER SEQUENCE "Driver_id_seq" RESTART WITH 1`;

  await prisma.$executeRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`;
  //   await prisma.$executeRaw`ALTER SEQUENCE "Role_id_seq" RESTART WITH 1`;

  //   await prisma.$executeRaw`ALTER SEQUENCE "Event_id_seq" RESTART WITH 1`;
}
async function main() {
  await clearDb();
  // Création des rôles
  const adminRole = await prisma.role.create({
    data: { name: "Admin" },
  });

  const userRole = await prisma.role.create({
    data: { name: "User" },
  });

  // Création des utilisateurs
  const users = await prisma.user.createMany({
    data: [
      {
        fullname: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
        avatar: "john_avatar.png",
        firstName: "John",
        lastName: "Doe",
        roleId: adminRole.id,
        createdAt: new Date(),
      },
      {
        fullname: "Jane Smith",
        email: "jane.smith@example.com",
        password: "password123",
        avatar: "jane_avatar.png",
        firstName: "Jane",
        lastName: "Smith",
        roleId: userRole.id,
        createdAt: new Date(),
      },
    ],
  });

  // Récupérer les utilisateurs créés
  const [john, jane] = await prisma.user.findMany();

  // Création des catégories
  const categories = await prisma.category.createMany({
    data: [{ name: "Music" }, { name: "Film" }, { name: "Food" }],
  });

  // Récupérer les catégories créées
  const [musicCategory, filmCategory, foodCategory] =
    await prisma.category.findMany();

  // Création des événements
  const events = await prisma.event.createMany({
    data: [
      {
        name: "Music Festival",
        startingDate: new Date("2024-07-01"),
        endingDate: new Date("2024-07-02"),
        latitude: "48.8566",
        longitude: "2.3522",
        image: "music_festival.jpg",
        city: "Paris",
        address: "Champs-Elysées",
        description: "A great music festival in Paris.",
        zipCode: "75008",
        price: 50,
        categoryId: musicCategory.id,
      },
      {
        name: "Film Festival",
        startingDate: new Date("2024-08-10"),
        endingDate: new Date("2024-08-12"),
        latitude: "34.0522",
        longitude: "-118.2437",
        image: "film_festival.jpg",
        city: "Los Angeles",
        address: "Hollywood Blvd",
        description: "A renowned film festival in LA.",
        zipCode: "90028",
        price: 75,
        categoryId: filmCategory.id,
      },
    ],
  });

  // Récupérer les événements créés
  const [musicFestival, filmFestival] = await prisma.event.findMany();

  // Création des groupes
  const groups = await prisma.group.createMany({
    data: [
      {
        userId: john.id,
        eventId: musicFestival.id,
      },
      {
        userId: jane.id,
        eventId: filmFestival.id,
      },
    ],
  });

  // Récupérer les groupes créés
  //   const [johnsGroup, janesGroup] = await prisma.group.findMany();

  // Création des chauffeurs
  //   const drivers = await prisma.driver.createMany({
  //     data: [
  //       {
  //         quantity: 4,
  //         city: 'Paris',
  //         adress: '123 Rue de la Paix',
  //         zipcode: '75002',
  //         startingdate: new Date('2024-07-01'),
  //         endingdate: new Date('2024-07-02'),
  //         longitude: '2.3522',
  //         latitude: '48.8566',
  //         userId: john.id,
  //         groupId: johnsGroup.id,
  //       },
  //     ],
  //   });

  // Création des hôtes
  //   const hosts = await prisma.host.createMany({
  //     data: [
  //       {
  //         quantity: 2,
  //         city: 'Los Angeles',
  //         adress: '456 Hollywood Blvd',
  //         zipcode: '90028',
  //         startingdate: new Date('2024-08-10'),
  //         endingdate: new Date('2024-08-12'),
  //         longitude: '-118.2437',
  //         latitude: '34.0522',
  //         userId: jane.id,
  //         groupId: janesGroup.id,
  //       },
  //     ],
  //   });

  // Création des relations DriverPassenger
  //   await prisma.driverPassenger.create({
  //     data: {
  //       driverId: john.id,
  //       userId: jane.id,
  //     },
  //   });

  // Création des relations HostedUser
  //   await prisma.hostedUser.create({
  //     data: {
  //       hostId: jane.id,
  //       userId: john.id,
  //     },
  //   });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
