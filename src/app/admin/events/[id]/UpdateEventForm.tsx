"use client";

import {
  Button,
  DatePicker,
  DateValue,
  Input,
  Textarea,
} from "@nextui-org/react";
import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { I18nProvider } from "@react-aria/i18n";
import { Event } from "@prisma/client";
import { getLocalTimeZone, now } from "@internationalized/date";
import { useTheme } from "next-themes";

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

export default function UpdateEventForm({
  event,
}: {
  event: Event & { [key: string]: any };
}) {
  const { theme } = useTheme();
  const [form, setForm] = useState<FormState>(initialFormState);
  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (event == undefined) return;
    setForm((prevForm) => ({
      ...prevForm,
      name: event?.name,
      description: event?.description,
      city: event?.city,
      address: event?.address,
      zipCode: event?.zipCode,
      price: String(event.price),
      startingDate: event?.startingDate,
      endingDate: event?.endingDate,
      url: event?.url || undefined,
      image: event?.image,
    }));
    setFileName(event?.image);
  }, [event]);

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
      if (value === "price") {
        setForm((prevForm) => ({
          ...prevForm,
          price: String(value),
        }));
      } else {
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value && value != event[key]) {
        formData.append(key, value);
      }
    });

    const response = await fetch(`/api/event/${event.id}/update`, {
      method: "PATCH",
      body: formData,
    });

    if (response.ok) {
      alert("Event updated successfully");
      window.location.href = "/admin/events";
    } else {
      alert("An error occured while updating the event");
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
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="flex flex-col gap-5 items-center">
        <div className="w-1/3">
          <Input
            label="Nom"
            name="name"
            placeholder="Nom de l'événement"
            variant="bordered"
            value={form.name}
            onChange={handleChange}

            // required
          />
        </div>
        <div className="flex flex-row gap-5">
          <div className="flex flex-col gap-5 items-center">
            <Image
              src={previewImage ?? event.image}
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
          </div>
          <div>
            <Textarea
              className="w-96 min-h-full"
              label="description"
              name="description"
              placeholder="Description de l'événement"
              variant="bordered"
              value={form.description}
              onChange={handleChange}
              // required
            />
          </div>
        </div>
        <div className="flex flex-row gap-5 items-center w-full">
          <div className="flex flex-col gap-2 w-full">
            <Input
              label="Adresse"
              name="address"
              placeholder="Adresse de l'événement"
              variant="bordered"
              value={form.address}
              onChange={handleChange}
              // required
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
                // required
              />
              <Input
                label="Ville"
                name="city"
                placeholder="Ville"
                variant="bordered"
                value={form.city}
                onChange={handleChange}
                // required
              />
            </div>
          </div>
          <Input
            label="url"
            name="url"
            placeholder="url de l'événement"
            variant="bordered"
            type="url"
            value={form.url || ""}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-row gap-5 w-full items-end">
          <div className="w-full items-center">
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
              // required
            />
          </div>

          <div className="flex flex-col gap-2 w-full items-center">
            <span>
              du{" "}
              {new Date(event.startingDate).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}{" "}
              au{" "}
              {new Date(event.endingDate).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </span>
            <span className="text-xs">
              laisser vide pour ne pas changer la date
            </span>
            <div className="flex flex-row gap-2">
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
            </div>
          </div>
        </div>
        <Button type="submit" color={theme == "dark" ? "secondary" : "primary"}>
          <span style={{ color: theme == "dark" ? "black" : "inherit" }}>
            Valider
          </span>
        </Button>
      </div>
    </form>
  );
}
