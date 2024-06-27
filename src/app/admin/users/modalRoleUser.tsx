"use client";

import { Roboto } from "next/font/google";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { User } from "@prisma/client";
import { useState } from "react";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function ModalRoleUser({
  userModal,
  isOpen,
  onClose,
}: {
  userModal: User | undefined;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [selectedRole, setSelectedRole] = useState<number>(1);

  async function updateUser() {
    if (userModal && selectedRole != 0) {
      const formData = new FormData();
      formData.append("roleId", selectedRole.toString());
      const response = await fetch(
        `http://localhost:3000/api/user/${userModal.id}/update`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      if (!response.ok) {
        alert("Failed to update user");
      }
      window.location.reload();
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
                Quel rôle voulez-vous définir pour {userModal.firstName}{" "}
                {userModal.lastName} ?
              </ModalHeader>
              <ModalBody>
                <Select
                  placeholder="Choisir un rôle"
                  onChange={(event) => {
                    const value = event.target.value;
                    setSelectedRole(parseInt(value));
                  }}
                  required
                >
                  <SelectItem key="1">Utilisateur</SelectItem>
                  <SelectItem key="2">Administrateur</SelectItem>
                </Select>
              </ModalBody>
              <ModalFooter>
                {/* <Button color="danger" variant="light" onPress={onClose}>
                  Annuler
                </Button> */}
                <Button
                  color="primary"
                  onPress={() => {
                    updateUser();
                    onClose();
                  }}
                >
                  Confirmer
                </Button>
              </ModalFooter>
            </>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
