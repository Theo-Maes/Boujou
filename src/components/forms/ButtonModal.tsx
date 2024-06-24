"use client";
import React, { ReactNode, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import { useTheme } from "next-themes";
interface ButtonModalProps {
  title: string;
  children: ReactNode;
}

const ButtonModal: React.FC<ButtonModalProps> = ({ children, title }: ButtonModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  return (
    <>
      <Button
        color={theme === "dark" ? "secondary" : "primary"}
        size="sm"
        className="ml-2 font-medium dark:text-secondaryText"
        onPress={() => setIsOpen(true)}
      >
        {title}
      </Button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        isDismissable={false} 
        isKeyboardDismissDisabled={true}
        radius="lg"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-white text-[#a8b0d3]",
          header: " border-[#292f46]",
          footer: " border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
        closeButton={
          <Button onPress={() => setIsOpen(false)} variant="light">
            Annuler
          </Button>
        }
      >
        <ModalContent >
          {(onClose) => (
            <>
              <ModalHeader className="h-[50px]"></ModalHeader>
              <ModalBody>{children}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ButtonModal;