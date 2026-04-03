import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { supabase } from '../../lib/supabase'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})

function Login() {
  const [formData, setFormData] = useState({
    email:    '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus]             = useState('idle') // idle | loading | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    const { error } = await supabase.auth.signInWithPassword({
      email:    formData.email,
      password: formData.password,
    })

    if (error) {
      setStatus('error')
    } else {
      setStatus('idle')
      window.location.href = '/panel/dashboard'
    }
  }

  return (
    <div className="min-h-screen bg-warmWhite flex items-center justify-center px-6">

      {/* Elementos decorativos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-blueWillow opacity-[0.06]" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-goldAccent opacity-[0.06]" />
      </div>

      <div className="relative w-full max-w-md">

        {/* Logo */}
        <motion.div {...fadeUp(0)} className="text-center mb-10">
          <a href="/" className="inline-block">
            <span className="font-serif text-3xl font-bold text-blueWillow">
              Wed<span className="text-goldAccent">Click</span>
            </span>
          </a>
          <p className="font-sans text-sm text-gray-400 mt-2">
            Panel de gestión
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          {...fadeUp(0.1)}
          className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
        >

          {/* Encabezado */}
          <div className="flex flex-col gap-2 mb-8">
            <h1 className="font-serif text-2xl text-slateGray">
              Bienvenidos
            </h1>
            <p className="font-sans font-light text-sm text-gray-400">
              Accede con vuestro email y contraseña
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="font-sans text-xs text-gray-400 tracking-wide uppercase flex items-center gap-2">
                <Mail size={12} />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="vuestro@email.com"
                className="font-sans text-sm text-slateGray bg-warmWhite
                           border border-gray-200 rounded-xl px-4 py-3
                           focus:outline-none focus:border-blueWillow
                           transition-colors duration-200 placeholder:text-gray-300"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="font-sans text-xs text-gray-400 tracking-wide uppercase flex items-center gap-2">
                <Lock size={12} />
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full font-sans text-sm text-slateGray bg-warmWhite
                             border border-gray-200 rounded-xl px-4 py-3
                             focus:outline-none focus:border-blueWillow
                             transition-colors duration-200 placeholder:text-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2
                             text-gray-400 hover:text-slateGray transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-sans text-sm text-red-400 text-center"
              >
                ❌ Email o contraseña incorrectos
              </motion.p>
            )}

            {/* Botón */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary mt-2 flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Accediendo...
                </>
              ) : (
                'Acceder al panel'
              )}
            </button>

          </form>

        </motion.div>

        {/* Nota */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-center font-sans text-xs text-gray-300 mt-6"
        >
          ¿Problemas para acceder? Contacta con{' '}
          <a
            href="mailto:contacto@wedclick.es"
            className="text-blueWillow hover:underline"
          >
            WedClick
          </a>
        </motion.p>

      </div>
    </div>
  )
}

export default Login