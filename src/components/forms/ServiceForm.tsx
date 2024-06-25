"use client";
import { useForm, SubmitHandler } from "react-hook-form";

import { useContext, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";

import Loader from "./utils/Loader";
import { AnimatePresence, motion } from "framer-motion";
import Typography from "../ui/Typography";
import Button from "./utils/Button";
import { ModalContext, ModalContextProps } from "./utils/Modal";
import { variantBox, variantText } from "./utils/variants";
import {
  CAR_POOL_STEPS,
  CHOICE_STEPS,
  EVENT_STEPS,
  SUCCESS_STEPS,
} from "./utils/steps";
interface StepProps {
  transition: boolean;
  title: string;
  subtitle: string;
  isTransition?: boolean;
  schema: any;
  renderInputFields: (control: any, onChange: any) => any;
  pageHelper?: (options: string[]) => any;
}
interface IFormInputs {
  name: string;
  image: File;
  start: any;
  end: any;
}
interface FormProps {
  userId: string;
  currentPage?: number;
  children?: React.ReactNode;
  [key: string]: any;
}

const EventForm = ({ userId, children, ...props }: FormProps) => {
  const [[currentPage, direction], setPage] = useState([0, 0]);
  const [pages, setPages] = useState<StepProps[]>([
    ...CHOICE_STEPS,
    ...EVENT_STEPS,
    ...SUCCESS_STEPS,
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsDark, setIsOpen } = useContext(
    ModalContext
  ) as ModalContextProps;

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    reset,
  } = useForm<IFormInputs>({
    resolver: yupResolver(
      yup.object(pages[currentPage].schema as any).required()
    ) as any,
    defaultValues: {
      //start: "2022-04-17" /* now(getLocalTimeZone())*/,
    },
  });

  useEffect(() => {
    currentPage === 0 && setIsDark(true);
  }, [currentPage, setIsDark]);

  const paginate = (newDirection: number) => {
    setPage([currentPage + newDirection, newDirection]);
  };

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    if (currentPage == pages.length - 1) {
      const filename = data.image.name;
      const fileType = data.image.type;

      try {
        const res = await fetch(
          `/api/presign?file=${filename}&fileType=${fileType}`
        );
        const { url } = await res.json();
        const upload = await fetch(url, {
          method: "PUT",
          body: data.image,
          headers: { "Content-Type": fileType },
        });
        setIsLoading(false);
        if (upload.ok) {
          const imageUrl = new URL(url);

          console.log(`${imageUrl.origin}${imageUrl.pathname}`);
          // const eventData = {
          //   ...data,
          //   image: `${imageUrl.origin}${imageUrl.pathname}`,
          //   latitude: "00000000.4444444",
          //   longitude: "00000000.4444444",
          //   categoryId: 1,
          //   userId,
          // };
          // const response = await fetch("/api/event/create/aws", {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify(eventData),
          // });
          // if (response.ok) {
          //   alert("Event created successfully!");
          // } else {
          //   const errorData = await response.json();
          //   console.error(errorData);
          // }
        } else {
          console.error("Upload failed.");
        }
        paginate(1);
      } catch (error) {
        console.log(error);
      }
    } else {
      paginate(1);
      setIsDark(false);
    }
    if (currentPage === pages.length - 1) setIsOpen(false);
  };
  const pagesHelper = (choices: string[]) => {
    switch (true) {
      case choices.includes("Covoiturage"):
        setPages([
          ...CHOICE_STEPS,
          ...EVENT_STEPS,
          ...CAR_POOL_STEPS,
          ...SUCCESS_STEPS,
        ]);
        break;
      default:
        setPages([...CHOICE_STEPS, ...EVENT_STEPS, ...SUCCESS_STEPS]);
        break;
    }
  };
  const handleNext = () => {
    handleSubmit(onSubmit)();
  };

  //size of step in loader page success et transition
  const getStepLength = () => pages.length - 2;
  //current step for loader is currentpage minus 2 step for succes and transition
  const getSCurrentStep = () => {
    if (currentPage === 0) return 0;
    return currentPage - 1;
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between items-stretch space-y-6 h-[500px] w-[380px]"
    >
      {currentPage !== pages.length - 1 && currentPage !== 0 && (
        <Loader
          currentStep={getSCurrentStep()}
          totalSteps={getStepLength()}
          className="flex relative flex-row space-x-4 w-100 h-1"
        />
      )}

      <AnimatePresence initial={false} custom={direction} mode="wait">
        {pages.map(
          (step, index) =>
            currentPage === index && (
              <motion.div
                key={currentPage}
                custom={direction}
                variants={variantText}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex  flex-1 flex-col space-y-8  items-center overflow-hidden w-full"
              >
                <span className="space-y-5">
                  <Typography
                    variant="h3"
                    className={`${
                      step.transition ? "text-white" : "text-black"
                    } tracking-wide`}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    variant="p"
                    className={`${
                      step.transition ? "text-white" : "text-black"
                    } tracking-wide`}
                  >
                    {step.subtitle}
                  </Typography>
                </span>

                <motion.div
                  key={currentPage}
                  custom={direction}
                  variants={variantBox}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex w-full flex-1 justify-center items-center flex-col space-y-4"
                >
                  {step.renderInputFields &&
                    step.renderInputFields(control, pagesHelper)}
                </motion.div>
              </motion.div>
            )
        )}
      </AnimatePresence>
      <footer className="flex  align-middle justify-around ">
        {currentPage > 0 && currentPage < pages.length - 1 && (
          <Button onClick={() => paginate(-1)} size="md" color="outlined">
            Retour
          </Button>
        )}
        <Button color="contained" onClick={handleNext}>
          {currentPage === pages.length - 1
            ? "Retour vers votre événement"
            : "Suivant"}
        </Button>
      </footer>
    </form>
  );
};
export default EventForm;
