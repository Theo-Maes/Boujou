"use client";

import { Metadata } from "next";
import EventPage, { Event } from "@/components/event/EventPage";
import { EventWithRelations } from "@/libs/types";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";

// export const metadata: Metadata = {
//   title: "Test",
// };

const fetchEvent = async (id: string): Promise<Event | null> => {
  try {
    const response = await fetch(`/api/event/${id}`);
    const data = await response.json();
    const event: Event = data.data;

    return event;
  } catch (error) {
    console.error("Failed to fetch event:", error);
    return null;
  }
};

export default function EventTestPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const eventData = await fetchEvent(id);
      setEvent(eventData);
    };

    fetchData();
  }, [id]);

  if (!event) {
    return <Loading />;
  }

  return <EventPage event={event} />;
}
