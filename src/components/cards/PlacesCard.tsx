import React from "react";
import { Card, CardBody, Image } from "@nextui-org/react";

export interface PlacesCardProps {
  reserved: number;
  available: number;
}

export const PlacesCard: React.FC<PlacesCardProps> = ({
  reserved,
  available,
}) => {
  const mobilePlaceText =
    reserved === available ? "complet" : `${reserved} / ${available}`;
  const placeText =
    reserved === available
      ? "complet"
      : `${reserved} / ${available} place${reserved > 1 ? "s" : ""} réservée${
          reserved > 1 ? "s" : ""
        }`;

  return (
    <Card
      className="w-full md:w-max-[200px] lg:w-max-[300px] rounded-none"
      shadow="none"
    >
      <CardBody className="flex flex-row justify-center dark:bg-gray-800">
        <p className="block md:hidden text-xs mr-2">{mobilePlaceText}</p>
        <p className="hidden md:block text-base">{placeText}</p>
      </CardBody>
    </Card>
  );
};
