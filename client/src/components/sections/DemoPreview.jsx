import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Smartphone, Monitor } from 'lucide-react'

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
  const [isDesktop, setIsDesktop] = useState(false)

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
              Pasad el cursor sobre la pantalla para ver la versión escritorio.
            </p>
          </div>
        </motion.div>

        {/* Layout principal */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* — Columna izquierda: mockup interactivo — */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="flex justify-center pt-10"
          >
            {/* Contenedor con tamaño fijo para que el layout no salte */}
            <div className="relative" style={{ height: '520px', width: '300px' }}>

              {/* — Vista MÓVIL — teléfono */}
              <motion.div
                animate={{
                  opacity: isDesktop ? 0 : 1,
                  scale:   isDesktop ? 0.92 : 1,
                  y:       isDesktop ? 10 : 0,
                }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="absolute inset-0 flex justify-center"
                style={{ pointerEvents: isDesktop ? 'none' : 'auto' }}
              >
                {/* Teléfono */}
                <div
                  className="relative shadow-2xl cursor-pointer"
                  style={{
                    background: '#1A1410',
                    borderRadius: '2.25rem',
                    padding: '10px',
                    width: '260px',
                    alignSelf: 'flex-start',
                  }}
                  onMouseEnter={() => setIsDesktop(true)}
                >
                  {/* Notch */}
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 z-10"
                    style={{
                      width: '90px', height: '22px',
                      background: '#1A1410',
                      borderBottomLeftRadius: '14px',
                      borderBottomRightRadius: '14px',
                    }}
                  />
                  {/* Pantalla móvil */}
                  <div
                    className="relative overflow-hidden"
                    style={{ borderRadius: '1.75rem', aspectRatio: '9/19.5' }}
                  >
                    <img
                      src="/screenshots/demo-mobile.jpg"
                      alt="Demo móvil Elena & Marcos"
                      className="w-full h-full object-cover object-top"
                    />
                    {/* Hint hover */}
                    <div
                      className="absolute inset-0 flex items-end justify-center pb-5"
                      style={{
                        background: 'linear-gradient(to top, rgba(26,20,16,0.55) 0%, transparent 50%)',
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Monitor size={12} style={{ color: '#C9A96E' }} />
                        <span
                          className="font-sans uppercase tracking-widest"
                          style={{ fontSize: '8px', color: '#E8D5B0' }}
                        >
                          Ver escritorio
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tarjeta flotante — Playlist */}
                  <motion.div
                    animate={{ y: [0, -7, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -right-12 top-14"
                    style={{
                      background: '#FBF8F3',
                      border: '1px solid #E8D5B0',
                      padding: '10px 14px',
                      width: '130px',
                      boxShadow: '0 8px 30px rgba(26,20,16,0.10)',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-w-gold text-xs">♪</span>
                      <div>
                        <p className="font-sans text-[9px] tracking-widest uppercase text-warm-gray">Playlist</p>
                        <p className="font-sans text-[10px] text-ink font-light">12 canciones</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Tarjeta flotante — Álbum */}
                  <motion.div
                    animate={{ y: [0, 7, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="absolute -left-12 bottom-20"
                    style={{
                      background: '#FBF8F3',
                      border: '1px solid #E8D5B0',
                      padding: '10px 14px',
                      width: '130px',
                      boxShadow: '0 8px 30px rgba(26,20,16,0.10)',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-w-gold text-xs">◈</span>
                      <div>
                        <p className="font-sans text-[9px] tracking-widest uppercase text-warm-gray">Álbum</p>
                        <p className="font-sans text-[10px] text-ink font-light">48 fotos</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* — Vista ESCRITORIO — panel expandido */}
              <motion.div
                animate={{
                  opacity: isDesktop ? 1 : 0,
                  scale:   isDesktop ? 1 : 0.94,
                  y:       isDesktop ? 0 : 10,
                }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="absolute inset-0 flex justify-center"
                style={{ pointerEvents: isDesktop ? 'auto' : 'none' }}
                onMouseLeave={() => setIsDesktop(false)}
              >
                <div
                  className="relative shadow-2xl cursor-pointer overflow-hidden"
                  style={{
                    width: '420px',
                    height: '500px',
                    border: '1px solid rgba(201,169,110,0.25)',
                    background: '#1A1410',
                    marginLeft: '-60px', // desplaza para que use el espacio disponible
                  }}
                >
                  {/* Barra de navegador simulada */}
                  <div
                    className="flex items-center gap-2 px-3"
                    style={{
                      height: '32px',
                      background: '#141010',
                      borderBottom: '1px solid rgba(201,169,110,0.15)',
                    }}
                  >
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-warm-gray/20" />
                      <div className="w-2.5 h-2.5 rounded-full bg-warm-gray/20" />
                      <div className="w-2.5 h-2.5 rounded-full bg-warm-gray/20" />
                    </div>
                    <div
                      className="flex-1 mx-2 px-3 flex items-center"
                      style={{
                        height: '18px',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '3px',
                      }}
                    >
                      <span
                        className="font-sans font-light"
                        style={{ fontSize: '9px', color: 'rgba(201,169,110,0.5)' }}
                      >
                        elena-marcos.wedclick.es
                      </span>
                    </div>
                  </div>

                  {/* Imagen escritorio */}
                  <div style={{ height: 'calc(100% - 32px)', overflow: 'hidden' }}>
                    <img
                      src="/screenshots/demo-desktop.jpg"
                      alt="Demo escritorio Elena & Marcos"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Hint volver */}
                  <div
                    className="absolute bottom-0 left-0 right-0 flex items-end justify-center pb-4"
                    style={{
                      background: 'linear-gradient(to top, rgba(26,20,16,0.6) 0%, transparent 60%)',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Smartphone size={12} style={{ color: '#C9A96E' }} />
                      <span
                        className="font-sans uppercase tracking-widest"
                        style={{ fontSize: '8px', color: '#E8D5B0' }}
                      >
                        Volver a móvil
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>

          {/* — Columna derecha: secciones + CTA — */}
          <div className="flex flex-col gap-10">

            {/* Indicador de modo activo */}
            <motion.div {...fadeUp(0.1)}>
              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ background: isDesktop ? 'rgba(201,169,110,0.2)' : '#C9A96E' }}
                    transition={{ duration: 0.3 }}
                    className="w-2 h-2 rounded-full"
                  />
                  <span
                    className="font-sans text-[10px] tracking-widest uppercase transition-colors duration-300"
                    style={{ color: isDesktop ? '#8B8177' : '#C9A96E' }}
                  >
                    Móvil
                  </span>
                </div>
                <div className="w-8 h-px bg-warm-gray/20" />
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ background: isDesktop ? '#C9A96E' : 'rgba(201,169,110,0.2)' }}
                    transition={{ duration: 0.3 }}
                    className="w-2 h-2 rounded-full"
                  />
                  <span
                    className="font-sans text-[10px] tracking-widest uppercase transition-colors duration-300"
                    style={{ color: isDesktop ? '#C9A96E' : '#8B8177' }}
                  >
                    Escritorio
                  </span>
                </div>
              </div>
            </motion.div>

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
                    className="flex items-center gap-4 py-4 border-b border-ink/8"
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