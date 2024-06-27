"use client";

import { Roboto } from "next/font/google";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { User } from "@prisma/client";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function ModalDeleteUser({
  userModal,
  isOpen,
  onClose,
}: {
  userModal: User | undefined;
  isOpen: boolean;
  onClose: () => void;
}) {
  async function removeUser() {
    if (userModal) {
      const response = await fetch(
        `http://localhost:3000/api/user/${userModal.id}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        alert("Failed to delete user");
      }
    }
  }

  return (
    <>
      {userModal && (
        <Modal
          isOpen={isOpen}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
          hideCloseButton={true}
        >
          <ModalContent>
            <>
              <ModalHeader className="flex flex-col items-center gap-1">
                Êtes-vous sûr de vouloir supprimer {userModal.firstName}{" "}
                {userModal.lastName} ?
              </ModalHeader>
              <ModalBody>
                Compte crée le{" "}
                {new Date(
                  userModal.createdAt?.toString() || ""
                ).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Non
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    removeUser();
                    onClose();
                  }}
                >
                  Oui
                </Button>
              </ModalFooter>
            </>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
