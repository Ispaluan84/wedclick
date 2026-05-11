import { motion } from 'framer-motion'
import { ArrowRight, Heart, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.8, delay, ease: 'easeOut' },
})

function CTAFinal() {
  const navigate = useNavigate()

  return (
    <section className="relative py-32 px-6 overflow-hidden
                        bg-gradient-to-br from-verde-oscuro via-sage to-crema">

      {/* Elementos decorativos */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-crema/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-tierra/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">

        {/* Icono */}
        <motion.div {...fadeUp(0)} className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-crema/10 border border-crema/20
                          flex items-center justify-center">
            <Heart size={28} className="text-crema" />
          </div>
        </motion.div>

        {/* Título */}
        <motion.h2 {...fadeUp(0.1)}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-crema mb-6 leading-tight"
        >
          ¿Listos para crear
          <br />
          <span className="italic text-tierra">vuestra invitación?</span>
        </motion.h2>

        {/* Subtítulo */}
        <motion.p {...fadeUp(0.2)}
          className="font-sans font-light text-crema/80 text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-10"
        >
          Haced que vuestros invitados vivan la emoción de vuestra boda
          desde el primer momento. Empezamos cuando queráis.
        </motion.p>

        {/* Botones */}
        <motion.div {...fadeUp(0.3)} className="flex flex-wrap justify-center gap-4 mb-12">
          <a
            href="https://wa.me/34600000000?text=Hola!%20Queremos%20crear%20nuestra%20invitación%20de%20boda"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-8 py-4 rounded-2xl
                       bg-crema text-verde-oscuro font-sans text-sm tracking-wide uppercase
                       hover:bg-crema/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Contactar ahora
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="https://demo.wedclick.es"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group flex items-center gap-3 px-8 py-4 rounded-2xl
              bg-crema/70 text-verde-oscuro font-sans text-sm
              tracking-wide uppercase border border-crema
              hover:bg-crema/90 transition-all
            "
          >
          <Sparkles size={16} />
          Ver demo primero
          </a>
        </motion.div>

        {/* Garantías */}
        <motion.div {...fadeUp(0.4)}
          className="flex flex-wrap justify-center gap-8"
        >
          {[
            'Diseño 100% personalizado',
            'Cambios ilimitados',
            'Soporte continuo',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-tierra" />
              <span className="font-sans text-sm text-crema/90">
                {item}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default CTAFinal