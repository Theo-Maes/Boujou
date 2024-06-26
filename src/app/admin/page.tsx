// import { Button } from "@/components";
import { Metadata } from "next";
import { Roboto } from "next/font/google";
import Menu from "./menu";
import { Button } from "@/components";
import GraphCard from "./graphCard";

// export const metadata: Metadata = {
//   title: "Boujou", //TODO
// };

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default async function Home() {
  async function getNbNouveauInscritsParMois() {
    const response = await fetch("http://localhost:3000/api/user", {
      cache: "no-store",
    });

    const jsonResponse = await response.json();
    const data = jsonResponse.data;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const userCreationDates = data.map((user: any) => new Date(user.createdAt));
    const userCreationMonths = userCreationDates
      .filter((date: any) => date.getFullYear() === currentYear)
      .map((date: any) => date.getMonth());

    const userCountByMonth: number[] = Array(12).fill(0);

    userCreationMonths.forEach((month: any) => {
      userCountByMonth[month]++;
    });
    return userCountByMonth;
  }

  async function getNbInscritsParMois() {
    const response = await fetch("http://localhost:3000/api/user", {
      cache: "no-store",
    });

    const jsonResponse = await response.json();
    const data = jsonResponse.data;

    const userCreationDates = data.map((user: any) => new Date(user.createdAt));
    const userCreationMonths = userCreationDates.map((date: any) =>
      date.getMonth()
    );
    const userCountByMonth: number[] = Array(12).fill(0);

    userCreationMonths.forEach((month: any) => {
      userCountByMonth[month]++;
    });

    console.log(userCountByMonth);
    return userCountByMonth;
  }

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
              <div>
                <GraphCard
                  data={await getNbNouveauInscritsParMois()}
                  labels={labels}
                  subTitle=""
                  title="nombre de nouveau d'inscrits par mois"
                  type="line"
                />
              </div>
              <div>
                <GraphCard
                  data={await getNbInscritsParMois()}
                  labels={labels}
                  subTitle=""
                  title="nombre total d'inscrits par mois"
                  type="line"
                />
              </div>
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
