import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Accordion, AccordionItem } from "@nextui-org/react";
import Link from "next/link";
import Button from "../buttons/Button";
import { useTheme } from "next-themes";
import { UserCard } from "./UserCard";
import { PlacesCard } from "./PlacesCard";
import { ServiceCard } from "./ServiceCard";

// Définir les types pour les données
interface User {
  id: number;
  fullname: string;
  avatar: string;
  // Ajouter d'autres propriétés si nécessaire
}

interface Member {
  userId: number;
  groupId: number;
  user: User;
}

interface Group {
  id: number;
  userId: number;
  eventId: number;
  members: Member[];
  drivers: Driver[];
  hosts: Host[];
  creator: User;
  event: Event;
}

interface Event {
  id: number;
  name: string;
  startingDate: string;
  endingDate: string;
  latitude: string;
  longitude: string;
  image: string;
  city: string;
  address: string;
  validatedAt: string | null;
  cancelledAt: string | null;
  description: string;
  zipCode: string;
  price: number;
  categoryId: number;
  url: string;
}

interface Driver {
  id: number;
  quantity: number;
  city: string;
  adress: string;
  zipcode: string;
  startingdate: string;
  endingdate: string;
  longitude: string;
  latitude: string;
  userId: number;
  groupId: number;
}

interface Host {
    id: number;
  quantity: number;
  city: string;
  adress: string;
  zipcode: string;
  startingdate: string;
  endingdate: string;
  longitude: string;
  latitude: string;
  userId: number;
  groupId: number;
}

export interface EventGroupCardProps {
  eventId: number;
}

export default function EventGroupCard({ eventId }: EventGroupCardProps): JSX.Element {
  const { theme } = useTheme();
  const [users, setUsers] = useState<User[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [hosts, setHosts] = useState<Host[]>([]);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const eventResponse = await fetch(`/api/event/${eventId}`);
        const eventData = await eventResponse.json();
        const groupId = eventData.data.groups[0].id;

        const groupResponse = await fetch(`/api/group/${groupId}`);
        const groupData = await groupResponse.json();

        const group = groupData.data[0];
        setGroups([group]);
        setUsers(group.members.map((member: Member) => member.user));
        setDrivers(group.drivers);
        setHosts(group.hosts);
      } catch (error) {
        console.error("Error fetching event or group data:", error);
      }
    };

    fetchEventData();
  }, [eventId]);

  const filteredUsersCar = users.filter((user, index) => [1, 3, 4].includes(index));
  const filteredUsersCar2 = users.filter((user, index) => [2, 4].includes(index));
  const filteredUsersHouse = users.filter((user, index) => [2, 3, 5].includes(index));

  return (
    <section className="flex justify-center items-center">
      <Card className="rounded-none mx-4 md:mx-0 p-1 w-full md:w-8/12 dark:bg-gray-800">
        <CardHeader className="flex justify-center items-center">
          <Link href={"/about"}>
            <Button
              color={theme === "dark" ? "secondary" : "primary"}
              size="sm"
              className="mx-2 my-2 md:my-5 font-medium dark:text-secondaryText"
            >
              Rejoindre ce collectif
            </Button>
          </Link>
        </CardHeader>
        <CardBody>
          <Accordion selectionMode="multiple" defaultExpandedKeys={["1"]}>
            <AccordionItem
              title={
                <p className="text-sm">{users.length} utilisateur{users.length > 1 ? 's' : ''} dans ce collectif</p>
              }
              key="1"
            >
              <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-2 md:gap-3 p-1 dark:bg-gray-800">
                {users.map((user, index) => (
                  <UserCard key={index} avatar={user.avatar} fullname={user.fullname} />
                ))}
              </section>
            </AccordionItem>
            <AccordionItem
              title={
                <p className="text-sm">2 covoiturages disponibles dans ce collectif</p>
              }
              key="2"
            >
              <Accordion selectionMode="multiple">
                <AccordionItem
                  title={
                    <section className="w-full dark:bg-gray-800 grid grid-flow-col auto-cols-auto items-center gap-2 md:gap-3">
                      <UserCard chevron={true} avatar="../user-1.png" fullname="Jean-Michel Loremipsum" />
                      <PlacesCard reserved={2} available={5} />
                      <div className="flex flex-row justify-end mr-4">
                        <Button
                          color={theme === "dark" ? "secondary" : "primary"}
                          size="xs"
                          className="font-medium dark:text-secondaryText w-full md:w-1/2"
                        >
                          Rejoindre
                        </Button>
                      </div>
                    </section>
                  }
                  key="1"
                >
                  <ServiceCard 
                    isCovoiturage={true}
                    departureTime="12h00" 
                    departurePlace="Parking Carrefour Evreux"
                    arrivalTime="13h00"
                    arrivalPlace="CESI Saint-Etienne du Rouvray"
                    users={filteredUsersCar}
                  />
                </AccordionItem>
                <AccordionItem
                  title={
                    <section className="w-full dark:bg-gray-800 grid grid-flow-col auto-cols-auto items-center gap-2 md:gap-3">
                      <UserCard chevron={true} avatar="../user-3.png" fullname="John Smith" />
                      <PlacesCard reserved={3} available={5} />
                      <div className="flex flex-row justify-end mr-4">
                        <Button
                          color={theme === "dark" ? "secondary" : "primary"}
                          size="xs"
                          className="font-medium dark:text-secondaryText w-full md:w-1/2"
                        >
                          Rejoindre
                        </Button>
                      </div>
                    </section>
                  }
                  key="2"
                >
                  <ServiceCard 
                    isCovoiturage={true}
                    departureTime="12h00" 
                    departurePlace="Parking Carrefour Evreux"
                    arrivalTime="13h00"
                    arrivalPlace="CESI Saint-Etienne du Rouvray"
                    users={filteredUsersCar2}
                  />
                </AccordionItem>            
              </Accordion>
            </AccordionItem>
            <AccordionItem
              title={
                <p className="text-sm">1 hébergement disponible dans ce collectif</p>
              }
              key="3"
            >
              <Accordion selectionMode="multiple">
                <AccordionItem
                  title={
                    <section className="w-full dark:bg-gray-800 grid grid-flow-col auto-cols-auto items-center gap-2 md:gap-3">
                      <UserCard chevron={true} avatar="../user-2.png" fullname="John Doe" />
                      <PlacesCard reserved={1} available={4} />
                      <div className="flex flex-row justify-end mr-4">
                        <Button
                          color={theme === "dark" ? "secondary" : "primary"}
                          size="xs"
                          className="font-medium dark:text-secondaryText w-full md:w-1/2"
                        >
                          Rejoindre
                        </Button>
                      </div>
                    </section>
                  }
                  key="1"
                >
                  <ServiceCard 
                    isCovoiturage={false}
                    users={filteredUsersHouse}
                  />
                </AccordionItem>           
              </Accordion>
            </AccordionItem>
          </Accordion>
        </CardBody>
      </Card>
    </section>
  );
}
