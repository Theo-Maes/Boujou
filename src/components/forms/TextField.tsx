"use client";
import React from "react";
import { useController } from "react-hook-form";
import { Input } from "@nextui-org/react";

import Image from "next/image";

interface CustomTextFieldProps {
  name: string;
  control?: any;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  endIcon?: string;
  [key: string]: any;
}

const TextField = ({
  name,
  control,
  label,
  defaultValue,
  placeholder,
  endIcon,
  ...rest
}: CustomTextFieldProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: defaultValue || "",
  });

  return (
    <Input
      label={label}
      radius="lg"
      variant="bordered"
      color="primary"
      placeholder={placeholder}
      {...field}
      isInvalid={!!error?.message}
      errorMessage={error?.message}
      {...rest}
      endContent={
        endIcon && (
          <Image
            className="drop-shadow-lg"
            src={`/icons/form/${endIcon}.png`}
            alt="Apple Logo"
            width={15}
            height={15}
          />
        )
      }
      classNames={{
        label: "text-primary",
        input: [
          "bg-transparent",
          "text-gray-600",
          "placeholder:text-default-700/50 dark:placeholder:text-white/60",
        ],
        innerWrapper: "bg-transparent",
        inputWrapper: [
          "h-[60px]",
          // "max-w-[350px]",
          "bg-page",
          //   "dark:bg-default/60",
          "backdrop-blur-xl",
          "backdrop-saturate-200",
          "hover:border-primary",
          //"dark:hover:bg-default/70",
          //"group-data-[focus=true]:bg-default-200/50",
          //"dark:group-data-[focus=true]:bg-default/60",
          "!cursor-text",
          "border-1",
          "border-primary",
        ],
      }}
    />
  );
};

export default TextField;
