/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saarthi: {
          navy: {
            DEFAULT: "#0B2545",
            dark: "#071B33",
            light: "#133E68",
            subtle: "#1E3A8A"
          },
          green: {
            DEFAULT: "#15803D",
            hover: "#14532D",
            light: "#22C55E",
            surface: "#F0FDF4",
            border: "#BBF7D0"
          },
          saffron: {
            DEFAULT: "#EA580C",
            hover: "#C2410C",
            light: "#F97316",
            surface: "#FFF7ED",
            border: "#FED7AA"
          },
          ashoka: {
            blue: "#0A2540",
            gold: "#D97706"
          },
          bg: {
            base: "#F8FAFC",
            card: "#FFFFFF",
            subtle: "#F1F5F9"
          }
        }
      },
      boxShadow: {
        soft: "0 2px 10px rgba(11, 37, 69, 0.05)",
        card: "0 4px 20px rgba(11, 37, 69, 0.07)",
        hover: "0 10px 25px -3px rgba(11, 37, 69, 0.12), 0 4px 6px -2px rgba(11, 37, 69, 0.05)"
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ]
      }
    },
  },
  plugins: [],
};
