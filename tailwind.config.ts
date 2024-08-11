import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        serenata: ["var(--font-serenata-vantages)"],
        kenyan: ["var(--font-kenyan-coffee)"],
        strech: ["var(--font-stretchpro)"],
        dmsans: ['"DM Sans"', ...defaultTheme.fontFamily.sans],
        bbneue: ['"Bebas Neue"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand_primary: "#092517",
        brand_secondary: "#FAA320",
        brand_accent: "#85D120",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
