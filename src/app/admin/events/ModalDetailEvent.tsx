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
import Image from "next/image";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function EventModal({
  eventModal,
  isOpen,
  onClose,
}: {
  eventModal: Event | undefined;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {eventModal && (
        <Modal isOpen={isOpen} hideCloseButton={true}>
          <ModalContent>
            <ModalHeader className="flex flex-col items-center gap-1">
              {eventModal.name}
            </ModalHeader>
            <ModalBody>
              <Image
                src={eventModal.image}
                alt={eventModal.name}
                width={200}
                height={200}
              />
              {eventModal.description}
              <div className="text-xs">
                {eventModal.endingDate ? (
                  <>
                    du{" "}
                    {new Date(eventModal.startingDate).toLocaleDateString(
                      "fr-FR",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      }
                    )}{" "}
                    au{" "}
                    {new Date(eventModal.endingDate).toLocaleDateString(
                      "fr-FR",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      }
                    )}
                  </>
                ) : (
                  <>
                    {}
                    {/* du {eventModal.startingDate} au {eventModal.endingDate} */}
                  </>
                )}{" "}
                a {eventModal.city} - {eventModal.address}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onPress={() => {
                  onClose();
                }}
              >
                ok
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
