"use client";

import { Roboto } from "next/font/google";
import Menu from "../menu";
import Table from "./tableEvent";
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
  type: "accept" | "refuse";
}) {
  async function handleAcceptEvent() {
    if (type === "accept") {
      alert("Accepté");
      //TODO
    } else {
      alert("Refusé");
      //TODO
    }
    //     await fetch(`http://localhost:3000/api/event/${eventModal.id}/delete`, {
    //       method: "DELETE",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });
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

  return (
    <>{eventModal && type === "accept" ? getModalAccept() : getModalRefuse()}</>
  );
}
