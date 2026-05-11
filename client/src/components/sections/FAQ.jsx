import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.8, delay, ease: 'easeOut' },
})

const preguntas = [
  {
    pregunta: '¿Cómo funciona el proceso de creación?',
    respuesta: 'Es muy sencillo. Nos contactáis, nos contáis vuestra historia y preferencias, y en pocos días tendréis vuestra invitación lista. Podréis revisar y pedir cambios hasta que sea perfecta.',
  },
  {
    pregunta: '¿Cuánto tiempo tardáis en tener la invitación lista?',
    respuesta: 'Normalmente entre 5 y 7 días laborables desde que recibimos toda la información. Si tenéis prisa, ofrecemos un servicio express de 48 horas con un pequeño suplemento.',
  },
  {
    pregunta: '¿Los invitados necesitan descargar alguna app?',
    respuesta: 'No, para nada. La invitación es una página web que se abre directamente en el navegador del móvil o del ordenador. Solo necesitan el enlace que les enviéis.',
  },
  {
    pregunta: '¿Puedo hacer cambios después de publicar la invitación?',
    respuesta: 'Sí, podéis hacer cambios en textos, horarios, ubicaciones y más en cualquier momento. Nosotros nos encargamos de actualizarlo al instante.',
  },
  {
    pregunta: '¿Cómo recibo las confirmaciones de asistencia?',
    respuesta: 'Tendréis acceso a un panel donde veréis en tiempo real quién ha confirmado, cuántos asistentes vienen, alergias alimentarias y cualquier nota que dejen vuestros invitados.',
  },
  {
    pregunta: '¿Las fotos del álbum colaborativo se pierden?',
    respuesta: 'No, todas las fotos quedan guardadas de forma segura. Al finalizar el evento os entregamos el álbum completo en alta resolución para que lo tengáis para siempre.',
  },
  {
    pregunta: '¿Puedo personalizar los colores y el diseño?',
    respuesta: 'Por supuesto. Cada invitación se diseña desde cero con vuestra paleta de colores, tipografías y estilo. No usamos plantillas genéricas, cada boda es única.',
  },
  {
    pregunta: '¿Hay límite de invitados?',
    respuesta: 'No hay límite. Ya sean 50 o 500 invitados, la invitación funciona igual de bien. Cada invitado puede confirmar asistencia, sugerir canciones y subir fotos sin restricciones.',
  },
]

function PreguntaItem({ pregunta, index }) {
  const [abierta, setAbierta] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <button
        onClick={() => setAbierta(!abierta)}
        className={`w-full text-left p-6 rounded-2xl transition-all duration-300
                   ${abierta
                     ? 'bg-white shadow-sm border border-black/5'
                     : 'bg-transparent hover:bg-white/50'
                   }`}
      >
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-serif text-lg text-verde-oscuro pr-4">
            {pregunta.pregunta}
          </h3>
          <div className={`w-8 h-8 rounded-full flex-shrink-0
                          flex items-center justify-center transition-colors
                          ${abierta ? 'bg-tierra/10' : 'bg-sage/10'}`}>
            {abierta
              ? <Minus size={16} className="text-tierra" />
              : <Plus size={16} className="text-sage" />
            }
          </div>
        </div>
                <AnimatePresence>
          {abierta && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <p className="font-sans font-light text-marron text-sm leading-relaxed
                            pt-4 border-t border-gray-100 mt-4">
                {pregunta.respuesta}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  )
}

function FAQ() {
  return (
    <section id="faq" className="bg-blanco-roto py-24 px-6 overflow-hidden">
      <div className="max-w-3xl mx-auto">

        {/* Encabezado */}
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <span className="font-sans text-xs tracking-widest uppercase text-sage mb-4 block">
            Dudas
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-verde-oscuro mb-6">
            Preguntas
            <br />
            <span className="italic text-tierra">frecuentes</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-tierra opacity-50" />
            <span className="text-tierra text-lg">◆</span>
            <div className="w-12 h-px bg-tierra opacity-50" />
          </div>
          <p className="font-sans font-light text-marron max-w-xl mx-auto leading-relaxed">
            Resolvemos las dudas más comunes. Si no encuentras lo que buscas,
            no dudes en contactarnos.
          </p>
        </motion.div>

        {/* Lista de preguntas */}
        <div className="flex flex-col gap-2">
          {preguntas.map((pregunta, index) => (
            <PreguntaItem key={index} pregunta={pregunta} index={index} />
          ))}
        </div>

        {/* CTA contacto */}
        <motion.div {...fadeUp(0.5)} className="mt-12 text-center">
          <div className="bg-white rounded-2xl px-8 py-6 shadow-sm
                          border border-black/5 inline-block">
            <p className="font-sans text-sm text-marron font-light mb-3">
              ¿Tienes alguna otra pregunta?
            </p>
            <a
              href="https://wa.me/34600000000?text=Hola!%20Tengo%20una%20duda%20sobre%20las%20invitaciones"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                         bg-verde-oscuro text-white font-sans text-sm
                         tracking-wide hover:bg-verde-oscuro/90 transition-colors"
            >
              💬 Escríbenos por WhatsApp
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default FAQ          