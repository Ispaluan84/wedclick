/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Ajusta según tu estructura
  ],
  theme: {
    extend: {
      colors: {
        'azul-oscuro':  '#243763',
        'beige-claro':  '#D9C7A6',
        'crema':        '#F1EFE6',
        'marron':       '#8B6F5C',
        'verde-suave':  '#7D9B76',
        'tierra':       '#CFC29B',
        'blanco-roto':  '#FDFCFA',
        'sage':         '#7D9B76',
        'verde-oscuro': '#3D5A3E',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans:  ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}