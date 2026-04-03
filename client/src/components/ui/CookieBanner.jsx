import { motion, AnimatePresence } from 'framer-motion'
import { Cookie } from 'lucide-react'
import { useCookies } from '../../context/CookieContext'

function CookieBanner() {
  const { consent, acceptCookies, rejectCookies } = useCookies()

  return (
    <AnimatePresence>
      {consent === null && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0   }}
          exit={{    opacity: 0, y: 100  }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-slateGray rounded-2xl shadow-xl
                          p-6 flex flex-col md:flex-row items-start md:items-center
                          gap-6">

            {/* Icono */}
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center
                            justify-center flex-shrink-0">
              <Cookie size={22} className="text-goldAccent" />
            </div>

            {/* Texto */}
            <div className="flex-1 flex flex-col gap-1">
              <h3 className="font-serif text-white text-lg">
                Usamos cookies
              </h3>
              <p className="font-sans font-light text-gray-400 text-sm leading-relaxed">
                Utilizamos cookies propias y de terceros para analizar el uso de la web
                y mejorar vuestra experiencia. Podéis aceptarlas o rechazarlas.
                Más información en nuestra{' '}
                <a
                  href="/privacidad"
                  className="text-goldAccent hover:underline"
                >
                  política de privacidad
                </a>
                .
              </p>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full md:w-auto">
              <button
                onClick={rejectCookies}
                className="font-sans text-sm font-semibold text-gray-400
                           px-6 py-3 rounded-full border border-white/10
                           hover:border-white/30 hover:text-white
                           transition-all duration-300 cursor-pointer
                           text-center"
              >
                Rechazar
              </button>
              <button
                onClick={acceptCookies}
                className="font-sans text-sm font-semibold text-slateGray
                           bg-goldAccent px-6 py-3 rounded-full
                           hover:bg-opacity-90 transition-all duration-300
                           cursor-pointer text-center"
              >
                Aceptar todas
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CookieBanner