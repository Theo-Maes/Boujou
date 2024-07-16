"use client";

import Image from "next/image";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { useTheme } from "next-themes";
import { InformationsEventCard } from "../cards/InformationsEventCard";
import EventGroupCard from "../cards/EventGroupCard";
import ButtonModal from "../forms/utils/Modal";
import ServiceForm from "../forms/ServiceForm";
import { useSession } from "next-auth/react";
import { Group, User } from "@prisma/client";
import { useEffect, useState } from "react";
import ProfileCard from "../cards/ProfileCard";

export interface UserData {
  id: number;
  fullname: string;
  email: string;
  avatar: string;
  firstName: string;
  lastName: string;
  adress: string;
  city: string;
  zipCode: string;
  groups: GroupData[];
  createdGroups: Group[]; 
  drivers: DriverData[];
  hosts: HostData[];
  HostedUsers: HostedUserData[];
  passengerIn: PassengerData[];  
}

export interface GroupData {
  id: number;
  userId: number;
  event: Event;
  drivers: DriverData[];
  hosts: HostData[];
  members: MemberData[];
}

export interface DriverData {
  id: number;
  startingdate: number;
  endingdate: number;
  adress: string;
  zipcode: string;
  city: string;
  quantity: number;
  user: User;
  passengers: PassengerData[];
}

export interface HostData {
  id: number;
  address: string;
  zipcode: string;
  city: string;
  startingdate: number;
  endingdate: number;
  quantity: number;
  user: User;
  hostedUsers: HostedUserData[];
}

export interface MemberData {
  user: User;
}

export interface PassengerData {
  user: User;
}

export interface HostedUserData {
  user: User;
}

export default function ProfilePage({
  user,
}: {
  user: UserData;
}): JSX.Element {
  const { data: session } = useSession();
  const { theme } = useTheme();
  const [userProfile, setUserProfile] = useState();

//   useEffect(() => {
//     setUserProfile();
//   }, []);

  const isUserConnected = (userId: number) => {
    return session?.user.id === userId 
  };

  const reloadProfilePage = () => {
    window.location.reload();
  };

  return (
    <main className="flex flex-col justify-center items-center">
        <ProfileCard user={user}/>
    </main>
  );
}
