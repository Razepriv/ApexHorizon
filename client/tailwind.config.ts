import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: {
          DEFAULT: "#000000",
          secondary: "#0A0A0A"
        },
        primary: {
          DEFAULT: "#FF4444",
          hover: "#CC0000",
        },
        secondary: {
          DEFAULT: "#FF8C42",
        },
        tech: {
          DEFAULT: "#00F0FF",
        },
        premium: {
          DEFAULT: "#FFD700",
        },
        text: {
          DEFAULT: "#FFFFFF",
          muted: "#B8B8B8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
        display: ["var(--font-space-grotesk)", ...fontFamily.sans],
      },
      fontSize: {
        'hero': 'clamp(48px, 8vw, 120px)',
        'section': 'clamp(32px, 5vw, 64px)',
      },
      lineHeight: {
        'hero': '1.1',
        'body': '1.7',
      },
      letterSpacing: {
        'hero': '-0.02em',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FF4444 0%, #CC0000 100%)',
        'gradient-glow': 'radial-gradient(circle, rgba(255,68,68,0.3) 0%, transparent 70%)',
        'gradient-section': 'linear-gradient(180deg, #000000 0%, #1A0000 100%)',
      },
      keyframes: {
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        "glow-pulse": {
          "0%, 100%": {
            opacity: "0.5",
          },
          "50%": {
            opacity: "1",
          },
        },
        "gradient-shimmer": {
          "0%": {
            backgroundPosition: "200% 0%",
          },
          "100%": {
            backgroundPosition: "-200% 0%",
          },
        },
        "float": {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out forwards",
        "fade-in": "fade-in 0.3s ease-out forwards",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "gradient-shimmer": "gradient-shimmer 3s linear infinite",
        "float": "float 6s ease-in-out infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
} satisfies Config;