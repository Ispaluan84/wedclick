import { motion } from 'framer-motion'
import { MessageCircle, Palette, Send } from 'lucide-react'

const pasos = [
  {
    numero: '01',
    icono: MessageCircle,
    titulo: 'Contadnos vuestra historia',
    descripcion: 'Nos escribís por WhatsApp o email. Nos contáis cómo os conocisteis, el estilo que buscáis, los colores, los lugares... todo lo que hace única vuestra boda.',
  },
  {
    numero: '02',
    icono: Palette,
    titulo: 'Diseñamos vuestra invitación',
    descripcion: 'Creamos una invitación digital a medida con todas las funcionalidades: RSVP, mapa, itinerario, playlist, álbum de fotos y mucho más. Vosotros revisáis y ajustamos.',
  },
  {
    numero: '03',
    icono: Send,
    titulo: 'Enviad y disfrutad',
    descripcion: 'Os entregamos un enlace único y QR personalizados. Solo tenéis que compartirlo con vuestros invitados y disfrutar de las confirmaciones en tiempo real.',
  },
]

function HowItWorks() {
  return (
    <section id="como-funciona" className="px-8 md:px-14 py-36 relative overflow-hidden bg-paper">

      {/* Número fantasma de fondo */}
      <span
        className="pointer-events-none select-none absolute right-0 top-1/2 -translate-y-1/2
                   font-serif font-black text-[22rem] leading-none text-ink/[0.025]"
        aria-hidden="true"
      >
        03
      </span>

      {/* Header */}
      <div className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
        >
          <p className="section-label mb-6" data-number="02">El proceso</p>
          <h2 className="font-serif font-bold text-display-md text-ink leading-[1.0] max-w-lg">
            Así de fácil, en{' '}
            <em className="italic text-rose">tres pasos</em>
          </h2>
        </motion.div>
      </div>

      {/* Pasos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">

        {/* Línea conectora desktop */}
        <div
          className="hidden md:block absolute top-5 left-0 right-0 h-px bg-gold-light"
          aria-hidden="true"
        />

        {pasos.map((paso, index) => {
          const Icono = paso.icono
          return (
            <motion.div
              key={paso.numero}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: index * 0.12, ease: [0.19, 1, 0.22, 1] }}
              className="relative pt-14"
            >
              {/* Badge número */}
              <div className="absolute top-0 left-0 w-11 h-11 border border-gold bg-paper
                              flex items-center justify-center">
                <span className="font-serif italic text-[0.75rem] text-gold">{paso.numero}</span>
              </div>

              <h3 className="font-serif italic text-[1.3rem] text-ink mb-4 leading-snug">
                {paso.titulo}
              </h3>
              <p className="font-sans font-light text-[0.88rem] leading-[1.85] text-warm-gray">
                {paso.descripcion}
              </p>
            </motion.div>
          )
        })}
      </div>

      {/* Nota inferior */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-16"
      >
        <div className="inline-flex items-center gap-4">
          <span className="ornament-line" />
          <span className="font-sans text-[0.68rem] tracking-[0.1em] uppercase text-warm-gray">
            Vuestra invitación lista en{' '}
            <strong className="text-ink font-medium">5–7 días</strong>
          </span>
        </div>
      </motion.div>

    </section>
  )
}

export default HowItWorks
