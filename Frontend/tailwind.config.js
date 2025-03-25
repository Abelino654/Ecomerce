/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-whale": "#00339A",
        "hover-color": "#0036B1",
      },
    },
  },
  plugins: [],
};
