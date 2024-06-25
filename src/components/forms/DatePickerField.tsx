import * as React from "react";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useController } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
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
          src={`/icons/form/calendar.png`}
          alt="Apple Logo"
          width={24}
          height={24}
        />
      }
    />
  );
};

export default DatePickerField;
