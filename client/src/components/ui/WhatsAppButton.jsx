import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

const WHATSAPP_NUMBER  = '34627147039'
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hola, me gustaría información sobre las invitaciones de boda de WedClick 💍'
)

function WhatsAppButton() {
  const [visible, setVisible]   = useState(false)
  const [tooltip, setTooltip]   = useState(true)

  // Aparece después de 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  // Oculta el tooltip después de 6 segundos
  useEffect(() => {
    const timer = setTimeout(() => setTooltip(false), 6000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1,   y: 0  }}
          exit={{    opacity: 0, scale: 0.5, y: 20  }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-50 flex items-end gap-3"
        >

          {/* Tooltip */}
          <AnimatePresence>
            {tooltip && (
              <motion.div
                initial={{ opacity: 0, x: 20  }}
                animate={{ opacity: 1, x: 0   }}
                exit={{    opacity: 0, x: 20  }}
                transition={{ duration: 0.3 }}
                className="relative bg-white rounded-2xl shadow-lg px-4 py-3
                           border border-gray-100 max-w-[200px]"
              >
                {/* Flecha del tooltip */}
                <div className="absolute right-[-6px] bottom-4 w-3 h-3
                                bg-white border-r border-t border-gray-100
                                rotate-45" />

                {/* Botón cerrar tooltip */}
                <button
                  onClick={() => setTooltip(false)}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full
                             bg-gray-200 flex items-center justify-center
                             hover:bg-gray-300 transition-colors duration-200"
                >
                  <X size={10} className="text-gray-500" />
                </button>

                <p className="font-sans text-xs text-gray-500 leading-relaxed">
                  ¿Tienes alguna duda?
                  <br />
                  <span className="font-semibold text-slateGray">
                    ¡Escríbenos por WhatsApp!
                  </span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botón principal */}
          <motion.a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{   scale: 0.95 }}
            className="relative w-14 h-14 bg-green-500 rounded-full
                       flex items-center justify-center shadow-lg
                       hover:bg-green-600 transition-colors duration-300
                       cursor-pointer"
            aria-label="Contactar por WhatsApp"
          >
            <MessageCircle size={26} className="text-white" />

            {/* Pulso animado */}
            <span className="absolute inset-0 rounded-full bg-green-500
                             animate-ping opacity-20" />
          </motion.a>

        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WhatsAppButton