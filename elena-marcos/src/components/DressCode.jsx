import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.8, delay, ease: 'easeOut' },
})

const colores = [
  { nombre: 'Verde salvia',  hex: '#7D9B76', texto: 'white'  },
  { nombre: 'Tierra',        hex: '#C4956A', texto: 'white'  },
  { nombre: 'Crema',         hex: '#F5F0E8', texto: '#3D5A3E'},
  { nombre: 'Verde oscuro',  hex: '#3D5A3E', texto: 'white'  },
  { nombre: 'Marrón suave',  hex: '#8B6F5C', texto: 'white'  },
  { nombre: 'Blanco roto',   hex: '#FDFCFA', texto: '#3D5A3E'},
]

const indicaciones = [
  { emoji: '✅', texto: 'Tonos tierra, verdes y cremas'           },
  { emoji: '✅', texto: 'Ropa cómoda pero elegante'               },
  { emoji: '✅', texto: 'Calzado adecuado para jardín o exteriores'},
  { emoji: '❌', texto: 'Evitar el blanco y el negro riguroso'    },
  { emoji: '❌', texto: 'Evitar colores demasiado estridentes'    },
]

function DressCode() {
  return (
    <section className="bg-crema py-24 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">

        {/* Encabezado */}
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <span className="font-sans text-xs tracking-widest uppercase text-sage mb-4 block">
            Dress Code
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-verde-oscuro mb-6">
            Elegante Natural
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-tierra opacity-50" />
            <span className="text-tierra text-lg">◆</span>
            <div className="w-12 h-px bg-tierra opacity-50" />
          </div>
          <p className="font-sans font-light text-marron max-w-xl mx-auto leading-relaxed">
            Queremos que os sintáis cómodos y especiales. Os proponemos una paleta
            de colores que armonice con el entorno natural de nuestra celebración.
          </p>
        </motion.div>

        {/* Paleta de colores */}
        <motion.div {...fadeUp(0.1)} className="mb-16">
          <p className="font-sans text-xs tracking-widest uppercase text-sage
                        text-center mb-8">
            Paleta de colores
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {colores.map((color) => (
              <div key={color.nombre} className="flex flex-col items-center gap-2">
                <div
                  className="w-full aspect-square rounded-2xl shadow-sm
                             border border-black/5"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="font-sans text-xs text-marron text-center leading-tight">
                  {color.nombre}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Indicaciones */}
        <motion.div
          {...fadeUp(0.2)}
          className="bg-white rounded-3xl p-8 md:p-10 shadow-sm
                     border border-black/5"
        >
          <p className="font-sans text-xs tracking-widest uppercase text-sage
                        mb-6 text-center">
            Indicaciones
          </p>
          <div className="flex flex-col gap-4">
            {indicaciones.map((item) => (
              <div key={item.texto} className="flex items-center gap-4">
                <span className="text-xl flex-shrink-0">{item.emoji}</span>
                <p className="font-sans font-light text-marron text-sm leading-relaxed">
                  {item.texto}
                </p>
              </div>
            ))}
          </div>

          {/* Nota final */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="font-sans font-light text-sm text-gray-400 leading-relaxed">
              ✦ Lo más importante es que os sintáis bien y disfrutéis del día con nosotros
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default DressCode