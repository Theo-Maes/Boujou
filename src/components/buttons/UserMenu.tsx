"use client";

import { useState } from "react";
import { classNames } from "@/libs";
import { Menu, MenuButton, MenuItems, MenuItem, Transition } from "@headlessui/react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Checkbox } from "@nextui-org/react";
import { useTheme } from "next-themes";

export default function UserMenu({
  session,
  currentPath,
}: {
  session: Session;
  currentPath: string;
}): JSX.Element {
  const [isModalOpen, setModalOpen] = useState(false);
  const { theme } = useTheme();

  const handleSignInClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSignOutClick = () => {
    signOut({ callbackUrl: "/" });
  };

  if (session && session.user) {
    return (
      <Menu as="div" className="relative ml-3">
        <div>
          <MenuButton className="relative flex rounded-full bg-transparent text-sm">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <Image
              width={36}
              height={36}
              className="rounded-full border-1 border-gray-600 p-0.5"
              src={session.user.avatar ?? ""}
              alt={session.user.fullname ?? "User"}
            />
          </MenuButton>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="absolute right-0 z-30 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg dark:shadow-zinc-900 ring-1 ring-black ring-opacity-5 focus:outline-none text-gray-700 dark:text-gray-300">
            <MenuItem>
              {() => (
                <div className="text-sm mt-2 px-4 pb-2">
                  <p className="font-regular">Connecté en tant que</p>
                  <p className="font-semibold text-primary dark:text-secondary">{session.user.fullname}</p>
                  <p>{session.user.roleId} / ROLE</p>
                  <p>{session.user.id} / ID</p>
                </div>
              )}
            </MenuItem>
            <MenuItem>
              {({ focus }) => (
                <Link
                  href="/profile"
                  className={classNames(
                    focus ? "bg-gray-200 dark:bg-gray-700" : "",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Profil
                </Link>
              )}
            </MenuItem>
            {/* { session && session.user.isAdmin ? ( */}
              <MenuItem>
                {({ focus }) => (
                  <Link
                    href="/admin"
                    className={classNames(
                      focus ? "bg-blue-100 dark:bg-primary text-primary dark:text-blue-100" : "",
                      "block px-4 py-2 text-sm cursor-pointer"
                    )}
                  >
                    Accès admin
                  </Link>
                )}
              </MenuItem>
            {/* ) : (
              <></>
            )} */}
            <MenuItem>
              {({ focus }) => (
                <div
                  className={classNames(
                    focus ? "bg-red-100 dark:bg-red-500 text-red-500 dark:text-red-100" : "",
                    "block px-4 py-2 text-sm cursor-pointer"
              )}
                  onClick={handleSignOutClick}
                >
                  Déconnexion
                </div>
              )}
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    );
  }

  return (
    <>
      <Button
        color={theme === "dark" ? "secondary" : "primary"}
        size="md"
        className="mx-2 text-white dark:text-black"
        onClick={handleSignInClick}
      >
        Connexion
      </Button>

      <Modal isOpen={isModalOpen} onOpenChange={setModalOpen} placement="top-center">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-black dark:text-white">Connexion</ModalHeader>
          <ModalBody>
            <Input
              label="Email"
              placeholder="Entrez votre adresse email"
              variant="bordered"
            />
            <Input
              label="Mot de passe"
              placeholder="Entrez votre mot de passe"
              type="password"
              variant="bordered"
            />
            <div className="flex py-2 px-1 justify-between">
              <Checkbox
                color={theme === "dark" ? "secondary" : "primary"}
                classNames={{
                  label: "text-[13px] md:text-[16px]",
                }}
              >
                Se souvenir de moi
              </Checkbox>
              <Link color={theme === "dark" ? "secondary" : "primary"} href="#" className={classNames(
                      "text-[13px]",
                      "md:text-[16px]",
                      "transition",
                      "hover:underline",
                      "underline-offset-4",
                      "text-primary",
                      "dark:text-secondary",
                      "dark:text-neutral-200",
                      "dark:hover:underline-neutral-200")}>
                Mot de passe oublié ?
              </Link>
            </div>
            <div className="flex py-2 px-1 justify-center">
              <Button onClick={() => signIn("google", { callbackUrl: "http://localhost:3000" })} color={theme === "dark" ? "secondary" : "primary"} className="w-auto lg:w-2/3 flex justify-center items-center">
                <Image
                  className="mx-2 drop-shadow-lg"
                  src="/google.svg"
                  alt="Google Logo"
                  width={24}
                  height={24}
                />
                <span className="ml-2 text-white dark:text-black">Connexion avec Google</span>
              </Button>
            </div>
          </ModalBody>
          <ModalFooter className="flex justify-between align-center">
            <div>
              <Link 
                color={theme === "dark" ? "secondary" : "primary"} 
                href="/signup"
              >
                <Button color={theme === "dark" ? "primary" : "secondary"} onPress={handleCloseModal} className="text-dark dark:text-white">
                  S&apos;inscrire
                </Button>
              </Link>
            </div>
            <div className="flex gap-3">
              <Button color="danger" variant="flat" onPress={handleCloseModal} className="dark:text-white">
                Annuler
              </Button>
              <Button color={theme === "dark" ? "secondary" : "primary"} onPress={handleCloseModal} className="text-white dark:text-black">
                Se connecter
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
