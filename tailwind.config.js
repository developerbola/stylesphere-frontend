/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      lg: "1024px",
      md: "768px",
      sm: "640px",
      exs: "380px",
      vxs: "200px",
    },
  },
  plugins: [],
};
