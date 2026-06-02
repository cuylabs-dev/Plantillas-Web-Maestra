/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // El color real se inyecta por variables CSS (--brand-*) segun el
        // parametro ?color= de la URL. Aqui solo exponemos los alias.
        brand: {
          DEFAULT: "var(--brand-500)",
          50: "var(--brand-50)",
          100: "var(--brand-100)",
          500: "var(--brand-500)",
          600: "var(--brand-600)",
          700: "var(--brand-700)",
        },
      },
      fontFamily: {
        brand: "var(--brand-font)",
      },
    },
  },
  plugins: [],
};
