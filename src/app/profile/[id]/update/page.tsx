"use client";

import React, { useState, useEffect, FormEvent, useMemo } from "react";
import { Input, Button, Spacer, Image } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { User } from "@prisma/client";
import { UserData } from "@/components/profile/ProfilePage";
import { getSession, useSession } from "next-auth/react";
import Custom403 from "@/app/forbidden";
import Loading from "@/app/loading";

interface ProfileFormProps {
  params: { id: string };
}

interface FormState {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  zipcode: string;
  city: string;
  avatar: string;
}

export default function ProfileForm({ params }: ProfileFormProps) {
  const { data: session } = useSession();
  const { id } = params;
  const { theme } = useTheme();
  const [form, setForm] = useState<FormState>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    zipcode: "",
    city: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [fileName, setFileName] = useState("");
  const [sessionLoading, setSessionLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
  
      if (!session || session.user.id !== parseInt(id, 10)) {
        setSessionLoading(false);
      } else {
        setSessionLoading(false);
      }
    };
  
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/user/${id}`);
        
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await res.json();
        const user: UserData = data.data;
        
        setForm({
          email: user.email || "",
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          address: user.adress || "",
          zipcode: user.zipCode || "",
          city: user.city || "",
          avatar: user.avatar || "",
        });
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchUserData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "avatar" && files?.[0]) {
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
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const formData = new FormData(e.currentTarget);
      formData.append("id", id);

      const res = await fetch(`/api/user/${id}/update`, {
        method: "PATCH",
        body: formData,
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        setError(data.message || "Une erreur est survenue");
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (value: string) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
  const validateText = (value: string) => /^[a-zA-ZÀ-ÿ\s-]+$/.test(value);
  const validateAddress = (value: string) =>
    /^[a-zA-ZÀ-ÿ0-9\s,.-]+$/.test(value);
  const validateZipcode = (value: string) => /^\d{5}$/.test(value);

  const isInvalidEmail = useMemo(
    () => form.email !== "" && !validateEmail(form.email),
    [form]
  );
  const isInvalidFirstName = useMemo(
    () => form.firstName !== "" && !validateText(form.firstName),
    [form]
  );
  const isInvalidLastName = useMemo(
    () => form.lastName !== "" && !validateText(form.lastName),
    [form]
  );
  const isInvalidAddress = useMemo(
    () => form.address !== "" && !validateAddress(form.address),
    [form]
  );
  const isInvalidZipcode = useMemo(
    () => form.zipcode !== "" && !validateZipcode(form.zipcode),
    [form]
  );
  const isInvalidCity = useMemo(
    () => form.city !== "" && !validateText(form.city),
    [form]
  );

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [success]);

  if (sessionLoading) {
    return <Loading />; 
  }
  
  if (!session || session.user.id !== parseInt(id, 10)) {
    return <Custom403 />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-800 px-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="uppercase font-extrabold text-2xl text-center mb-6">
          Modifier le Profil
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full"
          encType="multipart/form-data"
        >
          <Spacer y={1} />
          <Input
            fullWidth
            label="Email *"
            type="email"
            variant="bordered"
            name="email"
            value={form.email}
            onChange={handleChange}
            isInvalid={isInvalidEmail}
            color={isInvalidEmail ? "danger" : "default"}
            errorMessage={isInvalidEmail ? "L'email n'est pas valide" : ""}
            required
          />
          <Spacer y={1} />
          <Input
            fullWidth
            label="Prénom *"
            variant="bordered"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            isInvalid={isInvalidFirstName}
            color={isInvalidFirstName ? "danger" : "default"}
            errorMessage={
              isInvalidFirstName ? "Le prénom n'est pas correct" : ""
            }
            required
          />
          <Spacer y={1} />
          <Input
            fullWidth
            label="Nom *"
            variant="bordered"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            isInvalid={isInvalidLastName}
            color={isInvalidLastName ? "danger" : "default"}
            errorMessage={isInvalidLastName ? "Le nom n'est pas correct" : ""}
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
            errorMessage={
              isInvalidAddress ? "L'adresse n'est pas correcte" : ""
            }
          />
          <Spacer y={1} />
          <Input
            fullWidth
            label="Code postal"
            variant="bordered"
            name="zipcode"
            value={form.zipcode}
            onChange={handleChange}
            isInvalid={isInvalidZipcode}
            color={isInvalidZipcode ? "danger" : "default"}
            errorMessage={
              isInvalidZipcode ? "Le code postal n'est pas correct" : ""
            }
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
            errorMessage={isInvalidCity ? "La ville n'est pas correcte" : ""}
          />
          <Spacer y={1} />
          <div className="flex flex-col items-start">
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
                  <span className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {fileName}
                  </span>
                )}
              </div>
            {form.avatar && (
              <Image
                src={form.avatar}
                alt="Current Avatar"
                className="mt-2 rounded-full w-24 h-24 object-cover"
              />
            )}
          </div>
          <Spacer y={2} />
          <Button
            type="submit"
            color={theme === "dark" ? "secondary" : "primary"}
            className="text-white dark:text-black"
            isLoading={loading}
            disabled={loading}
          >
            {loading ? "Mise à jour en cours..." : "Mettre à jour"}
          </Button>
          {success && (
            <>
              <Spacer y={1} />
              <div className="text-green-500">
                Profil mis à jour avec succès !
              </div>
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
