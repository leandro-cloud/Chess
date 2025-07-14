/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/pieces/pieces.tsx",
    "./src/components/checkboard.tsx",
    "./src/App.tsx",
  ],
  theme: {
    extend: {
      colors: {
        "ligth-beige": "#f5f5f5",
        "dark-wood": "#b58863",
        "carbon-gray": "#1e1e1e",
        "ligth-gray": "#f0f0f0",
        "dark-gray": "#3b3b3b",
        "black-smoke": "#1c1c1c",
      },
    },
  },
  plugins: [],
};
