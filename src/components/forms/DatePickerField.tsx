import * as React from "react";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useController } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";

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

export default ({
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
    defaultValue: defaultValue || "",
  });
  const handleChange = (value: dayjs.Dayjs | null) => {
    if (value) onChange(dayjs(value).format());
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label={label}
        value={dayjs(value)}
        onChange={handleChange}
        slotProps={{
          textField: {
            sx: {
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#007ACC", // Bordure initiale en bleu
                  borderRadius: 4,
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#007ACC", // Bordure au focus en bleu
                },
              },
              "& .MuiInputBase-input": {
                color: "black", // Couleur du texte
                backgroundColor: "white", // Fond blanc
              },
              "& .MuiSvgIcon-root": {
                color: "#007ACC", // Couleur de l'icône
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};
