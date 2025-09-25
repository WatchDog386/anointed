/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // GGCC Brand Colors
        primary: "#2b473f",       // Dark green – headings, text
        secondary: "#932528",     // Deep red – primary buttons
        accent: "#8CA9B4",        // Steel blue – hover, links, accents
        light: "#f6f4ee",         // Off-white background (from GGCC CSS)
        dark: "#1f2937",
        gray: {
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        // Kenya flag (for top border if needed)
        kenya: {
          black: "#000000",
          white: "#FFFFFF",
          red: "#DE2910",
          green: "#006600",
        },
      },

      fontFamily: {
        sans: ['"Open Sans"', "sans-serif"],
        montserrat: ['"Montserrat"', "sans-serif"],
        'ernest-emily': ['"Ernest Emily"', "serif"],
      },

      backgroundImage: {
        "soft-gradient": "linear-gradient(135deg, #f9fafb 0%, #e6eef5 100%)",
        "accent-gradient": "linear-gradient(to right, rgba(147, 37, 40, 0.1) 0%, rgba(140, 169, 180, 0.1) 100%)",
        "cta-gradient": "linear-gradient(135deg, #2b473f 0%, #932528 100%)",
        "hero-overlay": "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6))",
        "ggcc-gradient": "linear-gradient(-45deg, #2b473f, #8CA9B4, #932528, #f6f4ee)",
      },

      // GGCC Animation Keyframes
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        // GGCC Modal Animations
        modalFade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        modalZoom: {
          '0%': { transform: 'scale(0.8)' },
          '100%': { transform: 'scale(1)' },
        },
        // GGCC Fade Animations
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        // GGCC Loading Animations
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        // GGCC Slide Animations
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        // GGCC Bounce Animation
        bounceSoft: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-5px)' },
          '60%': { transform: 'translateY(-3px)' },
        },
        // GGCC Text Reveal
        textReveal: {
          '0%': { left: '0' },
          '100%': { left: '100%' },
        },
        // GGCC Gradient Shift
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        // GGCC Progress Bar
        progressFill: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        // GGCC Typing Animation
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blinkCaret: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: '#2b473f' },
        },
        // GGCC Shake Animation
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        // GGCC Zoom Animations
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.5)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        zoomOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.5)' },
        },
        // GGCC Rotate Animation
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        // Mobile-specific animations
        mobileSlideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },

      // GGCC Animation Classes
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'blink-slow': 'blink 2s infinite',
        // GGCC Modal Animations
        'modal-fade': 'modalFade 0.3s',
        'modal-zoom': 'modalZoom 0.6s',
        // GGCC Fade Animations
        'fade-in-up': 'fadeInUp 0.6s ease forwards',
        'fade-in-down': 'fadeInDown 0.6s ease forwards',
        'fade-in-left': 'fadeInLeft 0.6s ease forwards',
        'fade-in-right': 'fadeInRight 0.6s ease forwards',
        // GGCC Loading Animations
        'spin-slow': 'spin 1s linear infinite',
        'pulse-soft': 'pulseSoft 2s infinite',
        // GGCC Slide Animations
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        // GGCC Bounce Animation
        'bounce-soft': 'bounceSoft 0.5s',
        // GGCC Text Animation
        'typing': 'typing 3.5s steps(40, end)',
        'blink-caret': 'blinkCaret 0.75s step-end infinite',
        // GGCC Shake Animation
        'shake': 'shake 0.5s',
        // GGCC Zoom Animations
        'zoom-in': 'zoomIn 0.5s ease',
        'zoom-out': 'zoomOut 0.5s ease',
        // GGCC Rotate Animation
        'rotate-continuous': 'rotate 4s linear infinite',
        // GGCC Gradient Animation
        'gradient-shift': 'gradientShift 15s ease infinite',
        // GGCC Progress Animation
        'progress-fill': 'progressFill 2s ease-in-out',
        // Mobile Animation
        'mobile-slide-up': 'mobileSlideUp 0.5s ease',
      },

      // GGCC Transition Timing
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-out': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },

      // GGCC Transition Duration
      transitionDuration: {
        'smooth': '300ms',
        'fast': '200ms',
        'slower': '600ms',
      },

      boxShadow: {
        'glass': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'hover-lift': '0 10px 25px rgba(0, 0, 0, 0.1)',
        'ggcc-card': '0 4px 6px rgba(0, 0, 0, 0.09)',
      },

      backdropBlur: {
        'sm': '4px',
        'md': '12px',
      },

      backgroundSize: {
        'gradient-shift': '400% 400%',
      },

      background: {
        'kenya-flag': 'linear-gradient(to right, #000 0%, #000 30%, #fff 30%, #fff 35%, #DE2910 35%, #DE2910 65%, #fff 65%, #fff 70%, #006600 70%, #006600 100%)',
      },

      // GGCC Custom Utilities
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },

      // GGCC Border Styles
      borderWidth: {
        '3': '3px',
      },

      // GGCC Custom Border Styles
      borderStyle: {
        'dotted': 'dotted',
      },

      // GGCC Custom Opacity
      opacity: {
        '15': '0.15',
        '35': '0.35',
      },
    },
  },
  plugins: [
    // Custom plugin for GGCC-specific utilities
    function({ addUtilities, theme }) {
      const newUtilities = {
        // GGCC Button Hover Effects
        '.btn-hover-effect': {
          transition: 'all 0.2s ease',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            filter: 'brightness(1.2)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        // GGCC Menu Item Underline
        '.menu-item-underline': {
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            width: '0',
            height: '2px',
            bottom: '-5px',
            left: '0',
            backgroundColor: theme('colors.accent'),
            transition: 'width 0.3s ease',
          },
          '&:hover::after': {
            width: '100%',
          },
        },
        // GGCC Image Hover Effect
        '.image-hover': {
          transition: 'transform 0.3s ease, opacity 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            opacity: '0.9',
          },
        },
        // GGCC Card Hover Effect
        '.card-hover': {
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: theme('boxShadow.hover-lift'),
          },
        },
        // GGCC Text Reveal
        '.text-reveal': {
          overflow: 'hidden',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: theme('colors.primary'),
            animation: 'textReveal 1.5s ease-in-out forwards',
          },
        },
        // GGCC Flip Card
        '.flip-card': {
          perspective: '1000px',
          '.flip-card-inner': {
            transition: 'transform 0.6s',
            transformStyle: 'preserve-3d',
          },
          '&:hover .flip-card-inner': {
            transform: 'rotateY(180deg)',
          },
          '.flip-card-front, .flip-card-back': {
            backfaceVisibility: 'hidden',
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
          },
          '.flip-card-back': {
            transform: 'rotateY(180deg)',
          },
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
}