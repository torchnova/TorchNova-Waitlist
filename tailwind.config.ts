import type { Config } from "tailwindcss";

/**
 * Design tokens mirror the CSS custom properties defined in the source HTML so
 * that Tailwind utilities and the bespoke glass styling in globals.css stay in
 * sync. The look-and-feel is deliberately kept identical to the original page.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        text: {
          DEFAULT: "#1d1d1f",
          2: "#58585c",
          3: "#86868b",
        },
        accent: {
          DEFAULT: "#ea6a2c",
          2: "#f6884a",
        },
        line: "rgba(0,0,0,0.08)",
        glass: {
          DEFAULT: "rgba(255,255,255,0.55)",
          strong: "rgba(255,255,255,0.68)",
          edge: "rgba(255,255,255,0.7)",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "Inter",
          "Segoe UI",
          "system-ui",
          "sans-serif",
        ],
      },
      borderRadius: {
        base: "12px",
      },
      transitionTimingFunction: {
        ease: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      maxWidth: {
        hero: "1180px",
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(14px) scale(.99)" },
          to: { opacity: "1", transform: "none" },
        },
        drift1: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(4vw,3vw) scale(1.08)" },
        },
        drift2: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(-3vw,-2vw) scale(1.06)" },
        },
        drift3: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(-2vw,3vw) scale(1.1)" },
        },
      },
      animation: {
        rise: "rise .7s cubic-bezier(0.4,0,0.2,1) both",
        drift1: "drift1 26s cubic-bezier(0.4,0,0.2,1) infinite",
        drift2: "drift2 30s cubic-bezier(0.4,0,0.2,1) infinite",
        drift3: "drift3 34s cubic-bezier(0.4,0,0.2,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
