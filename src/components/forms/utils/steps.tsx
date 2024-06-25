import * as yup from "yup";
import Image from "next/image";
import CheckBoxField from "../CheckBoxField";
import TextField from "../TextField";
import DatePickerField from "../DatePickerField";
import TextAreaField from "../TextAreaField";
import ImageField from "../ImageField";
import Typography from "@/components/ui/Typography";
export const CHOICE_STEPS = [
  {
    title: "Partager Un Service ?",
    subtitle:
      "Souhaitez vous mettre à disposition du collectif un covoiturage et/ou un hébergement ?",
    schema: {
      choices: yup.mixed().notRequired(),
    },
    type: "checkbox",
    options: ["Hébergement", "Covoiturage"],

    renderInputFields: (control: any, onChange?: any) => (
      <div className="flex flex-1 flex-col justify-center items-center">
        <CheckBoxField
          control={control}
          name="choices"
          className="col-span-4 text-black border-blue-500 hover:border-blue-500"
          options={["Hébergement", "Covoiturage"]}
          onChange={onChange}
        />
      </div>
    ),
  },
];
export const CAR_POOL_STEPS = [
  {
    title: "Adresse",
    subtitle: "Veuillez renseignez le lieu du rendez vous",
    schema: {
      adresse: yup.string().required(),
    },
    renderInputFields: (control: any) => (
      <div className="grid grid-cols-4 gap-4 justify-center items-center ">
        <TextField
          control={control}
          name="adresse"
          placeholder="35 rue gessard, rouen"
          className="col-span-4 text-black border-blue-500 hover:border-blue-500"
          endIcon="location"
        />
      </div>
    ),
  },
  {
    title: "Vos horaires",
    subtitle: "Veuillez renseignez vos dates de départ et retour",
    schema: {
      startingDate: yup.string().required(),
    },
    renderInputFields: (control: any) => (
      <div className="flex flex-col gap-y-5 justify-center items-center">
        <DatePickerField
          control={control}
          label="Départ"
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
          label="Retour"
          name={"endingDate"}
          className="col-span-2"
        />
      </div>
    ),
  },
  {
    title: "Places disponibles",
    subtitle: "Renseignez le nombre de place dans le champ ci-dessous",
    schema: {
      quantity: yup.number().required(),
    },
    renderInputFields: (control: any) => (
      <div className="grid grid-cols-4 gap-4 justify-center items-center ">
        <TextField
          control={control}
          name="quantity"
          placeholder="3 places"
          className="col-span-4 text-black border-blue-500 hover:border-blue-500"
          endIcon="car"
        />
      </div>
    ),
  },
  {
    title: "Description",
    subtitle:
      "Ce message sera lu par vos futurs utilisateurs. Veuillez fournir une bref description.",
    schema: {
      description: yup.string().required(),
    },
    renderInputFields: (control: any) => (
      <div className="flex flex-col justify-center items-center">
        <TextAreaField
          control={control}
          name="description"
          placeholder="J'ai 3 places disponibles vous êtes les bienvenus."
          isLoading={false}
          className="w-full"
          label={"Tarif"}
        />
      </div>
    ),
  },
];

export const EVENT_STEPS = [
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
      <div className="flex flex-col justify-center items-center">
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

export const SUCCESS_STEPS = [
  {
    title: "",
    subtitle: "",
    schema: {
      name: yup.string().required(),
    },
    renderInputFields: (control: any) => (
      <div className="flex flex-col justify-center items-center">
        <Image
          className="mx-2 drop-shadow-lg"
          src="/icons/form/checked.png"
          alt="boujou normandie événement"
          width={150}
          height={150}
        />
        <Typography variant="h1">Votre service a été enregistré</Typography>
      </div>
    ),
  },
];
