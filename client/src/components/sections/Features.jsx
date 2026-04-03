import { motion } from 'framer-motion'
import {
  BookOpen,
  ClipboardList,
  MapPin,
  Music2,
  QrCode,
  Smartphone,
  Images,
  Timer,
} from 'lucide-react'
import SectionWrapper from '../ui/SectionWrapper.jsx'

const features = [
  {
    icon:        BookOpen,
    title:       'Vuestra historia',
    description: 'Contamos cómo os conocisteis, los momentos que os han traído hasta aquí y lo que os hace únicos. Una narración con alma, acompañada de vuestras fotos más especiales. Porque cada pareja tiene una historia que merece ser contada.',
    color:       'blue',
  },
  {
    icon:        ClipboardList,
    title:       'Confirmación & Alérgenos',
    description: 'Los invitados confirman su asistencia con un clic e indican alérgenos o restricciones alimentarias. Sin llamadas, sin papeles, sin líos. Todo llega directamente a vosotros, organizado y claro.',
    color:       'gold',
  },
  {
    icon:        MapPin,
    title:       'Ceremonia & Celebración',
    description: 'Toda la información del gran día en un solo lugar: ubicación con mapa interactivo, horarios, dress code y todo lo que vuestros invitados necesitan saber. Sin confusiones, sin llamadas de última hora.',
    color:       'blue',
  },
  {
    icon:        Music2,
    title:       'Banda Sonora de vuestra boda',
    description: 'Vuestros invitados proponen las canciones que quieren escuchar en la boda. Una forma preciosa de hacerles partícipes y construir juntos la música de vuestro día. Porque la banda sonora también se crea entre todos.',
    color:       'gold',
  },
  {
    icon:        QrCode,
    title:       'QR personalizado',
    description: 'Cada invitado recibe su propio enlace o código QR. Podéis imprimirlo en un sobre físico o enviarlo por WhatsApp o email. Sencillo para vosotros, especial para ellos.',
    color:       'blue',
  },
  {
    icon:        Smartphone,
    title:       'Diseño responsive',
    description: 'La invitación se ve perfecta en cualquier dispositivo: móvil, tablet u ordenador. Sin apps que descargar, sin registros. Solo abrir el enlace y vivir la experiencia.',
    color:       'gold',
  },
  {
    icon:        Images,
    title:       'Galería post-boda',
    description: 'Después de la boda, activamos una galería donde vuestros invitados pueden ver y descargar todas las fotos del día. Un recuerdo compartido que dura para siempre.',
    color:       'blue',
    extra:       true,
  },
  {
    icon:        Timer,
    title:       'Cuenta atrás',
    description: 'Un contador en tiempo real que lleva a vuestros invitados hacia el gran momento. Genera expectativa y emoción desde el instante en que abren la invitación. Porque la emoción empieza mucho antes del gran día.',
    color:       'gold',
  },
]

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.6, delay, ease: 'easeOut' },
})

function FeatureCard({ feature, index }) {
  const Icon      = feature.icon
  const isBlue    = feature.color === 'blue'
  const iconBg    = isBlue ? '#6A8DAD' : '#D9C99E'
  const iconColor = isBlue ? '#ffffff' : '#333E50'
  const delay     = (index % 4) * 0.1

  return (
    <motion.div
      {...fadeUp(delay)}
      className="group relative bg-white rounded-2xl p-7 flex flex-col gap-4
                 border border-gray-100 shadow-sm
                 hover:shadow-lg hover:-translate-y-1
                 transition-all duration-300 cursor-default"
    >
      {/* Badge Extra */}
      {feature.extra && (
        <span
          className="absolute top-4 right-4 font-sans text-[10px] tracking-widest uppercase px-3 py-1 rounded-full text-white font-semibold"
          style={{ backgroundColor: '#B98362' }}
        >
          Extra
        </span>
      )}

      {/* Icono */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0"
        style={{ backgroundColor: iconBg }}
      >
        <Icon size={22} style={{ color: iconColor }} />
      </div>

      {/* Separador decorativo */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-px" style={{ backgroundColor: '#D9C99E' }} />
        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#D9C99E' }} />
      </div>

      {/* Título */}
      <h3 className="font-serif text-lg text-slateGray leading-snug">
        {feature.title}
      </h3>

      {/* Descripción */}
      <p className="font-sans font-light text-sm text-gray-500 leading-relaxed">
        {feature.description}
      </p>

      {/* Línea inferior hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: isBlue ? '#6A8DAD' : '#D9C99E' }}
      />
    </motion.div>
  )
}

function Features() {
  return (
    <SectionWrapper id="caracteristicas" className="bg-warmWhite">

      {/* Encabezado */}
      <motion.div {...fadeUp(0)} className="text-center mb-16">
        <span className="inline-block font-sans text-xs tracking-widest uppercase text-blueWillow mb-4">
          Qué incluye
        </span>
        <h2 className="section-title">
          Todo lo que vuestra invitación
          <br />
          puede hacer por vosotros
        </h2>
        <p className="section-subtitle">
          Cada elemento está pensado para que vuestros invitados sientan 
          que forman parte de vuestra historia desde el primer clic.
        </p>
      </motion.div>

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} feature={feature} index={index} />
        ))}
      </div>

      {/* CTA inferior */}
      <motion.div
        {...fadeUp(0.3)}
        className="mt-16 flex flex-col items-center gap-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-16 h-px bg-goldAccent opacity-50" />
          <span className="text-goldAccent text-xl">◆</span>
          <div className="w-16 h-px bg-goldAccent opacity-50" />
        </div>
        <p className="font-sans font-light text-sm text-gray-400 text-center max-w-md">
          Todo hecho a mano, con cariño y sin atajos.
          <br className="hidden md:block" />
          Porque vuestra boda se merece lo mejor.
        </p>
        <a href="#contacto" className="btn-primary">
          Quiero mi invitación
        </a>
      </motion.div>

    </SectionWrapper>
  )
}

export default Features
