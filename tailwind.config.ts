import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bifrost: {
          bg: "#030407",
          card: "#090A0F",
          cardHover: "#11131C",
          surface: "#0D0E15",
          border: "rgba(255, 255, 255, 0.08)",
          borderLight: "rgba(255, 255, 255, 0.15)",
          blue: "#2997FF",
          blueDark: "#0071E3",
          cyan: "#00F5FF",
          emerald: "#10B981",
          amber: "#F59E0B",
          rose: "#F43F5E",
          purple: "#A855F7",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Segoe UI"',
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        mono: [
          '"SF Mono"',
          "ui-monospace",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(41, 151, 255, 0.3)",
        glowEmerald: "0 0 40px -10px rgba(16, 185, 129, 0.3)",
        apple: "0 20px 50px rgba(0, 0, 0, 0.6)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "shimmer": "shimmer 2.5s infinite linear",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
