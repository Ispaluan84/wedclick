import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music2, Send, CheckCircle } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.8, delay, ease: 'easeOut' },
})

const MAKE_WEBHOOK_URL = 'https://hook.eu1.make.com/dph2lcn3agigbz7eqfqj2mkw1c3skg4u'
const BODA_ID = '129e0f08-9b28-433b-9b6f-0a5dda2364fa' 


const sugerencias = [
  'Can\'t Help Falling in Love · Elvis Presley',
  'Perfect · Ed Sheeran',
  'A Thousand Years · Christina Perri',
  'La Vie en Rose · Édith Piaf',
  'Thinking Out Loud · Ed Sheeran',
]

function BandaSonora() {
  const [formData, setFormData] = useState({
    nombre:  '',
    cancion: '',
    artista: '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

const handleSubmit = async (e) => {
  e.preventDefault()
  setStatus('sending')

  try {
    const res = await fetch(MAKE_WEBHOOK_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        tipo:     'cancion',
        boda_id:  BODA_ID,
        invitado: formData.nombre,
        cancion:  formData.cancion,
        artista:  formData.artista,
      }),
    })

    if (res.ok) {
      setStatus('success')
      setFormData({ nombre: '', cancion: '', artista: '' })
    } else {
      setStatus('error')
    }
  } catch {
    setStatus('error')
  }
}

  return (
    <section className="bg-verde-oscuro py-24 px-6 overflow-hidden relative">

      {/* Elementos decorativos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full
                        bg-sage opacity-10" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full
                        bg-tierra opacity-10" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">

        {/* Encabezado */}
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <span className="font-sans text-xs tracking-widest uppercase text-tierra mb-4 block">
            Música
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
            La Banda Sonora
            <br />
            <span className="italic text-tierra">de nuestra boda</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-tierra opacity-50" />
            <span className="text-tierra text-lg">◆</span>
            <div className="w-12 h-px bg-tierra opacity-50" />
          </div>
          <p className="font-sans font-light text-white/70 max-w-xl mx-auto leading-relaxed">
            Queremos que nuestra boda suene a todos vosotros. Proponed la canción
            que no puede faltar en el día más especial de nuestras vidas.
          </p>
        </motion.div>

        {/* Sugerencias */}
        <motion.div {...fadeUp(0.1)} className="mb-12">
          <p className="font-sans text-xs tracking-widest uppercase text-tierra
                        text-center mb-6">
            Algunas ideas para inspirarte
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {sugerencias.map((cancion) => (
              <span
                key={cancion}
                className="font-sans text-xs text-white/60 bg-white/10
                           px-4 py-2 rounded-full border border-white/10"
              >
                🎵 {cancion}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Formulario */}
        <motion.div {...fadeUp(0.2)}>
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8
                          border border-white/10">

            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-tierra/20
                              flex items-center justify-center">
                <Music2 size={18} className="text-tierra" />
              </div>
              <h3 className="font-serif text-xl text-white">
                Propón tu canción
              </h3>
            </div>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 py-8 text-center"
                >
                  <CheckCircle size={48} className="text-sage" />
                  <h4 className="font-serif text-2xl text-white">
                    ¡Gracias por tu sugerencia!
                  </h4>
                  <p className="font-sans font-light text-white/60 text-sm">
                    Tu canción formará parte de la banda sonora de nuestro día.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-natural-outline mt-4"
                    style={{ borderColor: '#C4956A', color: '#C4956A' }}
                  >
                    Proponer otra canción
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >

                  {/* Nombre */}
                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-xs text-white/50
                                      tracking-wide uppercase">
                      Tu nombre
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      placeholder="¿Cómo te llamas?"
                      className="font-sans text-sm bg-white/10 border border-white/20
                                 rounded-xl px-4 py-3 text-white placeholder:text-white/30
                                 focus:outline-none focus:border-tierra
                                 transition-colors duration-200"
                    />
                  </div>

                  {/* Canción y Artista */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-xs text-white/50
                                        tracking-wide uppercase">
                        Canción
                      </label>
                      <input
                        type="text"
                        name="cancion"
                        value={formData.cancion}
                        onChange={handleChange}
                        required
                        placeholder="Nombre de la canción"
                        className="font-sans text-sm bg-white/10 border border-white/20
                                   rounded-xl px-4 py-3 text-white placeholder:text-white/30
                                   focus:outline-none focus:border-tierra
                                   transition-colors duration-200"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-xs text-white/50
                                        tracking-wide uppercase">
                        Artista
                      </label>
                      <input
                        type="text"
                        name="artista"
                        value={formData.artista}
                        onChange={handleChange}
                        required
                        placeholder="Nombre del artista"
                        className="font-sans text-sm bg-white/10 border border-white/20
                                   rounded-xl px-4 py-3 text-white placeholder:text-white/30
                                   focus:outline-none focus:border-tierra
                                   transition-colors duration-200"
                      />
                    </div>
                  </div>

                  {/* Botón */}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-natural mt-2 w-full"
                    style={{ backgroundColor: '#C4956A' }}
                  >
                    {status === 'sending' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30
                                        border-t-white rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Proponer canción
                      </>
                    )}
                  </button>

                  {status === 'error' && (
                    <p className="font-sans text-sm text-red-400 text-center">
                      ❌ Algo ha fallado. Inténtalo de nuevo.
                    </p>
                  )}

                </motion.form>
              )}
            </AnimatePresence>

          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default BandaSonora