import { motion } from 'framer-motion'
import { MessageCircle, Palette, Send, ArrowRight } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.8, delay, ease: 'easeOut' },
})

const pasos = [
  {
    numero: '01',
    icono: MessageCircle,
    titulo: 'Contadnos vuestra historia',
    descripcion: 'Nos escribís por WhatsApp o email. Nos contáis cómo os conocisteis, el estilo que buscáis, los colores, los lugares... todo lo que hace única vuestra boda.',
    color: 'sage',
  },
  {
    numero: '02',
    icono: Palette,
    titulo: 'Diseñamos vuestra invitación',
    descripcion: 'Creamos una invitación digital a medida con todas las funcionalidades: RSVP, mapa, itinerario, playlist, álbum de fotos y mucho más. Vosotros revisáis y ajustamos.',
    color: 'tierra',
  },
  {
    numero: '03',
    icono: Send,
    titulo: 'Enviad y disfrutad',
    descripcion: 'Os entregamos un enlace único y QR personalizados. Solo tenéis que compartirlo con vuestros invitados y disfrutar de las confirmaciones en tiempo real.',
    color: 'sage',
  },
]

function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-white py-24 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">

        {/* Encabezado */}
        <motion.div {...fadeUp(0)} className="text-center mb-20">
          <span className="font-sans text-xs tracking-widest uppercase text-sage mb-4 block">
            Proceso
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-verde-oscuro mb-6">
            Así de fácil
            <br />
            <span className="italic text-tierra">en tres pasos</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-tierra opacity-50" />
            <span className="text-tierra text-lg">◆</span>
            <div className="w-12 h-px bg-tierra opacity-50" />
          </div>
          <p className="font-sans font-light text-marron max-w-xl mx-auto leading-relaxed">
            Sin complicaciones, sin estrés. Nosotros nos encargamos de todo
            para que vosotros solo tengáis que disfrutar.
          </p>
        </motion.div>

        {/* Pasos */}
        <div className="relative">

          {/* Línea conectora (desktop) */}
          <div className="hidden md:block absolute top-24 left-[15%] right-[15%]
                          h-px bg-gradient-to-r from-sage/30 via-tierra/30 to-sage/30" />

          <div className="grid md:grid-cols-3 gap-10 md:gap-8">
            {pasos.map((paso, index) => {
              const Icono = paso.icono
              const colorBg = paso.color === 'sage' ? 'bg-sage' : 'bg-tierra'
              const colorBgLight = paso.color === 'sage' ? 'bg-sage/10' : 'bg-tierra/10'
              const colorText = paso.color === 'sage' ? 'text-sage' : 'text-tierra'

              return (
                <motion.div
                  key={paso.numero}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Número de fondo */}
                  <span className="font-serif text-[100px] font-bold text-gray-100
                                   absolute -top-8 left-1/2 -translate-x-1/2
                                   select-none leading-none">
                    {paso.numero}
                  </span>

                  {/* Icono */}
                  <div className={`relative z-10 w-16 h-16 rounded-2xl ${colorBg}
                                  flex items-center justify-center mb-6
                                  shadow-lg`}>
                    <Icono size={28} className="text-white" />
                  </div>

                  {/* Contenido */}
                  <div className="relative z-10 bg-white rounded-3xl p-8
                                  shadow-sm border border-black/5 flex-1">
                    <h3 className="font-serif text-xl text-verde-oscuro mb-4">
                      {paso.titulo}
                    </h3>
                    <p className="font-sans font-light text-marron text-sm leading-relaxed">
                      {paso.descripcion}
                    </p>
                  </div>

                  {/* Flecha entre pasos (mobile) */}
                  {index < pasos.length - 1 && (
                    <div className="md:hidden flex justify-center my-4">
                      <ArrowRight size={20} className="text-tierra/30 rotate-90" />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Nota inferior */}
        <motion.div {...fadeUp(0.5)} className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full
                          bg-sage/10 border border-sage/20">
            <span className="text-sm">⏱️</span>
            <span className="font-sans text-sm text-verde-oscuro">
              Vuestra invitación lista en <strong className="font-medium">5-7 días</strong>
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default HowItWorks