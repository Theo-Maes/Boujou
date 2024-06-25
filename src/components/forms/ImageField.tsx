import React, { useState } from "react";
import { useController, useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";

interface CustomTextFieldProps {
  name: string;
  control?: any;
  label?: string;
  defaultValue?: string;
  isLoading: boolean;
  [key: string]: any;
}

const ImageField: React.FC<CustomTextFieldProps> = ({
  name,
  control,
  label,
  defaultValue,
  isLoading,
  ...rest
}) => {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: defaultValue || "",
  });
  const [img, setImg] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files[0]);

      onChange(e.target.files[0]);
      setImg(URL.createObjectURL(e.target.files[0]));
    }
  };
  return (
    <div {...rest}>
      <input
        accept="image/*"
        onChange={handleOnChange}
        style={{ display: "none" }}
        id="raised-button-file"
        multiple
        type="file"
      />
      <label htmlFor="raised-button-file" className="flex flex-1 flex-col">
        <Button
          variant="bordered"
          color="primary"
          as="span"
          className="border-dotted border-2 border-blue-500 flex-1 w-[300px] flex items-center justify-center"
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {isLoading ? <Spinner /> : "Choisir une image"}
        </Button>
      </label>
    </div>
  );
};

export default ImageField;
