/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand colors — matches GGCC palette
        primary: "#2b473f",       // Deep green (text, headings)
        secondary: "#932528",     // Burgundy (CTA buttons)
        accent: "#8CA9B4",        // Steel blue (hover states, highlights)
        light: "#f8f9fa",
        dark: "#2d3748",
        gray: {
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        // Kenya flag colors (for top border)
        kenya: {
          black: "#000000",
          white: "#FFFFFF",
          red: "#DE2910",
          green: "#006600",
        },
      },

      fontFamily: {
        // GGCC uses Montserrat for headings, Open Sans for body
        sans: ['"Open Sans"', "sans-serif"],
        montserrat: ['"Montserrat"', "sans-serif"],
      },

      backgroundImage: {
        // Soft background for sections like Mission, Core Values
        "soft-gradient": "linear-gradient(135deg, #f9fafb 0%, #e6eef5 100%)",
        // Light accent gradient (used in GGCC for cards)
        "accent-gradient": "linear-gradient(to right, rgba(191, 96, 113, 0.1) 0%, rgba(140, 169, 180, 0.1) 100%)",
        // CTA section gradient (burgundy → green)
        "cta-gradient": "linear-gradient(135deg, #2b473f 0%, #932528 100%)",
        // Hero: use black-based overlay for consistent white text visibility
        "hero-overlay": "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6))",
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },

      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'blink-slow': 'blink 2s infinite',
      },

      // Custom utilities
      boxShadow: {
        'glass': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'hover-lift': '0 10px 25px rgba(0, 0, 0, 0.1)',
      },

      backdropBlur: {
        'sm': '4px',
        'md': '12px',
      },

      // Kenya flag top border as a reusable utility
      background: {
        'kenya-flag': 'linear-gradient(to right, #000 0%, #000 30%, #fff 30%, #fff 35%, #DE2910 35%, #DE2910 65%, #fff 65%, #fff 70%, #006600 70%, #006600 100%)',
      },
    },
  },
  plugins: [],
};