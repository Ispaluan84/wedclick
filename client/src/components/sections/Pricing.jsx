import { motion } from 'framer-motion'
import {
  Timer, BookOpen, MapPin, ClipboardList,
  Music2, QrCode, Smartphone, CheckCircle,
  Images, PartyPopper, MessageCircle
} from 'lucide-react'
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

const includes = [
  { icon: Timer,         label: 'Cuenta atrás'                        },
  { icon: BookOpen,      label: 'Presentación de los novios'          },
  { icon: MapPin,        label: 'Ceremonia & Celebración'             },
  { icon: ClipboardList, label: 'Confirmación de asistencia y alérgenos' },
  { icon: Music2,        label: 'Banda Sonora de vuestra boda'        },
  { icon: QrCode,        label: 'QR personalizado por invitado/pareja'},
  { icon: Smartphone,    label: 'Diseño responsive'                   },
  { icon: CheckCircle,   label: 'Una ronda de revisión incluida'      },
]

const extras = [
  {
    icon:        PartyPopper,
    title:       'Invitación pre-boda',
    description: '¿Tenéis una preboda, fiesta o celebración previa? Creamos una invitación digital exclusiva para ese momento especial.',
    price:       '+80€',
    color:       'gold',
  },
  {
    icon:        Images,
    title:       'Galería post-boda',
    description: 'Después del gran día, activamos una galería donde vuestros invitados pueden ver y descargar todas las fotos. Un recuerdo compartido para siempre.',
    price:       '+120€',
    note:        '+ hosting a consultar',
    color:       'blue',
  },
]

function Pricing() {
  return (
    <SectionWrapper id="precios" className="bg-white">

      {/* Encabezado */}
      <motion.div {...fadeUp(0)} className="text-center mb-16">
        <span className="inline-block font-sans text-xs tracking-widest uppercase text-blueWillow mb-4">
          Precios
        </span>
        <h2 className="section-title">
          Una inversión única
          <br />
          para un día irrepetible
        </h2>
        <p className="section-subtitle">
          Sin sorpresas. Sin letra pequeña.
          Solo vuestra historia, bien contada.
        </p>
      </motion.div>

      {/* Paquete principal */}
      <motion.div
        {...fadeUp(0.1)}
        className="max-w-2xl mx-auto mb-20"
      >
        <div className="relative bg-warmWhite rounded-3xl p-10 border border-gray-100 shadow-sm">

          {/* Badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <span className="inline-block font-sans text-xs tracking-widest uppercase
                           bg-blueWillow text-white px-6 py-2 rounded-full shadow-sm">
              Paquete principal
            </span>
          </div>

          {/* Nombre y precio */}
          <div className="text-center mb-10 mt-4">
            <h3 className="font-serif text-3xl text-slateGray mb-2">
              Vuestra Historia
            </h3>
            <div className="flex items-end justify-center gap-2 mb-2">
              <span className="font-serif text-6xl font-bold text-blueWillow">
                200€
              </span>
            </div>
            <p className="font-sans text-sm text-gray-400">
              Hasta 200 invitados · QR personalizado por invitado o pareja
            </p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="w-12 h-px bg-goldAccent opacity-50" />
              <span className="text-goldAccent text-lg">◆</span>
              <div className="w-12 h-px bg-goldAccent opacity-50" />
            </div>
          </div>

          {/* Lo que incluye */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {includes.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blueWillow/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={14} className="text-blueWillow" />
                  </div>
                  <span className="font-sans text-sm text-gray-500">
                    {item.label}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Nota más de 200 invitados */}
          <div className="bg-white rounded-2xl px-6 py-4 mb-8 border border-gray-100 text-center">
            <p className="font-sans text-sm text-gray-400">
              ¿Más de 200 invitados?{' '}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blueWillow font-semibold hover:underline"
              >
                Consúltanos sin compromiso
              </a>
            </p>
          </div>

          {/* CTA */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full
                       bg-green-500 text-white font-sans font-semibold text-sm
                       px-6 py-4 rounded-full hover:bg-green-600
                       transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
          >
            <MessageCircle size={18} />
            Quiero mi invitación
          </a>

        </div>
      </motion.div>

      {/* Extras */}
      <motion.div {...fadeUp(0.2)}>
        <div className="text-center mb-10">
          <span className="inline-block font-sans text-xs tracking-widest uppercase text-blueWillow mb-4">
            Extras
          </span>
          <h3 className="font-serif text-2xl md:text-3xl text-slateGray">
            Amplía vuestra experiencia
          </h3>
          <p className="font-sans font-light text-sm text-gray-400 mt-3">
            Opcionales que podéis añadir a vuestro paquete principal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {extras.map((extra) => {
            const Icon     = extra.icon
            const isBlue   = extra.color === 'blue'
            const iconBg   = isBlue ? '#6A8DAD' : '#D9C99E'
            const iconColor = isBlue ? '#ffffff' : '#333E50'

            return (
              <motion.div
                key={extra.title}
                {...fadeUp(0.1)}
                className="bg-warmWhite rounded-2xl p-7 border border-gray-100
                           shadow-sm hover:shadow-md hover:-translate-y-1
                           transition-all duration-300 flex flex-col gap-4"
              >
                {/* Icono y precio */}
                <div className="flex items-start justify-between">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                    style={{ backgroundColor: iconBg }}
                  >
                    <Icon size={22} style={{ color: iconColor }} />
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-2xl font-bold text-blueWillow">
                      {extra.price}
                    </span>
                    {extra.note && (
                      <p className="font-sans text-xs text-gray-400 mt-1">
                        {extra.note}
                      </p>
                    )}
                  </div>
                </div>

                {/* Separador */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-px bg-goldAccent" />
                  <div className="w-1 h-1 rounded-full bg-goldAccent" />
                </div>

                {/* Título y descripción */}
                <h4 className="font-serif text-lg text-slateGray">
                  {extra.title}
                </h4>
                <p className="font-sans font-light text-sm text-gray-500 leading-relaxed">
                  {extra.description}
                </p>

                {/* CTA */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blueWillow
                             font-sans text-sm font-semibold hover:underline
                             transition-colors duration-200 mt-auto cursor-pointer"
                >
                  <MessageCircle size={14} />
                  Añadir este extra
                </a>

              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Cierre */}
      <motion.div {...fadeUp(0.3)} className="mt-16 flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-16 h-px bg-goldAccent opacity-50" />
          <span className="text-goldAccent text-xl">◆</span>
          <div className="w-16 h-px bg-goldAccent opacity-50" />
        </div>
        <p className="font-sans font-light text-sm text-gray-400 text-center">
          Todos los precios incluyen IVA.
          <br className="hidden md:block" />
          Sin costes ocultos, sin sorpresas de última hora.
        </p>
      </motion.div>

    </SectionWrapper>
  )
}

export default Pricing