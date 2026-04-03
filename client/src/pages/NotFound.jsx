import { motion } from 'framer-motion'
import { ArrowLeft, MessageCircle } from 'lucide-react'

const WHATSAPP_NUMBER  = '34627147039'
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hola, me gustaría información sobre las invitaciones de boda de WedClick 💍'
)

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 30 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})

function NotFound() {
  return (
    <section className="min-h-screen bg-warmWhite flex items-center justify-center px-6">

      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full
                        bg-blueWillow opacity-[0.06]" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full
                        bg-goldAccent opacity-[0.08]" />
      </div>

      <div className="relative max-w-2xl mx-auto text-center flex flex-col items-center gap-8">

        {/* Número 404 decorativo */}
        <motion.div {...fadeUp(0)} className="relative">
          <span className="font-serif text-[180px] md:text-[220px] font-bold leading-none
                           text-blueWillow opacity-10 select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-serif text-4xl md:text-5xl text-slateGray">
              ¡Vaya!
            </span>
          </div>
        </motion.div>

        {/* Separador */}
        <motion.div {...fadeUp(0.1)} className="flex items-center gap-3">
          <div className="w-12 h-px bg-goldAccent" />
          <span className="text-goldAccent text-lg">◆</span>
          <div className="w-12 h-px bg-goldAccent" />
        </motion.div>

        {/* Texto */}
        <motion.div {...fadeUp(0.2)} className="flex flex-col gap-4">
          <h1 className="font-serif text-2xl md:text-3xl text-slateGray">
            Esta página no existe
          </h1>
          <p className="font-sans font-light text-gray-400 leading-relaxed">
            Parece que el enlace que habéis seguido no lleva a ningún sitio.
            <br className="hidden md:block" />
            Pero vuestra historia sí tiene un lugar. Volvamos al inicio.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.3)}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="/"
            className="inline-flex items-center gap-2 btn-primary"
          >
            <ArrowLeft size={16} />
            Volver al inicio
          </a>
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
            Contactar por WhatsApp
          </a>
        </motion.div>

        {/* Nota */}
        <motion.p
          {...fadeUp(0.4)}
          className="font-sans text-xs text-gray-300 tracking-wide"
        >
          ✦ Si crees que esto es un error, escríbenos y lo revisamos
        </motion.p>

      </div>

    </section>
  )
}

export default NotFound
