// import { Button } from "@/components";
import { Metadata } from "next";
import { Roboto } from "next/font/google";
import Menu from "./menu";
import { Button } from "@/components";

// export const metadata: Metadata = {
//   title: "Boujou", //TODO
// };

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function Home() {
  const data = [12, 19, 3, 5, 90, 3, 10, 15, 20, 30, 5, 50];
  const labels = [
    "Janvier",
    "Fevrier",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Decembre",
  ];

  return (
    <main className="flex flex-col my-5">
      <section id="top" className="pl-0 md:px-9 flex flex-row">
        <div className="flex flex-row gap-10 flex-auto self-center">
          <Menu labelActive="Statistiques" />
          <div className="flex flex-col w-full h-full gap-10">
            <div className="flex flex-row gap-10 self-center">
              <div>Graph</div>
              <div>Graph</div>
            </div>
            <div className="flex flex-row gap-10 self-center">
              <div>Graph</div>
              <div>Graph</div>
            </div>
            <Button>graphique custom</Button>
            <div className="flex flex-col"></div>
          </div>
        </div>
      </section>
    </main>
  );
}
