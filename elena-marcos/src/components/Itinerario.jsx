import { motion } from 'framer-motion'
import {
  Church, Wine, UtensilsCrossed, Music, Camera, PartyPopper, Clock
} from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.8, delay, ease: 'easeOut' },
})

const ICONOS = {
  Church, Wine, UtensilsCrossed, Music, Camera, PartyPopper
}

const momentosDefault = [
  { hora: '12:00h', titulo: 'Ceremonia',          descripcion: 'Nos damos el sí quiero en la Iglesia de Santa María la Blanca.',          icono: 'Church',          color: 'sage'   },
  { hora: '13:30h', titulo: 'Cóctel de bienvenida', descripcion: 'Brindis y aperitivos en los jardines de la Hacienda El Esparragal.',    icono: 'Wine',            color: 'tierra' },
  { hora: '15:00h', titulo: 'Banquete',            descripcion: 'Disfrutaremos juntos de un menú especial preparado con mucho cariño.',   icono: 'UtensilsCrossed', color: 'sage'   },
  { hora: '17:30h', titulo: 'Sesión de fotos',     descripcion: 'Momento para capturar los mejores recuerdos entre olivares y jardines.', icono: 'Camera',          color: 'tierra' },
  { hora: '19:00h', titulo: 'Primer baile & fiesta', descripcion: 'Arrancamos la fiesta con nuestro primer baile. ¡A la pista!',          icono: 'Music',           color: 'sage'   },
  { hora: '00:00h', titulo: 'Fin de fiesta',       descripcion: 'Despedimos la noche más especial de nuestras vidas. ¡Gracias por estar!', icono: 'PartyPopper',    color: 'tierra' },
]

function TimelineItem({ momento, index }) {
  const Icono   = momento.icono
  const isLeft  = index % 2 === 0
  const colorBg = momento.color === 'sage' ? 'bg-sage' : 'bg-tierra'
  const colorBgLight = momento.color === 'sage' ? 'bg-sage/10' : 'bg-tierra/10'
  const colorText = momento.color === 'sage' ? 'text-sage' : 'text-tierra'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      className="relative flex items-center gap-6 md:gap-10"
    >
      {/* Contenido izquierdo (solo desktop) */}
      <div className={`hidden md:flex flex-1 ${isLeft ? 'justify-end' : 'justify-end opacity-0'}`}>
        {isLeft && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/5
                          max-w-sm text-right">
            <div className="flex items-center justify-end gap-2 mb-2">
              <Clock size={12} className="text-gray-400" />
              <span className="font-sans text-xs text-gray-400 tracking-widest uppercase">
                {momento.hora}
              </span>
            </div>
            <h4 className="font-serif text-xl text-verde-oscuro mb-2">
              {momento.titulo}
            </h4>
            <p className="font-sans font-light text-marron text-sm leading-relaxed">
              {momento.descripcion}
            </p>
          </div>
        )}
      </div>

      {/* Línea central con icono */}
      <div className="flex flex-col items-center z-10">
        <div className={`w-12 h-12 rounded-full ${colorBgLight}
                         flex items-center justify-center border-2 border-white
                         shadow-md`}>
          <Icono size={18} className={colorText} />
        </div>
      </div>

      {/* Contenido derecho */}
      <div className={`flex-1 ${!isLeft ? 'md:block' : 'md:opacity-0 md:pointer-events-none'} block`}>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/5
                        max-w-sm">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={12} className="text-gray-400" />
            <span className="font-sans text-xs text-gray-400 tracking-widest uppercase">
              {momento.hora}
            </span>
          </div>
          <h4 className="font-serif text-xl text-verde-oscuro mb-2">
            {momento.titulo}
          </h4>
          <p className="font-sans font-light text-marron text-sm leading-relaxed">
            {momento.descripcion}
          </p>
        </div>
      </div>

      {/* Contenido mobile (reemplaza la lógica de izq/der) */}
    </motion.div>
  )
}

function Itinerario({ config }) {
  const momentos = config?.itinerario?.momentos || momentosDefault

  return (
    <section id="itinerario" className="bg-crema py-24 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">

        <motion.div {...fadeUp(0)} className="text-center mb-20">
          <span className="font-sans text-xs tracking-widest uppercase text-sage mb-4 block">
            Itinerario
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-verde-oscuro mb-6">
            El Gran Día
            <br />
            <span className="italic text-tierra">hora a hora</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-tierra opacity-50" />
            <span className="text-tierra text-lg">◆</span>
            <div className="w-12 h-px bg-tierra opacity-50" />
          </div>
          <p className="font-sans font-light text-marron max-w-xl mx-auto leading-relaxed">
            Hemos preparado cada momento con mucho cariño para que disfrutéis
            del día tanto como nosotros. Aquí tenéis el plan.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-tierra/20" />
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-px bg-tierra/20" />

          <div className="flex flex-col gap-12">
            {momentos.map((momento, index) => {
              const Icono = ICONOS[momento.icono] || Clock
              return (
                <TimelineItem
                  key={momento.titulo}
                  momento={{ ...momento, icono: Icono }}
                  index={index}
                />
              )
            })}
          </div>

          <motion.div {...fadeUp(0.6)} className="flex justify-center mt-12">
            <div className="bg-tierra/10 rounded-full px-6 py-3 flex items-center gap-2">
              <span className="text-tierra text-sm">✦</span>
              <span className="font-sans text-xs text-tierra tracking-widest uppercase">
                El mejor día de nuestras vidas
              </span>
              <span className="text-tierra text-sm">✦</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
export default Itinerario