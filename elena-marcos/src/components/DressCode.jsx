import { motion } from 'framer-motion'
import { Shirt, Sparkles, Ban, Check } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.8, delay, ease: 'easeOut' },
})

const coloresDefault = [
  { nombre: 'Verde salvia', hex: '#7D9B76' },
  { nombre: 'Tierra',       hex: '#C4956A' },
  { nombre: 'Crema',        hex: '#F5F0E8' },
  { nombre: 'Verde oscuro', hex: '#3D5A3E' },
  { nombre: 'Marrón suave', hex: '#8B6F5C' },
  { nombre: 'Champán',      hex: '#F0E6D3' },
]


const siDefault = [
  'Traje o chaqué para ellos',
  'Vestido largo o midi para ellas',
  'Tonos dentro de la paleta de colores',
  'Complementos elegantes y discretos',
  'Calzado cómodo para bailar toda la noche',
]

const noDefault = [
  'Color blanco o marfil (reservado para la novia)',
  'Colores neón o estampados llamativos',
  'Zapatillas deportivas',
  'Vaqueros o ropa casual',
  'Tocados o pamelas que tapen la vista',
]

function DressCode({ config }) {
  const dc          = config?.dresscode || {}
  const etiqueta    = dc.etiqueta    || 'Elegante formal'
  const descripcion = dc.descripcion || 'La celebración será al aire libre y en interior'
  const nota        = dc.nota        || 'Consejo: La ceremonia será en el jardín, así que recomendamos evitar tacones muy finos.'
  const colores     = dc.colores     || coloresDefault
  const siItems     = dc.si          || siDefault
  const noItems     = dc.no          || noDefault

  const recomendaciones = [
    { icono: Check, tipo: 'si', titulo: 'Sí, por favor', items: siItems },
    { icono: Ban,   tipo: 'no', titulo: 'Mejor evitar',  items: noItems },
  ]

  return (
    <section id="dresscode" className="bg-blanco-roto py-24 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">

        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <span className="font-sans text-xs tracking-widest uppercase text-sage mb-4 block">
            Etiqueta
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-verde-oscuro mb-6">
            Dress Code
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-tierra opacity-50" />
            <span className="text-tierra text-lg">◆</span>
            <div className="w-12 h-px bg-tierra opacity-50" />
          </div>
          <p className="font-sans font-light text-marron max-w-xl mx-auto leading-relaxed">
            Queremos que os sintáis cómodos y guapos. Os dejamos algunas
            indicaciones para que vayáis acorde con la celebración.
          </p>
        </motion.div>

        <motion.div {...fadeUp(0.1)} className="flex justify-center mb-16">
          <div className="bg-white rounded-3xl px-10 py-8 shadow-sm border border-black/5 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-tierra/10 flex items-center justify-center">
                <Shirt size={24} className="text-tierra" />
              </div>
            </div>
            <h3 className="font-serif text-2xl text-verde-oscuro mb-2">{etiqueta}</h3>
            <p className="font-sans text-sm text-marron font-light">{descripcion}</p>
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.2)} className="mb-16">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles size={14} className="text-tierra" />
              <h3 className="font-serif text-xl text-verde-oscuro">Paleta de colores sugerida</h3>
              <Sparkles size={14} className="text-tierra" />
            </div>
            <p className="font-sans text-sm text-marron font-light">
              Nos encantaría que vuestros looks armonicen con estos tonos
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {colores.map((color, index) => (
              <motion.div
                key={color.nombre}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-md border-4 border-white transition-transform hover:scale-110 cursor-pointer"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="font-sans text-xs text-marron text-center max-w-[80px] leading-tight">
                  {color.nombre}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {recomendaciones.map((rec, idx) => {
            const Icono = rec.icono
            const esSi  = rec.tipo === 'si'
            return (
              <motion.div
                key={rec.tipo}
                {...fadeUp(0.3 + idx * 0.1)}
                className={`rounded-3xl p-8 shadow-sm border border-black/5 ${esSi ? 'bg-sage/5' : 'bg-tierra/5'}`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${esSi ? 'bg-sage/20' : 'bg-tierra/20'}`}>
                    <Icono size={18} className={esSi ? 'text-sage' : 'text-tierra'} />
                  </div>
                  <h4 className="font-serif text-lg text-verde-oscuro">{rec.titulo}</h4>
                </div>
                <ul className="flex flex-col gap-3">
                  {rec.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs ${esSi ? 'bg-sage' : 'bg-tierra'}`}>
                        {esSi ? '✓' : '✕'}
                      </span>
                      <span className="font-sans font-light text-sm text-marron leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        <motion.div {...fadeUp(0.5)} className="mt-12 text-center">
          <div className="bg-white rounded-2xl px-8 py-6 shadow-sm border border-black/5 inline-block">
            <p className="font-sans text-sm text-marron font-light italic">
              💡 {nota}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
export default DressCode