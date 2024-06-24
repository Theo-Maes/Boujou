"use client";

import SignupForm from "@/components/forms/SignUpForm";
import { Metadata } from "next";
import { useEffect, useState } from "react";

// export const metadata: Metadata = {
//   title: "Test",
// };

export default function ToDoPage() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    avatar: "",
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const email = searchParams.get("email") || "";
    const firstName = searchParams.get("firstName") || "";
    const lastName = searchParams.get("lastName") || "";
    const avatar = searchParams.get("avatar") || "";

    setUserInfo({
      email,
      firstName,
      lastName,
      avatar,
    });
  }, []);

  return <SignupForm initialValues={userInfo} />;
}
