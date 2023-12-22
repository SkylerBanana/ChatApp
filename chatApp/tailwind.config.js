/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "city-pattern": "url('/layered-steps-haikei.svg')",
      },
    },
  },
  plugins: [],
};
