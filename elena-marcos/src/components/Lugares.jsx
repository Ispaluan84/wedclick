import { motion } from 'framer-motion'
import { MapPin, Clock, ExternalLink } from 'lucide-react'
import ceremonia from '../assets/images/ceremonia.jpg'
import celebracion from '../assets/images/celebracion.jpg'

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.8, delay, ease: 'easeOut' },
})

const lugares = [
  {
    tipo:        'Ceremonia',
    nombre:      'Iglesia de Santa María la Blanca',
    descripcion: 'Una de las iglesias más antiguas y bellas de Sevilla, situada en el corazón del barrio de Santa Cruz. Su historia se remonta al siglo XIII y su interior barroco la convierte en el escenario perfecto para el día más especial.',
    hora:        '12:00h',
    direccion:   'C/ Santa María la Blanca, 5, Sevilla',
    maps:        'https://maps.google.com/?q=Iglesia+Santa+Maria+la+Blanca+Sevilla',
    imagen:      ceremonia,
    color:       'sage',
  },
  {
    tipo:        'Celebración',
    nombre:      'Hacienda El Esparragal',
    descripcion: 'Rodeada de olivares centenarios y jardines mediterráneos, la Hacienda El Esparragal es uno de los espacios más exclusivos de Sevilla para celebraciones. Un lugar donde el tiempo se detiene y la naturaleza se convierte en protagonista.',
    hora:        '14:00h',
    direccion:   'Ctra. Sevilla-Mérida, km 10, Sevilla',
    maps:        'https://maps.google.com/?q=Hacienda+El+Esparragal+Sevilla',
    imagen:      celebracion,
    color:       'tierra',
  },
]

function LugarCard({ lugar, index }) {
  const isEven = index % 2 === 0

  return (
    <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} 
                     gap-8 md:gap-16 items-center`}>

      {/* Imagen */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative flex-1 w-full"
      >
        {/* Marco decorativo */}
        <div className={`absolute -top-4 ${isEven ? '-left-4' : '-right-4'} 
                         w-full h-full rounded-3xl border-2 opacity-20
                         ${lugar.color === 'sage' ? 'border-sage' : 'border-tierra'}`}
        />
        <img
          src={lugar.imagen}
          alt={lugar.nombre}
          className="relative w-full h-[350px] md:h-[450px] object-cover rounded-3xl shadow-xl"
        />
        {/* Badge hora */}
        <div className={`absolute -bottom-5 ${isEven ? '-right-5' : '-left-5'}
                         bg-white rounded-2xl shadow-lg px-5 py-3
                         flex items-center gap-2`}
        >
          <Clock size={14} className="text-verde-oscuro" />
          <span className="font-serif text-lg text-verde-oscuro font-bold">
            {lugar.hora}
          </span>
        </div>
      </motion.div>

      {/* Texto */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex-1 flex flex-col gap-6"
      >
        {/* Tipo */}
        <span className="font-sans text-xs tracking-widest uppercase text-sage">
          {lugar.tipo}
        </span>

        {/* Nombre */}
        <h3 className="font-serif text-3xl md:text-4xl text-verde-oscuro leading-tight">
          {lugar.nombre}
        </h3>

        {/* Separador */}
        <div className="flex items-center gap-3">
          <div className={`w-8 h-px opacity-50 ${lugar.color === 'sage' ? 'bg-sage' : 'bg-tierra'}`} />
          <div className={`w-2 h-2 rounded-full opacity-50 ${lugar.color === 'sage' ? 'bg-sage' : 'bg-tierra'}`} />
        </div>

        {/* Descripción */}
        <p className="font-sans font-light text-marron leading-relaxed">
          {lugar.descripcion}
        </p>

        {/* Dirección */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-crema flex items-center
                          justify-center flex-shrink-0 mt-0.5">
            <MapPin size={14} className="text-verde-oscuro" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-sans text-xs text-gray-400 tracking-wide uppercase">
              Dirección
            </span>
            <span className="font-sans text-sm text-marron">
              {lugar.direccion}
            </span>
          </div>
        </div>

        {/* Botón ubicación */}
        <a
          href={lugar.maps}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-natural inline-flex w-fit"
        >
          <ExternalLink size={16} />
          Cómo llegar
        </a>

      </motion.div>
    </div>
  )
}

function Lugares() {
  return (
    <section className="bg-blanco-roto py-24 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">

        {/* Encabezado */}
        <motion.div {...fadeUp(0)} className="text-center mb-20">
          <span className="font-sans text-xs tracking-widest uppercase text-sage mb-4 block">
            El gran día
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-verde-oscuro mb-6">
            Ceremonia & Celebración
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-px bg-tierra opacity-50" />
            <span className="text-tierra text-lg">◆</span>
            <div className="w-12 h-px bg-tierra opacity-50" />
          </div>
          <p className="font-sans font-light text-marron mt-6 max-w-xl mx-auto leading-relaxed">
            Dos momentos únicos para celebrar juntos el inicio de nuestra nueva vida.
          </p>
        </motion.div>

        {/* Lugares */}
        <div className="flex flex-col gap-24">
          {lugares.map((lugar, index) => (
            <LugarCard key={lugar.tipo} lugar={lugar} index={index} />
          ))}
        </div>

      </div>
    </section>
  )
}

export default Lugares