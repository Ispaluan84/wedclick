import { motion, AnimatePresence } from 'framer-motion'
import { Cookie } from 'lucide-react'
import { useCookies } from '../../context/CookieContext'

function CookieBanner() {
  const { consent, acceptCookies, rejectCookies } = useCookies()

  return (
    <AnimatePresence>
      {consent === null && (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0  }}
          exit={{    opacity: 0, y: 60  }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div
            className="max-w-4xl mx-auto flex flex-col md:flex-row
                       items-start md:items-center gap-6 p-6 md:p-8"
            style={{
              background: '#1A1410',
              border: '1px solid rgba(201,169,110,0.20)',
              boxShadow: '0 -8px 40px rgba(26,20,16,0.40)',
            }}
          >
            {/* Icono */}
            <div
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: '40px',
                height: '40px',
                border: '1px solid rgba(201,169,110,0.25)',
              }}
            >
              <Cookie size={18} style={{ color: '#C9A96E' }} />
            </div>

            {/* Texto */}
            <div className="flex-1 flex flex-col gap-1">
              <h3 className="font-serif text-cream text-base">
                Usamos cookies
              </h3>
              <p className="font-sans font-light text-sm leading-relaxed" style={{ color: '#8B8177' }}>
                Utilizamos cookies propias y de terceros para analizar el uso de la web
                y mejorar vuestra experiencia. Más información en nuestra{' '}
                <a
                  href="/privacidad"
                  className="underline underline-offset-2 transition-colors duration-200"
                  style={{ color: '#C9A96E' }}
                  onMouseEnter={e => e.target.style.color = '#E8D5B0'}
                  onMouseLeave={e => e.target.style.color = '#C9A96E'}
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
                className="font-sans text-xs tracking-[0.15em] uppercase font-light
                           px-6 py-3 transition-all duration-300 text-center"
                style={{
                  color: '#8B8177',
                  border: '1px solid rgba(139,129,119,0.25)',
                  background: 'transparent',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#F7F2EB'
                  e.currentTarget.style.borderColor = 'rgba(201,169,110,0.30)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#8B8177'
                  e.currentTarget.style.borderColor = 'rgba(139,129,119,0.25)'
                }}
              >
                Rechazar
              </button>

              <button
                onClick={acceptCookies}
                className="font-sans text-xs tracking-[0.15em] uppercase font-medium
                           px-6 py-3 transition-all duration-300 text-center"
                style={{
                  background: '#C9A96E',
                  color: '#1A1410',
                  border: '1px solid #C9A96E',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#E8D5B0'
                  e.currentTarget.style.borderColor = '#E8D5B0'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#C9A96E'
                  e.currentTarget.style.borderColor = '#C9A96E'
                }}
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