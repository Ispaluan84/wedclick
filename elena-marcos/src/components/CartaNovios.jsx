import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.8, delay, ease: 'easeOut' },
})

function CartaNovios() {
  return (
    <section id="carta" className="bg-blanco-roto py-24 px-6 overflow-hidden">
      <div className="max-w-3xl mx-auto">

        {/* Encabezado */}
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <span className="font-sans text-xs tracking-widest uppercase text-sage mb-4 block">
            Unas palabras
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-verde-oscuro mb-6">
            De nosotros para vosotros
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-px bg-tierra opacity-50" />
            <span className="text-tierra text-lg">◆</span>
            <div className="w-12 h-px bg-tierra opacity-50" />
          </div>
        </motion.div>

        {/* Carta */}
        <motion.div
          {...fadeUp(0.15)}
          className="relative bg-white rounded-3xl p-10 md:p-14 shadow-sm
                     border border-black/5"
        >
          {/* Comilla decorativa */}
          <span className="font-serif text-[120px] text-tierra opacity-10
                           absolute -top-4 left-8 leading-none select-none">
            "
          </span>

          {/* Icono corazón */}
          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 rounded-full bg-tierra/10
                            flex items-center justify-center">
              <Heart size={20} className="text-tierra" />
            </div>
          </div>

          {/* Texto de la carta */}
          <div className="relative z-10 flex flex-col gap-6">
            <p className="font-sans font-light text-marron leading-relaxed text-center">
              Queridos amigos y familia,
            </p>

            <p className="font-sans font-light text-marron leading-relaxed text-center">
              Hay días que se sueñan durante años, y este es uno de ellos.
              Después de cinco años caminando juntos, de risas compartidas,
              de viajes improvisados y de tardes infinitas, hemos decidido
              dar el paso más bonito de nuestras vidas.
            </p>

            <p className="font-sans font-light text-marron leading-relaxed text-center">
              Queremos casarnos rodeados de las personas que más queremos,
              de quienes han sido parte de nuestra historia y de quienes
              nos han visto crecer como pareja. Cada uno de vosotros tiene
              un lugar especial en nuestro corazón.
            </p>

            <p className="font-sans font-light text-marron leading-relaxed text-center">
              No imaginamos este día sin vosotros. Queremos que riáis,
              que bailéis, que lloréis (de emoción, claro) y que disfrutéis
              tanto como nosotros de cada momento. Porque este día no es
              solo nuestro, es de todos.
            </p>

            <p className="font-serif text-lg text-verde-oscuro text-center italic mt-4">
              Os esperamos con el corazón abierto y los brazos más abiertos todavía.
            </p>
          </div>

          {/* Firma */}
          <div className="flex flex-col items-center gap-3 mt-10 pt-8
                          border-t border-gray-100">
            <span className="font-serif text-3xl text-verde-oscuro italic">
              Elena & Marcos
            </span>
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-tierra opacity-50" />
              <span className="font-sans text-xs text-gray-400 tracking-widest uppercase">
                Con todo nuestro amor
              </span>
              <div className="w-8 h-px bg-tierra opacity-50" />
            </div>
          </div>

          {/* Comilla cierre decorativa */}
          <span className="font-serif text-[120px] text-tierra opacity-10
                           absolute -bottom-16 right-8 leading-none select-none rotate-180">
            "
          </span>
        </motion.div>

      </div>
    </section>
  )
}

export default CartaNovios