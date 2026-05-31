import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const preguntas = [
  { pregunta: '¿Cómo funciona el proceso de creación?', respuesta: 'Es muy sencillo. Nos contactáis, nos contáis vuestra historia y preferencias, y en pocos días tendréis vuestra invitación lista. Podréis revisar y pedir cambios hasta que sea perfecta.' },
  { pregunta: '¿Cuánto tiempo tardáis en tener la invitación lista?', respuesta: 'Normalmente entre 5 y 7 días laborables desde que recibimos toda la información. Si tenéis prisa, ofrecemos un servicio express de 48 horas con un pequeño suplemento.' },
  { pregunta: '¿Los invitados necesitan descargar alguna app?', respuesta: 'No, para nada. La invitación es una página web que se abre directamente en el navegador del móvil o del ordenador. Solo necesitan el enlace que les enviéis.' },
  { pregunta: '¿Puedo hacer cambios después de publicar la invitación?', respuesta: 'Sí, podéis hacer cambios en textos, horarios, ubicaciones y más en cualquier momento. Nosotros nos encargamos de actualizarlo al instante.' },
  { pregunta: '¿Cómo recibo las confirmaciones de asistencia?', respuesta: 'Tendréis acceso a un panel donde veréis en tiempo real quién ha confirmado, cuántos asistentes vienen, alergias alimentarias y cualquier nota que dejen vuestros invitados.' },
  { pregunta: '¿Las fotos del álbum colaborativo se pierden?', respuesta: 'No, todas las fotos quedan guardadas de forma segura. Al finalizar el evento os entregamos el álbum completo en alta resolución para que lo tengáis para siempre.' },
  { pregunta: '¿Puedo personalizar los colores y el diseño?', respuesta: 'Por supuesto. Cada invitación se diseña desde cero con vuestra paleta de colores, tipografías y estilo. No usamos plantillas genéricas, cada boda es única.' },
  { pregunta: '¿Hay límite de invitados?', respuesta: 'No hay límite. Ya sean 50 o 500 invitados, la invitación funciona igual de bien. Cada invitado puede confirmar asistencia, sugerir canciones y subir fotos sin restricciones.' },
]

function PreguntaItem({ pregunta, index }) {
  const [abierta, setAbierta] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.19, 1, 0.22, 1] }}
      className={`border-b transition-colors duration-300
                  ${abierta ? 'border-w-gold' : 'border-w-gold-light/40'}`}
    >
      <button
        onClick={() => setAbierta(!abierta)}
        className="w-full text-left py-7 flex items-center justify-between gap-6"
        data-hover
      >
        <h3 className="font-serif text-[1.05rem] text-ink leading-snug pr-4">
          {pregunta.pregunta}
        </h3>
        <div className={`w-8 h-8 flex-shrink-0 border flex items-center justify-center
                         transition-all duration-300
                         ${abierta ? 'border-w-gold bg-w-gold text-ink' : 'border-w-gold-light text-warm-gray'}`}>
          {abierta
            ? <Minus size={14} />
            : <Plus size={14} />}
        </div>
      </button>

      <AnimatePresence>
        {abierta && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="font-sans font-light text-[0.88rem] leading-[1.85] text-warm-gray pb-7">
              {pregunta.respuesta}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function FAQ() {
  return (
    <section id="faq" className="bg-cream px-8 md:px-14 pt-20 pb-36 overflow-hidden">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="mb-16"
        >
          <p className="section-label mb-6" data-number="06">Dudas</p>
          <h2 className="font-serif font-bold text-display-md text-ink leading-[1.0]">
            Preguntas{' '}
            <em className="italic text-w-rose">frecuentes</em>
          </h2>
        </motion.div>

        {/* Acordeón */}
        <div className="border-t border-w-gold-light/40">
          {preguntas.map((pregunta, index) => (
            <PreguntaItem key={index} pregunta={pregunta} index={index} />
          ))}
        </div>

        {/* CTA contacto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 flex items-center gap-6"
        >
          <span className="ornament-line" />
          <div>
            <p className="font-sans font-light text-[0.85rem] text-warm-gray mb-2">
              ¿Tienes alguna otra pregunta?
            </p>
            <a
              href="https://wa.me/34600000000?text=Hola!%20Tengo%20una%20duda%20sobre%20las%20invitaciones"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[0.68rem] tracking-[0.12em] uppercase text-ink
                         border-b border-w-gold pb-0.5 hover:border-ink transition-colors duration-300"
              data-hover
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
