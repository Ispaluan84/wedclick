import { useState } from 'react'
import { motion } from 'framer-motion'
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

function PhoneMockup({ onEnter }) {
  return (
    <div
      className="relative cursor-pointer"
      style={{ width: '240px' }}
      onMouseEnter={onEnter}
    >
      {/* Cuerpo del teléfono */}
      <div
        className="relative shadow-2xl"
        style={{
          background: '#1A1410',
          borderRadius: '2.5rem',
          padding: '10px',
          border: '2px solid #2A2420',
        }}
      >
        {/* Notch */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-10"
          style={{
            width: '80px', height: '24px',
            background: '#1A1410',
            borderBottomLeftRadius: '14px',
            borderBottomRightRadius: '14px',
          }}
        />
        {/* Botón lateral derecho */}
        <div
          className="absolute"
          style={{
            right: '-4px', top: '80px',
            width: '3px', height: '40px',
            background: '#2A2420',
            borderRadius: '0 2px 2px 0',
          }}
        />
        {/* Botones laterales izquierdo */}
        <div
          className="absolute"
          style={{
            left: '-4px', top: '70px',
            width: '3px', height: '28px',
            background: '#2A2420',
            borderRadius: '2px 0 0 2px',
          }}
        />
        <div
          className="absolute"
          style={{
            left: '-4px', top: '108px',
            width: '3px', height: '48px',
            background: '#2A2420',
            borderRadius: '2px 0 0 2px',
          }}
        />

        {/* Pantalla */}
        <div
          className="relative overflow-hidden"
          style={{ borderRadius: '2rem', aspectRatio: '9/19.5', background: '#F7F2EB' }}
        >
          <picture>
            <source srcSet="/screenshots/demo-mobile.webp" type="image/webp" />
            <img
              src="/screenshots/demo-mobile.jpg"
              alt="Demo móvil Elena & Marcos"
              width="240"
              height="520"
              className="w-full h-full object-cover object-top"
              loading="eager"
            />
          </picture>
          {/* Hint */}
          <div
            className="absolute inset-0 flex items-end justify-center pb-5"
            style={{ background: 'linear-gradient(to top, rgba(26,20,16,0.55) 0%, transparent 50%)' }}
          >
            <div className="flex items-center gap-2">
              <Monitor size={11} style={{ color: '#C9A96E' }} />
              <span className="font-sans uppercase tracking-widest" style={{ fontSize: '8px', color: '#E8D5B0' }}>
                Ver escritorio
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tarjeta flotante — Playlist */}
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-14 top-16"
        style={{
          background: '#FBF8F3',
          border: '1px solid #E8D5B0',
          padding: '9px 13px',
          width: '125px',
          boxShadow: '0 8px 30px rgba(26,20,16,0.10)',
        }}
      >
        <div className="flex items-center gap-2">
          <span style={{ color: '#C9A96E', fontSize: '11px' }}>♪</span>
          <div>
            <p className="font-sans text-[9px] tracking-widest uppercase" style={{ color: '#8B8177' }}>Playlist</p>
            <p className="font-sans text-[10px] font-light" style={{ color: '#1A1410' }}>12 canciones</p>
          </div>
        </div>
      </motion.div>

      {/* Tarjeta flotante — Álbum */}
      <motion.div
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -left-14 bottom-24"
        style={{
          background: '#FBF8F3',
          border: '1px solid #E8D5B0',
          padding: '9px 13px',
          width: '125px',
          boxShadow: '0 8px 30px rgba(26,20,16,0.10)',
        }}
      >
        <div className="flex items-center gap-2">
          <span style={{ color: '#C9A96E', fontSize: '11px' }}>◈</span>
          <div>
            <p className="font-sans text-[9px] tracking-widest uppercase" style={{ color: '#8B8177' }}>Álbum</p>
            <p className="font-sans text-[10px] font-light" style={{ color: '#1A1410' }}>48 fotos</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function LaptopMockup({ onLeave }) {
  return (
    <div
      className="relative cursor-pointer"
      style={{ width: '420px' }}
      onMouseLeave={onLeave}
    >
      {/* Pantalla / Tapa */}
      <div
        className="relative"
        style={{
          background: '#1A1410',
          borderRadius: '10px 10px 0 0',
          padding: '8px 8px 0 8px',
          border: '2px solid #2A2420',
          borderBottom: 'none',
          boxShadow: '0 -4px 40px rgba(26,20,16,0.25)',
        }}
      >
        {/* Cámara web */}
        <div
          className="absolute top-3 left-1/2 -translate-x-1/2"
          style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2A2420' }}
        />
        {/* Marco interior de pantalla */}
        <div
          style={{
            background: '#0D0A08',
            borderRadius: '5px 5px 0 0',
            padding: '18px 6px 0 6px',
            marginTop: '8px',
          }}
        >
          {/* Barra de navegador */}
          <div
            className="flex items-center gap-2 px-3 mb-0"
            style={{
              height: '28px',
              background: '#1A1410',
              borderRadius: '4px 4px 0 0',
            }}
          >
            <div className="flex gap-1.5">
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
            </div>
            <div
              className="flex-1 mx-2 flex items-center px-2"
              style={{
                height: '16px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '3px',
              }}
            >
              <span className="font-sans font-light" style={{ fontSize: '8px', color: 'rgba(201,169,110,0.5)' }}>
                elena-marcos.wedclick.es
              </span>
            </div>
          </div>

          {/* Imagen escritorio */}
          <div style={{ height: '280px', overflow: 'hidden', background: '#F7F2EB' }}>
            <picture>
              <source srcSet="/screenshots/demo-desktop.webp" type="image/webp" />
              <img
                src="/screenshots/demo-desktop.jpg"
                alt="Demo escritorio Elena & Marcos"
                width="900"
                height="280"
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </picture>
          </div>
        </div>
      </div>

      {/* Base / Bisagra */}
      <div
        style={{
          height: '10px',
          background: 'linear-gradient(to bottom, #222, #1A1410)',
          borderRadius: '0 0 4px 4px',
          border: '2px solid #2A2420',
          borderTop: '1px solid #333',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        }}
      />
      {/* Base inferior — reposamuñecas */}
      <div
        style={{
          height: '18px',
          background: 'linear-gradient(to bottom, #1E1A17, #161210)',
          borderRadius: '0 0 12px 12px',
          border: '2px solid #2A2420',
          borderTop: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
        }}
      >
        {/* Trackpad */}
        <div
          style={{
            width: '60px',
            height: '10px',
            background: '#1A1410',
            borderRadius: '3px',
            border: '1px solid #2A2420',
          }}
        />
      </div>

      {/* Hint volver */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <Smartphone size={11} style={{ color: '#C9A96E' }} />
        <span className="font-sans uppercase tracking-widest" style={{ fontSize: '8px', color: '#8B8177' }}>
          Volver a móvil
        </span>
      </div>
    </div>
  )
}

function DemoPreview() {
  const [isDesktop, setIsDesktop] = useState(false)

  return (
    <section id="demo" className="bg-paper py-28 px-6 overflow-hidden">

      {/* Línea decorativa superior */}
      <div className="max-w-6xl mx-auto">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-w-gold/30 to-transparent mb-16" />
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
              Explorad la invitación de Elena & Marcos. Pasad el cursor sobre
              la pantalla para ver cómo se ve en escritorio.
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
            className="flex justify-center"
            style={{ minHeight: '520px', alignItems: 'center' }}
          >
            <div className="relative flex items-center justify-center" style={{ width: '460px', height: '500px' }}>

              {/* Vista móvil */}
              <motion.div
                className="absolute"
                animate={{
                  opacity: isDesktop ? 0 : 1,
                  scale:   isDesktop ? 0.9 : 1,
                  y:       isDesktop ? 12 : 0,
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                style={{ pointerEvents: isDesktop ? 'none' : 'auto' }}
              >
                <PhoneMockup onEnter={() => setIsDesktop(true)} />
              </motion.div>

              {/* Vista escritorio */}
              <motion.div
                className="absolute"
                animate={{
                  opacity: isDesktop ? 1 : 0,
                  scale:   isDesktop ? 1 : 0.92,
                  y:       isDesktop ? 0 : 12,
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                style={{ pointerEvents: isDesktop ? 'auto' : 'none' }}
              >
                <LaptopMockup onLeave={() => setIsDesktop(false)} />
              </motion.div>

            </div>
          </motion.div>

          {/* — Columna derecha: info + CTA — */}
          <div className="flex flex-col gap-10">

            {/* Indicador de modo */}
            <motion.div {...fadeUp(0.1)}>
              <div className="flex items-center gap-6 mb-2">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ background: isDesktop ? 'rgba(201,169,110,0.2)' : '#C9A96E' }}
                    transition={{ duration: 0.3 }}
                    style={{ width: '8px', height: '8px', borderRadius: '50%' }}
                  />
                  <span
                    className="font-sans text-[10px] tracking-widest uppercase transition-colors duration-300"
                    style={{ color: isDesktop ? '#8B8177' : '#C9A96E' }}
                  >
                    Móvil
                  </span>
                </div>
                <div style={{ width: '32px', height: '1px', background: 'rgba(139,129,119,0.2)' }} />
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ background: isDesktop ? '#C9A96E' : 'rgba(201,169,110,0.2)' }}
                    transition={{ duration: 0.3 }}
                    style={{ width: '8px', height: '8px', borderRadius: '50%' }}
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
                    className="flex items-center gap-4 py-4"
                    style={{ borderBottom: '1px solid rgba(26,20,16,0.08)' }}
                  >
                    <span className="font-sans text-[10px] w-4 text-center" style={{ color: 'rgba(201,169,110,0.6)' }}>
                      {m.emoji}
                    </span>
                    <span className="font-sans text-sm font-light text-ink tracking-wide">
                      {m.titulo}
                    </span>
                    <span className="ml-auto font-sans text-[10px] tracking-widest uppercase" style={{ color: 'rgba(139,129,119,0.4)' }}>
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