"use client";
import React, { ReactNode, createContext, useMemo, useState } from "react";
import {
  Modal as NextModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useTheme } from "next-themes";

export type ModalContextProps = {
  setIsOpen: (isOpen: boolean) => void;
  setIsDark: (isDark: boolean) => void;
};
export const ModalContext = createContext<ModalContextProps | null>({
  setIsOpen: (isOpen: boolean) => null,
  setIsDark: (isDark: boolean) => null,
});

interface ButtonModal {
  title: string;
  children: ReactNode;
  isBlue: boolean;
}
const Modal = ({ children, title, isBlue }: ButtonModal) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const { theme } = useTheme();

  const value = useMemo(
    () => ({ setIsOpen, setIsDark }),
    [setIsOpen, setIsDark]
  );
  const bgColor = useMemo(() => {
    return isDark ? "bg-[#007ACC]" : "bg-white";
  }, [isDark]);
  return (
    <ModalContext.Provider value={value}>
      <Button
        color={theme === "dark" ? "secondary" : "primary"}
        size="sm"
        className="ml-2 font-medium dark:text-secondaryText"
        onPress={() => setIsOpen(true)}
      >
        {title}
      </Button>
      <NextModal
        backdrop="opaque"
        isOpen={isOpen}
        radius="lg"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: `border-[#292f46] bg-white  text-[#a8b0d3] transition ease-in-out delay-150 ${bgColor} duration-300`,
          header: " border-[#292f46]",
          footer: " border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
        closeButton={
          <Button onPress={() => setIsOpen(false)} variant="light">
            CLOSE
          </Button>
        }
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="h-[50px]"></ModalHeader>
              <ModalBody className="mx-auto">{children}</ModalBody>
              <ModalFooter>
                {/* <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20"
                  onPress={onClose}
                >
                  Action
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </NextModal>
    </ModalContext.Provider>
  );
};

export default Modal;
