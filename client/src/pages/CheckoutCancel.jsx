import { motion } from 'framer-motion'
import { XCircle, ArrowLeft, MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function CheckoutCancel() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-crema flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full bg-white rounded-3xl p-10 shadow-sm
                   border border-beige-claro text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
          className="w-20 h-20 rounded-full bg-red-50 border-2 border-red-100
                     flex items-center justify-center mx-auto mb-6"
        >
          <XCircle size={40} className="text-red-400" />
        </motion.div>

        <h1 className="font-serif text-3xl text-azul-oscuro mb-4">
          Pago cancelado
        </h1>

        <p className="font-sans font-light text-marron leading-relaxed mb-8">
          No te preocupes, no se ha realizado ningún cargo. Si tienes alguna
          duda o necesitas ayuda con el proceso de pago, estamos aquí para
          ayudarte.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl
                       bg-azul-oscuro text-crema font-sans text-sm uppercase tracking-wide
                       border border-beige-claro hover:bg-beige-claro hover:text-azul-oscuro
                       transition-colors duration-300 shadow-md"
          >
            <ArrowLeft size={14} />
            Volver e intentarlo de nuevo
          </button>

          <a
            href="https://wa.me/34600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl
                       bg-crema text-azul-oscuro font-sans text-sm uppercase tracking-wide
                       border border-beige-claro hover:bg-beige-claro
                       transition-colors duration-300"
          >
            <MessageCircle size={14} />
            Contactar por WhatsApp
          </a>
        </div>
      </motion.div>
    </div>
  )
}

export default CheckoutCancel