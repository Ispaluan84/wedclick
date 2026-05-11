import { motion } from 'framer-motion'
import { CheckCircle, Heart, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function CheckoutSuccess() {
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
          className="w-20 h-20 rounded-full bg-verde-suave/10 border-2 border-verde-suave/20
                     flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle size={40} className="text-verde-suave" />
        </motion.div>

        <h1 className="font-serif text-3xl text-azul-oscuro mb-4">
          ¡Reserva confirmada!
        </h1>

        <p className="font-sans font-light text-marron leading-relaxed mb-8">
          Hemos recibido vuestro pago y los datos de vuestra boda correctamente.
          En las próximas <strong className="text-azul-oscuro">24-48 horas</strong> nos
          pondremos en contacto con vosotros para empezar a crear vuestra
          invitación perfecta.
        </p>

        <div className="bg-crema rounded-2xl p-6 border border-beige-claro mb-8 text-left">
          <h3 className="font-sans text-xs tracking-widest uppercase text-marron/60 mb-4">
            ¿Qué pasa ahora?
          </h3>
          <ul className="flex flex-col gap-3">
            {[
              'Recibiréis un email de confirmación',
              'Os contactaremos por el canal que elegisteis',
              'Recopilaremos más información para el diseño',
              'Empezamos a crear vuestra invitación',
              'Revisiones hasta que sea perfecta',
              'Pago del 50% restante a la entrega',
            ].map((paso, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-azul-oscuro text-crema
                                flex items-center justify-center flex-shrink-0
                                font-sans text-xs font-bold">
                  {i + 1}
                </div>
                <span className="font-sans text-sm text-marron">{paso}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href="https://wa.me/34600000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl
                       bg-azul-oscuro text-crema font-sans text-sm uppercase tracking-wide
                       border border-beige-claro hover:bg-beige-claro hover:text-azul-oscuro
                       transition-colors duration-300 shadow-md"
          >
            💬 Contactar por WhatsApp
          </a>
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl
                       bg-crema text-azul-oscuro font-sans text-sm uppercase tracking-wide
                       border border-beige-claro hover:bg-beige-claro
                       transition-colors duration-300"
          >
            Volver al inicio
            <ArrowRight size={14} />
          </button>
        </div>

        <p className="font-sans text-xs text-marron/40 mt-6 flex items-center justify-center gap-1">
          Hecho con <Heart size={10} className="text-tierra" fill="#CFC29B" /> en Sevilla
        </p>
      </motion.div>
    </div>
  )
}

export default CheckoutSuccess