import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

// Variantes de animación reutilizables
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 30 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.8, delay, ease: 'easeOut' },
})

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-warmWhite">

      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-blueWillow opacity-[0.06]" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-goldAccent opacity-[0.08]" />
        <div className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-blueWillow opacity-30" />
        <div className="absolute top-1/4 right-1/3 w-1.5 h-1.5 rounded-full bg-goldAccent opacity-40" />
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full bg-blueWillow opacity-20" />
      </div>

      {/* Contenido principal */}
      <div className="relative max-w-5xl mx-auto px-6 text-center pt-24 md:pt-32">

        {/* Badge */}
        <motion.div
          {...fadeUp(0.2)}
          className="inline-flex items-center gap-2 bg-blueWillow bg-opacity-10 
                     text-blueWillow text-xs font-sans tracking-widest uppercase 
                     px-5 py-2 rounded-full mb-10"
        >
          <span>✦</span>
          <span>Cada invitación es única. Como vuestra boda.</span>
          <span>✦</span>
        </motion.div>

        {/* Título principal */}
        <motion.h1
          {...fadeUp(0.3)}
          className="font-serif text-5xl md:text-6xl lg:text-7xl text-slateGray 
                     leading-tight mb-6"
        >
          No vendemos plantillas.
          <br />
          <span className="text-blueWillow italic">Contamos vuestra historia.</span>
        </motion.h1>

        {/* Separador decorativo */}
        <motion.div
          {...fadeUp(0.4)}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="w-12 h-px bg-goldAccent" />
          <span className="text-goldAccent text-lg">◆</span>
          <div className="w-12 h-px bg-goldAccent" />
        </motion.div>

        {/* Subtítulo */}
        <motion.p
          {...fadeUp(0.45)}
          className="font-sans font-light text-lg md:text-xl text-gray-400 
                     max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          La invitación es el primer momento que vuestros invitados
          vivirán de vuestra boda.
          <br className="hidden md:block" />
          Nosotros nos encargamos de que sea inolvidable.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.55)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#como-funciona" className="btn-primary">
            Ver cómo lo hacemos
          </a>
          <a href="#contacto" className="btn-secondary">
            Hablar con nosotros
          </a>
        </motion.div>

        {/* Confianza */}
        <motion.p
          {...fadeUp(0.65)}
          className="mt-8 font-sans text-xs text-gray-400 tracking-wide"
        >
          ✦ Hecho a mano &nbsp;·&nbsp; Trato humano &nbsp;·&nbsp; 100% personalizado
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 
          flex-col items-center gap-2
          hidden md:flex"
      >
        <span className="font-sans text-xs text-gray-400 tracking-widest uppercase">
          Descubrir
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="text-blueWillow opacity-60" />
        </motion.div>
      </motion.div>

    </section>
  )
}

export default Hero
