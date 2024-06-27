import React from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { UserCard } from "./UserCard";
import { User } from "@prisma/client";

export interface ServiceCardProps {
  isCovoiturage: boolean;
  departureTime?: string;
  departurePlace?: string;
  arrivalTime?: string;
  arrivalPlace?: string;
  users: User[];
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  isCovoiturage,
  departureTime = "",
  departurePlace = "",
  arrivalTime = "",
  arrivalPlace = "",
  users,
}) => {
  const { theme } = useTheme();

  return (
    <Card
      className="w-full md:w-max-[200px] lg:w-max-[300px] rounded-none"
      shadow="none"
    >
      {isCovoiturage ? (
        <CardBody className="w-full items-center justify-center bg-primaryLight dark:bg-gray-600">
          <div className="w-full grid grid-flow-col auto-cols-auto items-center justify-center">
            <div className="flex flex-col justify-between text-xs md:text-base w-full text-right">
              <p>{departureTime}</p>
              <p className="text-sm my-3 md:hidden">&nbsp;</p>
              <p className="hidden md:block text-sm my-3">&nbsp;</p>
              <p>{arrivalTime}</p>
            </div>
            <div className="flex flex-col items-center justify-between text-xs md:text-base w-full text-center px-5">
              <div
                className={
                  theme === "dark"
                    ? "w-4 h-4 bg-transparent rounded-full drop-shadow-lg border border-3 border-gray-300"
                    : "w-4 h-4 bg-white rounded-full drop-shadow-lg border border-3 border-gray-500"
                }
              ></div>
              <div className="w-1 flex-grow bg-gray-500 dark:bg-gray-300 py-3">
                &nbsp;
              </div>
              <div
                className={
                  theme === "dark"
                    ? "w-4 h-4 bg-transparent rounded-full drop-shadow-lg border border-3 border-gray-300"
                    : "w-4 h-4 bg-white rounded-full drop-shadow-lg border border-3 border-gray-500"
                }
              ></div>
            </div>
            <div className="flex flex-col justify-between text-xs md:text-base w-full text-left">
              <p>{departurePlace}</p>
              <p className="text-sm my-3">&nbsp;</p>
              <p>{arrivalPlace}</p>
            </div>
          </div>
        </CardBody>
      ) : (
        <></>
      )}
      <CardFooter className="dark:bg-gray-800 rounded-none">
        <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-2 md:gap-3 p-1 dark:bg-gray-600">
          {users.map((user, index) => (
            <UserCard
              key={index}
              avatar={user.avatar}
              fullname={user.fullname}
            />
          ))}
        </section>
      </CardFooter>
    </Card>
  );
};
