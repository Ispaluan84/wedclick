/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Paleta nueva "Papel & Alma" ──────────────────
        'cream':        '#F7F2EB',
        'paper':        '#FBF8F3',
        'ink':          '#1A1410',
        'w-gold':       '#C9A96E',   // prefijo 'w-' para evitar colisión con Tailwind 'gold'
        'w-gold-light': '#E8D5B0',
        'w-rose':       '#C4786A',   // prefijo 'w-' para evitar colisión con Tailwind 'rose'
        'w-sage':       '#7A8C7E',
        'warm-gray':    '#8B8177',
        'warm-dark':    '#2A2520',

        // ── Aliases retrocompatibles (panel, admin, checkout) ──
        'azul-oscuro':  '#243763',
        'beige-claro':  '#D9C7A6',
        'crema':        '#F7F2EB',
        'marron':       '#8B6F5C',
        'verde-suave':  '#7D9B76',
        'tierra':       '#CFC29B',
        'blanco-roto':  '#FDFCFA',
        'verde-oscuro': '#3D5A3E',
        'sage':         '#7D9B76',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem,7vw,8rem)',   { lineHeight: '0.9',  letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem,4.5vw,5rem)', { lineHeight: '1.0',  letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem,3vw,3.5rem)',   { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'eyebrow':    ['0.65rem', { lineHeight: '1', letterSpacing: '0.2em' }],
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'smooth':   'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      animation: {
        ticker: 'ticker 26s linear infinite',
      },
      keyframes: {
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
