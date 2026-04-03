import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'

const FORMSPREE_URL = 'https://formspree.io/f/mbdzrzby' // Puedes crear uno específico si quieres

function ComingSoon() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          tipo: 'Lista de espera - Coming Soon'
        }),
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F4EE] flex items-center justify-center overflow-hidden relative">

      {/* Fondo decorativo suave */}
      <div className="absolute inset-0 bg-[radial-gradient(at_center,#6A8DAD08_0%,transparent_60%)]" />

      <div className="relative z-10 max-w-xl mx-auto px-6 text-center">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <img
            src="/Logo_WedClick.png"
            alt="WedClick"
            className="h-21 mx-auto"
          />
        </motion.div>

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-serif text-5xl md:text-6xl leading-tight text-slateGray mb-6"
        >
          Una nueva forma
          <br />
          de comenzar una historia
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-sans text-lg text-gray-500 max-w-md mx-auto leading-relaxed mb-10"
        >
          Estamos preparando algo especial para las parejas que quieren 
          que su invitación de boda sea tan única como su historia.
        </motion.p>

        {/* Formulario */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="max-w-md mx-auto"
        >
          {status === 'success' ? (
            <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
              <CheckCircle size={48} className="mx-auto text-goldAccent mb-6" />
              <p className="font-serif text-2xl text-slateGray mb-2">
                Gracias
              </p>
              <p className="font-sans text-gray-500">
                Serás de los primeros en saber cuando lancemos.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu correo electrónico"
                  required
                  className="flex-1 bg-white border border-gray-200 rounded-2xl px-6 py-4
                             text-slateGray placeholder:text-gray-400 focus:outline-none
                             focus:border-goldAccent transition-all"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-slateGray hover:bg-gray-800 text-white font-medium px-8 py-4 
                             rounded-2xl flex items-center justify-center gap-2 transition-all
                             whitespace-nowrap"
                >
                  {status === 'loading' ? 'Enviando...' : 'Quiero ser de los primeros'}
                  <ArrowRight size={18} />
                </button>
              </div>

              <p className="text-xs text-gray-400 mt-3">
                Solo te escribiremos cuando lancemos. Sin spam.
              </p>
            </form>
          )}
        </motion.div>

        {/* Contacto */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-16 text-sm text-gray-400"
        >
          ¿Quieres hablar con nosotros antes?{' '}
          <a
            href="https://wa.me/34627147039"
            target="_blank"
            className="text-goldAccent hover:underline font-medium"
          >
            Escríbenos por WhatsApp
          </a>
        </motion.div>

      </div>
    </div>
  )
}

export default ComingSoon