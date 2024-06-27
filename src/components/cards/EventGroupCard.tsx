"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import Button from "../buttons/Button";
import { useTheme } from "next-themes";
import { UserCard } from "./UserCard";
import { PlacesCard } from "./PlacesCard";
import { ServiceCard } from "./ServiceCard";
import { Event, Host, User, UserGroup } from "@prisma/client";
import { useSession } from "next-auth/react";

interface Group {
  id: number;
  event: Event;
  drivers: {
    id: number;
    startingdate: number;
    endingdate: number;
    adress: string;
    zipcode: string;
    city: string;
    quantity: number;
    user: User;
    passengers: {
      user: User;
    }[];
  }[];
  hosts: {
    id: number;
    address: string;
    zipcode: string;
    city: string;
    startingdate: number;
    endingdate: number;
    quantity: number;
    user: User;
    hostedUsers: {
      user: User;
    }[];
  }[];
  members: {
    user: User;
  }[];
}

export default function EventGroupCard({
  group,
}: {
  group: Group;
}): JSX.Element {
  const { theme } = useTheme();
  const { data: session } = useSession();

  const joinGroup = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", session?.user?.id ?? "");
      formData.append("groupId", group.event.id.toString());

      const response = await fetch(`/api/group/${group.id}/join`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to join group:", errorData);
      } else {
        const responseData = await response.json();
        console.log("Successfully joined group:", responseData);
      }
    } catch (error) {
      console.error("Error joining group:", error);
    }
  };

  const joinDriver = async (driverId: number) => {
    try {
      const formData = new FormData();
      formData.append("userId", session?.user?.id ?? "");

      const response = await fetch(`/api/driver/${driverId}/join`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to join driver:", errorData);
      } else {
        const responseData = await response.json();
        console.log("Successfully joined driver:", responseData);
      }
    } catch (error) {
      console.error("Error joining driver:", error);
    }
  };

  const joinHost = async (hostId: number) => {
    try {
      const formData = new FormData();
      formData.append("userId", session?.user?.id ?? "");

      const response = await fetch(`/api/host/${hostId}/join`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to join host:", errorData);
      } else {
        const responseData = await response.json();
        console.log("Successfully joined host:", responseData);
      }
    } catch (error) {
      console.error("Error joining host:", error);
    }
  };

  return (
    <section className="flex justify-center items-center">
      <Card className="rounded-none mx-4 md:mx-0 p-1 w-full md:w-8/12 dark:bg-gray-800">
        <CardHeader className="flex justify-center items-center">
          <Button
            onClick={() => joinGroup()}
            color={theme === "dark" ? "secondary" : "primary"}
            size="sm"
            className="mx-2 my-2 md:my-5 font-medium dark:text-secondaryText"
          >
            Rejoindre ce collectif
          </Button>
        </CardHeader>
        <CardBody>
          <Accordion selectionMode="multiple" defaultExpandedKeys={["1"]}>
            <AccordionItem
              title={
                <p className="text-sm">
                  {group.members.length} utilisateur
                  {group.members.length > 1 ? "s" : ""} dans ce collectif
                </p>
              }
              key="1"
            >
              <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-2 md:gap-3 p-1 dark:bg-gray-800">
                {group.members.map((user, index) => (
                  <UserCard
                    key={index}
                    avatar={user.user.avatar}
                    fullname={user.user.fullname}
                  />
                ))}
              </section>
            </AccordionItem>
            <AccordionItem
              title={
                <p className="text-sm">
                  {
                    group.drivers.filter(
                      (driver) =>
                        driver.quantity >
                        (driver.passengers ? driver.passengers.length : 0)
                    ).length
                  }{" "}
                  covoiturages disponibles dans ce collectif
                </p>
              }
              key="2"
            >
              <Accordion selectionMode="multiple">
                {group.drivers.map((driver, index) => (
                  <AccordionItem
                    title={
                      <section className="w-full dark:bg-gray-800 grid grid-flow-col auto-cols-auto items-center gap-2 md:gap-3">
                        <UserCard
                          chevron={true}
                          avatar={driver.user.avatar}
                          fullname={driver.user.fullname}
                        />
                        <PlacesCard
                          reserved={
                            driver.passengers ? driver.passengers.length : 0
                          }
                          available={driver.quantity}
                        />
                        <div className="flex flex-row justify-end mr-4">
                          <Button
                            onClick={() => joinDriver(driver.id)}
                            color={theme === "dark" ? "secondary" : "primary"}
                            size="sm"
                            className="mx-2 my-2 md:my-5 font-medium dark:text-secondaryText"
                          >
                            Rejoindre
                          </Button>
                        </div>
                      </section>
                    }
                    key={index}
                  >
                    <ServiceCard
                      key={index}
                      isCovoiturage={true}
                      departureTime={new Date(
                        driver.startingdate
                      ).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                      departurePlace={`${driver.adress} - ${driver.zipcode} ${driver.city}`}
                      arrivalTime={new Date(
                        driver.endingdate
                      ).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                      arrivalPlace={`${group.event.address} - ${group.event.zipCode} ${group.event.city}`}
                      users={
                        driver.passengers?.map((passenger) => passenger.user) ??
                        []
                      }
                    />
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionItem>
            <AccordionItem
              title={
                <p className="text-sm">
                  {
                    group.hosts.filter(
                      (host) =>
                        host.quantity >
                        (host.hostedUsers ? host.hostedUsers.length : 0)
                    ).length
                  }{" "}
                  hébergement disponible dans ce collectif
                </p>
              }
              key="3"
            >
              <Accordion selectionMode="multiple">
                {group.hosts.map((host, index) => (
                  <AccordionItem
                    title={
                      <section className="w-full dark:bg-gray-800 grid grid-flow-col auto-cols-auto items-center gap-2 md:gap-3">
                        <UserCard
                          chevron={true}
                          avatar={host.user.avatar}
                          fullname={host.user.fullname}
                        />
                        <PlacesCard
                          reserved={
                            host.hostedUsers ? host.hostedUsers.length : 0
                          }
                          available={host.quantity}
                        />
                        <div className="flex flex-row justify-end mr-4">
                          <Button
                            onClick={() => joinHost(host.id)}
                            color={theme === "dark" ? "secondary" : "primary"}
                            size="sm"
                            className="mx-2 my-2 md:my-5 font-medium dark:text-secondaryText"
                          >
                            Rejoindre
                          </Button>
                        </div>
                      </section>
                    }
                    key={index}
                  >
                    <ServiceCard
                      isCovoiturage={false}
                      users={
                        host.hostedUsers?.map(
                          (hostedUser) => hostedUser.user
                        ) ?? []
                      }
                    />
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionItem>
          </Accordion>
        </CardBody>
      </Card>
    </section>
  );
}
