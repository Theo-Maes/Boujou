import { Roboto } from "next/font/google";
import Menu from "../menu";
import Table from "./table";

// export const metadata: Metadata = {
//   title: "Boujou", //TODO
// };

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/user", {
    cache: "no-store",
  });

  const jsonResponse = await response.json();

  const data = jsonResponse.data;

  return (
    <main className="flex flex-col my-5">
      <section id="top" className="pl-0 md:px-9 flex flex-row">
        <div className="flex flex-row gap-10 flex-auto self-center">
          <Menu labelActive="Utilistateurs" />
          <div className="flex flex-col w-full h-full gap-10">
            <Table users={data} />
          </div>
        </div>
      </section>
    </main>
  );
}
