import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Send, Phone, Mail, Calendar } from 'lucide-react'
import SectionWrapper from '../ui/SectionWrapper.jsx'

const WHATSAPP_NUMBER = '34627147039'
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hola, me gustaría información sobre las invitaciones de boda de WedClick 💍'
)
const FORMSPREE_URL = 'https://formspree.io/f/mbdzrzby'

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.6, delay, ease: 'easeOut' },
})

function Contact() {
  const [formData, setFormData] = useState({
    nombre:   '',
    email:    '',
    telefono: '',
    fecha:    '',
    mensaje:  '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch(FORMSPREE_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus('success')
        setFormData({ nombre: '', email: '', telefono: '', fecha: '', mensaje: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <SectionWrapper id="contacto" className="bg-warmWhite">

      {/* Encabezado */}
      <motion.div {...fadeUp(0)} className="text-center mb-16">
        <span className="inline-block font-sans text-xs tracking-widest uppercase text-blueWillow mb-4">
          Contacto
        </span>
        <h2 className="section-title">
          Hablemos de vuestra boda
        </h2>
        <p className="section-subtitle">
          Cuéntanos cómo es vuestro día y os preparamos una invitación única.
          Sin compromiso, sin prisas.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        {/* Columna izquierda: WhatsApp + info */}
        <motion.div {...fadeUp(0.1)} className="flex flex-col gap-8">

          {/* Card WhatsApp */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center shadow-sm">
                <MessageCircle size={22} className="text-white" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-slateGray">WhatsApp</h3>
                <p className="font-sans text-xs text-gray-400">Respuesta rápida</p>
              </div>
            </div>

            <p className="font-sans font-light text-sm text-gray-500 leading-relaxed">
              ¿Prefieres hablar directamente? Escríbenos por WhatsApp y te respondemos 
              lo antes posible. Es la forma más rápida de empezar.
            </p>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 
                         text-white font-sans font-semibold text-sm px-6 py-3 
                         rounded-full hover:bg-green-600 transition-all duration-300 
                         shadow-sm hover:shadow-md cursor-pointer"
            >
              <MessageCircle size={16} />
              Escribirnos por WhatsApp
            </a>
          </div>

          {/* Info adicional */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blueWillow/10 flex items-center justify-center">
                <Phone size={14} className="text-blueWillow" />
              </div>
              <span className="font-sans text-sm text-gray-500">+34 627 147 039</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blueWillow/10 flex items-center justify-center">
                <Mail size={14} className="text-blueWillow" />
              </div>
              <span className="font-sans text-sm text-gray-500">contacto@wedclick.es</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blueWillow/10 flex items-center justify-center">
                <Calendar size={14} className="text-blueWillow" />
              </div>
              <span className="font-sans text-sm text-gray-500">
                Respondemos en menos de 24h
              </span>
            </div>
          </div>

        </motion.div>

        {/* Columna derecha: Formulario */}
        <motion.div {...fadeUp(0.2)}>
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blueWillow flex items-center justify-center shadow-sm">
                <Send size={22} className="text-white" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-slateGray">Formulario</h3>
                <p className="font-sans text-xs text-gray-400">Te respondemos por email</p>
              </div>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {/* Nombre */}
              <div className="flex flex-col gap-1">
                <label className="font-sans text-xs text-gray-400 tracking-wide uppercase">
                  Nombre *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Ana y Carlos"
                  className="font-sans text-sm text-slateGray bg-warmWhite 
                             border border-gray-200 rounded-xl px-4 py-3
                             focus:outline-none focus:border-blueWillow 
                             transition-colors duration-200 placeholder:text-gray-300"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="font-sans text-xs text-gray-400 tracking-wide uppercase">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="ana@email.com"
                  className="font-sans text-sm text-slateGray bg-warmWhite 
                             border border-gray-200 rounded-xl px-4 py-3
                             focus:outline-none focus:border-blueWillow 
                             transition-colors duration-200 placeholder:text-gray-300"
                />
              </div>

              {/* Teléfono */}
              <div className="flex flex-col gap-1">
                <label className="font-sans text-xs text-gray-400 tracking-wide uppercase">
                  Teléfono <span className="normal-case">(opcional)</span>
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="+34 600 000 000"
                  className="font-sans text-sm text-slateGray bg-warmWhite 
                             border border-gray-200 rounded-xl px-4 py-3
                             focus:outline-none focus:border-blueWillow 
                             transition-colors duration-200 placeholder:text-gray-300"
                />
              </div>

              {/* Fecha de la boda */}
              <div className="flex flex-col gap-1">
                <label className="font-sans text-xs text-gray-400 tracking-wide uppercase">
                  Fecha de la boda *
                </label>
                <input
                  type="date"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  required
                  className="font-sans text-sm text-slateGray bg-warmWhite 
                             border border-gray-200 rounded-xl px-4 py-3
                             focus:outline-none focus:border-blueWillow 
                             transition-colors duration-200"
                />
              </div>

              {/* Mensaje */}
              <div className="flex flex-col gap-1">
                <label className="font-sans text-xs text-gray-400 tracking-wide uppercase">
                  Mensaje *
                </label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Cuéntanos cómo es vuestra boda..."
                  className="font-sans text-sm text-slateGray bg-warmWhite 
                             border border-gray-200 rounded-xl px-4 py-3
                             focus:outline-none focus:border-blueWillow 
                             transition-colors duration-200 placeholder:text-gray-300
                             resize-none"
                />
              </div>

              {/* Botón enviar */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary mt-2 flex items-center justify-center gap-2"
              >
                {status === 'sending' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Enviar mensaje
                  </>
                )}
              </button>

              {/* Mensajes de estado */}
              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-sans text-sm text-green-500 text-center"
                >
                  ✅ Mensaje enviado. ¡Os respondemos pronto!
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-sans text-sm text-red-400 text-center"
                >
                  ❌ Algo ha fallado. Inténtalo de nuevo o escríbenos por WhatsApp.
                </motion.p>
              )}

            </form>
          </div>
        </motion.div>

      </div>

    </SectionWrapper>
  )
}

export default Contact              