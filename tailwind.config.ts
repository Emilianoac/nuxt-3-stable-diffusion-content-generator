import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        "cloud-burst": {
          "50": "#f3f5fb",
          "100": "#e3eaf6",
          "200": "#cedbef",
          "300": "#adc3e3",
          "400": "#85a4d5",
          "500": "#6887c9",
          "600": "#556fbb",
          "700": "#4a5dab",
          "800": "#414e8c",
          "900": "#2e375c",
          "950": "#262b45",
        },
        malachite: {
          "50": "#f0fdf4",
          "100": "#dcfce7",
          "200": "#bbf7cf",
          "300": "#86efab",
          "400": "#4bdd7e",
          "500": "#25d162",
          "600": "#17a248",
          "700": "#15803c",
          "800": "#166533",
          "900": "#14532c",
          "950": "#052e15",
        },
      },
    },
  },
};
