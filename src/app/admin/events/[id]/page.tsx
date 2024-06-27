import { Event } from "@prisma/client";
import Menu from "../../menu";
import UpdateEventForm from "./UpdateEventForm";

export default async function UpdateEventPage({
  params,
}: {
  params: { id: string };
}) {
  const response = await fetch(`http://localhost:3000/api/event/${params.id}`, {
    method: "GET",
    cache: "no-cache",
  });

  const { data }: { data: Event } = await response.json();

  return (
    <>
      <main className="flex flex-col my-5">
        <section id="top" className="pl-0 md:px-9 flex flex-row">
          <div className="flex flex-row gap-10 flex-auto self-center ">
            <Menu labelActive="Evenements" />
            <div className="flex flex-col w-full h-full gap-10">
              <UpdateEventForm event={data} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
