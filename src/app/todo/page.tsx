import SignupForm from "@/components/forms/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test",
};

export default function ToDoPage() {
  return (
    <SignupForm />
  );
}