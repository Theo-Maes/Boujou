'use client'

import React, { useState } from "react";
import { Metadata } from "next";
import { Roboto } from "next/font/google";
import { twMerge } from "tailwind-merge";
import SearchInput from "@/components/inputs/SearchInput";
import CardEvent, { InformationsEventProps } from "@/components/cards/EventCard";
import { Pagination } from "@nextui-org/react";
import ButtonModal from "@/components/forms/ButtonModal";
import EventForm from "@/components/forms/EventForm";
import { useSession } from "next-auth/react";

// export const metadata: Metadata = {
//   title: "Boujou",
// };

const generateCardEvents = (count: number): JSX.Element[] => {
  const data: InformationsEventProps = {
    title: "Festival musiques indiennes",
    image: "hero-card.jpeg",
    startingDate: new Date(),
    endingDate: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
    numberOfGroups: 13,
    numberOfPeople: 238,
    location: "Saint-Etienne du Rouvray",
  };

  return Array.from({ length: count }, (_, index) => (
    <CardEvent key={index} {...data} />
  ));
};

const roboto = Roboto({ subsets: ["latin"], weight: ["100", "300", "400", "500", "700", "900"] });

export default function Home() {
  const { data: session } = useSession();
  const totalEvents = 30;
  const eventsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalEvents / eventsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * eventsPerPage;
  const currentEvents = generateCardEvents(totalEvents).slice(startIndex, startIndex + eventsPerPage);

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
            <SearchInput placeholder="Rechercher un événement" />
          </div>
          <section className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentEvents}
          </section>
          <div className="mt-8">
          <Pagination
              total={totalPages}
              initialPage={1}
              onChange={handlePageChange}
              classNames={{
                cursor: "bg-primary dark:bg-secondary dark:text-black",
                item: "bg-secondary dark:bg-primary",
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
