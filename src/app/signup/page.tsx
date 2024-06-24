import SignupForm from "@/components/forms/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formulaire d'inscription",
};

export default function SignUpPage() {
  return (
    <SignupForm />
  );
}