"use client";

import { Disclosure } from "@headlessui/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle, UserMenu } from "..";
import { useTheme } from "next-themes";

import EventForm from "../forms/EventForm";
import ServiceForm from "../forms/ServiceForm";
import ButtonModal from "../forms/utils/Modal";

export default function MainNavbar() {
  const { data: session } = useSession();
  const currentPath = usePathname();
  const { theme } = useTheme();

  return (
    <Disclosure
      as="nav"
      className="w-screen bg-white dark:bg-gray-800 select-none border-b border-neutral-400 dark:border-neutral-400"
    >
      <div className="mx-auto max-w-screen px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-start">
            <div className="flex flex-shrink-0 items-center p-2">
              <Link href={"/"}>
                <Image
                  priority
                  src="/logo.png"
                  alt="Logo"
                  width={320}
                  height={198}
                  className="dark:hidden h-16 w-auto hover:opacity-75"
                />
                <Image
                  priority
                  src="/logo-dark.png"
                  alt="Logo Dark"
                  width={320}
                  height={198}
                  className="hidden dark:block h-16 w-auto hover:opacity-75"
                />
              </Link>
            </div>
          </div>

          {session && session.user ? (
            <div className="hidden md:flex flex-1 justify-center">
              <ButtonModal title="Proposer un événement" isBlue={true}>
                <ServiceForm
                  userId={session.user.id}
                  //groupId={} join et maybe more
                  categories={[{ id: 34, name: "Musique" }]}
                  successCallBack={() => console.log("refetch")}
                />
                {/* <EventForm userId={session.user.id} /> */}
              </ButtonModal>
            </div>
          ) : (
            <></>
          )}

          <div className="flex flex-1 justify-end items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <ThemeToggle />
            <UserMenu session={session!} currentPath={currentPath} />
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
