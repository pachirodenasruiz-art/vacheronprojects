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
        brand: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e", // Vacheron Primary Emerald Teal
          800: "#115e59",
          900: "#134e4a",
          950: "#042f2e",
        },
        corporate: {
          dark: "#0c4a45",
          primary: "#0f766e",
          accent: "#14b8a6",
          light: "#f0fdfa",
          muted: "#334155",
        }
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'brand': '0 4px 20px -2px rgba(15, 118, 110, 0.12)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 10px 25px -5px rgba(15, 118, 110, 0.1), 0 8px 10px -6px rgba(15, 118, 110, 0.05)',
      }
    },
  },
  plugins: [],
};
export default config;
