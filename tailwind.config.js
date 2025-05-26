/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7e22ce",
        secondary: "#3b82f6",
        gray: {
          800: "#1f2937",
          900: "#111827",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
      borderOpacity: {
        10: "0.1",
        20: "0.2",
        30: "0.3",
      },
      backgroundImage: {
        "main-gradient":
          "linear-gradient(145deg, #000000 0%, #2d2d2d 50%, #ffffff 100%)",
      },
    },
  },
  plugins: [],
};
