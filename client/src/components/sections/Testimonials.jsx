import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.8, delay, ease: 'easeOut' },
})

const testimonios = [
  {
    id: 1,
    nombre: 'Laura & Daniel',
    fecha: 'Boda en Junio 2024',
    avatar: 'L',
    texto: 'Nuestra invitación fue un éxito total. Los invitados no paraban de decirnos lo bonita y original que era. La playlist colaborativa fue lo más divertido, ¡todos querían poner su canción!',
    estrellas: 5,
    destacado: 'La playlist colaborativa fue lo más divertido',
  },
  {
    id: 2,
    nombre: 'Carmen & Alejandro',
    fecha: 'Boda en Septiembre 2024',
    avatar: 'C',
    texto: 'El álbum colaborativo fue una idea genial. Al día siguiente de la boda ya teníamos cientos de fotos de todos los invitados. Un recuerdo increíble que no habríamos tenido de otra forma.',
    estrellas: 5,
    destacado: 'Al día siguiente ya teníamos cientos de fotos',
  },
  {
    id: 3,
    nombre: 'Marta & Pablo',
    fecha: 'Boda en Abril 2024',
    avatar: 'M',
    texto: 'Nos encantó poder personalizar cada detalle. Desde los colores hasta el texto, todo era exactamente como lo habíamos soñado. El equipo fue súper atento y rápido con los cambios.',
    estrellas: 5,
    destacado: 'Todo era exactamente como lo habíamos soñado',
  },
  {
    id: 4,
    nombre: 'Sofía & Javier',
    fecha: 'Boda en Julio 2024',
    avatar: 'S',
    texto: 'La confirmación de asistencia nos quitó un peso enorme de encima. Todo organizado, sin tener que llamar uno por uno. Y el itinerario ayudó mucho a que todos supieran qué hacer en cada momento.',
    estrellas: 5,
    destacado: 'Sin tener que llamar uno por uno',
  },
]

function Testimonials() {
  const [actual, setActual] = useState(0)

  const siguiente = () => {
    setActual((prev) => (prev >= testimonios.length - 1 ? 0 : prev + 1))
  }

  const anterior = () => {
    setActual((prev) => (prev <= 0 ? testimonios.length - 1 : prev - 1))
  }

  const testimonio = testimonios[actual]

  return (
    <section id="testimonios" className="bg-crema py-24 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">

        {/* Encabezado */}
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <span className="font-sans text-xs tracking-widest uppercase text-sage mb-4 block">
            Testimonios
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-verde-oscuro mb-6">
            Lo que dicen
            <br />
            <span className="italic text-tierra">nuestras parejas</span>
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-px bg-tierra opacity-50" />
            <span className="text-tierra text-lg">◆</span>
            <div className="w-12 h-px bg-tierra opacity-50" />
          </div>
        </motion.div>

        {/* Carrusel */}
        <motion.div {...fadeUp(0.15)} className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonio.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-sm
                         border border-black/5 text-center relative"
            >
              {/* Comilla decorativa */}
              <Quote size={48} className="text-tierra/10 mx-auto mb-6" />

              {/* Frase destacada */}
              <p className="font-serif text-xl md:text-2xl text-verde-oscuro
                            italic mb-6 leading-relaxed">
                "{testimonio.destacado}"
              </p>

              {/* Texto completo */}
              <p className="font-sans font-light text-marron leading-relaxed
                            max-w-2xl mx-auto mb-8">
                {testimonio.texto}
              </p>

              {/* Estrellas */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {Array.from({ length: testimonio.estrellas }).map((_, i) => (
                  <Star key={i} size={18} className="text-tierra" fill="#C4956A" />
                ))}
              </div>

              {/* Avatar y nombre */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br
                                from-sage/30 to-tierra/30 flex items-center
                                justify-center border-2 border-white shadow-sm">
                  <span className="font-serif text-lg text-verde-oscuro">
                    {testimonio.avatar}
                  </span>
                </div>
                <div>
                  <p className="font-serif text-lg text-verde-oscuro">
                    {testimonio.nombre}
                  </p>
                  <p className="font-sans text-xs text-marron/60">
                    {testimonio.fecha}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controles */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={anterior}
              className="w-12 h-12 rounded-full bg-white shadow-sm border border-black/5
                         flex items-center justify-center hover:bg-sage/5
                         hover:border-sage/20 transition-all"
            >
              <ChevronLeft size={20} className="text-verde-oscuro" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonios.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActual(i)}
                  className={`rounded-full transition-all duration-300
                             ${i === actual
                               ? 'w-8 h-2.5 bg-tierra'
                               : 'w-2.5 h-2.5 bg-tierra/25 hover:bg-tierra/40'
                             }`}
                />
              ))}
            </div>

            <button
              onClick={siguiente}
              className="w-12 h-12 rounded-full bg-white shadow-sm border border-black/5
                         flex items-center justify-center hover:bg-sage/5
                         hover:border-sage/20 transition-all"
            >
              <ChevronRight size={20} className="text-verde-oscuro" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Testimonials