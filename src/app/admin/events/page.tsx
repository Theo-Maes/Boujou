import { Roboto } from "next/font/google";
import Menu from "../menu";
import Table from "./tableEvent";
import { Event } from "@prisma/client";

// export const metadata: Metadata = {
//   title: "Boujou", //TODO
// };

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/event", {
    cache: "no-store",
  });

  const jsonResponse = await response.json();

  const data: Event[] = jsonResponse.data;

  return (
    <main className="flex flex-col my-5">
      <section id="top" className="pl-0 md:px-9 flex flex-row">
        <div className="flex flex-row gap-10 flex-auto self-center">
          <Menu labelActive="Evenements" />
          <div className="flex flex-col w-full h-full gap-10">
            <Table events={data} />
          </div>
        </div>
      </section>
    </main>
  );
}
