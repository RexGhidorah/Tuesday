/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#594EE6", // Indigo-violet
        "primary-hover": "#483ec7",
        "success": "#00C875", // Vibrant Green
        "warning": "#FDAB3D", // Marigold
        "error": "#E2445C",   // Ruby Red
        "info": "#579BFC",    // Sky Blue
        "neutral-status": "#C4C4C4",
        "background-light": "#FFFFFF",
        "background-dark": "#121121",
        "surface": "#F5F6F8",
        "muted": "#676879",
        "border": "#D0D4E4",
        "text-main": "#323338"
      },
      fontFamily: {
        "display": ["Space Grotesk", "sans-serif"],
        "body": ["DM Sans", "sans-serif"],
        "mono": ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        "float": "0px 8px 24px rgba(0,0,0,0.08)",
        "cell": "0px 1px 3px rgba(0,0,0,0.05)",
      }
    },
  },
  plugins: [require("tailwindcss-animate"),
    forms,
    containerQueries,
  ],
}
