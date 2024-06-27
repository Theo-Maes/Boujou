import { classNames } from "@/libs";
import React from "react";

type TypographyProps = {
  variant:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "small"
    | "body"
    | "body3";
  children: React.ReactNode;
  className?: string;
};

const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  className,
}) => {
  const baseClasses = `text-gray-900 font-body ${className}`;

  const variantClasses: { [key in TypographyProps["variant"]]: string } = {
    h1: "text-4xl font-bold",
    h2: "text-3xl font-semibold",
    h3: "text-2xl font-semibold",
    h4: "text-xl font-medium",
    h5: "text-lg font-medium",
    h6: "text-base font-medium",
    body: "text-base font-normal text-muted",
    body3: "text-xl font-medium",
    p: "text-base",
    small: "text-sm",
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]}`;

  switch (variant) {
    case "h1":
      return <h1 className={combinedClasses}>{children}</h1>;
    case "h2":
      return <h2 className={combinedClasses}>{children}</h2>;
    case "h3":
      return <h3 className={combinedClasses}>{children}</h3>;
    case "h4":
      return <h4 className={combinedClasses}>{children}</h4>;
    case "h5":
      return <h5 className={combinedClasses}>{children}</h5>;
    case "h6":
      return <h6 className={combinedClasses}>{children}</h6>;
    case "p":
      return <p className={combinedClasses}>{children}</p>;
    case "small":
      return <small className={combinedClasses}>{children}</small>;
    default:
      return <p className={combinedClasses}>{children}</p>;
  }
};

export default Typography;
