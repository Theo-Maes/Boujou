import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import { useController } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, Image } from "@nextui-org/react";
import {
  ZonedDateTime,
  getLocalTimeZone,
  now,
  parseAbsoluteToLocal,
  today,
} from "@internationalized/date";

interface CustomTextFieldProps {
  name: string;
  control?: any;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  [key: string]: any;
}

const DatePickerField = ({
  name,
  control,
  label,
  defaultValue,
  placeholder,
  ...rest
}: CustomTextFieldProps) => {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  const handleChange = (value: ZonedDateTime | null) => {
    if (value) onChange(value.toDate().toISOString());
  };

  return (
    <DatePicker
      label={label}
      value={parseAbsoluteToLocal(value || new Date().toISOString())}
      onChange={handleChange}
      className="max-w-md"
      granularity="second"
      selectorIcon={
        <Image
          className="drop-shadow-lg"
          src={`/icons/form/calendar.svg`}
          alt="Apple Logo"
          width={24}
          height={24}
        />
      }
    />
  );
};

export default DatePickerField;
