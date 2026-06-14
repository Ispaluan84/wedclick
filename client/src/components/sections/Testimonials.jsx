import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const testimonios = [
  {
    id: 1,
    nombre: 'Laura & Daniel',
    fecha: 'Boda en Junio 2025',
    avatar: 'L',
    texto: 'Nuestra invitación fue un éxito total. Los invitados no paraban de decirnos lo bonita y original que era. La playlist colaborativa fue lo más divertido, ¡todos querían poner su canción!',
    destacado: 'La playlist colaborativa fue lo más divertido',
  },
  {
    id: 2,
    nombre: 'Carmen & Alejandro',
    fecha: 'Boda en Septiembre 2025',
    avatar: 'C',
    texto: 'El álbum colaborativo fue una idea genial. Al día siguiente de la boda ya teníamos cientos de fotos de todos los invitados. Un recuerdo increíble que no habríamos tenido de otra forma.',
    destacado: 'Al día siguiente ya teníamos cientos de fotos',
  },
  {
    id: 3,
    nombre: 'Marta & Pablo',
    fecha: 'Boda en Abril 2025',
    avatar: 'M',
    texto: 'Nos encantó poder personalizar cada detalle. Desde los colores hasta el texto, todo era exactamente como lo habíamos soñado. El equipo fue súper atento y rápido con los cambios.',
    destacado: 'Todo era exactamente como lo habíamos soñado',
  },
  {
    id: 4,
    nombre: 'Sofía & Javier',
    fecha: 'Boda en Julio 2025',
    avatar: 'S',
    texto: 'La confirmación de asistencia nos quitó un peso enorme de encima. Todo organizado, sin tener que llamar uno por uno. Y el itinerario ayudó mucho a que todos supieran qué hacer en cada momento.',
    destacado: 'Sin tener que llamar uno por uno',
  },
]

function Testimonials() {
  const [actual, setActual] = useState(0)
  const t = testimonios[actual]

  const siguiente = () => setActual((p) => (p >= testimonios.length - 1 ? 0 : p + 1))
  const anterior  = () => setActual((p) => (p <= 0 ? testimonios.length - 1 : p - 1))

  return (
    <section id="testimonios" data-dark className="bg-ink px-8 md:px-14 py-32 relative overflow-hidden">

      {/* Texto fantasma decorativo */}
      <span
        className="pointer-events-none select-none absolute bottom-0 left-0
                   font-serif font-black italic text-[18rem] leading-[0.8]
                   text-w-gold/[0.06] whitespace-nowrap"
        aria-hidden="true"
      >
        amor
      </span>

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="text-center mb-16"
        >
          <p className="font-sans text-[0.62rem] tracking-[0.2em] uppercase text-white/50 mb-6">
            Lo que dicen nuestras parejas
          </p>
          <h2 className="font-serif font-bold text-display-md text-paper leading-tight">
            Historias de amor,{' '}
            <em className="italic">bien contadas</em>
          </h2>
        </motion.div>

        {/* Carrusel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="text-center"
          >
            {/* Estrellas */}
            <div className="text-w-gold-light text-sm tracking-[0.3em] mb-8" aria-label="5 estrellas">
              ✦ ✦ ✦ ✦ ✦
            </div>

            {/* Cita destacada */}
            <blockquote className="font-serif italic text-display-md text-paper leading-[1.25] mb-8">
              "{t.destacado}"
            </blockquote>

            {/* Texto completo */}
            <p className="font-sans font-light text-[0.9rem] text-white/75 leading-relaxed
                          max-w-2xl mx-auto mb-10">
              {t.texto}
            </p>

            {/* Avatar y nombre */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-white/15 border border-white/20
                              flex items-center justify-center">
                <span className="font-serif text-lg text-paper">{t.avatar}</span>
              </div>
              <p className="font-serif italic text-[1.1rem] text-paper">{t.nombre}</p>
              <p className="font-sans text-[0.6rem] tracking-[0.12em] uppercase text-white/50">
                {t.fecha}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controles */}
        <div className="flex items-center justify-center gap-5 mt-12">
          <button
            onClick={anterior}
            aria-label="Testimonio anterior"
            className="w-11 h-11 border border-white/20 flex items-center justify-center
                       hover:border-white/50 hover:bg-white/10 transition-all duration-300"
            data-hover
          >
            <ChevronLeft size={18} className="text-white/70" />
          </button>

          <div className="flex items-center gap-2">
            {testimonios.map((_, i) => (
              <button
                key={i}
                onClick={() => setActual(i)}
                aria-label={`Ver testimonio ${i + 1}`}
                className={`rounded-full transition-all duration-300
                           ${i === actual
                             ? 'w-7 h-3 bg-white'
                             : 'w-3 h-3 bg-white/30 hover:bg-white/50'}`}
              />
            ))}
          </div>

          <button
            onClick={siguiente}
            aria-label="Testimonio siguiente"
            className="w-11 h-11 border border-white/20 flex items-center justify-center
                       hover:border-white/50 hover:bg-white/10 transition-all duration-300"
            data-hover
          >
            <ChevronRight size={18} className="text-white/70" />
          </button>
        </div>

      </div>
    </section>
  )
}

export default Testimonials
