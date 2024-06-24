import { Metadata } from "next";
import EventPage from "@/components/event/EventPage";

export const metadata: Metadata = {
  title: "Test",
};

const data = {
  image: "hero-card.jpeg",
  categoryId: 1,
  eventName: "Festival musiques indiennes",
  location: "Centre culturel Pierre Cerdan",
  address: "123 rue de Gessard",
  zipCode: "76000",
  city: "Rouen",
  price: 0,
  url: "https://www.rouen.fr",
  startingDate: 1719086400000,
  endingDate: 1729165600000
};

export default function EventTestPage() {
  
  return (
    <EventPage
      image={data.image}
      categoryId={data.categoryId}
      eventName={data.eventName}
      location={data.location}
      address={data.address}
      zipCode={data.zipCode}
      city={data.city}
      startingDate={data.startingDate}
      endingDate={data.endingDate}
      price={data.price}
      url={data.url}
    />
  )}
