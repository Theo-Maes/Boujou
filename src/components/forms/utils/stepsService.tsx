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
import {
  createDriver,
  createEvent,
  createGroup,
  createHost,
  joinGroup,
  uploadFile,
} from "./actions";
import SelectField from "../SelectField";

export const onGroupCreation = async (userId: number, eventId: number) => {
    try {
      const group = await createGroup(userId, eventId);
      console.log("Group created:", group);
      const groupId = group.data.id;
  
      if (groupId === undefined) {
        throw new Error("Group ID is undefined");
      }
      await joinGroup(userId, groupId);
      return groupId;
    } catch (error) {
      throw error;
    }
  };

export const CHOICE_STEPS = [
  {
    onSubmit: async (data: any, userId: number, eventId: number) =>
        await onGroupCreation(userId, eventId),
        isDark: true,
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
        )
    ,
  },
];

export const CAR_POOL_STEPS = [
  {
    isLast: false,
    isDark: false,
    transition: false,
    title: "Adresse",
    subtitle: "Veuillez renseignez le lieu du rendez vous",
    schema: {
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
    isSubmit: true,
    isDark: false,
    transition: false,
    title: "Vos horaires",
    subtitle: "Veuillez renseignez vos dates de départ et retour",
    schema: {
      startingDate: yup.string().required(),
      endingDate: yup.string().required(),
    },
    renderInputFields: (control: any) => (
      <div className="flex flex-col gap-y-5 justify-center items-center">
        <DatePickerField
          control={control}
          label="Départ"
          name={"startingDate"}
          className="col-span-2"
          defaultValue={now(getLocalTimeZone())}
          minValue={today(getLocalTimeZone())}
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
          defaultValue={now(getLocalTimeZone())}
          minValue={today(getLocalTimeZone())}
        />
      </div>
    ),
  },
  {
    isLast: false,
    isDark: false,
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
    onSubmit: async (data: any, userId: number, eventId: number) => {
      try {
        const groupId = await onGroupCreation(userId, eventId);
        await createDriver(data, userId, groupId);
      } catch (error) {
        throw error;
      }

      // const { image, ...rest } = data;
      // try {
      //   const imageUrl = await uploadFile(data);
      //   const eventId = await createEvent(rest, imageUrl);
      //   await createGroup(userId, eventId);
      // } catch (error) {
      //   console.log(error);
      // }
    },
    isLast: false,
    isDark: false,
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

export const HOST_POOL_STEPS = [
  {
    isLast: false,
    isDark: false,
    transition: false,
    title: "Adresse",
    subtitle: "Veuillez renseignez le lieu du rendez-vous",
    schema: {
      address: yup.string().required("L'adresse de l'hébergement est requis"),
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
    isSubmit: true,
    isDark: false,
    transition: false,
    title: "Vos horaires",
    subtitle: "Veuillez renseignez vos dates de début et de fin",
    schema: {
      startingDate: yup.string().required(),
      endingDate: yup.string().required(),
    },
    renderInputFields: (control: any) => (
      <div className="flex flex-col gap-y-5 justify-center items-center">
        <DatePickerField
          control={control}
          label="Départ"
          name={"startingDate"}
          className="col-span-2"
          defaultValue={now(getLocalTimeZone())}
          minValue={today(getLocalTimeZone())}
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
          defaultValue={now(getLocalTimeZone())}
          minValue={today(getLocalTimeZone())}
        />
      </div>
    ),
  },
  {
    isLast: false,
    isDark: false,
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
    onSubmit: async (data: any, userId: number, eventId: number) => {
      try {
        const groupId = await onGroupCreation(userId, eventId);
        await createHost(data, userId, groupId);
      } catch (error) {
        throw error;
      }

      // const { image, ...rest } = data;
      // try {
      //   const imageUrl = await uploadFile(data);
      //   const eventId = await createEvent(rest, imageUrl);
      //   await createGroup(userId, eventId);
      // } catch (error) {
      //   console.log(error);
      // }
    },
    isLast: false,
    isDark: false,
    transition: false,
    title: "Description",
    subtitle:
      "Ce message sera lu par vos futurs utilisateurs. Veuillez fournir une brève description.",
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

export const CAR_AND_HOST_POOL_STEPS = [
  {
    isLast: false,
    isDark: false,
    transition: false,
    title: "Adresse",
    subtitle: "Veuillez renseignez le lieu du rendez vous pour le covoiturage",
    schema: {
      address: yup.string().required("Une adresse est requise"),
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
    isSubmit: true,
    isDark: false,
    transition: false,
    title: "Vos horaires",
    subtitle:
      "Veuillez renseignez vos dates de départ et retour pour le covoiturage",
    schema: {
      startingDate: yup.string().required(),
      endingDate: yup.string().required(),
    },
    renderInputFields: (control: any) => (
      <div className="flex flex-col gap-y-5 justify-center items-center">
        <DatePickerField
          control={control}
          label="Départ"
          name={"startingDate"}
          className="col-span-2"
          defaultValue={now(getLocalTimeZone())}
          minValue={today(getLocalTimeZone())}
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
          defaultValue={now(getLocalTimeZone())}
          minValue={today(getLocalTimeZone())}
        />
      </div>
    ),
  },
  {
    isLast: false,
    isDark: false,
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
    isLast: false,
    isDark: false,
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
  {
    isLast: false,
    isDark: false,
    transition: false,
    title: "Adresse",
    subtitle: "Veuillez renseignez l'adresse de l'hébergement",
    schema: {
      address: yup.string().required("L'adresse de l'hébergement est requis"),
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
          name="addressHost"
          label={"Adresse *"}
          className="col-span-4"
        />
        <TextField
          control={control}
          name="zipCodeHost"
          label={"Code postal *"}
          className="col-span-2"
          maxLength={5}
        />
        <TextField
          control={control}
          name="cityHost"
          label={"Ville *"}
          className="col-span-2"
        />
      </div>
    ),
  },
  {
    isSubmit: true,
    isDark: false,
    transition: false,
    title: "Vos horaires",
    subtitle: "Veuillez renseignez les horaires d'arrivées et de départ",
    schema: {
      startingDate: yup.string().required(),
      endingDate: yup.string().required(),
    },
    renderInputFields: (control: any) => (
      <div className="flex flex-col gap-y-5 justify-center items-center">
        <DatePickerField
          control={control}
          label="Départ"
          name={"startingDateHost"}
          className="col-span-2"
          defaultValue={now(getLocalTimeZone())}
          minValue={today(getLocalTimeZone())}
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
          name={"endingDateHost"}
          className="col-span-2"
          defaultValue={now(getLocalTimeZone())}
          minValue={today(getLocalTimeZone())}
        />
      </div>
    ),
  },
  {
    isLast: false,
    isDark: false,
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
          name="quantityHost"
          placeholder="3 places"
          className="col-span-4 text-black border-blue-500 hover:border-blue-500"
          endIcon="car"
        />
      </div>
    ),
  },
  {
    onSubmit: async (data: any, userId: number, eventId: number) => {
      try {
        const groupId = await onGroupCreation(userId, eventId);

        await createDriver(data, userId, groupId);
        await createHost(data, userId, groupId);
      } catch (error) {
        throw error;
      }

      // const { image, ...rest } = data;
      // try {
      //   const imageUrl = await uploadFile(data);
      //   const eventId = await createEvent(rest, imageUrl);
      //   await createGroup(userId, eventId);
      // } catch (error) {
      //   console.log(error);
      // }
    },
    isLast: false,
    isDark: false,
    transition: false,
    title: "Description",
    subtitle:
      "Ce message sera lu par vos futurs utilisateurs. Veuillez fournir une brève description.",
    schema: {
      description: yup.string().required(),
    },
    renderInputFields: (control: any) => (
      <div className="flex w-full flex-col justify-start items-center space-y-4">
        <TextAreaField
          control={control}
          name="descriptionHost"
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
    isLast: false,
    isDark: false,
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
    isLast: false,
    isDark: false,
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
          placeholder="Heure de fin (optionnel)"
          defaultValue={now(getLocalTimeZone())}
          minValue={today(getLocalTimeZone())}
        />
      </div>
    ),
  },
  {
    isLast: false,
    isDark: false,
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
    isLast: false,
    isDark: false,
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
    renderInputFields: (control: any, onChange?: any, options?: any) => (
      <div className="flex flex-col space-y-4 justify-center items-center">
        <SelectField
          control={control}
          name="category"
          isLoading={false}
          className="col-span-2"
          label={"Tarif *"}
          options={options}
        />
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
    onSubmit: async (data: any, userId: number, groupId?: number) => {
      const { image, ...rest } = data;
      try {
        const imageUrl = await uploadFile(image);
        const eventId = await createEvent(rest, imageUrl);
        await createGroup(userId, eventId);
      } catch (error) {
        throw error;
      }
    },
    isLast: false,
    isDark: false,
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
          name="website"
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
    isLast: true,
    isDark: false,
    transition: true,
    title: "",
    subtitle: "",
    schema: {},
    renderInputFields: (control: any) => (
      <div className="flex w-full flex-col justify-center items-center">
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
export const INTRO_EVENT_STEPS = [
  {
    isDark: true,
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
    isLast: false,
    isDark: false,
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
