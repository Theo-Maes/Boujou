"use client";

import { Metadata } from "next";
import EventPage, { EventPageProps } from "@/components/event/EventPage";
import { EventWithRelations } from "@/libs/types";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";

// export const metadata: Metadata = {
//   title: "Test",
// };

const fetchEvent = async (id: string): Promise<EventPageProps | null> => {
  try {
    const response = await fetch(`/api/event/${id}`);
    const data = await response.json();
    const event: EventWithRelations = data.data;

    return {
      id: event.id,
      eventName: event.name,
      image: event.image,
      description: event.description,
      startingDate: new Date(event.startingDate).getTime(),
      endingDate: new Date(event.endingDate).getTime(),
      address: event.address,
      city: event.city,
      zipCode: event.zipCode,
      cancelledAt: event.cancelledAt ? new Date(event.cancelledAt) : null,
      price: event.price,
      url: event.url || "",
      categoryId: Number.parseInt(event.categoryId.toString()),
      category: event.category.name,
      numberOfGroups: event.groups.length || 0,
    };
  } catch (error) {
    console.error('Failed to fetch event:', error);
    return null;
  }
};


export default function EventTestPage ({params}: { params: { id: string }}) {
  const { id } = params;
  const [event, setEvent] = useState<EventPageProps | null>(null);

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

  return (
    <EventPage
      image={event.image}
      categoryId={event.categoryId}
      category={event.category}
      eventName={event.eventName}
      address={event.address}
      zipCode={event.zipCode}
      city={event.city}
      startingDate={event.startingDate}
      endingDate={event.endingDate}
      price={event.price}
      url={event.url} 
      id={event.id} 
      description={event.description} 
      cancelledAt={event.cancelledAt}
      numberOfGroups={event.numberOfGroups} 
    />
  );
}