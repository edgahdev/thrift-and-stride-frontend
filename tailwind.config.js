/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enables class-based dark mode
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // Scan all JSX/TSX/JS/TS files
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
        slideUp: 'slideUp 0.7s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
