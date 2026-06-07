import { motion } from 'framer-motion'
import { ArrowRight, Smartphone } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.8, delay, ease: 'easeOut' },
})

const miniaturas = [
  { id: 1, titulo: 'Portada',          emoji: '✦' },
  { id: 2, titulo: 'Historia de amor', emoji: '♡' },
  { id: 3, titulo: 'Ubicaciones',      emoji: '◈' },
  { id: 4, titulo: 'Itinerario',       emoji: '◇' },
  { id: 5, titulo: 'Confirmación',     emoji: '◉' },
]

function DemoPreview() {
  return (
    <section id="demo" className="bg-paper py-28 px-6 overflow-hidden">

      {/* Línea decorativa superior */}
      <div className="max-w-6xl mx-auto">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-w-gold/30 to-transparent mb-28" />
      </div>

      <div className="max-w-6xl mx-auto">

        {/* Encabezado editorial */}
        <motion.div {...fadeUp(0)} className="mb-20">
          <p className="font-sans text-[0.6rem] tracking-[0.25em] uppercase text-w-gold mb-6">
            Demo en vivo
          </p>
          <div className="grid md:grid-cols-2 gap-6 items-end">
            <h2 className="font-serif text-display-lg text-ink leading-[1.05]">
              Descubre cómo será
              <br />
              <em className="text-w-gold not-italic">vuestra invitación</em>
            </h2>
            <p className="font-sans font-light text-warm-gray text-base leading-relaxed max-w-sm md:ml-auto">
              Explorad la invitación de Elena & Marcos, nuestra demo interactiva.
              Navegad por cada sección y descubrid todas las funcionalidades.
            </p>
          </div>
        </motion.div>

        {/* Layout principal */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* — Columna izquierda: mockup — */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="flex justify-center"
          >
            <div className="relative">

              {/* Teléfono — sin border-radius exagerado, geométrico */}
              <div
                className="relative shadow-2xl w-[260px]"
                style={{
                  background: '#1A1410',
                  borderRadius: '2.25rem',
                  padding: '10px',
                }}
              >
                {/* Notch */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 z-10"
                  style={{
                    width: '90px',
                    height: '22px',
                    background: '#1A1410',
                    borderBottomLeftRadius: '14px',
                    borderBottomRightRadius: '14px',
                  }}
                />
                {/* Pantalla */}
                <div
                  className="overflow-hidden bg-cream"
                  style={{
                    borderRadius: '1.75rem',
                    aspectRatio: '9/19.5',
                  }}
                >
                  <img
                    src="/screenshots/demo-portada.jpg"
                    alt="Demo Elena & Marcos"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.parentNode.style.background = '#F7F2EB'
                    }}
                  />
                  {/* Overlay cuando no hay imagen */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    <p className="font-sans text-[8px] tracking-[0.25em] uppercase text-warm-gray mb-3">
                      Nos casamos
                    </p>
                    <h3 className="font-serif text-lg text-ink leading-tight mb-2">
                      Elena & Marcos
                    </h3>
                    <div className="w-6 h-px bg-w-gold my-2" />
                    <p className="font-sans text-[9px] text-warm-gray font-light">
                      15 · IX · 2025
                    </p>
                  </div>
                </div>
              </div>

              {/* Tarjeta flotante — Playlist */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-10 top-14"
                style={{
                  background: '#FBF8F3',
                  border: '1px solid #E8D5B0',
                  padding: '10px 14px',
                  width: '140px',
                  boxShadow: '0 8px 30px rgba(26,20,16,0.10)',
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-w-gold text-xs">♪</span>
                  <div>
                    <p className="font-sans text-[9px] tracking-widest uppercase text-warm-gray">
                      Playlist
                    </p>
                    <p className="font-sans text-[10px] text-ink font-light">
                      12 canciones
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Tarjeta flotante — Álbum */}
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -left-10 bottom-20"
                style={{
                  background: '#FBF8F3',
                  border: '1px solid #E8D5B0',
                  padding: '10px 14px',
                  width: '140px',
                  boxShadow: '0 8px 30px rgba(26,20,16,0.10)',
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-w-gold text-xs">◈</span>
                  <div>
                    <p className="font-sans text-[9px] tracking-widest uppercase text-warm-gray">
                      Álbum
                    </p>
                    <p className="font-sans text-[10px] text-ink font-light">
                      48 fotos
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>

          {/* — Columna derecha: secciones + CTA — */}
          <div className="flex flex-col gap-10">

            {/* Lista de secciones */}
            <motion.div {...fadeUp(0.2)}>
              <p className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-warm-gray mb-6">
                Qué incluye la demo
              </p>
              <div className="flex flex-col">
                {miniaturas.map((m, i) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * i }}
                    className="flex items-center gap-4 py-4 border-b border-ink/8 group"
                  >
                    <span className="font-sans text-[10px] text-w-gold/60 w-4 text-center">
                      {m.emoji}
                    </span>
                    <span className="font-sans text-sm font-light text-ink tracking-wide">
                      {m.titulo}
                    </span>
                    <span className="ml-auto font-sans text-[10px] tracking-widest uppercase text-warm-gray/40">
                      0{m.id}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Blurb + CTA */}
            <motion.div {...fadeUp(0.4)}>
              <p className="font-sans font-light text-warm-gray text-sm leading-relaxed mb-7 max-w-sm">
                Dress code, mapa interactivo, playlist colaborativa, álbum de fotos
                compartido y confirmación de asistencia — todo en una sola URL.
              </p>

              <a
                href="https://elena-marcos.wedclick.es"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-7 py-4
                           bg-ink text-cream
                           font-sans text-xs tracking-[0.15em] uppercase font-light
                           hover:bg-warm-dark transition-colors duration-300"
              >
                <Smartphone size={14} />
                Ver demo completa
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </motion.div>

          </div>
        </div>

        {/* Línea decorativa inferior */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-w-gold/30 to-transparent mt-28" />

      </div>
    </section>
  )
}

export default DemoPreview