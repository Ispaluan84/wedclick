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

  const W = 210
  const H = 140

  // La invitación es más alta que el sobre para que sobre salga por arriba
  const invW = W - 24
  const invH = 160

  return (
    <div
      className="cursor-pointer select-none"
      style={{ position: 'relative', width: W, height: H + invH * 0.6 }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      data-hover
    >
      {/* ── Sobre (base) — siempre visible, z bajo ── */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: W,
        height: H,
        zIndex: 1,
      }}>
        {/* Sombra / cuerpo */}
        <div style={{
          position: 'absolute', inset: 0,
          background: '#EDE5D8',
          border: '1px solid #D4C4A8',
          boxShadow: '0 20px 60px rgba(26,20,16,0.14)',
        }} />

        {/* Triángulo inferior interior (V frontal) */}
        <svg
          style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '55%', zIndex: 3 }}
          viewBox={`0 0 ${W} ${H * 0.55}`}
          preserveAspectRatio="none"
        >
          <polygon
            points={`0,0 ${W},0 ${W / 2},${H * 0.55}`}
            fill="#E4D9CB"
            stroke="#D4C4A8"
            strokeWidth="0.8"
          />
        </svg>

        {/* Triángulos laterales */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 2 }}
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
        >
          <polygon points={`0,0 0,${H} ${W / 2},${H * 0.52}`} fill="#EAE0D2" stroke="#D4C4A8" strokeWidth="0.8" />
          <polygon points={`${W},0 ${W},${H} ${W / 2},${H * 0.52}`} fill="#EAE0D2" stroke="#D4C4A8" strokeWidth="0.8" />
        </svg>

        {/* Solapa superior — se dobla hacia atrás en hover */}
        <motion.div
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '100%',
            transformOrigin: 'top center',
            zIndex: 4,
            perspective: 400,
          }}
          animate={{ rotateX: open ? -160 : 0 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        >
          <svg
            viewBox={`0 0 ${W} ${H * 0.56}`}
            style={{ width: '100%', display: 'block' }}
            preserveAspectRatio="none"
          >
            <polygon
              points={`0,0 ${W},0 ${W / 2},${H * 0.56}`}
              fill={open ? '#D8CFC0' : '#E0D6C8'}
              stroke="#D4C4A8"
              strokeWidth="0.8"
            />
            {/* Sello */}
            <circle cx={W / 2} cy={10} r="9" fill="none" stroke="#C9A96E" strokeWidth="0.8" opacity="0.8" />
            <circle cx={W / 2} cy={10} r="4" fill="#C9A96E" opacity="0.5" />
          </svg>
        </motion.div>
      </div>

      {/* ── Invitación — sale por encima del sobre ── */}
      <motion.div
        animate={{
          y:       open ? 0   : invH * 0.55,
          opacity: open ? 1   : 0,
        }}
        transition={{
          duration: 0.8,
          ease: [0.19, 1, 0.22, 1],
          delay: open ? 0.3 : 0,   // espera a que la solapa se abra
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: invW,
          height: invH,
          zIndex: 10,             // encima del sobre siempre
          background: '#F7F2EB',
          padding: '18px 22px',
          textAlign: 'center',
          boxShadow: '0 24px 70px rgba(26,20,16,0.22)',
          pointerEvents: 'none',
        }}
      >
        <p style={{ fontFamily: 'DM Sans', fontSize: '7px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: '8px' }}>
          — Os invitamos —
        </p>
        <p style={{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontSize: '15px', color: '#1A1410', lineHeight: 1.3 }}>
          Elena
        </p>
        <p style={{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontSize: '22px', color: '#C9A96E', lineHeight: 1, margin: '4px 0' }}>
          &
        </p>
        <p style={{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontSize: '15px', color: '#1A1410', lineHeight: 1.3 }}>
          Marcos
        </p>
        <div style={{ width: '20px', height: '1px', background: '#C9A96E', margin: '10px auto' }} />
        <p style={{ fontFamily: 'DM Sans', fontSize: '6.5px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8B8177', lineHeight: 2.1 }}>
          14 · IX · 2025<br />
          Hacienda Los Olivos<br />
          Sevilla
        </p>
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