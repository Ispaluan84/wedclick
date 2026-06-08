import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Divide el bundle en chunks más pequeños para mejor tree-shaking
    rollupOptions: {
      output: {
        manualChunks: {
          // Separa las librerías grandes en chunks propios
          'react-vendor':   ['react', 'react-dom', 'react-router-dom'],
          'motion':         ['framer-motion'],
          'stripe':         ['@stripe/stripe-js', '@stripe/react-stripe-js'],
          'ui':             ['lucide-react'],
        },
      },
    },
    // Tamaño máximo de chunk antes de avisar (kb)
    chunkSizeWarningLimit: 500,
  },
})
