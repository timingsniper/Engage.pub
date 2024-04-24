import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0077C0",
        customBlue: "#0077C0",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0077C0",
          secondary: "#C7EEFF",
          accent: "#00ffff",
          neutral: "#C7EEFF",
          "base-100": "#ffffff",
          info: "#0000ff",
          success: "#C7EEFF",
          warning: "#00ff00",
          error: "#ff0000",
        },
      },
    ],
  },
  plugins: [require("daisyui"), require('tailwindcss-animated')],
};
export default config;
