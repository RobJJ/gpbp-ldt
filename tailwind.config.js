/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/components/LandingPage-Right-Section.jsx",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        // slideIn: "translate-x-0 1s ease-out ",
        "slide-in": "slideInFromRight 2s ease-out normal",
      },
      colors: {
        "primary-bg": "#101115",
      },
      keyframes: {
        slideInFromRight: {
          // "0%, 100%": { transform: "rotate(-3deg)" },
          // "0%": { transform: "translate-x-100" },
          // "100%": { transform: "translate-x-0" },
          "0%": { transform: "translate(100%)" },
          // "10%": { transform: "rotate(14deg)" },
          // "20%": { transform: "rotate(-8deg)" },
          // "30%": { transform: "rotate(14deg)" },
          // "40%": { transform: "rotate(-4deg)" },
          // "50%": { transform: "rotate(10.0deg)" },
          // "60%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "translate(0%)" },
        },
      },
    },
  },
  plugins: [],
};
