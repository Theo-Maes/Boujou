"use client";

import { Metadata } from "next";
import EventPage, { EventData } from "@/components/event/EventPage";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";

// export const metadata: Metadata = {
//   title: "Test",
// };

const fetchEvent = async (id: string): Promise<EventData | null> => {
  try {
    const response = await fetch(`/api/event/${id}`);
    
    if (response.status === 404) {
      return null;
    }
    
    const data = await response.json();
    const event: EventData = data.data;
    return event;
  } catch (error) {
    console.error("Failed to fetch event:", error);
    return null;
  }
};

export default function EventTestPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const eventData = await fetchEvent(id);
      setEvent(eventData);
      setLoading(false);

      if (!eventData) {
        router.push("/404");
      }
    };

    fetchData();
  }, [id, router]);

  if (loading) {
    return <Loading />;
  }

  if (!event) {
    return null; 
  }

  return <EventPage event={event} />;
}
