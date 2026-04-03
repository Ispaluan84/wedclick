import { motion } from 'framer-motion'
import { MessageCircle, Sparkles } from 'lucide-react'
import SectionWrapper from '../ui/SectionWrapper.jsx'

const WHATSAPP_NUMBER  = '34627147039'
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hola, me gustaría información sobre las invitaciones de boda de WedClick 💍'
)

// Cuando tengáis la invitación real, simplemente cambiad esta URL
const DEMO_URL = null // 👈 Aquí irá el enlace cuando esté lista: 'https://...'

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.6, delay, ease: 'easeOut' },
})

function Demo() {
  return (
    <SectionWrapper id="demo" className="bg-white">

      {/* Encabezado */}
      <motion.div {...fadeUp(0)} className="text-center mb-16">
        <span className="inline-block font-sans text-xs tracking-widest uppercase text-blueWillow mb-4">
          Demo
        </span>
        <h2 className="section-title">
          Verlo para creerlo
        </h2>
        <p className="section-subtitle">
          Nada mejor que experimentar en primera persona
          cómo se siente recibir una invitación WedClick.
        </p>
      </motion.div>

      {/* Contenido */}
      <motion.div
        {...fadeUp(0.1)}
        className="max-w-2xl mx-auto"
      >
        <div className="relative bg-warmWhite rounded-3xl p-12 border border-gray-100
                        shadow-sm flex flex-col items-center gap-8 text-center overflow-hidden">

          {/* Elemento decorativo fondo */}
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full
                          bg-blueWillow opacity-[0.04]" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full
                          bg-goldAccent opacity-[0.06]" />

          {/* Icono */}
          <div className="relative w-20 h-20 rounded-full bg-blueWillow/10
                          flex items-center justify-center">
            <Sparkles size={32} className="text-blueWillow" />
            <div className="absolute inset-0 rounded-full border-2
                            border-blueWillow/20 scale-110" />
          </div>

          {/* Texto */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-2xl text-slateGray">
              La demo está en camino
            </h3>
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-px bg-goldAccent" />
              <span className="text-goldAccent">◆</span>
              <div className="w-8 h-px bg-goldAccent" />
            </div>
            <p className="font-sans font-light text-sm text-gray-400 leading-relaxed max-w-md">
              Estamos creando una invitación real para que podáis verla y sentirla
              tal y como la recibirán vuestros invitados.
              <br /><br />
              Mientras tanto, si queréis haceros una idea de lo que podemos crear
              para vosotros, escribidnos. Estaremos encantados de contároslo.
            </p>
          </div>

          {/* CTA */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500
                       text-white font-sans font-semibold text-sm px-8 py-3
                       rounded-full hover:bg-green-600 transition-all duration-300
                       shadow-sm hover:shadow-md cursor-pointer"
          >
            <MessageCircle size={16} />
            Preguntarnos por WhatsApp
          </a>

          {/* Nota */}
          <p className="font-sans text-xs text-gray-300">
            ✦ La demo estará disponible muy pronto
          </p>

        </div>
      </motion.div>

      {/* Cierre decorativo */}
      <motion.div
        {...fadeUp(0.2)}
        className="mt-16 flex flex-col items-center gap-3"
      >
        <div className="flex items-center gap-3">
          <div className="w-16 h-px bg-goldAccent opacity-50" />
          <span className="text-goldAccent text-xl">◆</span>
          <div className="w-16 h-px bg-goldAccent opacity-50" />
        </div>
        <p className="font-sans font-light text-xs text-gray-300 text-center">
          Cuando la demo esté lista, será la primera que veáis.
        </p>
      </motion.div>

    </SectionWrapper>
  )
}

export default Demo