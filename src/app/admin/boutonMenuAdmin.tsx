"use client";
import vars from "@/variables";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

export default function Button({
  label,
  alt,
  icon,
  active,
  onClick,
}: {
  label: string;
  alt: string;
  icon: any;
  active: boolean;
  onClick: () => void;
}): JSX.Element {
  const { theme } = useTheme();
  const [isHover, setIsHover] = React.useState(false);

  return (
    <button
      style={{
        width: 260,
        backgroundColor: active
          ? theme === "dark"
            ? vars.COLORS.secondary
            : "#D5EEFF"
          : isHover
          ? "lightgray"
          : "transparent",

        color: active
          ? "black"
          : theme === "dark"
          ? isHover
            ? "black"
            : "white"
          : "black",
        fontSize: 20,
        fontWeight: 600,
        transition: "background-color 0.3s ease",
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex flex-row gap-5 px-5">
        <Image
          src={icon}
          alt={alt}
          style={{ filter: theme === "dark" ? "invert(100%)" : "none" }}
        />
        {label}
      </div>
    </button>
  );
}
