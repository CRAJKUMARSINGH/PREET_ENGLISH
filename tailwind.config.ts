import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: ".5625rem", /* 9px */
        md: ".375rem", /* 6px */
        sm: ".1875rem", /* 3px */
      },
        colors: {
        // Hulu + Mysivi Inspired "Premium Comfort" Palette
        background: "hsl(220 15% 6%)", // Deep dark background
        foreground: "hsl(220 10% 95%)", // White-ish text
        
        // Brand Colors
        primary: {
          DEFAULT: "hsl(142 70% 50%)", // Hulu Green-ish (Vibrant)
          foreground: "hsl(220 15% 6%)", // Dark text on green
          hover: "hsl(142 70% 45%)",
        },
        secondary: {
          DEFAULT: "hsl(217 30% 18%)", // Dark Blue/Grey for cards
          foreground: "hsl(220 10% 95%)",
        },
        
        // Semantics
        destructive: {
          DEFAULT: "hsl(0 80% 60%)",
          foreground: "hsl(0 0% 100%)",
        },
        muted: {
          DEFAULT: "hsl(217 15% 25%)",
          foreground: "hsl(215 15% 70%)",
        },
        accent: {
          DEFAULT: "hsl(142 70% 50%)", 
          foreground: "hsl(220 15% 6%)",
        },
        
        // UI Components
        card: {
          DEFAULT: "hsl(220 20% 10%)", // Slightly lighter than bg
          foreground: "hsl(220 10% 95%)",
          border: "hsl(217 20% 20%)",
        },
        popover: {
          DEFAULT: "hsl(220 20% 10%)",
          foreground: "hsl(220 10% 95%)",
        },
        border: "hsl(217 20% 20%)",
        input: "hsl(217 20% 15%)",
        ring: "hsl(142 70% 50%)",
        
        // Chart / Data Viz
        chart: {
          "1": "hsl(142 70% 50%)",
          "2": "hsl(190 80% 50%)",
          "3": "hsl(280 60% 60%)",
          "4": "hsl(35 90% 60%)",
          "5": "hsl(0 80% 60%)",
        },
        
        sidebar: {
          DEFAULT: "hsl(220 20% 8%)",
          foreground: "hsl(220 10% 90%)",
          primary: "hsl(142 70% 50%)",
          "primary-foreground": "hsl(220 15% 6%)",
          accent: "hsl(217 20% 15%)",
          "accent-foreground": "hsl(220 10% 95%)",
          border: "hsl(217 20% 15%)",
          ring: "hsl(142 70% 50%)",
        },

        // Legacy/Special
        saffron: { // Kept for Indian context if needed, but muted
          DEFAULT: "hsl(35 90% 50%)",
          foreground: "hsl(220 15% 6%)",
        },
        status: {
          online: "hsl(142 70% 50%)",
          away: "hsl(35 90% 50%)",
          busy: "hsl(0 80% 60%)",
          offline: "hsl(217 15% 50%)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
