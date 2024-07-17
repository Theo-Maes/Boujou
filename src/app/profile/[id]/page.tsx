"use client";

import { Metadata } from "next";
import ProfilePage, { UserData } from "@/components/profile/ProfilePage";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

// export const metadata: Metadata = {
//   title: "Test",
// };

// Ajustement de fetchUser pour renvoyer UserData
const fetchUser = async (id: string): Promise<UserData | null> => {
    try {
      const response = await fetch(`/api/user/${id}`);
      
      if (response.status === 404) {
        return null;
      }
      
      const data = await response.json();
      const userData: UserData = {
        id: data.data.id,
        fullname: data.data.fullname,
        email: data.data.email,
        avatar: data.data.avatar,
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        adress: data.data.adress,
        city: data.data.city,
        zipCode: data.data.zipCode,
        groups: data.data.groups,
        createdGroups: data.data.createdGroups,
        drivers: data.data.drivers,
        hosts: data.data.hosts,
        HostedUsers: data.data.HostedUsers,
        passengerIn: data.data.passengerIn,
      };
      return userData;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      return null;
    }
  };
  
  export default function ProfileTestPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
  
    useEffect(() => {
      const fetchData = async () => {
        const userData = await fetchUser(id);
        setUser(userData);
        setLoading(false);
  
        // if (!userData) {
        //   router.push("/403");
        // }
      };
  
      fetchData();
    }, [id]);
  
    if (loading) {
      return <Loading />;
    }
  
    if (!user) {
      return null; 
    }
  
    return <ProfilePage user={user} />;
  }
  