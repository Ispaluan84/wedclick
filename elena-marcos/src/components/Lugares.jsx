import { motion } from 'framer-motion'
import { MapPin, Clock, ExternalLink, Navigation, Church, PartyPopper } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.8, delay, ease: 'easeOut' },
})

const lugares = [
  {
    id:          'ceremonia',
    etiqueta:    'Ceremonia',
    titulo:      'Iglesia de Santa María la Blanca',
    descripcion: 'Una joya del siglo XIV en el corazón de Sevilla. Sus arcos mudéjares y la luz que entra por sus ventanales crearán el escenario perfecto para nuestro sí quiero.',
    hora:        '12:00h',
    direccion:   'Calle de los Reyes Católicos, 5, 41001 Sevilla',
    imagen:      'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800&q=80',
    mapsUrl:     'https://maps.google.com/?q=Iglesia+Santa+Maria+la+Blanca+Sevilla',
    wazeUrl:     'https://waze.com/ul?q=Iglesia+Santa+Maria+la+Blanca+Sevilla',
    icono:       Church,
    color:       'sage',
  },
  {
    id:          'celebracion',
    etiqueta:    'Celebración',
    titulo:      'Hacienda El Esparragal',
    descripcion: 'Rodeada de olivos centenarios y jardines andaluces, esta hacienda del siglo XVIII será el escenario de nuestra fiesta. Cóctel en los jardines y banquete bajo las estrellas.',
    hora:        '13:30h',
    direccion:   'Carretera de Gerena, km 4, 41860 Sevilla',
    imagen:      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80',
    mapsUrl:     'https://maps.google.com/?q=Hacienda+El+Esparragal+Sevilla',
    wazeUrl:     'https://waze.com/ul?q=Hacienda+El+Esparragal+Sevilla',
    icono:       PartyPopper,
    color:       'tierra',
  },
]

function LugarCard({ lugar, index }) {
  const Icono    = lugar.icono
  const isReversed = index % 2 !== 0
  const colorBg      = lugar.color === 'sage' ? 'bg-sage/10' : 'bg-tierra/10'
  const colorText    = lugar.color === 'sage' ? 'text-sage' : 'text-tierra'
  const colorBorder  = lugar.color === 'sage' ? 'border-sage/20' : 'border-tierra/20'
  const colorBtnBg   = lugar.color === 'sage' ? 'bg-sage' : 'bg-tierra'
  const colorBtnHover = lugar.color === 'sage' ? 'hover:bg-sage/90' : 'hover:bg-tierra/90'

  return (
    <motion.div
      {...fadeUp(0.1 + index * 0.15)}
      className="bg-white rounded-3xl overflow-hidden shadow-sm border border-black/5"
    >
      {/* Layout: imagen + contenido */}
      <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'}`}>

        {/* Imagen */}
        <div className="relative md:w-1/2 h-64 md:h-auto min-h-[300px] overflow-hidden">
          <img
            src={lugar.imagen}
            alt={lugar.titulo}
            className="w-full h-full object-cover transition-transform duration-700
                       hover:scale-105"
          />
          {/* Overlay con etiqueta */}
          <div className="absolute top-4 left-4">
            <div className={`${colorBg} backdrop-blur-sm rounded-full px-4 py-1.5
                            flex items-center gap-2 border ${colorBorder}`}>
              <Icono size={14} className={colorText} />
              <span className={`font-sans text-xs tracking-widest uppercase ${colorText}`}>
                {lugar.etiqueta}
              </span>
            </div>
          </div>

          {/* Hora superpuesta */}
          <div className="absolute bottom-4 right-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2
                            flex items-center gap-2 shadow-sm">
              <Clock size={14} className="text-verde-oscuro" />
              <span className="font-sans text-sm font-medium text-verde-oscuro">
                {lugar.hora}
              </span>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
          {/* Título */}
          <h3 className="font-serif text-2xl md:text-3xl text-verde-oscuro mb-4">
            {lugar.titulo}
          </h3>

          {/* Separador */}
          <div className="flex items-center gap-3 mb-5">
            <div className={`w-8 h-px ${lugar.color === 'sage' ? 'bg-sage' : 'bg-tierra'} opacity-50`} />
            <span className={`${colorText} text-sm`}>◆</span>
            <div className={`w-8 h-px ${lugar.color === 'sage' ? 'bg-sage' : 'bg-tierra'} opacity-50`} />
          </div>

          {/* Descripción */}
          <p className="font-sans font-light text-marron leading-relaxed mb-6">
            {lugar.descripcion}
          </p>

          {/* Dirección */}
          <div className="flex items-start gap-3 mb-8 p-4 rounded-xl bg-crema/50">
            <MapPin size={16} className="text-tierra mt-0.5 flex-shrink-0" />
            <span className="font-sans text-sm text-marron font-light leading-relaxed">
              {lugar.direccion}
            </span>
          </div>

          {/* Botones de navegación */}
          <div className="flex flex-wrap gap-3">
            <a
              href={lugar.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-5 py-3 rounded-xl
                         ${colorBtnBg} ${colorBtnHover} text-white
                         font-sans text-sm tracking-wide transition-colors
                         shadow-sm hover:shadow-md`}
            >
              <Navigation size={16} />
              Google Maps
            </a>

            <a
              href={lugar.wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl
                         bg-white border border-gray-200 text-verde-oscuro
                         font-sans text-sm tracking-wide
                         hover:bg-gray-50 transition-colors"
            >
              <ExternalLink size={16} />
              Waze
            </a>
          </div>
        </div>
      </div>

      {/* Mapa embebido */}
      <div className={`border-t ${colorBorder}`}>
        <iframe
          src={`https://maps.google.com/maps?q=${encodeURIComponent(lugar.direccion)}&output=embed`}
          width="100%"
          height="200"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Mapa de ${lugar.titulo}`}
          className="w-full"
        />
      </div>
    </motion.div>
  )
}

function Lugares() {
  return (
    <section id="lugares" className="bg-crema py-24 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">

        {/* Encabezado */}
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <span className="font-sans text-xs tracking-widest uppercase text-sage mb-4 block">
            Ubicaciones
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-verde-oscuro mb-6">
            Dónde celebramos
            <br />
            <span className="italic text-tierra">nuestro amor</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-tierra opacity-50" />
            <span className="text-tierra text-lg">◆</span>
            <div className="w-12 h-px bg-tierra opacity-50" />
          </div>
          <p className="font-sans font-light text-marron max-w-xl mx-auto leading-relaxed">
            Hemos elegido dos lugares muy especiales para compartir este día
            con vosotros. Aquí tenéis toda la información para llegar.
          </p>
        </motion.div>

        {/* Tarjetas de lugares */}
        <div className="flex flex-col gap-10">
          {lugares.map((lugar, index) => (
            <LugarCard key={lugar.id} lugar={lugar} index={index} />
          ))}
        </div>

        {/* Nota de transporte */}
        <motion.div {...fadeUp(0.5)} className="mt-12 text-center">
          <div className="bg-white rounded-2xl px-8 py-6 shadow-sm
                          border border-black/5 inline-block">
            <p className="font-sans text-sm text-marron font-light">
              🚌 Habrá <strong className="font-medium text-verde-oscuro">autobús gratuito</strong> desde
              la iglesia hasta la hacienda tras la ceremonia.
              <br />
              <span className="text-xs text-marron/60 mt-1 block">
                También disponemos de parking en la hacienda para quienes vengáis en coche.
              </span>
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default Lugares