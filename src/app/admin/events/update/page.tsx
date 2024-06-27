"use client";

import { Button, DatePicker, Input, Textarea } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";
import {
  ZonedDateTime,
  getLocalTimeZone,
  DateValue,
  now,
  today,
} from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import Menu from "../../menu";

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

export default function UpdateEventPage() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  return (
    <>
      <main className="flex flex-col my-5">
        <section id="top" className="pl-0 md:px-9 flex flex-row">
          <div className="flex flex-row gap-10 flex-auto self-center">
            <Menu labelActive="Evenements" />
            <div className="flex flex-col w-full h-full gap-10"></div>
            <></>
          </div>
        </section>
      </main>
      <form>
        <Input
          label="Nom"
          name="name"
          placeholder="Nom de l'événement"
          variant="bordered"
          value={form.name}
          //   onChange={handleChange}
          // required
        />
        <Textarea
          label="description"
          name="description"
          placeholder="Description de l'événement"
          variant="bordered"
          value={form.description}
          //   onChange={handleChange}
          // required
        />
        <Input
          label="url"
          name="url"
          placeholder="url de l'événement"
          variant="bordered"
          type="url"
          value={form.url || ""}
          //   onChange={handleChange}
        />
        <Input
          label="Prix"
          name="price"
          placeholder="Prix de l'événement"
          variant="bordered"
          type="number"
          value={form.price}
          //   onChange={handleChange}
          min={0}
          //   isInvalid={!isValidPrice}
          //   color={!isValidPrice ? "danger" : "default"}
          //   errorMessage={
          //     !isValidPrice
          //       ? "Le prix doit être supérieur a zero ( zero si gratuit)"
          //       : ""
          //   }
          // required
        />
        <Input
          label="Adresse"
          name="address"
          placeholder="Adresse de l'événement"
          variant="bordered"
          value={form.address}
          //   onChange={handleChange}
          // required
        />
        <div className="flex flex-row gap-5">
          <Input
            label="zipCode"
            name="zipCode"
            placeholder="Code postal"
            variant="bordered"
            value={form.zipCode}
            // onChange={handleChange}
            // isInvalid={!isvalidZipcode}
            // color={!isvalidZipcode ? "danger" : "default"}
            // errorMessage={
            //   !isvalidZipcode
            //     ? "Le code postal doit être composé de 5 chiffres"
            //     : ""
            // }
            // required
          />
          <Input
            label="Ville"
            name="city"
            placeholder="Ville"
            variant="bordered"
            value={form.city}
            // onChange={handleChange}
            // required
          />
        </div>
        {/* <Image
          src={previewImage ?? eventModal.image}
          alt="event image"
          width={400}
          height={400}
        /> */}
        <div className="flex flex-row gap-5">
          <label className="hidden">Image</label>
          <input
            type="file"
            accept="image/*"
            name="image"
            id="image"
            // onChange={handleChange}
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
        <div>
          {/* <span>
            du{" "}
            {new Date(eventModal.startingDate).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}{" "}
            au{" "}
            {new Date(eventModal.endingDate).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </span> */}
          <div className="flex flex-col gap-2">
            <span className="text-xs">
              laisser vide pour ne pas changer la date
            </span>
            <I18nProvider locale="fr-FR">
              <DatePicker
                label={"a partir de"}
                // minValue={now(getLocalTimeZone())}
                name="startingDate"
                // onChange={handleStratingDateChange}
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
                // minValue={now(getLocalTimeZone())}
                name="endingDate"
                // onChange={handleEndingDateChange}
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
      </form>
    </>
  );
}
