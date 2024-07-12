"use client"

import { SignInForm } from "@/components";
import { Metadata } from "next";
import { usePathname } from "next/navigation";

// export const metadata: Metadata = {
//   title: "Connexion",
// };

export default function SignInPage() {
  const currentPath = usePathname();

  return <SignInForm currentPath={currentPath} />;
}
