import { motion } from 'framer-motion'
import { Check, ArrowRight, MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { WHATSAPP_URL } from '../lib/contact'

function CheckoutSuccess() {
  const navigate = useNavigate()

  const pasos = [
    'Recibiréis un email de confirmación',
    'Os contactaremos por el canal que elegisteis',
    'Recopilaremos más información para el diseño',
    'Empezamos a crear vuestra invitación',
    'Revisiones hasta que sea perfecta',
    'Pago del 50% restante a la entrega',
  ]

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

        {/* Icono confirmación */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
          className="flex items-center justify-center mb-8"
        >
          <div className="w-16 h-16 border border-w-gold/40 flex items-center justify-center">
            <Check size={28} className="text-w-gold" />
          </div>
        </motion.div>

        {/* Texto principal */}
        <div className="text-center mb-10">
          <p className="font-sans text-[0.6rem] tracking-[0.25em] uppercase text-w-gold mb-4">
            Reserva confirmada
          </p>
          <h1 className="font-serif text-3xl text-ink mb-4 leading-tight">
            ¡Todo listo para empezar!
          </h1>
          <p className="font-sans font-light text-warm-gray text-sm leading-relaxed">
            Hemos recibido vuestro pago y los datos de vuestra boda. En las próximas{' '}
            <span className="text-ink font-medium">24–48 horas</span> nos pondremos en contacto
            para empezar a crear vuestra invitación.
          </p>
        </div>

        {/* Línea decorativa */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-w-gold/30 to-transparent mb-10" />

        {/* Pasos */}
        <div className="mb-10">
          <p className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-warm-gray mb-6">
            ¿Qué pasa ahora?
          </p>
          <div className="flex flex-col gap-4">
            {pasos.map((paso, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                className="flex items-center gap-4"
              >
                <div className="w-6 h-6 border border-w-gold/30 flex items-center justify-center flex-shrink-0">
                  <span className="font-sans text-[10px] text-w-gold">{i + 1}</span>
                </div>
                <span className="font-sans font-light text-sm text-warm-gray">{paso}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 w-full py-4
                       bg-ink text-cream font-sans text-xs tracking-[0.15em] uppercase font-light
                       hover:bg-warm-dark transition-colors duration-300"
          >
            <MessageCircle size={14} />
            Escribirnos por WhatsApp
          </a>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center gap-3 w-full py-4
                       border border-w-gold/25 text-ink font-sans text-xs tracking-[0.15em] uppercase font-light
                       hover:border-w-gold/50 transition-colors duration-300"
          >
            Volver al inicio
            <ArrowRight size={13} />
          </button>
        </div>

        <p className="font-sans text-[10px] text-warm-gray/40 text-center mt-8 tracking-widest uppercase">
          Hecho con ♡ en Sevilla
        </p>
      </motion.div>
    </div>
  )
}

export default CheckoutSuccess