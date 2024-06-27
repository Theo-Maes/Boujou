"use client";

import { Roboto } from "next/font/google";
import {
  Button,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { Event } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  ZonedDateTime,
  getLocalTimeZone,
  DateValue,
  now,
  today,
} from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import { getTime } from "date-fns";

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
  startingDate?: Date;
  endingDate?: Date;
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
  const [page, setPage] = useState(1);
  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (eventModal == undefined) return;
    setForm((prevForm) => ({
      ...prevForm,
      name: eventModal?.name,
      description: eventModal?.description,
      city: eventModal?.city,
      address: eventModal?.address,
      zipCode: eventModal?.zipCode,
      price: String(eventModal?.price),
      startingDate: eventModal?.startingDate,
      endingDate: eventModal?.endingDate,
      url: eventModal?.url || undefined,
      image: eventModal?.image,
    }));
    setFileName(eventModal?.image);
  }, [eventModal]);

  const handleStratingDateChange = (value: DateValue | null) => {
    if (value) {
      setForm((prevForm) => ({
        ...prevForm,
        ["startingDate"]: value.toDate(getLocalTimeZone()),
      }));
    }
  };

  const handleEndingDateChange = (value: DateValue | null) => {
    if (value) {
      setForm((prevForm) => ({
        ...prevForm,
        ["endingDate"]: value.toDate(getLocalTimeZone()),
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = e.target.files?.[0];
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        setPreviewImage(previewUrl);
      }
    }

    if (name === "image" && files?.[0]) {
      const file = files[0];
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prevForm) => ({
          ...prevForm,
          avatar: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
    }
  };

  const validateZipcode = (value: string) => /^\d{5}$/.test(value);
  const isvalidZipcode = useMemo(
    () =>
      form.zipCode != undefined &&
      form.zipCode !== "" &&
      validateZipcode(form.zipCode),
    [form.zipCode]
  );
  const isValidPrice = useMemo(() => Number(form.price) >= 0, [form.price]);

  return (
    <>
      <form encType="multipart/form-data">
        {eventModal && (
          <>
            <Modal isOpen={isOpen && page == 1} hideCloseButton={true}>
              <ModalContent>
                <ModalHeader className="flex flex-col items-center gap-1">
                  Modification de {eventModal.name}
                </ModalHeader>
                <ModalBody>
                  <Input
                    label="Nom"
                    name="name"
                    placeholder="Nom de l'événement"
                    variant="bordered"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />

                  <Textarea
                    label="description"
                    name="description"
                    placeholder="Description de l'événement"
                    variant="bordered"
                    value={form.description}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="url"
                    name="url"
                    placeholder="url de l'événement"
                    variant="bordered"
                    type="url"
                    value={form.url || ""}
                    onChange={handleChange}
                  />
                  <Input
                    label="Prix"
                    name="price"
                    placeholder="Prix de l'événement"
                    variant="bordered"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    min={0}
                    isInvalid={!isValidPrice}
                    color={!isValidPrice ? "danger" : "default"}
                    errorMessage={
                      !isValidPrice
                        ? "Le prix doit être supérieur a zero ( zero si gratuit)"
                        : ""
                    }
                    required
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    onPress={() => {
                      onClose();
                    }}
                  >
                    Annuler
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      if (isValidPrice) setPage(page + 1);
                    }}
                  >
                    Suivant
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Modal isOpen={isOpen && page == 2} hideCloseButton={true}>
              <ModalContent>
                <ModalHeader className="flex flex-col items-center gap-1">
                  Modification de {eventModal.name}
                </ModalHeader>
                <ModalBody>
                  <Input
                    label="Adresse"
                    name="address"
                    placeholder="Adresse de l'événement"
                    variant="bordered"
                    value={form.address}
                    onChange={handleChange}
                    required
                  />
                  <div className="flex flex-row gap-5">
                    <Input
                      label="zipCode"
                      name="zipCode"
                      placeholder="Code postal"
                      variant="bordered"
                      value={form.zipCode}
                      onChange={handleChange}
                      isInvalid={!isvalidZipcode}
                      color={!isvalidZipcode ? "danger" : "default"}
                      errorMessage={
                        !isvalidZipcode
                          ? "Le code postal doit être composé de 5 chiffres"
                          : ""
                      }
                      required
                    />
                    <Input
                      label="Ville"
                      name="city"
                      placeholder="Ville"
                      variant="bordered"
                      value={form.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    onPress={() => {
                      onClose();
                    }}
                  >
                    Annuler
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      if (isvalidZipcode) setPage(page + 1);
                    }}
                  >
                    Suivant
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Modal isOpen={isOpen && page == 3} hideCloseButton={true}>
              <ModalContent>
                <ModalHeader className="flex flex-col items-center gap-1">
                  Modification de {eventModal.name}
                </ModalHeader>
                <ModalBody className="flex flex-col gap-5 items-center">
                  <Image
                    src={previewImage ?? eventModal.image}
                    alt="event image"
                    width={400}
                    height={400}
                  />
                  <div className="flex flex-row gap-5">
                    <label className="hidden">Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      name="image"
                      id="image"
                      onChange={handleChange}
                      className="hidden"
                    />
                    <Button
                      as="label"
                      htmlFor="image"
                      variant="bordered"
                      className="cursor-pointer text-left text-gray-500 dark:text-gray-400 flex justify-between"
                    >
                      <span className="mr-1">Image</span>
                      {fileName ? (
                        <span className="mr-1">{fileName}</span>
                      ) : (
                        <span className="mr-1">Choisir un fichier</span>
                      )}
                      <span className="mr-1"></span>
                    </Button>
                    <Button
                      variant="ghost"
                      color="secondary"
                      className="h-10"
                      onClick={() => {
                        form.image = "";
                        setFileName(undefined);
                        setPreviewImage(null);
                      }}
                    >
                      Réinitialiser
                    </Button>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    onPress={() => {
                      onClose();
                    }}
                  >
                    Annuler
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      setPage(page + 1);
                    }}
                  >
                    Suivant
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Modal isOpen={isOpen && page >= 4} hideCloseButton={true}>
              <ModalContent>
                <ModalHeader className="flex flex-col items-center gap-1">
                  Modification de {eventModal.name}
                </ModalHeader>
                <ModalBody>
                  <I18nProvider locale="fr-FR">
                    <DatePicker
                      label={"a partir de"}
                      minValue={now(getLocalTimeZone())}
                      name="startingDate"
                      onChange={handleStratingDateChange}
                      className="max-w-md"
                      showMonthAndYearPickers
                      granularity="second"
                      selectorIcon={
                        <Image
                          className="drop-shadow-lg"
                          src={"/icons/form/calendar.svg"}
                          alt="Calendar icon"
                          width={24}
                          height={24}
                        />
                      }
                    />
                  </I18nProvider>
                  <I18nProvider locale="fr-FR">
                    <DatePicker
                      label={"jusqu'a"}
                      minValue={now(getLocalTimeZone())}
                      name="endingDate"
                      onChange={handleEndingDateChange}
                      className="max-w-md"
                      showMonthAndYearPickers
                      granularity="second"
                      selectorIcon={
                        <Image
                          className="drop-shadow-lg"
                          src={"/icons/form/calendar.svg"}
                          alt="Calendar icon"
                          width={24}
                          height={24}
                        />
                      }
                    />
                  </I18nProvider>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    onPress={() => {
                      onClose();
                    }}
                  >
                    Annuler
                  </Button>
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
          </>
        )}
      </form>
    </>
  );
}
