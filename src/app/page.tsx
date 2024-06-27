"use client";

import React, { useState, useEffect } from "react";
import { Metadata } from "next";
import { Roboto } from "next/font/google";
import { twMerge } from "tailwind-merge";
import SearchInput from "@/components/inputs/SearchInput";
import CardEvent, {
  InformationsEventProps,
} from "@/components/cards/EventCard";
import { Pagination, Select, SelectItem } from "@nextui-org/react";
import ButtonModal from "@/components/forms/ButtonModal";
import EventForm from "@/components/forms/EventForm";
import { useSession } from "next-auth/react";
import { Event, Group } from "@prisma/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useTheme } from "next-themes";
import Link from "next/link";
import { EventWithRelations } from "@/libs/types";
import Loading from "./loading";

// export const metadata: Metadata = {
//   title: "Boujou",
// };

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const sortOptions = [
  { key: "startingDate", label: "Date" },
  { key: "title", label: "Evénement" },
  { key: "city", label: "Ville" },
  { key: "zipCode", label: "Code Postal" },
];

const fetchEvents = async (): Promise<InformationsEventProps[]> => {
  const response = await fetch("/api/event");
  const data = await response.json();
  return data.data.map((event: EventWithRelations) => ({
    id: event.id,
    title: event.name,
    image: event.image,
    description: event.description,
    startingDate: new Date(event.startingDate),
    endingDate: new Date(event.endingDate),
    numberOfGroups: event.groups.length,
    numberOfPeople: event.groups.reduce(
      (acc: number, group) => acc + group.members.length,
      0
    ),
    city: event.city,
    validatedAt: event.validatedAt ? new Date(event.validatedAt) : null,
    zipCode: event.zipCode,
  }));
};

export default function Home() {
  const { data: session } = useSession();
  const eventsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [events, setEvents] = useState<InformationsEventProps[]>([]);
  const [selectedSortOption, setSelectedSortOption] = useState(
    sortOptions[0].key
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { theme } = useTheme();

  useEffect(() => {
    const getEvents = async () => {
      const eventsData = await fetchEvents();
      setEvents(eventsData);
    };
    getEvents();
  }, []);

  useEffect(() => {
    setEvents((prevEvents) => sortEvents(prevEvents, selectedSortOption));
  }, [selectedSortOption]);

  const sortEvents = (events: InformationsEventProps[], sort: string) => {
    return events.slice().sort((a, b) => {
      switch (sort) {
        case "startingDate":
          return a.startingDate.getTime() - b.startingDate.getTime();
        case "title":
          return a.title.localeCompare(b.title);
        case "city":
          return a.city.localeCompare(b.city);
        case "zipCode":
          return a.zipCode.localeCompare(b.zipCode);
        default:
          return 0;
      }
    });
  };

  const sortedEvents = sortEvents(events, selectedSortOption);

  const filteredEvents = sortedEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      format(event.startingDate, "MM", { locale: fr }).includes(searchTerm) ||
      format(event.startingDate, "MMMM", { locale: fr })
        .toLowerCase()
        .includes(searchTerm)
  );

  const totalPages = Math.ceil(
    filteredEvents.length ? filteredEvents.length / eventsPerPage : 1
  );

  const startIndex = (currentPage - 1) * eventsPerPage;
  const currentEvents = filteredEvents.slice(
    startIndex,
    startIndex + eventsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (option: string) => {
    setSelectedSortOption(option);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  if (events.length === 0) {
    return <Loading />;
  }

  return (
    <main className="flex flex-col">
      <section id="top" className="pl-0 md:px-9">
        <div className="flex flex-col items-center px-4 pb-16 md:py-20">
          <h1
            className={twMerge(
              "hidden text-black dark:text-white relative z-20 !p-0 !m-0",
              roboto.className
            )}
          >
            Boujou Normandie
          </h1>
          {session && session.user ? (
            <div className="flex md:hidden flex-1 justify-center mt-5">
              <ButtonModal title="Proposer un événement">
                <EventForm userId={session.user.id} />
              </ButtonModal>
            </div>
          ) : (
            <></>
          )}
          <div className="w-full md:w-2/5 mt-5">
            <SearchInput
              placeholder="Rechercher un événement"
              onChange={handleSearchChange}
            />
          </div>
          <div className="w-full md:mr-4 mt-5 flex justify-end">
            <Select
              label="Trier par"
              placeholder="Date"
              color={theme === "dark" ? "secondary" : "primary"}
              defaultSelectedKeys="startingDate"
              onChange={(e) => handleSortChange(e.target.value)}
              className="max-w-[30%] md:max-w-[10%] dark:bg-transparent"
            >
              <SelectItem key="startingDate" value="startingDate">
                Date
              </SelectItem>
              <SelectItem key="title" value="title">
                Evénement
              </SelectItem>
              <SelectItem key="city" value="city">
                Ville
              </SelectItem>
              <SelectItem key="zipCode" value="zipCode">
                Code Postal
              </SelectItem>
            </Select>
          </div>
          <section className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentEvents.map((event) => (
              <Link key={event.id} href={`/event/${event.id}`}>
                <CardEvent key={event.id} {...event} />
              </Link>
            ))}
          </section>
          <div className="mt-8">
            <Pagination
              total={totalPages}
              initialPage={1}
              onChange={handlePageChange}
              classNames={{
                cursor: "bg-primary dark:bg-secondary dark:text-black",
                item:
                  events.length > 0
                    ? "bg-secondary dark:bg-primary"
                    : "bg-gray-200 dark:bg-gray-700",
                prev: "text- font-bold",
                next: "text-secondary",
              }}
              showControls
            />
          </div>
        </div>
      </section>
    </main>
  );
}
