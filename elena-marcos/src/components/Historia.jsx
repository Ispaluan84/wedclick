import { motion } from 'framer-motion'
import noviosHistoria from '../assets/images/novios-historia.jpg'

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.8, delay, ease: 'easeOut' },
})

function Historia() {
  return (
    <section className="relative bg-crema py-24 px-6 overflow-hidden">

      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-sage opacity-10" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-tierra opacity-10" />
      </div>

      <div className="max-w-5xl mx-auto">

        {/* Encabezado */}
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <span className="font-sans text-xs tracking-widest uppercase text-sage mb-4 block">
            Nuestra historia
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-verde-oscuro mb-6">
            Cómo empezó todo
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-px bg-tierra opacity-50" />
            <span className="text-tierra text-lg">◆</span>
            <div className="w-12 h-px bg-tierra opacity-50" />
          </div>
        </motion.div>

        {/* Contenido */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Foto */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            {/* Marco decorativo */}
            <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl
                            border-2 border-tierra opacity-20" />
            <img
              src={noviosHistoria}
              alt="Elena & Marcos"
              className="relative w-full h-[450px] object-cover rounded-3xl shadow-xl"
            />
            {/* Badge sobre la foto */}
            <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl
                            shadow-lg px-5 py-3 flex flex-col items-center">
              <span className="font-serif text-2xl text-verde-oscuro font-bold">5</span>
              <span className="font-sans text-xs text-gray-400 tracking-wide">años juntos</span>
            </div>
          </motion.div>

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col gap-8"
          >
            {/* Cita */}
            <div className="relative">
              <span className="font-serif text-8xl text-tierra opacity-20
                               absolute -top-6 -left-4 leading-none">
                "
              </span>
              <p className="font-serif text-xl md:text-2xl text-verde-oscuro
                             italic leading-relaxed relative z-10">
                Se conocieron en una tarde de verano en el Parque del Retiro de Madrid.
                Marcos pintaba y Elena se paró a mirar su cuadro.
              </p>
            </div>

            {/* Separador */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-tierra opacity-50" />
              <div className="w-2 h-2 rounded-full bg-tierra opacity-50" />
            </div>

            {/* Texto */}
            <p className="font-sans font-light text-marron leading-relaxed">
              Cinco años después, siguen mirando el mundo juntos. Cada aventura,
              cada viaje, cada atardecer compartido los ha traído hasta aquí.
              Hasta este día que llevan soñando desde aquella tarde de verano.
            </p>

            {/* Detalle */}
            <p className="font-sans font-light text-marron leading-relaxed">
              Comparten la pasión por la naturaleza, los caminos sin mapa y
              la certeza de que las mejores historias son las que se viven juntos.
              Hoy os invitan a ser parte de la suya.
            </p>

            {/* Firma */}
            <div className="flex items-center gap-4 mt-4">
              <div className="flex flex-col">
                <span className="font-serif text-2xl text-verde-oscuro italic">
                  Elena & Marcos
                </span>
                <span className="font-sans text-xs text-gray-400 tracking-widest uppercase mt-1">
                  14 · 06 · 2025
                </span>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Historia