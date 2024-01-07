/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F5385D",
        bizluru5: "#F7F7F7",
        bizluru1: "#02C7D0",
        bizluru2: "#1C88AD",
        bizluru3: "#FBB03B",
        bizluru4: "#FCEE21",
        bizluru5: "#22577A",
        bizluru6: "#430711",
      },
      screens: {
        xs: "320px", // Example custom breakpoint
        print: { raw: "print" }, // Example for print styles
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
    fontFamily: {
      signature1: ["Roboto Mono"],
    },
    screens: {
      xxs: "320px", // Example custom breakpoint
      print: { raw: "print" }, // Example for print styles
    },
  },
  plugins: [],
};
