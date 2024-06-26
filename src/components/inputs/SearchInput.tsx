import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "../icons/SearchIcon";

interface SearchInputProps {
  placeholder: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput({
  placeholder,
  onChange
}: SearchInputProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        endContent={
          <div className="absolute right-0 flex items-center justify-center bg-secondary dark:bg-primary rounded-tr-lg rounded-br-lg p-2 my-2">
            <SearchIcon className="text-neutral-900 dark:text-neutral-200 text-2xl pointer-events-none flex-shrink-0" />
          </div>
        }
        classNames={{
          input: [
            "bg-transparent",
            "text-neutral-900 dark:text-neutral-200",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focused=true]:bg-default-200/50",
            "dark:group-data-[focused=true]:bg-default/60",
            "!cursor-text",
            "w-full"
          ],
        }}
      />
    </div>
  );
}
