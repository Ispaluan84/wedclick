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

// Sobre animado con invitación
function EnvelopeCard() {
  const [open, setOpen] = useState(false)

  const W = 192  // ancho sobre en px
  const H = 128  // alto sobre en px

  return (
    <div
      className="cursor-pointer select-none"
      style={{ position: 'relative' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      data-hover
    >
      {/* Contenedor con perspectiva */}
      <div style={{ width: W, height: H + 80, position: 'relative' }}>

        {/* ── Invitación que sube desde dentro ── */}
        <motion.div
          animate={{ y: open ? -70 : 10, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1], delay: open ? 0.15 : 0 }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: W - 20,
            zIndex: 2,
            background: '#F7F2EB',
            padding: '16px 20px',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(26,20,16,0.18)',
          }}
        >
          <p style={{ fontFamily: 'DM Sans', fontSize: '7px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '6px' }}>
            — Os invitamos —
          </p>
          <p style={{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontSize: '13px', color: '#1A1410', lineHeight: 1.3 }}>
            Elena & Marcos
          </p>
          <div style={{ width: '20px', height: '1px', background: '#C9A96E', margin: '6px auto' }} />
          <p style={{ fontFamily: 'DM Sans', fontSize: '6.5px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8B8177', lineHeight: 2 }}>
            14 · IX · 2025<br />
            Hacienda Los Olivos<br />
            Sevilla
          </p>
        </motion.div>

        {/* ── Sobre ── */}
        <div style={{ position: 'absolute', bottom: 0, width: W, height: H, zIndex: 3 }}>

          {/* Cuerpo del sobre */}
          <div style={{
            position: 'absolute', inset: 0,
            background: '#EDE5D8',
            border: '1px solid #D4C4A8',
            boxShadow: '0 20px 60px rgba(26,20,16,0.12)',
          }} />

          {/* Triángulo inferior (parte frontal V) */}
          <svg
            style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '60%', zIndex: 5 }}
            viewBox={`0 0 ${W} ${H * 0.6}`}
            preserveAspectRatio="none"
          >
            <polygon
              points={`0,0 ${W},0 ${W / 2},${H * 0.6}`}
              fill="#E8DDD0"
              stroke="#D4C4A8"
              strokeWidth="0.8"
            />
          </svg>

          {/* Triángulos laterales */}
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 4 }}
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
          >
            {/* Izquierdo */}
            <polygon
              points={`0,0 0,${H} ${W / 2},${H * 0.5}`}
              fill="#EAE0D2"
              stroke="#D4C4A8"
              strokeWidth="0.8"
            />
            {/* Derecho */}
            <polygon
              points={`${W},0 ${W},${H} ${W / 2},${H * 0.5}`}
              fill="#EAE0D2"
              stroke="#D4C4A8"
              strokeWidth="0.8"
            />
          </svg>

          {/* Solapa superior — se abre en hover */}
          <motion.div
            style={{
              position: 'absolute', top: 0, left: 0,
              width: '100%',
              transformOrigin: 'top center',
              zIndex: 6,
            }}
            animate={{ rotateX: open ? -155 : 0 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          >
            <svg
              viewBox={`0 0 ${W} ${H * 0.55}`}
              style={{ width: '100%', display: 'block' }}
              preserveAspectRatio="none"
            >
              <polygon
                points={`0,0 ${W},0 ${W / 2},${H * 0.55}`}
                fill={open ? '#D4C4A8' : '#E0D6C8'}
                stroke="#D4C4A8"
                strokeWidth="0.8"
              />
              {/* Sello dorado en la solapa */}
              <circle cx={W / 2} cy={12} r="8" fill="none" stroke="#C9A96E" strokeWidth="0.8" opacity="0.7" />
              <circle cx={W / 2} cy={12} r="4" fill="#C9A96E" opacity="0.4" />
            </svg>
          </motion.div>

        </div>
      </div>
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
                       tracking-[0.12em] uppercase text-ink/50
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
          <p className="font-serif italic text-ink/50 text-sm leading-snug">
            Cada boda,<br />una historia única
          </p>
        </motion.div>
      </div>

      {/* ── COLUMNA DERECHA ── */}
      <div className="relative min-h-[60vh] md:min-h-0 overflow-hidden">
        <div className="absolute inset-0 md:inset-y-12 md:inset-r-10 md:left-0 bg-w-gold-light">

          <OrnamentalSVG />

          <div className="absolute inset-0 flex items-center justify-center">

            {/* Tarjeta de fondo — Claudia & Daniel */}
            <div className="absolute z-10"
                 style={{ transform: 'rotate(5deg) translate(55px, 18px)' }}>
              <div className="bg-paper w-44 md:w-56 px-7 py-10 text-center
                              shadow-[0_40px_80px_rgba(26,20,16,0.18)]">
                <p className="font-sans text-[0.44rem] tracking-[0.18em] uppercase text-w-gold mb-4">
                  — Os invitamos —
                </p>
                <p className="font-serif italic text-lg text-ink">Claudia</p>
                <p className="font-serif italic text-4xl text-w-gold leading-none my-1">&</p>
                <p className="font-serif italic text-lg text-ink">Daniel</p>
                <div className="w-5 h-px bg-w-gold mx-auto my-4" />
                <p className="font-sans text-[0.42rem] tracking-[0.1em] uppercase
                               text-warm-gray leading-[2.1]">
                  Sábado, 21 de junio de 2025<br />
                  6:00 de la tarde<br />
                  Finca La Encina · Valencia
                </p>
              </div>
            </div>

            {/* Sobre animado — encima y centrado */}
            <div className="relative z-20 inv-card-tilt">
              <EnvelopeCard />
            </div>

          </div>
        </div>
      </div>

    </section>
  )
}

export default HeroLanding