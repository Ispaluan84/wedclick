import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

function OrnamentalSVG() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.13]"
      viewBox="0 0 500 600"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <g fill="none" stroke="#C9A96E" strokeWidth="0.6">
        <ellipse cx="250" cy="300" rx="220" ry="270" />
        <ellipse cx="250" cy="300" rx="185" ry="225" />
        <ellipse cx="250" cy="300" rx="150" ry="180" />
        <ellipse cx="250" cy="300" rx="115" ry="135" />
        <line x1="250" y1="10"  x2="250" y2="590" />
        <line x1="10"  y1="300" x2="490" y2="300" />
        <path d="M250,30 Q340,120 470,120 Q340,240 470,300 Q340,360 470,480 Q340,480 250,570" />
        <path d="M250,30 Q160,120 30,120  Q160,240 30,300  Q160,360 30,480  Q160,480 250,570" />
        <path d="M250,30 L260,52 L250,74 L240,52 Z" />
        <path d="M250,526 L260,548 L250,570 L240,548 Z" />
        <circle cx="250" cy="300" r="12" />
        <circle cx="250" cy="300" r="5" fill="#C9A96E" opacity="0.4" />
        <circle cx="250" cy="30"  r="3" fill="#C9A96E" opacity="0.5" />
        <circle cx="250" cy="570" r="3" fill="#C9A96E" opacity="0.5" />
        <circle cx="30"  cy="300" r="3" fill="#C9A96E" opacity="0.5" />
        <circle cx="470" cy="300" r="3" fill="#C9A96E" opacity="0.5" />
      </g>
    </svg>
  )
}

// Dos tarjetas que intercambian al hacer hover
function InvitationCards() {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative cursor-pointer"
      style={{ width: '240px', height: '320px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hover
    >
      {/* Tarjeta trasera — Elena & Marcos */}
      <motion.div
        animate={{
          rotate:  hovered ? -3  : 5,
          x:       hovered ? -30 : 55,
          y:       hovered ? 10  : 18,
          zIndex:  hovered ? 20  : 10,
          scale:   hovered ? 1   : 0.95,
        }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <div className="bg-cream w-44 p-6 shadow-[0_20px_60px_rgba(26,20,16,0.12)]">
          <p className="font-sans text-[0.48rem] tracking-[0.16em] uppercase text-w-gold mb-3">
            Save the date
          </p>
          <p className="font-serif italic text-[0.95rem] text-ink leading-snug">
            Elena & Marcos
          </p>
          <div className="w-5 h-px bg-w-gold my-3" />
          <p className="font-sans text-[0.46rem] tracking-[0.12em] uppercase text-warm-gray leading-loose">
            14 · IX · 2025<br />
            Hacienda Los Olivos<br />
            Sevilla
          </p>
        </div>
      </motion.div>

      {/* Tarjeta delantera — Claudia & Daniel */}
      <motion.div
        animate={{
          rotate:  hovered ? 4   : -2,
          x:       hovered ? 40  : 0,
          y:       hovered ? 20  : 0,
          zIndex:  hovered ? 10  : 20,
          scale:   hovered ? 0.95 : 1,
        }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <div className="bg-paper w-44 md:w-52 px-7 py-10 text-center shadow-[0_40px_80px_rgba(26,20,16,0.18)]">
          <p className="font-sans text-[0.44rem] tracking-[0.18em] uppercase text-w-gold-dark mb-4">
            — Os invitamos —
          </p>
          <p className="font-serif italic text-lg text-ink">Claudia</p>
          <p className="font-serif italic text-4xl text-w-gold leading-none my-1">&</p>
          <p className="font-serif italic text-lg text-ink">Daniel</p>
          <div className="w-5 h-px bg-w-gold mx-auto my-4" />
          <p className="font-sans text-[0.42rem] tracking-[0.1em] uppercase text-warm-gray leading-[2.1]">
            Sábado, 21 de junio de 2025<br />
            6:00 de la tarde<br />
            Finca La Encina · Valencia
          </p>
        </div>
      </motion.div>
    </div>
  )
}
const anim = (delay = 0) => ({
  initial:    { opacity: 0, y: 32 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.19, 1, 0.22, 1] },
})

function HeroLanding() {
  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 relative overflow-hidden">

      {/* ── COLUMNA IZQUIERDA ── */}
      <div className="flex flex-col justify-end px-8 md:px-14 pt-36 pb-20 relative z-10">

        <motion.p {...anim(0.05)} className="section-label mb-10" data-number="">
          Invitaciones digitales de boda
        </motion.p>

        <motion.h1
          {...anim(0.15)}
          className="font-serif font-black text-display-xl text-ink mb-6 leading-[0.9]"
        >
          Tu boda merece<br />
          <em className="italic text-w-rose not-italic">una invitación</em><br />
          única
        </motion.h1>

        <motion.span {...anim(0.25)} className="ornament-line mb-8" />

        <motion.p
          {...anim(0.3)}
          className="font-sans font-light text-[0.95rem] leading-[1.85] text-warm-gray max-w-sm mb-12"
        >
          Creamos invitaciones digitales personalizadas que enamoran.
          Interactivas, elegantes y con todas las funcionalidades que
          necesitas para tu gran día.
        </motion.p>

        <motion.div {...anim(0.4)} className="flex flex-wrap items-center gap-6">
          <a
            href="https://elena-marcos.wedclick.es"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 font-sans text-[0.68rem]
                       tracking-[0.14em] uppercase px-8 py-4
                       bg-ink text-cream hover:bg-w-rose
                       transition-all duration-300"
            data-hover
          >
            Ver demo en vivo
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>

          <button
            onClick={() =>
              document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="flex items-center gap-3 font-sans text-[0.68rem]
                       tracking-[0.12em] uppercase text-ink/60
                       hover:text-ink transition-colors duration-300
                       border-b border-ink/20 pb-0.5"
            data-hover
          >
            <Play size={12} className="text-w-gold" />
            Cómo funciona
          </button>
        </motion.div>

        <motion.div {...anim(0.55)} className="flex items-center gap-4 mt-20">
          <div className="w-px h-10 bg-w-gold/50" />
          <p className="font-serif italic text-ink/60 text-sm leading-snug">
            Cada boda,<br />una historia única
          </p>
        </motion.div>
      </div>

      {/* ── COLUMNA DERECHA ── */}
      <div className="relative min-h-[60vh] md:min-h-0 overflow-hidden">
        <div className="absolute inset-0 md:inset-y-12 md:inset-r-10 md:left-0 bg-w-gold-light">

          <OrnamentalSVG />

          <div className="absolute inset-0 flex items-center justify-center">
            <InvitationCards />
          </div>
        </div>
      </div>

    </section>
  )
}

export default HeroLanding