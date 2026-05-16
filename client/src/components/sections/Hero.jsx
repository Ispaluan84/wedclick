import { motion } from 'framer-motion'
import { ArrowRight, Play, Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true },
  transition:  { duration: 0.8, delay, ease: 'easeOut' },
})

function HeroLanding() {
  const navigate = useNavigate()

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden
                 bg-gradient-to-b from-crema via-blanco-roto to-blanco-roto"
    >
      <div className="relative max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Columna izquierda — Texto */}
          <div className="flex flex-col gap-8">
            <motion.div {...fadeUp(0)}>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                           bg-verde-suave/20 border border-beige-claro"
              >
                <Heart size={14} className="text-verde-suave" />
                <span className="font-sans text-xs tracking-widest uppercase text-verde-suave">
                  Invitaciones de boda digitales
                </span>
              </div>
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)}
              className="font-serif text-5xl md:text-6xl lg:text-7xl text-azul-oscuro leading-tight"
            >
              Tu boda merece
              <br />
              <span className="italic text-tierra">una invitación</span>
              <br />
              única
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              className="font-sans font-light text-marron text-lg md:text-xl leading-relaxed max-w-lg"
            >
              Creamos invitaciones digitales personalizadas que enamoran.
              Interactivas, elegantes y con todas las funcionalidades que
              necesitas para tu gran día.
            </motion.p>

            <motion.div {...fadeUp(0.3)} className="flex flex-wrap items-center gap-4">
              <a
                href="https://elena-marcos.wedclick.es"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-3.5 rounded-xl
                           bg-azul-oscuro text-crema border border-beige-claro
                           font-sans font-semibold text-sm uppercase
                           hover:bg-beige-claro hover:text-azul-oscuro
                           transition-colors duration-300 shadow-md"
              >
                Ver demo en vivo
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() =>
                  document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="group flex items-center gap-3 px-6 py-4 rounded-2xl
                           bg-crema text-azul-oscuro font-sans text-sm
                           tracking-wide border border-beige-claro
                           hover:border-tierra hover:bg-tierra/30
                           transition-all"
              >
                <Play size={16} className="text-tierra" />
                Cómo funciona
              </button>
            </motion.div>
          </div>

          {/* Columna derecha — Logo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="flex justify-center"
          >
            <img
              src="/Logo_WedClick.png" 
              alt="Logo WedClick"
              width={288}
              height={288}
              fetchPriority="high"
              className="w-72 h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroLanding