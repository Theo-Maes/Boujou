"use client";

import { Roboto } from "next/font/google";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { Event } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

interface FormState {
  name?: string;
  description?: string;
  city?: string;
  address?: string;
  zipCode?: string;
  price?: string;
  startingDate?: string;
  endingDate?: string;
  url?: string;
  image?: string;
}

const initialFormState: FormState = {
  name: undefined,
  description: undefined,
  city: undefined,
  address: undefined,
  zipCode: undefined,
  price: undefined,
  startingDate: undefined,
  endingDate: undefined,
  url: undefined,
  image: undefined,
};

export default function ModalUpdateEvent({
  eventModal,
  isOpen,
  onClose,
}: {
  eventModal: Event | undefined;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FormState>(initialFormState);

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      name: eventModal?.name,
      description: eventModal?.description,
      city: eventModal?.city,
      address: eventModal?.address,
      zipCode: eventModal?.zipCode,
      price: String(eventModal?.price),
      startingDate: String(eventModal?.startingDate),
      endingDate: String(eventModal?.endingDate),
      url: eventModal?.url || undefined,
      image: eventModal?.image,
    }));
  }, [eventModal]);
  return (
    <>
      <form>
        {eventModal && (
          <Modal isOpen={isOpen} hideCloseButton={true}>
            <ModalContent>
              <ModalHeader className="flex flex-col items-center gap-1">
                Modification de {eventModal.name}
              </ModalHeader>
              <ModalBody>
                <Input label="Nom" value={eventModal.name} />
                <Input
                  fullWidth
                  label="Email *"
                  type="email"
                  variant="bordered"
                  name="email"
                  value={eventModal.name}
                  //   onChange={handleChange}
                  //   isInvalid={isInvalidEmail}
                  color={false ? "danger" : "default"}
                  //   errorMessage={
                  //     isInvalidEmail ? "L'email n'est pas valide" : ""
                  //   }
                  //   disabled={!!initialValues.email}
                  required
                />
                {/* <div className="flex flex-col self-center">
                  <Image
                    src={eventModal.image}
                    alt={eventModal.name}
                    width={200}
                    height={200}
                  />
                </div> */}
                <Textarea
                  label="a"
                  name="a"
                  variant="bordered"
                  placeholder="aaa"
                  value={eventModal.description}
                />
                <Input label="Lieu" value={eventModal.city} />
                <Input label="Adresse" value={eventModal.address} />
                <Input label="zipcode" value={eventModal.zipCode} />
                <Input label="Prix" value={String(eventModal.price)} />
                <Input label="Début" value={String(eventModal.startingDate)} />
                <Input label="Fin" value={String(eventModal.endingDate)} />
                <Input label="Lien" value={eventModal.url || ""} />
                <Input label="Image" value={eventModal.image} />

                {/* <div className="text-xs">
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
                    <>le {eventModal.startingDate}</>
                  )}{" "}
                  à {eventModal.city} - {eventModal.address}
                </div>
                <div>
                  {eventModal.price === 0 ? (
                    "Gratuit"
                  ) : (
                    <>{eventModal.price}€</>
                  )}
                </div> */}
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
      </form>
    </>
  );
}
