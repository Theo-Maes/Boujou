"use client";

import Image from "next/image";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { useTheme } from "next-themes";
import { InformationsEventCard } from "../cards/InformationsEventCard";
import { useEffect, useState } from "react";
import EventGroupCard from "../cards/EventGroupCard";
import ButtonModal from "../forms/utils/Modal";
import ServiceForm from "../forms/ServiceForm";
import { useSession } from "next-auth/react";
import { Group, Host, User, UserGroup } from "@prisma/client";

export interface Event {
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
  categoryId: number;
  category: string;
  groups: {
    drivers: {
      quantity: number;
      user: User;
    }[];
    hosts: Host[];
    members: UserGroup[];
  }[];
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

export default function EventPage({ event }: { event: Event }): JSX.Element {
  const { data: session } = useSession();
  const { theme } = useTheme();
  const [collectifCount, setCollectifCount] = useState<number>(
    event.groups.length ?? 0
  );
  const eventDate = generateMessage(event.startingDate, event.endingDate);
  const eventDateWithHour = generateMessageWithHour(
    event.startingDate,
    event.endingDate
  );

  // useEffect(() => {
  //   const fetchEventData = async () => {
  //     try {
  //       const eventResponse = await fetch(`/api/event/${event.id}`);
  //       const eventData = await eventResponse.json();
  //       console.log(eventData);
  //     } catch (error) {
  //       console.error("Error fetching event or group data:", error);
  //     }
  //   };

  //   fetchEventData();
  // }, [event]);

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
                  {event.category}
                </p>
              </CardHeader>
              <CardBody className="flex flex-col items-center justify-center">
                <p className="uppercase font-extrabold text-2xl text-center mb-2 md:mb-3">
                  {event.name}
                </p>
                <p className="mt-2 md:mt-3">{eventDate}</p>
              </CardBody>
              <CardFooter className="flex flex-row justify-center">
                {session && session.user ? (
                  <div className="hidden md:flex flex-1 justify-center">
                    <ButtonModal title="Créer votre collectif" isBlue={true}>
                      <ServiceForm
                        userId={session.user.id}
                        eventId={event.id}
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
              {collectifCount > 0 ? (
                <Card className="rounded-none mb-2 bg-secondaryLight dark:bg-gray-800">
                  <CardBody className="mx-2 flex flex-row items-baseline">
                    <p className="text-xl text-tertiary">
                      {collectifCount}{" "}
                      {collectifCount > 1 ? "collectifs" : "collectif"}
                    </p>
                    <p className="ml-1">
                      {collectifCount > 1 ? "participent" : "participe"} à cet
                      événement
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
        {/* {collectifCount > 0 ? <EventGroupCard eventId={event.id} /> : <></>} */}
      </section>
    </main>
  );
}
