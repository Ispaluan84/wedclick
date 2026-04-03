/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blueWillow: '#6A8DAD',
        goldAccent: '#D9C99E',
        copperLight: '#B98362',
        slateGray:  '#333E50',
        warmWhite:  '#F5F5F5',
      },
      fontFamily: {
        serif:  ['Playfair Display', 'serif'],
        sans:   ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


