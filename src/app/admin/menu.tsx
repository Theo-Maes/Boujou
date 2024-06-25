"use client";

import { Roboto } from "next/font/google";
import ChartPie from "../../../public/ChartPie.svg";
import Button from "./boutonMenuAdmin";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

interface MenuProps {
  labelActive: "Statistiques" | "Utilistateurs" | "Evenements";
}

export default function Menu({ labelActive }: MenuProps) {
  const ValuesButton = [
    {
      label: "Statistiques",
      alt: "icon de statistiques",
      icon: ChartPie,
      onClick: () => {
        console.log("click");
      },
    },
    {
      label: "Utilistateurs",
      alt: "icon de Utilistateurs",
      icon: ChartPie,
      onClick: () => {
        console.log("click");
      },
    },
    {
      label: "Evenements",
      alt: "icon de Evenements",
      icon: ChartPie,
      onClick: () => {
        console.log("click");
      },
    },
  ];

  return (
    <div className="flex flex-col">
      {ValuesButton.map((value) => {
        return (
          <Button
            label={value.label}
            alt={value.alt}
            icon={value.icon}
            active={labelActive === value.label}
            onClick={value.onClick}
            key={value.label}
          />
        );
      })}
    </div>
  );
}
