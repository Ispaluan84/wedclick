import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MessageCircle } from 'lucide-react'
import SectionWrapper from '../ui/SectionWrapper.jsx'

const WHATSAPP_NUMBER  = '34627147039'
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hola, me gustaría información sobre las invitaciones de boda de WedClick 💍'
)

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.6, delay, ease: 'easeOut' },
})

const faqs = [
  {
    question: '¿Cuánto tiempo tardáis en entregar la invitación?',
    answer:   'Al ser invitaciones completamente personalizadas y sin plantillas, una vez que recibimos toda la información necesaria (fotos, vuestra historia, datos del evento y lista de invitados), tardamos entre 5 y 7 días en tenerla lista. Si necesitáis la invitación antes, podemos llegar a un acuerdo para una entrega express. Consúltanos sin compromiso.',
  },
  {
    question: '¿Cómo recibimos las confirmaciones de asistencia y los alérgenos?',
    answer:   'Podéis consultar todas las confirmaciones de asistencia y los alérgenos indicados por vuestros invitados a través de un panel propio que os facilitamos, o recibirlos directamente por email. Vosotros elegís la opción que más os convenga.',
  },
  {
    question: '¿Cuánto tiempo estará activa la invitación?',
    answer:   'La invitación estará activa hasta el día de vuestra boda. Si habéis contratado el extra de Galería post-boda, el tiempo se ampliará según lo acordado para que vuestros invitados puedan ver y descargar las fotos del gran día.',
  },
  {
    question: '¿Puedo añadir extras después de contratar el paquete principal?',
    answer:   'Por supuesto. Podéis añadir cualquier extra en cualquier momento, incluso después de haber contratado el paquete principal. Solo tenéis que contactarnos y lo gestionamos sin complicaciones.',
  },
  {
    question: '¿Funciona en cualquier dispositivo?',
    answer:   'Sí. La invitación está diseñada para verse perfecta en cualquier dispositivo: móvil, tablet u ordenador. No hace falta descargar ninguna app ni crear ninguna cuenta. Solo abrir el enlace y disfrutar.',
  },
  {
    question: '¿Qué pasa si tenemos más de 200 invitados?',
    answer:   'El paquete principal cubre hasta 200 invitados. Si vuestra lista es más larga, no hay problema. Consúltanos y os preparamos un presupuesto personalizado sin ningún compromiso.',
  },
  {
    question: '¿Puedo hacer cambios después de aprobar la invitación?',
    answer:   'El paquete incluye una ronda de revisión antes de la aprobación final. Si después de aprobarla necesitáis algún cambio puntual, podemos valorarlo y gestionarlo. Nuestro objetivo es que estéis completamente satisfechos con el resultado.',
  },
  {
    question: '¿Necesito tener conocimientos técnicos para usar la invitación?',
    answer:   'En absoluto. Nos encargamos de todo el proceso técnico. Vosotros solo tenéis que enviarnos el material y nosotros hacemos el resto. Cuando esté lista, solo necesitáis compartir el enlace o el QR con vuestros invitados.',
  },
]

function FAQItem({ faq, index }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      {...fadeUp(index * 0.05)}
      className="border border-gray-100 rounded-2xl overflow-hidden bg-white
                 hover:border-blueWillow/30 transition-colors duration-300"
    >
      {/* Pregunta */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4
                   px-7 py-5 text-left cursor-pointer"
      >
        <span className="font-serif text-base text-slateGray leading-snug">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown size={18} className="text-blueWillow" />
        </motion.div>
      </button>

      {/* Respuesta */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="px-7 pb-6">
              <div className="w-full h-px bg-gray-100 mb-5" />
              <p className="font-sans font-light text-sm text-gray-500 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  )
}

function FAQ() {
  return (
    <SectionWrapper id="faq" className="bg-warmWhite">

      {/* Encabezado */}
      <motion.div {...fadeUp(0)} className="text-center mb-16">
        <span className="inline-block font-sans text-xs tracking-widest uppercase text-blueWillow mb-4">
          FAQ
        </span>
        <h2 className="section-title">
          Tenéis preguntas.
          <br />
          Nosotros, respuestas.
        </h2>
        <p className="section-subtitle">
          Y si no encontráis la vuestra aquí,
          solo tenéis que escribirnos.
        </p>
      </motion.div>

      {/* Lista de preguntas */}
      <div className="max-w-3xl mx-auto flex flex-col gap-4 mb-16">
        {faqs.map((faq, index) => (
          <FAQItem key={faq.question} faq={faq} index={index} />
        ))}
      </div>

      {/* CTA final */}
      <motion.div
        {...fadeUp(0.3)}
        className="flex flex-col items-center gap-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-16 h-px bg-goldAccent opacity-50" />
          <span className="text-goldAccent text-xl">◆</span>
          <div className="w-16 h-px bg-goldAccent opacity-50" />
        </div>
        <p className="font-sans font-light text-sm text-gray-400 text-center">
          ¿Tenéis alguna duda que no está aquí?
          <br className="hidden md:block" />
          Escribidnos y os respondemos en menos de 24 horas.
        </p>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-500
                     text-white font-sans font-semibold text-sm px-6 py-3
                     rounded-full hover:bg-green-600 transition-all duration-300
                     shadow-sm hover:shadow-md cursor-pointer"
        >
          <MessageCircle size={16} />
          Preguntarnos por WhatsApp
        </a>
      </motion.div>

    </SectionWrapper>
  )
}

export default FAQ