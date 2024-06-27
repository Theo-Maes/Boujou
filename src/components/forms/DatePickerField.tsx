import * as React from "react";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import { useController } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { DatePicker, Image } from "@nextui-org/react";
import {
  ZonedDateTime,
  getLocalTimeZone,
  DateValue,
  now,
  today,
} from "@internationalized/date";
import {I18nProvider} from "@react-aria/i18n";

interface CustomTextFieldProps {
  name: string;
  control?: any;
  label?: string;
  defaultValue?: DateValue;
  placeholder?: string;
  minValue?: DateValue;
  [key: string]: any;
}

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "blue",
    },
    "&:hover fieldset": {
      borderColor: "blue",
    },
    "&.Mui-focused fieldset": {
      borderColor: "blue",
    },
  },
}));

const DatePickerField = ({
  name,
  control,
  label,
  defaultValue,
  placeholder,
  minValue,
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
    <I18nProvider locale="fr-FR">
      <DatePicker
        defaultValue={defaultValue ? now(getLocalTimeZone()) : undefined}
        label={label}
        minValue={minValue || undefined}
        onChange={handleChange}
        className="max-w-md"
        showMonthAndYearPickers
        granularity="second"
        selectorIcon={
          <Image
            className="drop-shadow-lg"
            src={`/icons/form/calendar.svg`}
            alt="Calendar icon"
            width={24}
            height={24}
          />
        }
      />
    </I18nProvider>

  );
};

export default DatePickerField;