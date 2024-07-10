"use client";

import Image from "next/image";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { useTheme } from "next-themes";
import { InformationsEventCard } from "../cards/InformationsEventCard";
import EventGroupCard from "../cards/EventGroupCard";
import ButtonModal from "../forms/utils/Modal";
import ServiceForm from "../forms/ServiceForm";
import { useSession } from "next-auth/react";
import { Category, Event, Group, User } from "@prisma/client";
import { useEffect, useState } from "react";

export interface EventData {
  id: number;
  name: string;
  description: string;
  startingDate: number;
  endingDate?: number;
  address: string;
  city: string;
  zipCode: string;
  cancelledAt: Date | null;
  price: number;
  image: string;
  url: string;
  category: Category;
  validatedAt: Date | null;
  groups: {
    id: number;
    userId: number;
    event: Event;
    drivers: {
      id: number;
      startingdate: number;
      endingdate: number;
      adress: string;
      zipcode: string;
      city: string;
      quantity: number;
      user: User;
      passengers: {
        user: User;
      }[];
    }[];
    hosts: {
      id: number;
      address: string;
      zipcode: string;
      city: string;
      startingdate: number;
      endingdate: number;
      quantity: number;
      user: User;
      hostedUsers: {
        user: User;
      }[];
    }[];
    members: {
      user: User;
    }[];
  }[];
}

export interface GroupData {
  id: number;
  userId: number;
  event: Event;
  drivers: DriverData[];
  hosts: HostData[];
  members: MemberData[];
}

export interface DriverData {
  id: number;
  startingdate: number;
  endingdate: number;
  adress: string;
  zipcode: string;
  city: string;
  quantity: number;
  user: User;
  passengers: PassengerData[];
}

export interface HostData {
  id: number;
  address: string;
  zipcode: string;
  city: string;
  startingdate: number;
  endingdate: number;
  quantity: number;
  user: User;
  hostedUsers: HostedUserData[];
}

export interface MemberData {
  user: User;
}

export interface PassengerData {
  user: User;
}

export interface HostedUserData {
  user: User;
}

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("fr-FR", options);
};

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
  };
  return date.toLocaleTimeString("fr-FR", options);
};

const generateMessage = (
  startingDate: number,
  endingDate: number | undefined
) => {
  const startDateFormatted = formatDate(startingDate);

  if (!endingDate) {
    return `Le ${startDateFormatted}`;
  } else {
    const endDateFormatted = formatDate(endingDate);
    return `Du ${startDateFormatted} au ${endDateFormatted}`;
  }
};

const generateMessageWithHour = (
  startingDate: number,
  endingDate: number | undefined
) => {
  const startDateFormatted = formatDate(startingDate);
  const startTimeFormatted = formatTime(startingDate);

  if (!endingDate) {
    return `Le ${startDateFormatted} à ${startTimeFormatted}`;
  } else {
    const endDateFormatted = formatDate(endingDate);
    const endTimeFormatted = formatTime(endingDate);
    return (
      `Du ${startDateFormatted} à ${startTimeFormatted}\n` +
      `au ${endDateFormatted} à ${endTimeFormatted}`
    );
  }
};

export default function EventPage({
  event,
}: {
  event: EventData;
}): JSX.Element {
  const { data: session } = useSession();
  const { theme } = useTheme();
  const [groups, setGroups] = useState(event.groups);

  useEffect(() => {
    setGroups(event.groups);
  }, [event.groups]);

  const eventDate = generateMessage(event.startingDate, event.endingDate);

  const eventDateWithHour = generateMessageWithHour(
    event.startingDate,
    event.endingDate
  );

  const isUserEverGroupCreator = (userId: number) => {
    return event.groups.some((group) =>
      group.userId === userId 
    );
  };

  const handleGroupCreation = (newGroup: GroupData) => {
    setGroups((prevGroups) => [...prevGroups, newGroup]);
  };

  const reloadEventPage = () => {
    window.location.reload();
  };

  return (
    <main className="flex flex-col">
      <section id="about" className="flex flex-col">
        <article className="w-full flex flex-col px-4 md:pr-0 md:px-10 py-6 md:py-10">
          <div className="relative flex flex-col md:flex-row items-center">
            <div className="relative w-full md:w-6/12 z-10">
              <div className="absolute rounded-none top-2 left-2 md:top-5 md:left-5 w-full h-full bg-secondary z-0"></div>
              <Image
                alt="Event image"
                className="relative w-full z-10 !rounded-none"
                src={`${event.image}`}
                width={1200}
                height={800}
              />
            </div>
            <Card className="relative md:right-10 flex flex-col ml-0 md:ml-auto mt-6 md:mt-0 rounded-none w-full md:w-6/12 md:h-1/2 z-20 bg-white dark:bg-gray-800">
              <CardHeader className="flex flex-row justify-center">
                <p className="uppercase text-primary dark:text-secondary font-medium my-2 md:my-5">
                  {event.category.name}
                </p>
              </CardHeader>
              <CardBody className="flex flex-col items-center justify-center">
                <p className="uppercase font-extrabold text-2xl text-center mb-2 md:mb-3">
                  {event.name}
                </p>
                <p className="mt-2 md:mt-3">{eventDate}</p>
              </CardBody>
              <CardFooter className="flex flex-row justify-center">
                {session && session.user && !isUserEverGroupCreator(session.user.id) ? (
                  <div className="hidden md:flex flex-1 justify-center">
                    <ButtonModal title="Créer votre collectif" isBlue={true}>
                      <ServiceForm
                        userId={session.user.id}
                        eventId={event.id}
                        onGroupCreation={handleGroupCreation}
                        successCallBack={reloadEventPage}
                      />
                    </ButtonModal>
                  </div>
                ) : (
                  <></>
                )}
              </CardFooter>
            </Card>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between items-center mt-6 md:mt-10">
            <div className="flex flex-col w-full md:w-5/12 lg:w-1/3">
              <InformationsEventCard
                iconName="location"
                primaryInformation={event.address}
                secondaryInformation={`${event.zipCode} ${event.city}`}
              />
              <InformationsEventCard
                iconName="calendar"
                primaryInformation={eventDateWithHour}
              />
              <InformationsEventCard
                iconName="euro"
                primaryInformation={
                  event.price === 0 ? "Gratuit" : `${event.price.toString()} €`
                }
              />
              {event.url ? (
                <InformationsEventCard
                  iconName="information"
                  primaryInformation={event.url}
                  piIsLink
                />
              ) : (
                <></>
              )}
              {groups.length > 0 ? (
                <Card className="rounded-none mb-2 bg-secondaryLight dark:bg-gray-800">
                  <CardBody className="mx-2 flex flex-row items-baseline">
                    <p className="text-xl text-[#A80000] dark:text-secondary">
                      {groups.length}{" "}
                      {groups.length > 1 ? "collectifs" : "collectif"}
                    </p>
                    <p className="ml-1">
                      {groups.length > 1 ? "participent" : "participe"} à
                      cet événement
                    </p>
                  </CardBody>
                </Card>
              ) : (
                <></>
              )}
            </div>
            <Card className="w-full md:w-7/12 lg:w-8/12 mt-2 md:mt-0 mx-2 md:mx-10 rounded-none bg-white dark:bg-gray-800 p-5">
              <CardBody className="leading-relaxed text-justify">
                {event.description}
              </CardBody>
            </Card>
          </div>
        </article>
        {groups.map((group, index) => (
          <EventGroupCard key={index} group={group} onGroupLeave={reloadEventPage} />
        ))}
      </section>
    </main>
  );
}
