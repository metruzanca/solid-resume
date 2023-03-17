/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    // Had to change this size to make the print look like desktop
    screens: {
      sm: { min: "600px" },
    }
  },
  plugins: []
};
