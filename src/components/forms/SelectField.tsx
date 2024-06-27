"use client";
import React from "react";
import { useController } from "react-hook-form";
import { Select, SelectItem } from "@nextui-org/react";

interface Category {
  id: number;
  name: string;
}

interface CustomSelectFieldProps {
  name: string;
  control: any;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  options: Category[];
  [key: string]: any;
}

const SelectField = ({
  name,
  control,
  label,
  defaultValue,
  placeholder,
  options,
  ...rest
}: CustomSelectFieldProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: defaultValue || "",
  });

  const selectedKeys = new Set([field.value?.toString()]);

  return (
    <Select
      items={options}
      label={label}
      placeholder={placeholder}
      selectedKeys={selectedKeys}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0]; // Prendre la première sélection
        if (selected !== undefined) {
          field.onChange(Number(selected)); // Convertir en nombre et appeler field.onChange
        }
      }}
      className="max-w-xs border-primary min-w-40"
      variant="bordered"
      isInvalid={!!error?.message}
      errorMessage={error?.message}
      classNames={{
        label: "group-data-[filled=true]:-translate-y-5 text-blue-500",
        trigger:
          "min-h-16 bg-white rounded-2xl border-1 border-blue-500 text-blue-500 placeholder-blue-500 group-focus-within:text-blue-500 group-hover:text-blue-500",
        listboxWrapper: "max-h-[400px] bg-white",
      }}
      listboxProps={{
        itemClasses: {
          base: [
            "rounded-md",
            "text-blue-500",
            "transition-opacity",
            "data-[hover=true]:text-blue-700",
            "data-[hover=true]:bg-blue-100",
            "data-[selectable=true]:focus:bg-blue-100",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-blue-500",
            "border-blue-500",
            "group-data-[selected=true]:bg-blue-100",
            "group-data-[active=true]:bg-blue-200",
          ],
        },
      }}
      popoverProps={{
        classNames: {
          base: "before:bg-blue-200",
          content: "p-0 border-small border-divider bg-background",
        },
      }}
    >
      {(option) => (
        <SelectItem key={option.id} textValue={option.name}>
          <div className="flex gap-2 items-center">
            <div className="flex flex-col">
              <span className="text-small text-blue-500">{option.name}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
};

export default SelectField;
