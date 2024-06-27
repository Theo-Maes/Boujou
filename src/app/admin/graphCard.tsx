"use client";
import { Roboto } from "next/font/google";
import Graph from "./graph";

import { ChartTypeRegistry } from "chart.js/auto";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useTheme } from "next-themes";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

type GraphProps = {
  title: string;
  subTitle: string;
  type: keyof ChartTypeRegistry;
  labels: string[];
  data: number[];
  width?: number; // Add width prop
  height?: number; // Add height prop
};

export default function GraphCard({
  title,
  subTitle,
  type,
  labels,
  data,
  width,
  height,
}: GraphProps) {
  const { theme } = useTheme();
  return (
    <>
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h4 className="font-bold text-large">{title}</h4>
          <p className="text-tiny uppercase font-bold">{subTitle}</p>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Graph data={data} labels={labels} type={type} />
        </CardBody>
      </Card>
    </>
  );
}

//nb d'evenement par mois inscrit
//nb groupe par mois crée
