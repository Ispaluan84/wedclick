import SEO from '../../components/SEO'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Mail, Lock, Eye, EyeOff, Heart } from 'lucide-react'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        setError('Email o contraseña incorrectos')
        setLoading(false)
        return
      }

      navigate('/panel/dashboard')

    } catch (err) {
      setError('Ha ocurrido un error. Inténtalo de nuevo.')
      setLoading(false)
    }
  }

  return (
    <>
      <SEO noIndex={true} />
    <div className="min-h-screen bg-crema flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
        >
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/Logo_WedClick.png"
            alt="WedClick"
            className="h-16 mx-auto mb-4"
            />
          <h1 className="font-serif text-2xl text-azul-oscuro mb-1">
            Panel de novios
          </h1>
          <p className="font-sans text-sm text-marron/60">
            Accede para gestionar vuestra boda
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-beige-claro">
          <form onSubmit={handleLogin} className="flex flex-col gap-5">

            {/* Email */}
            <div>
              <label className="font-sans text-xs text-marron tracking-wide
                               uppercase mb-1.5 block">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2
                                           -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="elena@email.com"
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-beige-claro
                  bg-crema/30 font-sans text-sm text-azul-oscuro
                  placeholder:text-gray-300
                  focus:outline-none focus:ring-2 focus:ring-azul-oscuro/20
                  focus:border-azul-oscuro transition-all"
                  />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <label className="font-sans text-xs text-marron tracking-wide
                               uppercase mb-1.5 block">
                Contraseña
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2
                                           -translate-y-1/2 text-gray-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-beige-claro
                  bg-crema/30 font-sans text-sm text-azul-oscuro
                  placeholder:text-gray-300
                  focus:outline-none focus:ring-2 focus:ring-azul-oscuro/20
                  focus:border-azul-oscuro transition-all"
                  />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2
                  text-gray-400 hover:text-azul-oscuro transition-colors"
                  >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-sans text-xs text-red-500 text-center
                           bg-red-50 py-2 px-4 rounded-xl"
                           >
                {error}
              </motion.p>
            )}

            {/* Botón */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-azul-oscuro text-crema
              font-sans font-semibold text-sm uppercase tracking-wide
              border border-beige-claro
              hover:bg-beige-claro hover:text-azul-oscuro
              transition-colors duration-300 shadow-md
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-2"
              >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-crema/30
                                  border-t-crema rounded-full animate-spin" />
                  Accediendo...
                </>
              ) : (
                'Acceder al panel'
              )}
            </button>
          </form>
        </div>

        <p className="font-sans text-xs text-marron/40 text-center mt-6
                      flex items-center justify-center gap-1">
          Hecho con <Heart size={10} className="text-tierra" fill="#CFC29B" /> en Sevilla
        </p>
      </motion.div>
    </div>
    </>
  )
}

export default Login