import { motion } from 'framer-motion'
import { MessageCircle, Palette, CheckCircle, Send } from 'lucide-react'
import SectionWrapper from '../ui/SectionWrapper.jsx'

const steps = [
  {
    number:      '01',
    icon:        MessageCircle,
    title:       'Nos contactas',
    description: 'Cuéntanos cómo es vuestra boda. Sin formularios genéricos, sin respuestas automáticas. Una persona real os escucha, toma nota de cada detalle y os pide todo el material necesario: fotos, vuestra historia, datos del evento y la lista de invitados.',
    detail:      'Una conversación real, entre personas.',
    color:       'blue',
  },
  {
    number:      '02',
    icon:        Palette,
    title:       'Creamos vuestra invitación',
    description: 'Con todo el material que nos habéis dado, creamos una invitación única. No hay plantillas, no hay atajos. Cada elemento, cada palabra y cada imagen está pensada para vosotros y solo para vosotros.',
    detail:      'Cada invitación es irrepetible. Como vuestra boda.',
    color:       'gold',
  },
  {
    number:      '03',
    icon:        CheckCircle,
    title:       'Revisáis y aprobáis',
    description: 'Os enviamos la invitación terminada para que la reviséis con calma. Tenéis una ronda de ajustes incluida para afinar cualquier detalle. Vuestro criterio manda, nuestra ejecución lo hace realidad.',
    detail:      'Vuestro criterio, nuestra ejecución.',
    color:       'blue',
  },
  {
    number:      '04',
    icon:        Send,
    title:       'Lista para enviar',
    description: 'Generamos un enlace único y un código QR personalizado para cada invitado. Solo tenéis que enviarlo por WhatsApp o email. Nosotros nos ocupamos de todo lo demás. Llave en mano, sin complicaciones.',
    detail:      'Llave en mano. Sin complicaciones.',
    color:       'gold',
  },
]

const fadeUp = {
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: '-80px' },
  transition:  { duration: 0.6, ease: 'easeOut' },
}

function StepCard({ step, index }) {
  const isEven = index % 2 !== 0
  const Icon   = step.icon

  const animation = isEven
    ? { initial: { opacity: 0, x: 40 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true, margin: '-80px' }, transition: { duration: 0.7, ease: 'easeOut' } }
    : { initial: { opacity: 0, x: -40 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true, margin: '-80px' }, transition: { duration: 0.7, ease: 'easeOut' } }

  const circleBg    = step.color === 'blue' ? '#6A8DAD' : '#D9C99E'
  const iconColor   = step.color === 'blue' ? '#ffffff' : '#333E50'
  const borderColor = step.color === 'blue' ? '#6A8DAD' : '#D9C99E'

  return (
    <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row-reverse' : ''}`}>

      {/* Texto */}
      <motion.div {...animation} className="flex-1 flex flex-col gap-4">
        <span className="font-serif text-8xl font-bold leading-none -mb-6 select-none opacity-10 text-blueWillow">
          {step.number}
        </span>
        <h3 className="font-serif text-2xl md:text-3xl text-slateGray">{step.title}</h3>
        <div className="flex items-center gap-2">
          <div className="w-8 h-px bg-goldAccent" />
          <div className="w-1.5 h-1.5 rounded-full bg-goldAccent" />
        </div>
        <p className="font-sans font-light text-gray-500 leading-relaxed">{step.description}</p>
        <p className="font-sans text-sm text-blueWillow font-medium italic">✦ {step.detail}</p>
      </motion.div>

      {/* Icono */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex-shrink-0 flex flex-col items-center gap-3"
      >
        <div
          className="relative w-24 h-24 rounded-full flex items-center justify-center shadow-lg"
          style={{ backgroundColor: circleBg }}
        >
          <Icon size={36} style={{ color: iconColor }} />
          <div
            className="absolute inset-0 rounded-full border-2 scale-110 opacity-30"
            style={{ borderColor }}
          />
        </div>
        {index < steps.length - 1 && (
          <div className="hidden md:block w-px h-24 bg-gradient-to-b from-blueWillow to-transparent opacity-20" />
        )}
      </motion.div>

      {/* Espejo zigzag */}
      <div className="flex-1 hidden md:block" />
    </div>
  )
}

function HowItWorks() {
  return (
    <SectionWrapper id="como-funciona" className="bg-white">

      <motion.div {...fadeUp} className="text-center mb-20">
        <span className="inline-block font-sans text-xs tracking-widest uppercase text-blueWillow mb-4">
  El proceso
</span>
<h2 className="section-title">
  Un proceso tan sencillo
  <br />
  como especial es vuestro día
</h2>
<p className="section-subtitle">
  No hay formularios genéricos ni respuestas automáticas.
  Hay dos personas al otro lado, escuchándoos.
</p>
      </motion.div>

      <div className="flex flex-col gap-16 md:gap-24">
        {steps.map((step, index) => (
          <StepCard key={step.number} step={step} index={index} />
        ))}
      </div>

      <motion.div {...fadeUp} className="mt-20 flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-16 h-px bg-goldAccent opacity-50" />
          <span className="text-goldAccent text-xl">◆</span>
          <div className="w-16 h-px bg-goldAccent opacity-50" />
        </div>
        <p className="font-sans font-light text-sm text-gray-400 text-center">
          Desde el primer mensaje hasta el último enlace enviado,
          <br className="hidden md:block" />
          hay dos personas cuidando cada detalle por vosotros.
        </p>
      </motion.div> 

    </SectionWrapper>
  )
}

export default HowItWorks
