    "use client";

    import React, { useEffect, useState } from "react";
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
    import { GroupData } from "../event/EventPage";
    
    export interface GroupCardProps {
        group: GroupData;
        onGroupLeave: () => void;
    }

    interface CustomUser extends User {
        avatar: string;
        fullname: string;
    }

    export interface GroupFullData {
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
        user: CustomUser;
        passengers: {
            user: CustomUser;
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
        user: CustomUser;
        hostedUsers: {
            user: CustomUser;
        }[];
        }[];
        members: {
        user: CustomUser;
        }[];
    }

    const EventGroupCard: React.FC<GroupCardProps> = ({ group, onGroupLeave }) => {

    const { theme } = useTheme();
    const { data: session } = useSession();
    const [members, setMembers] = useState(group.members);
    const [isMember, setIsMember] = useState(false);
    const [usersHosted, setUsersHosted] = useState(group.hosts);
    const [isUserHosted, setIsUserHosted] = useState(false);
    const [drivers, setDrivers] = useState(group.drivers);
    const [isPassenger, setIsPassenger] = useState(false);
    const [loadingGroup, setLoadingGroup] = useState(false);
    const [loadingDriver, setLoadingDriver] = useState(false);
    const [loadingHost, setLoadingHost] = useState(false);

    useEffect(() => {
        if (session?.user) {
        setIsMember(members.some(member => member.user.id === session.user.id));
        setIsUserHosted(
            usersHosted.some(host =>
            host.hostedUsers.some(hostedUser => hostedUser.user.id === session.user.id)
            )
        );
        setIsPassenger(
            drivers.some(driver =>
            driver.passengers.some(passenger => passenger.user.id === session.user.id)
            )
        );
        }
    }, [session, members, drivers, usersHosted]);

    const joinGroup = async () => {
        if (!session || !session.user) {
            console.error("User is not logged in.");
            return;
        }

        setLoadingGroup(true);
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
            setMembers([...members, { user: session.user as CustomUser }]);
        }
        } catch (error) {
        console.error("Error joining group:", error);
        } finally {
            setLoadingGroup(false);
        }
    };

    const leaveGroup = async () => {
        if (!session || !session.user) {
        console.error("User is not logged in.");
        return;
        }

        setLoadingGroup(true);
        try {
        const formData = new FormData();
        formData.append("userId", session.user.id.toString());
        formData.append("groupId", group.id.toString());

        drivers.map(driver => {
            if (driver.passengers.some(passenger => passenger.user.id === session.user.id)) {
            return leaveDriver(driver.id);
            }
        });

        usersHosted.map(host => {
            if (host.hostedUsers.some(hostedUser => hostedUser.user.id === session.user.id)) {
            return leaveHost(host.id);
            }
        });

        const response = await fetch(
            members.length === 1 ? `/api/group/${group.id}/delete` : `/api/group/${group.id}/leave`,
            {
            method: "DELETE",
            body: formData,
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Failed to leave group:", errorData);
        } else {
            const responseData = await response.json();
            console.log("Successfully left group:", responseData);

            onGroupLeave();
            setMembers(members.filter(member => member.user.id !== session.user.id));
            setIsMember(false);
            console.log("Successfully left group and any associated drivers/hosts:", responseData);
        }
        } catch (error) {
        console.error("Error leaving group:", error);
        } finally {
        setLoadingGroup(false);
        }
    };

    const joinDriver = async (driverId: number) => {
        if (!session || !session.user) {
        console.error("User is not logged in.");
        return;
        }
    
        setLoadingDriver(true);
        try {
        const formData = new FormData();
        formData.append("userId", session.user.id.toString());
    
        const response = await fetch(`/api/driver/${driverId}/join`, {
            method: "POST",
            body: formData,
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Failed to join driver:", errorData);
        } else {
            const responseData = await response.json();
            const updatedDrivers = drivers.map(driver => {
            if (driver.id === driverId) {
                return {
                ...driver,
                passengers: [...driver.passengers, { user: session.user as CustomUser }]
                };
            }
            return driver;
            });
            setDrivers(updatedDrivers);
            setIsPassenger(true);
            console.log("Successfully joined driver:", responseData);
        }
        } catch (error) {
        console.error("Error joining driver:", error);
        } finally {
            setLoadingDriver(false);
        }
    };

    const leaveDriver = async (driverId: number) => {
        if (!session || !session.user) {
        console.error("User is not logged in.");
        return;
        }
    
        setLoadingDriver(true);
        try {
        const formData = new FormData();
        formData.append("userId", session.user.id.toString());
    
        const response = await fetch(`/api/driver/${driverId}/leave`, {
            method: "DELETE",
            body: formData,
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Failed to leave driver:", errorData);
        } else {
            const responseData = await response.json();
            const updatedDrivers = drivers.map(driver => {
            if (driver.id === driverId) {
                return {
                ...driver,
                passengers: driver.passengers.filter(passenger => passenger.user.id !== session.user.id)
                };
            }
            return driver;
            });
            setDrivers(updatedDrivers);
            setIsPassenger(false);
            console.log("Successfully left driver:", responseData);
        }
        } catch (error) {
        console.error("Error leaving driver:", error);
        } finally {
            setLoadingDriver(false);
        }
    };

    const joinHost = async (hostId: number) => {
        if (!session || !session.user) {
        console.error("User is not logged in.");
        return;
        }
    
        setLoadingHost(true);
        try {
        const formData = new FormData();
        formData.append("userId", session.user.id.toString());
    
        const response = await fetch(`/api/host/${hostId}/join`, {
            method: "POST",
            body: formData,
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Failed to join host:", errorData);
        } else {
            const responseData = await response.json();
            const updatedHosts = usersHosted.map(host => {
            if (host.id === hostId) { 
                return {
                ...host,
                hostedUsers: [...host.hostedUsers, { user: session.user as CustomUser }]
                };
            }
            return host;
            });
            setUsersHosted(updatedHosts);
            setIsUserHosted(true);
            console.log("Successfully joined host:", responseData);
        }
        } catch (error) {
        console.error("Error joining host:", error);
        } finally {
            setLoadingHost(false);
        }
    };

    const leaveHost = async (hostId: number) => {
        if (!session || !session.user) {
        console.error("User is not logged in.");
        return;
        }
    
        setLoadingHost(true);
        try {
        const formData = new FormData();
        formData.append("userId", session.user.id.toString());
    
        const response = await fetch(`/api/host/${hostId}/leave`, {
            method: "DELETE",
            body: formData,
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Failed to leave host:", errorData);
        } else {
            const responseData = await response.json();
            const updatedHosts = usersHosted.map(host => {
            if (host.id === hostId) {
                return {
                ...host,
                hostedUsers: host.hostedUsers.filter(hostedUser => hostedUser.user.id !== session.user.id)
                };
            }
            return host;
            });
            setUsersHosted(updatedHosts);
            setIsUserHosted(false);
            console.log("Successfully left host:", responseData);
        }
        } catch (error) {
        console.error("Error leaving host:", error);
        } finally {
            setLoadingHost(false);
        }
    };

    if (members.length === 0) {
        return <></>;
    }

    return (
        <section className="flex justify-center items-center">
        <Card className="rounded-none mx-4 md:mx-0 p-1 w-full md:w-8/12 dark:bg-gray-800">
            <CardHeader className="flex justify-center items-center">
            {isMember ? (
                <Button
                onClick={leaveGroup}
                color={theme === "dark" ? "primary" : "secondary"}
                size="sm"
                className="mx-2 my-2 md:my-5 font-medium text-slate-950 dark:text-white"
                isLoading={loadingGroup}
                disabled={loadingGroup}
                >
                Quitter le collectif
                </Button>
            ) : (
                <Button
                onClick={joinGroup}
                color={theme === "dark" ? "secondary" : "primary"}
                size="sm"
                className="mx-2 my-2 md:my-5 font-medium text-white dark:text-black"
                isLoading={loadingGroup}
                disabled={loadingGroup}
                >
                Rejoindre ce collectif
                </Button>
            )}
            </CardHeader>
            <CardBody>
            <Accordion selectionMode="multiple" defaultExpandedKeys={["1"]}>
                <AccordionItem
                title={
                    <p className="text-sm">
                    {members.length} utilisateur
                    {members.length > 1 ? "s" : ""} dans ce collectif
                    </p>
                }
                key="1"
                >
                <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-2 md:gap-3 p-1 dark:bg-gray-800">
                    {members.map((user, index) => (
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
                    {drivers.length} covoiturage
                    {drivers.length > 1 ? "s" : ""} dans ce collectif
                    </p>
                }
                key="2"
                >
                <Accordion selectionMode="multiple">
                    {drivers.map((driver, index) => (
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
                            {session && isMember && isPassenger && (
                            <Button
                                onClick={() => leaveDriver(driver.id)}
                                color={theme === "dark" ? "primary" : "secondary"}
                                size="sm"
                                className="mx-2 my-2 md:my-5 font-medium text-slate-950 dark:text-secondaryText"
                                isLoading={loadingDriver}
                                disabled={loadingDriver}
                            >
                                Quitter
                            </Button>
                            )}
                            {session && isMember && !isPassenger && (
                            <Button
                                onClick={() => joinDriver(driver.id)}
                                color={theme === "dark" ? "secondary" : "primary"}
                                size="sm"
                                className="mx-2 my-2 md:my-5 font-medium text-white dark:text-secondaryText"
                                isLoading={loadingDriver}
                                disabled={loadingDriver}
                            >
                                Rejoindre
                            </Button>
                            )}
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
                    {usersHosted.length} hébergement
                    {usersHosted.length > 1 ? "s" : ""} dans ce collectif
                    </p>
                }
                key="3"
                >
                <Accordion selectionMode="multiple">
                    {usersHosted.map((host, index) => (
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
                            {session && isUserHosted && (
                            <Button
                                onClick={() => leaveHost(host.id)}
                                color={theme === "dark" ? "primary" : "secondary"}
                                size="sm"
                                className="mx-2 my-2 md:my-5 font-medium text-slate-950 dark:text-secondaryText"
                                isLoading={loadingHost}
                                disabled={loadingHost}
                            >
                                Quitter
                            </Button>
                            )} 
                            {session && !isUserHosted && (
                            <Button
                                onClick={() => joinHost(host.id)}
                                color={theme === "dark" ? "secondary" : "primary"}
                                size="sm"
                                className="mx-2 my-2 md:my-5 font-medium text-white dark:text-secondaryText"
                                isLoading={loadingHost}
                                disabled={loadingHost}
                            >
                                Rejoindre
                            </Button>
                            )}
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

    export default EventGroupCard;
