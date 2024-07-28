const roles = [
  { id: 1, name: "User" },
  { id: 2, name: "Admin" },
];

const users = [
  {
    // id: 1,
    fullname: "John Doe",
    email: "john.doe@example.com",
    password: "Secret123#",

    firstName: "John",
    lastName: "Doe",
    roleId: 2, // Admin
    adress: "rue de gessard",
    city: "Parissss",
    zipcode: "75008",
    avatar: "/avatar/defaultAvatar.webp",
  },
  {
    // id: 2,
    fullname: "Jane Smith",
    email: "jane.smith@example.com",
    password: "Secret123#",
    firstName: "Jane",
    lastName: "Smith",
    roleId: 1, // User
    adress: "rue de gessard",
    city: "Parissss",
    zipcode: "75008",
    avatar: "/avatar/defaultAvatar.webp",
  },
];

const categories = [
  { id: 1, name: "Music" },
  { id: 2, name: "Film" },
  { id: 3, name: "Food" },
];

const events = [
  {
    id: 1,
    name: "Music Festival",
    cancelledAt: null,
    startingDate: "2024-07-01T00:00:00.000Z",
    endingDate: "2024-07-01T00:00:00.000Z",
    latitude: "48.8566",
    longitude: "2.3522",
    image: "/event/beauregard.png",
    city: "Parissss",
    address: "Champs-Elysées",
    description: "A great music festival in Paris.",
    zipCode: "75008",
    validatedAt: "2024-07-01T00:00:00.000Z",
    price: 50,
    categoryId: 1, // Music
  },
  {
    id: 2,
    name: "Film Festival",
    cancelledAt: null,
    startingDate: "2024-07-01T00:00:00.000Z",
    endingDate: "2024-07-01T00:00:00.000Z",
    latitude: "34.0522",
    longitude: "-118.2437",
    image: "/event/rush.jpg",
    city: "Los Angeles",
    address: "Hollywood Blvd",
    description: "A renowned film festival in LA.",
    zipCode: "90028",
    validatedAt: "2024-07-01T00:00:00.000Z",
    price: 75,
    categoryId: 2, // Film
  },
  {
    id: 3,
    name: "Beauregard Festival",
    cancelledAt: null,
    startingDate: "2024-07-01T00:00:00.000Z",
    endingDate: "2024-07-01T00:00:00.000Z",
    latitude: "34.0522",
    longitude: "-118.2437",
    image: "/event/rush.jpg",
    city: "Hérouville-Saint-Clair",
    address: "Domaine de Beauregard",
    description:
      "Créé en 2009, festival de musique se déroulant dans le parc du château",
    zipCode: "14200",
    validatedAt: "2024-07-01T00:00:00.000Z",
    price: 75,
    categoryId: 1, // Film
  },
];
const updateEvent = {
  id: 1,
  name: "Festival Rush",
  cancelledAt: null,
  startingDate: "2024-07-01T00:00:00.000Z",
  endingDate: "2024-07-01T00:00:00.000Z",
  latitude: "48.8566",
  longitude: "2.3522",
  city: "Louviers",
  address: "leclerc",
  description: "A great music festival in Rouen.",
  zipCode: "27000",
  validatedAt: "2024-07-01T00:00:00.000Z",
  price: 50,
  categoryId: 1, // Music
  url: "http://www.hello.com",
};

const groups = [
  { id: 1, userId: 1, eventId: 1 }, // John's group for Music Festival
  { id: 2, userId: 2, eventId: 2 }, // Jane's group for Film Festival
];

const drivers = [
  {
    id: 1,
    quantity: 4,
    city: "Paris",
    adress: "123 Rue de la Paix",
    zipcode: "75002",
    startingdate: "2024-07-01T00:00:00.000Z",
    endingdate: "2024-07-01T00:00:00.000Z",
    longitude: "2.3522",
    latitude: "48.8566",
    userId: 1, // John
    groupId: 1, // John's group
  },
];

const hosts = [
  {
    id: 1,
    quantity: 2,
    city: "Los Angeles",
    adress: "456 Hollywood Blvd",
    zipcode: "90028",
    startingdate: "2024-07-01T00:00:00.000Z",
    endingdate: "2024-07-01T00:00:00.000Z",
    longitude: "-118.2437",
    latitude: "34.0522",
    userId: 2, // Jane
    groupId: 1, // Jane's group
  },
];

const driverPassengers = [
  { driverId: 1, userId: 2 }, // Jane as a passenger with John as a driver
];

const hostedUsers = [
  { hostId: 1, userId: 1 }, // John hosted by Jane
];

export {
  roles,
  users,
  categories,
  events,
  groups,
  drivers,
  hosts,
  driverPassengers,
  hostedUsers,
  updateEvent,
};
