"use client";
import { useForm, SubmitHandler } from "react-hook-form";

import { useContext, useEffect, useMemo, useState } from "react";
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
  CAR_AND_HOST_POOL_STEPS,
  EVENT_STEPS,
  HOST_POOL_STEPS,
  INTRO_CAR_STEPS,
  INTRO_EVENT_STEPS,
  SUCCESS_STEPS,
} from "./utils/stepsService";
import {
  ApiError,
  createEvent,
  createGroup,
  uploadFile,
} from "./utils/actions";
import { Category } from "@prisma/client";

interface StepProps {
  isLast: boolean;
  isDark: boolean;
  transition: boolean;
  title: string;
  subtitle: string;
  isTransition?: boolean;
  schema: any;
  renderInputFields: (control: any, onChange: any) => any;
  pageHelper?: (options: string[]) => any;
  onSubmit?: (data: any, userId: number, groupId?: number) => void;
}

interface IFormInputs {
  name: string;
  image: File;
  start: any;
  end: any;
  choices: string[];
}

interface FormProps {
  userId: number;
  eventId?: number;
  categories?: Category[];
  children?: React.ReactNode;
  successCallBack?: () => void;
  [key: string]: any;
}

const EventForm = ({
  eventId,
  userId,
  children,
  categories,
  successCallBack,
  ...props
}: FormProps) => {
  const [[currentPage, direction], setPage] = useState([0, 0]);
  const initialStep = eventId ? CHOICE_STEPS : INTRO_EVENT_STEPS;
  const mainStep = eventId ? [] : EVENT_STEPS;
  const successStep = eventId ? [] : SUCCESS_STEPS;
  function trst() {
    //si groupId
  }

  const [pages, setPages] = useState<any[]>([
    ...initialStep,
    ...mainStep,
    ...successStep,
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { setIsDark, setIsOpen } = useContext(
    ModalContext
  ) as ModalContextProps;

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<IFormInputs>({
    resolver: yupResolver(
      yup.object(pages[currentPage].schema as any).required()
    ) as any,
    defaultValues: {
      //start: "2022-04-17" /* now(getLocalTimeZone())*/,
    },
  });

  const watchedChoices = watch("choices");

  const buttonLabel = useMemo(() => {
    if (!!error) return "Réesayer";
    if (eventId) {
      if (currentPage === pages.length - 1) return "Terminer";
      return watchedChoices && watchedChoices.length > 0
        ? "Suivant"
        : "Terminer";
    } else {
      return currentPage === pages.length - 1
        ? "Retour vers votre événement"
        : "Suivant";
    }
  }, [watchedChoices, pages, error, currentPage]);

  useEffect(() => {
    currentPage === 0 && setIsDark(true);
    currentPage > 0 && setIsDark(false);
  }, [currentPage, setIsDark]);

  const paginate = (newDirection: number) => {
    setPage([currentPage + newDirection, newDirection]);
  };

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    if (!!error) setIsOpen(false);

    if (eventId) {
      if (pages.length !== 1 && currentPage !== pages.length - 1) {
        paginate(1);
      }
    } else if (currentPage !== pages.length - 1) {
      paginate(1);
    }

    try {
      if (eventId) {
        if (
          pages[currentPage].transition &&
          (!watchedChoices || watchedChoices?.length == 0)
        ) {
          await pages[currentPage].onSubmit?.(data, userId, eventId, setError);
          if (currentPage === pages.length - 1) {
            successCallBack?.();
            setIsOpen(false);
          }
        } else if (!pages[currentPage].transition) {
          await pages[currentPage].onSubmit?.(data, userId, eventId);
        }

        if (pages[currentPage].isLast) setIsOpen(false);
      } else {
        await pages[currentPage].onSubmit?.(data, userId, eventId);
        if (currentPage === pages.length - 1) {
          successCallBack?.();
          setIsOpen(false);
        }
      }
    } catch (error) {
      setIsDark(false);
      setError((error as ApiError).message);
    }
  };
  const pagesHelper = (choices: string[]) => {
    if (eventId) {
      switch (true) {
        case choices.includes("Covoiturage") && choices.includes("Hébergement"):
          setPages([
            ...CHOICE_STEPS,
            ...CAR_AND_HOST_POOL_STEPS,
            ...SUCCESS_STEPS,
          ]);
          break;
        case choices.includes("Covoiturage"):
          setPages([...CHOICE_STEPS, ...CAR_POOL_STEPS, ...SUCCESS_STEPS]);
          break;
        case choices.includes("Hébergement"):
          setPages([...CHOICE_STEPS, ...HOST_POOL_STEPS, ...SUCCESS_STEPS]);
          break;
        default:
          setPages([...CHOICE_STEPS]);
          break;
      }
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
      className="flex flex-col justify-between items-stretch space-y-6 h-[500px]"
    >
      {currentPage !== pages.length - 1 && currentPage !== 0 && (
        <Loader
          currentStep={getSCurrentStep()}
          totalSteps={getStepLength()}
          className="flex relative flex-row space-x-4 w-100 h-1"
        />
      )}
      {!!error ? (
        <Typography variant="h1" className="bg-red mx-auto">
          {error}
        </Typography>
      ) : (
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
                      } tracking-wide w-full`}
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
                      step.renderInputFields(control, pagesHelper, categories)}
                  </motion.div>
                </motion.div>
              )
          )}
        </AnimatePresence>
      )}

      <footer className="flex  align-middle justify-around ">
        {currentPage > 0 && currentPage < pages.length - 1 && (
          <Button onClick={() => paginate(-1)} size="md" color="outlined">
            Retour
          </Button>
        )}
        <Button color="contained" onClick={handleNext}>
          {buttonLabel}
          {/* {currentPage === pages.length - 1
            ? "Retour vers votre événement"
            : "Suivant"} */}
        </Button>
      </footer>
    </form>
  );
};
export default EventForm;
