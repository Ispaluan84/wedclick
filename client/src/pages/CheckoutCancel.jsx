import { motion } from 'framer-motion'
import { X, ArrowLeft, MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { WHATSAPP_URL } from '../lib/contact'

function CheckoutCancel() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-lg w-full"
      >
        {/* Logo */}
        <div className="text-center mb-12">
          <a href="/">
            <img src="/Logo_WedClick.png" alt="WedClick" className="h-10 mx-auto" />
          </a>
        </div>

        {/* Icono cancelación */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
          className="flex items-center justify-center mb-8"
        >
          <div className="w-16 h-16 border border-w-gold/20 flex items-center justify-center">
            <X size={24} className="text-warm-gray" />
          </div>
        </motion.div>

        {/* Texto principal */}
        <div className="text-center mb-10">
          <p className="font-sans text-[0.6rem] tracking-[0.25em] uppercase text-warm-gray mb-4">
            Pago cancelado
          </p>
          <h1 className="font-serif text-3xl text-ink mb-4 leading-tight">
            No hay ningún cargo
          </h1>
          <p className="font-sans font-light text-warm-gray text-sm leading-relaxed">
            No te preocupes, no se ha realizado ningún cargo. Si tienes alguna duda
            o necesitas ayuda con el proceso de pago, estamos aquí para ayudarte.
          </p>
        </div>

        {/* Línea decorativa */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-w-gold/30 to-transparent mb-10" />

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-3 w-full py-4
                       bg-ink text-cream font-sans text-xs tracking-[0.15em] uppercase font-light
                       hover:bg-warm-dark transition-colors duration-300"
          >
            <ArrowLeft size={13} />
            Volver e intentarlo de nuevo
          </button>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 w-full py-4
                       border border-w-gold/25 text-ink font-sans text-xs tracking-[0.15em] uppercase font-light
                       hover:border-w-gold/50 transition-colors duration-300"
          >
            <MessageCircle size={14} />
            Contactar por WhatsApp
          </a>
          <button
            onClick={() => navigate('/')}
            className="font-sans text-xs text-warm-gray hover:text-ink transition-colors duration-200 text-center py-2"
          >
            Volver al inicio
          </button>
        </div>

        <p className="font-sans text-[10px] text-warm-gray/40 text-center mt-8 tracking-widest uppercase">
          Hecho con ♡ en Sevilla
        </p>
      </motion.div>
    </div>
  )
}

export default CheckoutCancel