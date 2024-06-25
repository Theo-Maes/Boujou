import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Image, DateInputReturnType } from "@nextui-org/react";

function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
}

export interface InformationsEventProps {
  title: string;
  image: string;
  startingDate: Date;
  endingDate: Date;
  numberOfGroups?: number;
  numberOfPeople?: number;
  location: string;
}

export default function EventCard({
  title,
  startingDate,
  endingDate,
  numberOfGroups,
  numberOfPeople,
  location,
  image,
}: InformationsEventProps): JSX.Element {
  return (
    <Card className="p-1 w-full md:max-w-[300px] dark:bg-transparent transition-transform transform hover:scale-105">
      <CardHeader className="flex-col items-start overflow-visible relative">
        <Image
          alt="Card background"
          className="rounded-xl"
          src={`/${image}`}
          width={800}
        />
        <div className="absolute bottom-6 right-3 bg-secondary rounded-tl-lg rounded-bl-lg p-2 shadow-lg flex items-center z-20">
          <div className="flex items-center space-x-1 mr-2">
            <Image
              className="drop-shadow-lg"
              src="/group.svg"
              alt="group Logo"
              width={18}
              height={18}
            />
            <span className="text-xs text-black dark:text-black">{numberOfGroups}</span>
          </div>
          <div className="flex items-center space-x-1 mr-2">
            <Image
              className="drop-shadow-lg"
              src="/user.svg"
              alt="user Logo"
              width={18}
              height={18}
            />
            <span className="text-xs text-black dark:text-black">{numberOfPeople}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Image
              className="drop-shadow-lg"
              src="/location.svg"
              alt="location Logo"
              width={18}
              height={18}
            />
            <span className="text-xs text-black dark:text-black">              
              {truncateText(location, 15)}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardBody className="pb-0 pt-2 flex-col items-start">
        <h2 className="font-bold text-xl md:text-2xl">{title}</h2>
      </CardBody>
      <CardFooter>
        <small className="text-dark text-[14px]">
          {endingDate && endingDate.getTime() !== startingDate.getTime() ? (
            <span>
              du {startingDate.toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}
              &nbsp;au {endingDate.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          ) : (
            <span>
              le {startingDate.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          )}
        </small>        
      </CardFooter>
    </Card>
  );
}
