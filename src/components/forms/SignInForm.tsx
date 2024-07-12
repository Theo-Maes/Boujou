"use client"
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "..";
import { Checkbox, Input } from "@nextui-org/react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function SignInForm({
  currentPath,
}: {
  currentPath: string;
}): JSX.Element | undefined {
  const router = useRouter();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    setTimeout(() => setMounted(true), 1000);
  }, []);

  const handleSignIn = async () => {
    const result = await signIn("credentials", {
      email,
      password,
    });
    if (result?.error) {
      console.error(result.error);
    } else {

      if (["/signin", "/signup"].includes(currentPath)) {
        window.location.href = "/";
      } else {
        window.location.href = currentPath;
      }
    }
  };

  if (session && session.user) {
    router.replace("/profile");
  } else if (mounted)
    return (
      <section className="auth-card mx-4 md:mx-auto my-12 flex min-h-full flex-1 flex-col px-6 py-12 lg:px-8 border-1">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto"
            src="/icons/icon-192x192.png"
            alt="logo"
            width={500}
            height={500}
            style={{ width: "auto", height: "auto" }}
          />
          <h2 className="mt-5 mb-6 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-600 dark:text-white">
            Page de connexion
          </h2>
        </div>
        <Input
              label="Email"
              placeholder="Entrez votre adresse email"
              variant="bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Mot de passe"
              placeholder="Entrez votre mot de passe"
              type="password"
              variant="bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex py-2 px-1 justify-start">
              <Checkbox
                color={theme === "dark" ? "secondary" : "primary"}
                classNames={{
                  label: "text-[13px] md:text-[16px]",
                }}
              >
                Se souvenir de moi
              </Checkbox>
              {/* <Link color={theme === "dark" ? "secondary" : "primary"} href="#" className={classNames(
                      "text-[13px]",
                      "md:text-[16px]",
                      "transition",
                      "hover:underline",
                      "underline-offset-4",
                      "text-primary",
                      "dark:text-secondary",
                      "dark:text-neutral-200",
                      "dark:hover:underline-neutral-200")}>
                Mot de passe oublié ?
              </Link> */}
            </div>
            <div className="flex justify-center">
              <Link
                color={theme === "dark" ? "secondary" : "primary"}
                href="/signup"
                className="mr-5"
              >
                <Button
                  color={theme === "dark" ? "primary" : "secondary"}
                  className="text-dark dark:text-white"
                >
                  S&apos;inscrire
                </Button>
              </Link>
              <Button
                color={theme === "dark" ? "secondary" : "primary"}
                onClick={handleSignIn}
                className="ml-5 text-white dark:text-black"
              >
                Se connecter
              </Button>
            </div>
            <div className="flex py-2 px-1 justify-center">
              <Button
                onClick={() =>
                  signIn("google", { callbackUrl: "http://localhost:3000" })
                }
                color={theme === "dark" ? "secondary" : "primary"}
                className="w-auto lg:w-2/3 flex justify-center items-center"
              >
                <Image
                  className="mx-2 drop-shadow-lg"
                  src="/google.svg"
                  alt="Google Logo"
                  width={24}
                  height={24}
                />
                <span className="ml-2 text-white dark:text-black">
                  Connexion avec Google
                </span>
              </Button>
            </div>
          </section>
    );
}
