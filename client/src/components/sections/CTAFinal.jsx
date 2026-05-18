import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Heart, Sparkles, Send, Check, Loader2 } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.8, delay, ease: 'easeOut' },
})

function CTAFinal() {
  const [form, setForm]       = useState({ novio1: '', novio2: '', fecha: '', lugarCeremonia: '', lugarCelebracion: '', contacto: '', consulta: '' })
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado]   = useState(false)
  const [error, setError]       = useState('')

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.novio1 || !form.novio2 || !form.consulta) {
      setError('Por favor rellena al menos los nombres y la consulta.')
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

  const inputCls = `w-full px-4 py-3 rounded-xl bg-crema/10 border border-crema/20
    text-crema placeholder:text-crema/40 font-sans text-sm
    focus:outline-none focus:border-crema/60 transition`

  return (
    <section className="relative py-32 px-6 overflow-hidden
                        bg-gradient-to-br from-verde-oscuro via-sage to-crema">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-crema/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-tierra/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto">

        {/* Cabecera */}
        <div className="text-center mb-12">
          <motion.div {...fadeUp(0)} className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-crema/10 border border-crema/20
                            flex items-center justify-center">
              <Heart size={28} className="text-crema" />
            </div>
          </motion.div>
          <motion.h2 {...fadeUp(0.1)}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-crema mb-6 leading-tight"
          >
            ¿Listos para crear
            <br />
            <span className="italic text-tierra">vuestra invitación?</span>
          </motion.h2>
          <motion.p {...fadeUp(0.2)}
            className="font-sans font-light text-crema/80 text-lg leading-relaxed max-w-xl mx-auto mb-6"
          >
            Haced que vuestros invitados vivan la emoción de vuestra boda
            desde el primer momento. Empezamos cuando queráis.
          </motion.p>
          <motion.div {...fadeUp(0.25)} className="flex justify-center mb-10">
            
            <a  href="https://elena-marcos.wedclick.es"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 rounded-2xl
                bg-crema/20 text-crema font-sans text-sm tracking-wide uppercase
                border border-crema/30 hover:bg-crema/30 transition-all"
            >
              <Sparkles size={16} />
              Ver demo primero
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Formulario */}
        <motion.div {...fadeUp(0.3)}>
          <AnimatePresence mode="wait">
            {enviado ? (
              <motion.div
                key="ok"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-crema/10 border border-crema/20 rounded-3xl p-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-tierra/20 flex items-center justify-center mx-auto mb-4">
                  <Check size={28} className="text-tierra" />
                </div>
                <h3 className="font-serif text-2xl text-crema mb-2">¡Mensaje enviado!</h3>
                <p className="font-sans text-crema/70 text-sm">
                  Os contactaremos pronto para empezar a crear vuestra invitación.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="bg-crema/10 border border-crema/20 rounded-3xl p-8 flex flex-col gap-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-sans text-xs text-crema/60 uppercase tracking-widest mb-1.5 block">
                      Nombre novio/a 1 *
                    </label>
                    <input name="novio1" value={form.novio1} onChange={handleChange}
                      placeholder="Elena" className={inputCls} />
                  </div>
                  <div>
                    <label className="font-sans text-xs text-crema/60 uppercase tracking-widest mb-1.5 block">
                      Nombre novio/a 2 *
                    </label>
                    <input name="novio2" value={form.novio2} onChange={handleChange}
                      placeholder="Marcos" className={inputCls} />
                  </div>
                </div>

                <div>
                  <label className="font-sans text-xs text-crema/60 uppercase tracking-widest mb-1.5 block">
                    Fecha de la boda
                  </label>
                  <input name="fecha" type="date" value={form.fecha} onChange={handleChange}
                    className={inputCls} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-sans text-xs text-crema/60 uppercase tracking-widest mb-1.5 block">
                      Lugar ceremonia
                    </label>
                    <input name="lugarCeremonia" value={form.lugarCeremonia} onChange={handleChange}
                      placeholder="Iglesia de..." className={inputCls} />
                  </div>
                  <div>
                    <label className="font-sans text-xs text-crema/60 uppercase tracking-widest mb-1.5 block">
                      Lugar celebración
                    </label>
                    <input name="lugarCelebracion" value={form.lugarCelebracion} onChange={handleChange}
                      placeholder="Hacienda..." className={inputCls} />
                  </div>
                </div>

                <div>
                  <label className="font-sans text-xs text-crema/60 uppercase tracking-widest mb-1.5 block">
                    Forma de contacto (email o teléfono)
                  </label>
                  <input name="contacto" value={form.contacto} onChange={handleChange}
                    placeholder="email@ejemplo.com / +34 600 000 000" className={inputCls} />
                </div>

                <div>
                  <label className="font-sans text-xs text-crema/60 uppercase tracking-widest mb-1.5 block">
                    ¿En qué podemos ayudaros? *
                  </label>
                  <textarea name="consulta" value={form.consulta} onChange={handleChange}
                    rows={4} placeholder="Cuéntanos lo que necesitáis..."
                    className={`${inputCls} resize-none`} />
                </div>

                {error && (
                  <p className="font-sans text-xs text-tierra text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={enviando}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl
                    bg-crema text-verde-oscuro font-sans text-sm font-semibold
                    tracking-wide uppercase hover:bg-crema/90 transition-all
                    shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {enviando
                    ? <><Loader2 size={16} className="animate-spin" /> Enviando...</>
                    : <><Send size={16} /> Enviar consulta</>
                  }
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Garantías */}
        <motion.div {...fadeUp(0.5)} className="flex flex-wrap justify-center gap-8 mt-10">
          {['Diseño 100% personalizado', 'Cambios ilimitados', 'Soporte continuo'].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-tierra" />
              <span className="font-sans text-sm text-crema/90">{item}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

export default CTAFinal