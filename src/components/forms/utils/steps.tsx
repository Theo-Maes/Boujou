import * as yup from "yup";
import Image from "next/image";
import CheckBoxField from "../CheckBoxField";
import TextField from "../TextField";
import DatePickerField from "../DatePickerField";
import TextAreaField from "../TextAreaField";
import ImageField from "../ImageField";
import Typography from "@/components/ui/Typography";
import {
  ZonedDateTime,
  getLocalTimeZone,
  DateValue,
  now,
  today,
} from "@internationalized/date";

export const CHOICE_STEPS = [
  {
    transition: true,
    title: "Partager Un Service ?",
    subtitle:
      "Souhaitez vous mettre à disposition du collectif un covoiturage et/ou un hébergement ?",
    schema: {
      choices: yup.mixed().notRequired(),
    },
    type: "checkbox",
    options: ["Covoiturage"],

    renderInputFields: (control: any, onChange?: any) => (
      <div className="flex flex-1 flex-col justify-center items-center">
        <CheckBoxField
          control={control}
          name="choices"
          className="col-span-4 text-black border-blue-500 hover:border-blue-500"
          options={["Covoiturage", "Hébergement"]}
          onChange={onChange}
        />
      </div>
    ),
  },
];
export const CAR_POOL_STEPS = [
  {
    transition: false,
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
    transition: false,
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
          alt="arrow"
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
    transition: false,
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
    transition: false,
    title: "Description",
    subtitle:
      "Ce message sera lu par vos futurs utilisateurs. Veuillez fournir une bref description.",
    schema: {
      description: yup.string().required(),
    },
    renderInputFields: (control: any) => (
      <div className="flex w-full flex-col justify-start items-center space-y-4">
        <TextAreaField
          control={control}
          name="description"
          placeholder="J'ai 3 places disponibles vous êtes les bienvenus."
          isLoading={false}
          label={"Description *"}
        />
      </div>
    ),
  },
];


export const EVENT_STEPS = [
  {
    transition: false,
    title: "Informations générales de l'événement",
    subtitle: "Veuillez renseignez les informations ci-dessous",
    schema: {
      name: yup.string().required("Le nom de l'événement est requis"),
      address: yup.string().required("L'adresse de l'événement est requis"),
      zipCode: yup
        .string()
        .matches(/^\d{5}$/, "Le code postal est requis")
        .required("Le code postal est requis"),
      city: yup.string().required("La ville est requise"),
    },
    renderInputFields: (control: any) => (
      <div className="grid grid-cols-4 gap-4 justify-center items-center ">
        <TextField
          control={control}
          name="name"
          label={"Nom de l'événement *"}
          className="col-span-4 text-black border-blue-500 hover:border-blue-500"
        />
        <TextField
          control={control}
          name="address"
          label={"Adresse *"}
          className="col-span-4"
        />
        <TextField
          control={control}
          name="zipCode"
          label={"Code postal *"}
          className="col-span-2"
          maxLength={5}
        />
        <TextField
          control={control}
          name="city"
          label={"Ville *"}
          className="col-span-2"
        />
      </div>
    ),
  },
  {
    transition: false,
    title: "Dates de l'événement",
    subtitle: "Choisir les dates et heures de début et de fin de l'événement",
    schema: {
      startingDate: yup.string().required("Une date de début est requise"),
    },
    renderInputFields: (control: any) => (
      <div className="flex flex-col space-y-6 justify-center items-center">
        <DatePickerField
          control={control}
          label="Début *"
          name={"startingDate"}
          className="col-span-2"
          defaultValue={now(getLocalTimeZone())}
          minValue={today(getLocalTimeZone())}
        />
        <Image
          className="mx-2 drop-shadow-lg"
          src="/icons/form/arrows.png"
          alt="Arrow"
          width={24}
          height={24}
        />
        <DatePickerField
          control={control}
          label="Fin"
          name={"endingDate"}
          className="col-span-2"
          placeholder="Heure de fin *"
          defaultValue={now(getLocalTimeZone())}
          minValue={today(getLocalTimeZone())}
        />
      </div>
    ),
  },
  {
    transition: false,
    title: "Affiche de l'événement",
    subtitle: "Choisir un visuel *",
    schema: {
      image: yup
        .mixed()
        .required("Un visuel est requis")
        .test("is-file", "L'image n'est pas valide", (value) => {
          return value instanceof File;
        })
        .test(
          "file-type",
          "Le fichier sélectionné n'est pas une image",
          (value: any) => {
            if (!value) return true;
            const allowedTypes = ["image/jpeg", "image/png"];
            return allowedTypes.includes(value.type);
          }
        ),
    },
    renderInputFields: (control: any) => (
      <div className="flex flex-1 flex-col justify-center items-center">
        <ImageField
          control={control}
          label="Visuel"
          name="image"
          isLoading={false}
          className="flex flex-1 flex-col justify-center"
        />
      </div>
    ),
  },
  {
    transition: false,
    title: "Tarif de l'événement",
    subtitle: "Veuillez renseigner un tarif, 0 si l'événement est gratuit",
    schema: {
      price: yup
        .number()
        .transform((value, originalValue) => {
          if (typeof originalValue === "string") {
            const normalizedValue = originalValue.replace(",", ".");
            return parseFloat(normalizedValue);
          }
          return value;
        })
        .min(0, "Le tarif doit être positif")
        .typeError("Un tarif est obligatoire, mettre 0 si gratuit")
        .required(),
    },
    renderInputFields: (control: any) => (
      <div className="flex flex-row justify-center items-center">
        <TextField
          control={control}
          name="price"
          isLoading={false}
          className="col-span-2"
          label={"Tarif *"}
          endIcon="euro"
        />
      </div>
    ),
  },
  {
    transition: false,
    title: "Description et lien url",
    subtitle: "Veullez fournir une brève description et un lien url d'un site",
    schema: {
      description: yup.string().required("Une description est requise"),
    },
    renderInputFields: (control: any) => (
      <div className="flex w-full flex-col justify-center items-center space-y-4">
        <TextAreaField
          control={control}
          name="description"
          isLoading={false}
          label={"Description *"}
        />

        <TextField
          control={control}
          name="url"
          isLoading={false}
          className=""
          label={"Lien url de l'événement (optionnel)"}
        />
      </div>
    ),
  },
];

export const SUCCESS_STEPS = [
  {
    transition: true,
    title: "",
    subtitle: "",
    schema: {
      name: yup.string().required(),
    },
    renderInputFields: (control: any) => (
      <div className="flex w-full flex-col justify-center items-center">
        <Image
          className="mx-2 drop-shadow-lg"
          src="/icons/form/checked.png"
          alt="boujou normandie événement"
          width={150}
          height={150}
        />
        <Typography variant="h2">Votre événement être prêt à être envoyé</Typography>
      </div>
    ),
  },
];
export const INTRO_EVENT_STEPS = [
  {
    transition: true,
    title: "",
    subtitle: "",
    schema: {},
    renderInputFields: (control: any) => (
      <div className="flex w-full flex-col justify-center items-start space-y-6">
        <Typography variant="h2" className="text-white">
          Ajouter un événement ?
        </Typography>

        <Typography variant="p" className="text-white">
          Souhaitez vous mettre à disposition de la communauté un nouvel
          événement ?
        </Typography>
      </div>
    ),
  },
];

export const INTRO_CAR_STEPS = [
  {
    transition: true,
    title: "",
    subtitle: "",
    schema: {},
    renderInputFields: (control: any) => (
      <div className="flex w-full flex-col justify-center items-start space-y-6">
        <Typography variant="h2" className="text-white">
          Partager un service ?
        </Typography>

        <Typography variant="p" className="text-white">
          Souhaitez vous mettre à disposition du collectif un covoiturage ?
        </Typography>
      </div>
    ),
  },
];
