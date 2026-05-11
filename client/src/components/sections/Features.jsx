import { motion } from 'framer-motion'
import {
  Smartphone, MapPin, Music, Camera, CheckSquare,
  Shirt, Clock, Heart, Sparkles
} from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.8, delay, ease: 'easeOut' },
})

const features = [
  {
    icono:       Smartphone,
    titulo:      'Diseño personalizado',
    descripcion: 'Cada invitación es única, diseñada a medida con vuestra historia, colores y estilo.',
    color:       'sage',
  },
  {
    icono:       MapPin,
    titulo:      'Ubicaciones interactivas',
    descripcion: 'Mapas integrados con enlaces directos a Google Maps y Waze para cada lugar.',
    color:       'tierra',
  },
  {
    icono:       CheckSquare,
    titulo:      'Confirmación de asistencia',
    descripcion: 'Formulario RSVP integrado. Controla las confirmaciones desde tu panel.',
    color:       'sage',
  },
  {
    icono:       Music,
    titulo:      'Playlist colaborativa',
    descripcion: 'Tus invitados sugieren canciones y votan sus favoritas para la fiesta.',
    color:       'tierra',
  },
  {
    icono:       Camera,
    titulo:      'Álbum colaborativo',
    descripcion: 'Los invitados suben fotos del gran día y creáis juntos el mejor álbum.',
    color:       'sage',
  },
  {
    icono:       Shirt,
    titulo:      'Dress Code',
    descripcion: 'Paleta de colores y recomendaciones de vestimenta para tus invitados.',
    color:       'tierra',
  },
  {
    icono:       Clock,
    titulo:      'Itinerario del día',
    descripcion: 'Timeline visual con cada momento del gran día, hora a hora.',
    color:       'sage',
  },
  {
    icono:       Heart,
    titulo:      'Vuestra historia',
    descripcion: 'Sección dedicada a contar vuestra historia de amor con fotos y texto.',
    color:       'tierra',
  },
]

function FeatureCard({ feature, index }) {
  const colorBg   = feature.color === 'sage' ? 'bg-sage/10' : 'bg-tierra/10'
  const colorText = feature.color === 'sage' ? 'text-sage' : 'text-tierra'
  const colorHover = feature.color === 'sage' ? 'group-hover:bg-sage/15' : 'group-hover:bg-tierra/15'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group bg-white rounded-3xl p-8 shadow-sm border border-black/5
                 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
    >
      <div className={`w-14 h-14 rounded-2xl ${colorBg} ${colorHover}
                       flex items-center justify-center mb-5 transition-colors`}>
        <feature.icono size={24} className={colorText} />
      </div>

      <h3 className="font-serif text-xl text-verde-oscuro mb-3">
        {feature.titulo}
      </h3>

            <p className="font-sans font-light text-marron text-sm leading-relaxed">
        {feature.descripcion}
      </p>
    </motion.div>
  )
}

function Features() {
  return (
    <section id="funcionalidades" className="bg-blanco-roto py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Encabezado */}
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <span className="font-sans text-xs tracking-widest uppercase text-sage mb-4 block">
            Funcionalidades
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-verde-oscuro mb-6">
            Todo lo que necesitas
            <br />
            <span className="italic text-tierra">en una invitación</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-tierra opacity-50" />
            <span className="text-tierra text-lg">◆</span>
            <div className="w-12 h-px bg-tierra opacity-50" />
          </div>
          <p className="font-sans font-light text-marron max-w-xl mx-auto leading-relaxed">
            Cada detalle pensado para que vuestra invitación sea mucho más
            que un simple mensaje. Una experiencia completa para vuestros invitados.
          </p>
        </motion.div>

        {/* Grid de features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <FeatureCard key={feature.titulo} feature={feature} index={index} />
          ))}
        </div>

        {/* Nota inferior */}
        <motion.div {...fadeUp(0.5)} className="mt-14 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                          bg-sage/10 border border-sage/20">
            <Sparkles size={14} className="text-sage" />
            <span className="font-sans text-sm text-verde-oscuro">
              Y mucho más... cada invitación se adapta a vuestras necesidades
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Features
