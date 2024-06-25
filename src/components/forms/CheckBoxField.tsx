import React from "react";
import { CheckboxGroup, Checkbox, cn } from "@nextui-org/react";
import { useController } from "react-hook-form";
interface CheckBoxProps {
  options: string[];
  name: string;
  control?: any;
  label?: string;
  defaultValue?: any[];
  placeholder?: string;
  endIcon?: string;
  onChange?: (choices: string[]) => void;
  [key: string]: any;
}

const CheckBoxField = ({
  name,
  control,
  options,
  defaultValue,
  label,
  onChange,
}: CheckBoxProps) => {
  const {
    field: { onChange: onChangeField, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: defaultValue,
  });

  const handleOncChange = (event: any[]) => {
    onChangeField(event);
    onChange?.(event);
  };

  return (
    <div className="flex flex-col gap-3">
      <CheckboxGroup
        label={label}
        value={value || defaultValue}
        onValueChange={handleOncChange}
      >
        {options.map((option, key) => (
          <Checkbox
            key={key}
            size="lg"
            value={option}
            radius="md"
            classNames={{
              label: "w-full text-white",
              wrapper: "bg-blue-200 checked:bg-red-400",
              base: "focus:ring-0 focus:outline-none checked:bg-red-400",
            }}
          >
            {option}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </div>
  );
};

export default CheckBoxField;
