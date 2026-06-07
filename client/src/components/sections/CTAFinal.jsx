import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, MessageCircle, Sparkles, Check, Loader2 } from 'lucide-react'
import { WHATSAPP_URL } from '../../lib/contact'

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.8, delay, ease: 'easeOut' },
})

function CTAFinal() {
  const [form, setForm]         = useState({ nombre: '', email: '', consulta: '' })
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado]   = useState(false)
  const [error, setError]       = useState('')

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.nombre || !form.email) {
      setError('Por favor rellena nombre y email.')
      return
    }
    setEnviando(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contacto`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setEnviado(true)
    } catch {
      setError('Hubo un error al enviar. Inténtalo de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  const inputCls = [
    'w-full px-0 py-3 bg-transparent border-0 border-b border-w-gold/30',
    'text-cream placeholder:text-warm-gray font-sans text-sm font-light',
    'focus:outline-none focus:border-w-gold transition-colors duration-300',
  ].join(' ')

  const labelCls = 'font-sans text-[0.6rem] tracking-[0.2em] uppercase text-warm-gray block mb-1'

  return (
    <section className="relative bg-ink overflow-hidden">

      {/* Línea decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-w-gold/40 to-transparent" />

      {/* Textura de fondo sutil */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #C9A96E 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 py-28 md:py-36">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">

          {/* — Columna izquierda: copy editorial — */}
          <div>
            <motion.p {...fadeUp(0)}
              className="font-sans text-[0.6rem] tracking-[0.25em] uppercase text-w-gold mb-8"
            >
              Empezamos cuando queráis
            </motion.p>

            <motion.h2 {...fadeUp(0.1)}
              className="font-serif text-display-lg text-cream leading-[1.05] mb-8"
            >
              Cada boda merece
              <br />
              <em className="text-w-gold not-italic">su propia voz.</em>
            </motion.h2>

            <motion.p {...fadeUp(0.2)}
              className="font-sans font-light text-warm-gray text-base leading-relaxed mb-12 max-w-sm"
            >
              Haced que vuestros invitados vivan la emoción de vuestra boda
              desde el primer momento. Diseño único, entrega rápida,
              soporte personal durante todo el proceso.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-4 mb-14">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3
                           px-7 py-4 bg-w-gold text-ink
                           font-sans text-xs tracking-[0.15em] uppercase font-medium
                           hover:bg-w-gold-light transition-colors duration-300"
              >
                <MessageCircle size={15} />
                Escribirnos por WhatsApp
              </a>

              <a
                href="https://elena-marcos.wedclick.es"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3
                           px-7 py-4 border border-w-gold/30 text-cream
                           font-sans text-xs tracking-[0.15em] uppercase font-light
                           hover:border-w-gold/70 transition-colors duration-300"
              >
                <Sparkles size={15} className="text-w-gold" />
                Ver demo en vivo
                <ArrowRight size={13} className="text-w-gold group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </motion.div>

            {/* Garantías */}
            <motion.div {...fadeUp(0.4)} className="flex flex-col gap-3">
              {['Diseño 100% personalizado', 'Cambios ilimitados incluidos', 'Soporte personal continuo'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-px h-3 bg-w-gold/60" />
                  <span className="font-sans text-xs font-light text-warm-gray tracking-wide">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* — Columna derecha: formulario minimalista — */}
          <motion.div {...fadeUp(0.2)}>
            <div className="border border-w-gold/20 p-8 md:p-10">

              <p className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-w-gold mb-6">
                O si preferís escribirnos aquí
              </p>

              <AnimatePresence mode="wait">
                {enviado ? (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="w-10 h-10 border border-w-gold/40 flex items-center justify-center mx-auto mb-5">
                      <Check size={18} className="text-w-gold" />
                    </div>
                    <h3 className="font-serif text-xl text-cream mb-2">Mensaje recibido</h3>
                    <p className="font-sans text-sm font-light text-warm-gray leading-relaxed">
                      Os contactaremos en menos de 24 horas para empezar a crear vuestra invitación.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form" className="flex flex-col gap-7">

                    <div>
                      <label className={labelCls}>Vuestros nombres *</label>
                      <input
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        placeholder="Elena & Marcos"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className={labelCls}>Email o teléfono *</label>
                      <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="hola@ejemplo.com"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className={labelCls}>Contadnos vuestra boda</label>
                      <textarea
                        name="consulta"
                        value={form.consulta}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Fecha, lugar, estilo que buscáis..."
                        className={`${inputCls} resize-none`}
                      />
                    </div>

                    {error && (
                      <p className="font-sans text-xs text-w-rose">{error}</p>
                    )}

                    <button
                      onClick={handleSubmit}
                      disabled={enviando}
                      className="group flex items-center justify-center gap-2 w-full py-4
                                 bg-transparent border border-w-gold/40 text-cream
                                 font-sans text-xs tracking-[0.2em] uppercase font-light
                                 hover:border-w-gold hover:bg-w-gold/5
                                 transition-all duration-300
                                 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {enviando
                        ? <><Loader2 size={13} className="animate-spin" /> Enviando</>
                        : <>Enviar consulta <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" /></>
                      }
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Línea decorativa inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-w-gold/40 to-transparent" />

    </section>
  )
}

export default CTAFinal