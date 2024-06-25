import { extendVariants, Button } from "@nextui-org/react";

export default extendVariants(Button, {
  variants: {
    // <- modify/add variants
    color: {
      contained: "bg-primary text-white",
      outlined: "bg-white border border-blue-500 text-blue-500",
      olive: "text-[#000] bg-[#84cc16]",
      orange: "bg-[#ff8c00] text-[#fff]",
      violet: "bg-[#8b5cf6] text-[#fff]",
    },
    isDisabled: {
      true: "bg-[#eaeaea] text-[#000] opacity-50 cursor-not-allowed",
    },
    size: {
      xs: "px-4 min-w-12 h-6 text-tiny gap-1 rounded-small",
      md: "px-8 min-w-20 h-10 text-small gap-2 rounded-small",
      xl: "px-8 min-w-28 h-14 text-large gap-4 rounded-medium",
    },
  },
  defaultVariants: {
    // <- modify/add default variants
    color: "outlined",
    size: "md",
  },
  compoundVariants: [
    // <- modify/add compound variants
    {
      isDisabled: true,
      color: "olive",
      class: "bg-[#84cc16]/80 opacity-100",
    },
  ],
});
