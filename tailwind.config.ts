import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      header: ["Raleway", "sans-serif"],
      //body: ["Open Sans", "sans-serif"],
      body: ["Roboto", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#007ACC", // bleu
        primaryLight: "#D5EEFF8A",
        secondary: "#FECFA0", // orange
        secondaryLight: "#FFB5622E",
        secondaryText: "#333333",
        tertiary: "#F87474", // rouge
        tertiaryLight: "#FFDFDF",
        transparent: "transparent",
        "hero-gradient-from": "rgba(25, 64, 174, 0.95)",
        "hero-gradient-to": "rgba(45, 47, 144, 0.93)",
        "hero-gradient-dark-from": "rgba(4, 17, 54, 0.95)",
        "hero-gradient-dark-to": "rgba(21, 22, 69, 0.93)",
      },
    }
    
  },
  plugins: [nextui()],
};
export default config;
