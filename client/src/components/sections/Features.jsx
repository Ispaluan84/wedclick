import { motion } from 'framer-motion'
import {
  Smartphone, MapPin, Music, Camera, CheckSquare,
  Shirt, Clock, Heart,
} from 'lucide-react'

const features = [
  { icono: Heart,       titulo: 'Diseño personalizado',       descripcion: 'Cada invitación es única, diseñada a medida con vuestra historia, colores y estilo.', accent: 'gold' },
  { icono: MapPin,      titulo: 'Ubicaciones interactivas',   descripcion: 'Mapas integrados con enlaces directos a Google Maps y Waze para cada lugar.',          accent: 'rose' },
  { icono: CheckSquare, titulo: 'Confirmación de asistencia', descripcion: 'Formulario RSVP integrado. Controla las confirmaciones desde tu panel en tiempo real.', accent: 'sage' },
  { icono: Music,       titulo: 'Playlist colaborativa',      descripcion: 'Tus invitados sugieren canciones y votan sus favoritas para la fiesta.',                accent: 'gold' },
  { icono: Camera,      titulo: 'Álbum colaborativo',         descripcion: 'Los invitados suben fotos del gran día y creáis juntos el mejor álbum.',                accent: 'rose' },
  { icono: Shirt,       titulo: 'Dress Code',                 descripcion: 'Paleta de colores y recomendaciones de vestimenta para tus invitados.',                 accent: 'sage' },
  { icono: Clock,       titulo: 'Itinerario del día',         descripcion: 'Timeline visual con cada momento del gran día, hora a hora.',                           accent: 'gold' },
  { icono: Smartphone,  titulo: 'Enlace único',               descripcion: 'Un link directo, sin apps, que se abre perfectamente en cualquier dispositivo.',        accent: 'rose' },
]

const accentMap = {
  gold: { border: 'border-w-gold/30', iconBg: 'bg-w-gold-light/50', iconColor: 'text-w-gold', line: 'bg-w-gold' },
  rose: { border: 'border-w-rose/30', iconBg: 'bg-w-rose/10',       iconColor: 'text-w-rose', line: 'bg-w-rose' },
  sage: { border: 'border-w-sage/30', iconBg: 'bg-w-sage/10',       iconColor: 'text-w-sage', line: 'bg-w-sage' },
}

function FeatureCard({ feature, index }) {
  const Icono = feature.icono
  const a = accentMap[feature.accent]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay: index * 0.07, ease: [0.19, 1, 0.22, 1] }}
      className={`group bg-paper border ${a.border} p-8
                  hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(26,20,16,0.06)]
                  transition-all duration-400`}
      data-hover
    >
      <div className={`w-12 h-12 ${a.iconBg} flex items-center justify-center mb-6
                       group-hover:scale-110 transition-transform duration-300`}>
        <Icono size={22} className={a.iconColor} />
      </div>

      <h3 className="font-serif italic text-[1.1rem] text-ink mb-3 leading-snug">
        {feature.titulo}
      </h3>

      <div className={`w-6 h-px ${a.line} mb-3 group-hover:w-10 transition-all duration-400`} />

      <p className="font-sans font-light text-[0.85rem] leading-[1.8] text-warm-gray">
        {feature.descripcion}
      </p>
    </motion.div>
  )
}

function Features() {
  return (
    <section id="funcionalidades" className="bg-cream px-8 md:px-14 py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="mb-16"
        >
          <p className="section-label mb-6" data-number="03">Funcionalidades</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-serif font-bold text-display-lg text-ink leading-[1.0] max-w-md">
              Todo lo que necesitas{' '}
              <em className="italic text-w-rose">en una invitación</em>
            </h2>
            <p className="font-sans font-light text-[0.9rem] text-warm-gray max-w-sm leading-relaxed">
              Cada detalle pensado para que vuestra invitación sea una experiencia completa.
            </p>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <FeatureCard key={feature.titulo} feature={feature} index={index} />
          ))}
        </div>

      </div>
    </section>
  )
}

export default Features
