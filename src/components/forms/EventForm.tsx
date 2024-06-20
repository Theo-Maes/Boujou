"use client";
import { useForm, SubmitHandler } from "react-hook-form";

import { Children, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "./TextField";
import React from "react";
import ImageField from "./ImageField";
import DatePickerField from "./DatePickerField";
import Loader from "./Loader";
import { AnimatePresence, motion } from "framer-motion";
import Typography from "../ui/Typography";
import Button from "./Button";
import Image from "next/image";
import TextAreaField from "./TextAreaField";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const variantText = {
  initial: {
    opacity: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      delayChildren: 1,
    },
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      delayChildren: 1,
    },
  },
  exit: {
    opacity: 0,
  },
};

const STEPS = [
  {
    title: "Info generale de l'evenement",
    subtitle: "Veuillez renseignez les informations ci dessous",
    schema: {
      name: yup.string().required(),
    },
    renderInputFields: (control: any) => (
      <div className="grid grid-cols-4 gap-4 justify-center items-center ">
        <TextField
          control={control}
          name="name"
          label={"Nom de l'evenement"}
          className="col-span-4 text-black border-blue-500 hover:border-blue-500"
        />
        <TextField
          control={control}
          name="address"
          label={"Adresse"}
          className="col-span-4"
        />
        <TextField
          control={control}
          name="zipCode"
          label={"Code postale"}
          className="col-span-2"
        />
        <TextField
          control={control}
          name="city"
          label={"Ville"}
          className="col-span-2"
        />
      </div>
    ),
  },
  {
    title: "Dates de l'evenement",
    subtitle: "Choisir dates et heures de debut et fin d'événement",
    schema: {
      startingDate: yup.string().required(),
    },
    renderInputFields: (control: any) => (
      <div className="flex flex-row justify-center items-center">
        <DatePickerField
          control={control}
          label="Début"
          name={"startingDate"}
          className="col-span-2"
        />
        <Image
          className="mx-2 drop-shadow-lg"
          src="/icons/form/arrows.png"
          alt="Apple Logo"
          width={24}
          height={24}
        />
        <DatePickerField
          control={control}
          label="Fin"
          name={"endingDate"}
          className="col-span-2"
        />
      </div>
    ),
  },
  {
    title: "Affiche de l'événement",
    subtitle: "Choisir un visuel, ce dernier sera visible dans le catalogue",
    schema: {
      image: yup
        .mixed()
        .required("Image is required")
        .test("is-file", "The selected file is not valid", (value) => {
          return value instanceof File;
        }),
    },
    renderInputFields: (control: any) => (
      <div className="flex flex-1 flex-col justify-center items-center">
        <ImageField
          control={control}
          name="image"
          isLoading={false}
          className="flex flex-1 flex-col justify-center"
        />
      </div>
    ),
  },
  {
    title: "Tarif de l'événement",
    subtitle: "Veullez renseigner un tarif",
    schema: {
      price: yup.number().required("Tarif est obligatoire"),
    },
    renderInputFields: (control: any) => (
      <div className="flex flex-row justify-center items-center">
        <TextField
          control={control}
          name="price"
          isLoading={false}
          className="col-span-2"
          label={"Tarif"}
          endIcon="dollars"
        />
      </div>
    ),
  },
  {
    title: "Web site et description",
    subtitle: "Veullez fournir une bref description et une url d'un site",
    schema: {
      description: yup.string().required(),
      website: yup.string().required(),
    },
    renderInputFields: (control: any) => (
      <div className="flex flex-col justify-center items-center">
        <TextAreaField
          control={control}
          name="description"
          isLoading={false}
          className="w-full"
          label={"Tarif"}
        />

        <TextField
          control={control}
          name="website"
          isLoading={false}
          className="col-span-2"
          label={"Website url"}
        />
      </div>
    ),
  },
];

interface IFormInputs {
  name: string;
  image: File;
  start: any;
  end: any;
}
interface FormProps {
  userId: string;
  page?: number;
  children?: React.ReactNode; // Typage pour les enfants
  // Ajouter d'autres props si nécessaire
  [key: string]: any; // Pour les autres props optionnelles
}

const EventForm = ({ userId, children, ...props }: FormProps) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const pages = Children.toArray(children);
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    reset,
  } = useForm<IFormInputs>({
    resolver: yupResolver(
      yup.object(STEPS[page].schema as any).required()
    ) as any,
    defaultValues: {
      //start: "2022-04-17" /* now(getLocalTimeZone())*/,
      end: "2022-05-17",
    },
  });

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };
  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    if (page == STEPS.length - 1) {
      const filename = data.image.name;
      const fileType = data.image.type;

      const res = await fetch(
        `/api/presign?file=${filename}&fileType=${fileType}`
      );
      try {
        const { url } = await res.json();

        const upload = await fetch(url, {
          method: "PUT",
          body: data.image,
          headers: { "Content-Type": fileType },
        });
        setIsLoading(false);
        if (upload.ok) {
          const imageUrl = new URL(url);

          const eventData = {
            ...data,
            image: `${imageUrl.origin}${imageUrl.pathname}`,
            latitude: "00000000.4444444",
            longitude: "00000000.4444444",
            categoryId: 1,
            userId,
          };
          const response = await fetch("/api/event/create/aws", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(eventData),
          });

          if (response.ok) {
            alert("Event created successfully!");
          } else {
            const errorData = await response.json();

            console.error(errorData);
          }
        } else {
          console.error("Upload failed.");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      paginate(1);
    }
  };
  const handleNext = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between space-y-6 h-[500px]"
    >
      <Loader
        currentStep={page}
        totalSteps={STEPS.length}
        className="flex relative flex-row space-x-4 w-100 h-1"
      />
      <AnimatePresence initial={false} custom={direction} mode="wait">
        {STEPS.map(
          (step, index) =>
            page === index && (
              <motion.div
                key={page}
                custom={direction}
                variants={variantText}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-1 flex-col space-y-8 overflow-hidden"
              >
                <span className="space-y-2">
                  <Typography variant="h4">{STEPS[page].title}</Typography>
                  <Typography variant="body">{STEPS[page].subtitle}</Typography>
                </span>

                <motion.div
                  key={page}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-1 justify-center flex-col space-y-4"
                >
                  {STEPS[page].renderInputFields &&
                    STEPS[page].renderInputFields(control)}
                </motion.div>
              </motion.div>
            )
        )}
      </AnimatePresence>
      <footer className="flex  align-middle justify-around ">
        <Button onClick={() => paginate(-1)} size="md" color="outlined">
          Retour
        </Button>
        <Button color="contained" onClick={handleNext}>
          Suivant
        </Button>
      </footer>
    </form>
  );
};
export default EventForm;
