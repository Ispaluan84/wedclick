import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import noviosHero from '../assets/images/novios-hero.jpg'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 30 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.8, delay, ease: 'easeOut' },
})

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <img
          src={noviosHero}
          alt="Elena & Marcos"
          className="w-full h-full object-cover object-center"
        />
        {/* Overlay oscuro para legibilidad */}
        <div className="absolute inset-0 bg-verde-oscuro/50" />
        {/* Overlay degradado abajo */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center gap-6">

        {/* Decoración superior */}
        <motion.div {...fadeUp(0.2)} className="flex items-center gap-3">
          <div className="w-12 h-px bg-tierra opacity-70" />
          <span className="text-tierra text-lg">✦</span>
          <div className="w-12 h-px bg-tierra opacity-70" />
        </motion.div>

        {/* Nombres */}
        <motion.h1
          {...fadeUp(0.3)}
          className="font-serif text-6xl md:text-8xl text-white leading-tight"
        >
          Elena
          <span className="block text-tierra text-4xl md:text-5xl font-light italic my-2">
            &
          </span>
          Marcos
        </motion.h1>

        {/* Fecha */}
        <motion.div {...fadeUp(0.4)} className="flex flex-col items-center gap-2">
          <p className="font-sans text-white/80 tracking-widest uppercase text-sm">
            14 de Junio de 2025
          </p>
          <p className="font-sans text-white/60 text-xs tracking-widest uppercase">
            Sevilla, España
          </p>
        </motion.div>

        {/* Separador */}
        <motion.div {...fadeUp(0.5)} className="flex items-center gap-3">
          <div className="w-12 h-px bg-tierra opacity-70" />
          <span className="text-tierra text-lg">◆</span>
          <div className="w-12 h-px bg-tierra opacity-70" />
        </motion.div>

        {/* Cuenta atrás */}
        <motion.div
          {...fadeUp(0.6)}
          className="flex items-center gap-6 md:gap-10"
        >
          {[
            { label: 'Días',     value: getDaysLeft() },
            { label: 'Horas',   value: new Date().getHours()   },
            { label: 'Minutos', value: new Date().getMinutes() },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1">
              <span className="font-serif text-4xl md:text-5xl text-white font-bold">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="font-sans text-xs text-white/60 tracking-widest uppercase">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.a
          {...fadeUp(0.7)}
          href="#confirmacion"
          className="btn-natural mt-4"
        >
          Confirmar asistencia
        </motion.a>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2
                   flex-col items-center gap-2 hidden md:flex"
      >
        <span className="font-sans text-xs text-white/60 tracking-widest uppercase">
          Descubrir
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="text-white opacity-60" />
        </motion.div>
      </motion.div>

    </section>
  )
}

// Calcula los días que faltan para la boda
function getDaysLeft() {
  const wedding = new Date('2025-06-14')
  const today   = new Date()
  const diff    = wedding - today
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export default Hero