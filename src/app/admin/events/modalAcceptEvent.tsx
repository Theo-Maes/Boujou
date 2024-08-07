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
import { Event } from "@prisma/client";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function ModalAcceptEvent({
  eventModal,
  isOpen,
  onClose,
  type,
}: {
  eventModal: Event | undefined;
  isOpen: boolean;
  onClose: () => void;
  type: "accept" | "refuse" | "cancel";
}) {
  async function handleAcceptEvent() {
    if (eventModal) {
      switch (type) {
        case "accept": {
          const formData = new FormData();
          formData.append("validatedAt", String(new Date().getTime()));
          await fetch(`/api/event/${eventModal.id}/update`, {
            method: "PATCH",
            body: formData,
          });
          break;
        }
        case "refuse":
          await fetch(`/api/event/${eventModal.id}/delete`, {
            method: "DELETE",
          });
          break;
        case "cancel": {
          const formData = new FormData();
          formData.append("cancelledAt", String(new Date().getTime()));
          await fetch(`/api/event/${eventModal.id}/update`, {
            method: "PATCH",
            body: formData,
          });
          break;
        }
        default:
          break;
      }
    }
  }

  function getModalRefuse() {
    return (
      <>
        {eventModal && (
          <Modal
            isOpen={isOpen}
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            hideCloseButton={true}
          >
            <ModalContent>
              <ModalHeader className="flex flex-col items-center gap-1">
                Êtes-vous sûr de vouloir Refuser {eventModal.name} ?
              </ModalHeader>
              <ModalBody>
                <div>{eventModal.description}</div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Non
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    handleAcceptEvent();
                    onClose();
                  }}
                >
                  Oui
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </>
    );
  }

  function getModalAccept() {
    return (
      <>
        {eventModal && (
          <Modal
            isOpen={isOpen}
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            hideCloseButton={true}
          >
            <ModalContent>
              <ModalHeader className="flex flex-col items-center gap-1">
                Êtes-vous sûr de vouloir accepter {eventModal.name} ?
              </ModalHeader>
              <ModalBody>
                <div>{eventModal.description}</div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Non
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    handleAcceptEvent();
                    onClose();
                  }}
                >
                  Oui
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </>
    );
  }

  function getModalCancel() {
    return (
      <>
        {eventModal && (
          <Modal
            isOpen={isOpen}
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            hideCloseButton={true}
          >
            <ModalContent>
              <ModalHeader className="flex flex-col items-center gap-1">
                Êtes-vous sûr de vouloir annulé {eventModal.name} ?
              </ModalHeader>
              <ModalBody>
                <div>{eventModal.description}</div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Non
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    handleAcceptEvent();
                    onClose();
                  }}
                >
                  Oui
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </>
    );
  }

  return (
    <>
      {eventModal && type === "accept"
        ? getModalAccept()
        : type === "cancel"
        ? getModalCancel()
        : getModalRefuse()}
    </>
  );
}
