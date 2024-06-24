"use client"

import React, { useState, useMemo, useEffect } from "react";
import { Input, Button, Spacer } from "@nextui-org/react";
import { useTheme } from "next-themes";

interface SignupFormProps {
  initialValues: {
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
}

interface FormState {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  address: string;
  zipcode: string;
  city: string;
  avatar: string;
  latitude: string;
  longitude: string;
  roleId: string;
}

const initialFormState: FormState = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  address: "",
  zipcode: "",
  city: "",
  avatar: "",
  latitude: "0",
  longitude: "0",
  roleId: "1",
};

export default function SignupForm({ initialValues }: SignupFormProps) {
  const { theme } = useTheme();
  const [form, setForm] = useState<FormState>(initialFormState);

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      email: initialValues.email,
      firstName: initialValues.firstName,
      lastName: initialValues.lastName,
      avatar: initialValues.avatar,
    }));
  }, [initialValues]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "avatar" && files?.[0]) {
      const file = files[0];
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prevForm) => ({ ...prevForm, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    } else {
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(form.password)) {
      setError(
        "Le mot de passe doit contenir au moins 8 caractères, une minuscule, une majuscule, un chiffre et un symbole."
      );
      setLoading(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        let value = form[key as keyof FormState];
        formData.append(key, value);
      });

      const res = await fetch("/api/user/create", {
        method: "POST",
        body: formData,
      });

console.log(formData);


      if (res.ok) {
        setSuccess(true);
        console.log("Inscription réussie : ", form);
        alert("Inscription réussie !");
      } else {
        const data = await res.json();
        setError(data.message || "Une erreur est survenue");
      }
    } catch (error) {
      setError("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (value: string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
  const validateText = (value: string) => /^[a-zA-ZÀ-ÿ\s-]+$/.test(value);
  const validateAddress = (value: string) => /^[a-zA-ZÀ-ÿ0-9\s,.-]+$/.test(value);
  const validateZipcode = (value: string) => /^\d{5}$/.test(value);
  const validatePassword = (value: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
  const validateConfirmPassword = (confirmPassword: string, password: string) => confirmPassword === password;

  const isInvalidEmail = useMemo(
    () => form.email !== "" && !validateEmail(form.email),
    [form.email]
  );
  const isInvalidFirstName = useMemo(
    () => form.firstName !== "" && !validateText(form.firstName),
    [form.firstName]
  );
  const isInvalidLastName = useMemo(
    () => form.lastName !== "" && !validateText(form.lastName),
    [form.lastName]
  );
  const isInvalidAddress = useMemo(
    () => form.address !== "" && !validateAddress(form.address),
    [form.address]
  );
  const isInvalidZipcode = useMemo(
    () => form.zipcode !== "" && !validateZipcode(form.zipcode),
    [form.zipcode]
  );
  const isInvalidCity = useMemo(
    () => form.city !== "" && !validateText(form.city),
    [form.city]
  );
  const isInvalidPassword = useMemo(
    () => form.password !== "" && !validatePassword(form.password),
    [form.password]
  );
  const isInvalidConfirmPassword = useMemo(
    () =>
      form.confirmPassword !== "" &&
      !validateConfirmPassword(form.confirmPassword, form.password),
    [form.confirmPassword, form.password]
  );  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-800 px-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
      {initialValues ? (
        <h2 className="uppercase font-extrabold text-2xl text-center mb-6">Inscription</h2>
      ) : (
        <h2 className="uppercase font-extrabold text-2xl text-center mb-6">Finalisation de l&apos;inscription</h2>
      )}
        <form onSubmit={handleSubmit} className="flex flex-col w-full" encType="multipart/form-data">
          <Spacer y={1} />
          <Input
            fullWidth
            label="Email *"
            type="email"
            variant="bordered"
            name="email"
            value={initialValues.email || form.email}
            onChange={handleChange}
            isInvalid={isInvalidEmail}
            color={isInvalidEmail ? "danger" : "default"}
            errorMessage={isInvalidEmail ? "L'email n'est pas valide" : ""}
            disabled={!!initialValues.email}
            required
          />
          <Spacer y={1} />
          {!initialValues.email && (
            <>
              <Input
                fullWidth
                label="Mot de passe *"
                variant="bordered"
                name="password"
                value={form.password}
                onChange={handleChange}
                isInvalid={isInvalidPassword}
                color={isInvalidPassword ? "danger" : "default"}
                errorMessage={isInvalidPassword ? "Au moins 8 caractères, une min., une maj., un chiffre et un symbole" : ""}
                type="password"
                minLength={8}
                required
              />
              <Spacer y={1} />
              <Input
                fullWidth
                label="Confirmation du mot de passe *"
                variant="bordered"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                isInvalid={isInvalidConfirmPassword}
                color={isInvalidConfirmPassword ? "danger" : "default"}
                errorMessage={isInvalidConfirmPassword ? "Les mots de passe ne sont pas identiques" : ""}
                type="password"
                required
              />
              <Spacer y={1} />
            </>
          )}
          <Input
            fullWidth
            label="Prénom *"
            variant="bordered"
            name="firstName"
            value={initialValues.firstName || form.firstName}
            onChange={handleChange}
            isInvalid={isInvalidFirstName}
            color={isInvalidFirstName ? "danger" : "default"}
            errorMessage={isInvalidFirstName ? "Le prénom n'est pas correct" : ""}
            disabled={!!initialValues.firstName}
            required
          />
          <Spacer y={1} />
          <Input
            fullWidth
            label="Nom *"
            variant="bordered"
            name="lastName"
            value={initialValues.lastName || form.lastName}
            onChange={handleChange}
            isInvalid={isInvalidLastName}
            color={isInvalidLastName ? "danger" : "default"}
            errorMessage={isInvalidLastName ? "Le nom n'est pas correct" : ""}
            disabled={!!initialValues.lastName}
            required
          />
          <Spacer y={1} />
          <Input
            fullWidth
            label="Adresse"
            variant="bordered"
            name="address"
            value={form.address}
            onChange={handleChange}
            isInvalid={isInvalidAddress}
            color={isInvalidAddress ? "danger" : "default"}
            errorMessage={isInvalidAddress ? "Lettres, chiffres, virgules et tirets acceptés" : ""}
          />
          <Spacer y={1} />
          <Input
            fullWidth
            label="Code Postal"
            variant="bordered"
            name="zipcode"
            value={form.zipcode}
            onChange={handleChange}
            isInvalid={isInvalidZipcode}
            color={isInvalidZipcode ? "danger" : "default"}
            errorMessage={isInvalidZipcode ? "Le code postal n'est pas au bon format" : ""}
            maxLength={5}
          />
          <Spacer y={1} />
          <Input
            fullWidth
            label="Ville"
            variant="bordered"
            name="city"
            value={form.city}
            onChange={handleChange}
            isInvalid={isInvalidCity}
            color={isInvalidCity ? "danger" : "default"}
            errorMessage={isInvalidCity ? "Lettres et tirets acceptés" : ""}
          />
          <Spacer y={1} />
          {!initialValues.avatar && (
            <>
              <div className="flex flex-col align-center">
                <label className="hidden">Avatar</label>
                <input
                    type="file"
                    accept="image/*"
                    name="avatar"
                    id="avatar"
                    onChange={handleChange}
                    className="hidden"
                />
                <Button
                    as="label"
                    htmlFor="avatar"
                    variant="bordered"
                    className="cursor-pointer text-left text-gray-500 dark:text-gray-400 flex justify-between"
                >
                    <span className="mr-1">Avatar</span>
                    <span className="mr-1">Choisir un fichier</span>
                    <span className="mr-1"></span>
                </Button>
                {fileName && (
                    <span className="mt-1 text-sm text-gray-500 dark:text-gray-400">{fileName}</span>
                )}
              </div>
            </>
          )}
          <Spacer y={2} />
          <Button
            type="submit"
            color={theme === "dark" ? "secondary" : "primary"}
            className="text-white dark:text-black"
            isLoading={loading}
          >
  {loading ? "Inscription en cours..." : "S'inscrire"}
</Button>
          {success && (
            <>
              <Spacer y={1} />
              <div className="text-green-500">Inscription réussie !</div>
            </>
          )}
          {error && (
            <>
              <Spacer y={1} />
              <div className="text-red-500">{error}</div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
