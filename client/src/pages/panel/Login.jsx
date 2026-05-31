import SEO from '../../components/SEO'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Mail, Lock, Eye, EyeOff, Heart, ArrowLeft } from 'lucide-react'

function Login() {
  const navigate  = useNavigate()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
      if (authError) { setError('Email o contraseña incorrectos'); setLoading(false); return }
      navigate('/panel/dashboard')
    } catch {
      setError('Ha ocurrido un error. Inténtalo de nuevo.')
      setLoading(false)
    }
  }

  return (
    <>
      <SEO noIndex={true} />

      {/* Fondo con textura sutil */}
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F7F2EB' }}>

        {/* Barra superior con navegación */}
        <div className="flex items-center justify-between px-8 py-6">
          <a
            href="/"
            className="flex items-center gap-2 group"
            style={{ color: '#8B8177', textDecoration: 'none' }}
          >
            <ArrowLeft
              size={14}
              style={{ transition: 'transform 0.3s' }}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}>
              Volver a la web
            </span>
          </a>

          <img src="/Logo_WedClick.png" alt="WedClick" style={{ height: '2rem' }} />
        </div>

        {/* Ornamento central */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            style={{ width: '100%', maxWidth: '420px' }}
          >

            {/* Header */}
            <div className="text-center mb-10">
              {/* Icono decorativo */}
              <div className="flex items-center justify-center mb-6">
                <div style={{
                  width: '3rem', height: '1px',
                  background: '#C9A96E', display: 'inline-block',
                }} />
                <Heart
                  size={16}
                  style={{ color: '#C9A96E', margin: '0 0.75rem' }}
                  fill="#C9A96E"
                />
                <div style={{
                  width: '3rem', height: '1px',
                  background: '#C9A96E', display: 'inline-block',
                }} />
              </div>

              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                fontWeight: 700,
                color: '#1A1410',
                marginBottom: '0.5rem',
                lineHeight: 1.1,
              }}>
                Panel de novios
              </h1>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: '0.88rem',
                color: '#8B8177',
              }}>
                Accede para gestionar vuestra boda
              </p>
            </div>

            {/* Card formulario */}
            <div style={{
              background: '#FBF8F3',
              border: '1px solid #E8D5B0',
              padding: '2.5rem',
            }}>
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                {/* Email */}
                <div>
                  <label style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.6rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#8B8177',
                    display: 'block',
                    marginBottom: '0.6rem',
                  }}>
                    Email
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={15} style={{
                      position: 'absolute', left: '1rem',
                      top: '50%', transform: 'translateY(-50%)',
                      color: '#C9A96E',
                    }} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="elena@email.com"
                      required
                      style={{
                        width: '100%',
                        paddingLeft: '2.75rem',
                        paddingRight: '1rem',
                        paddingTop: '0.85rem',
                        paddingBottom: '0.85rem',
                        border: '1px solid #E8D5B0',
                        background: '#F7F2EB',
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.88rem',
                        color: '#1A1410',
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.3s',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#C9A96E'}
                      onBlur={(e) => e.target.style.borderColor = '#E8D5B0'}
                    />
                  </div>
                </div>

                {/* Contraseña */}
                <div>
                  <label style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.6rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#8B8177',
                    display: 'block',
                    marginBottom: '0.6rem',
                  }}>
                    Contraseña
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={15} style={{
                      position: 'absolute', left: '1rem',
                      top: '50%', transform: 'translateY(-50%)',
                      color: '#C9A96E',
                    }} />
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      style={{
                        width: '100%',
                        paddingLeft: '2.75rem',
                        paddingRight: '3rem',
                        paddingTop: '0.85rem',
                        paddingBottom: '0.85rem',
                        border: '1px solid #E8D5B0',
                        background: '#F7F2EB',
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.88rem',
                        color: '#1A1410',
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.3s',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#C9A96E'}
                      onBlur={(e) => e.target.style.borderColor = '#E8D5B0'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      style={{
                        position: 'absolute', right: '1rem',
                        top: '50%', transform: 'translateY(-50%)',
                        color: '#8B8177', background: 'none', border: 'none',
                        cursor: 'pointer', padding: 0,
                      }}
                    >
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.78rem',
                      color: '#C4786A',
                      textAlign: 'center',
                      padding: '0.6rem 1rem',
                      border: '1px solid #C4786A30',
                      background: '#C4786A08',
                    }}
                  >
                    {error}
                  </motion.p>
                )}

                {/* Botón submit */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: loading ? '#8B8177' : '#1A1410',
                    color: '#F7F2EB',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.65rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'background 0.3s',
                    marginTop: '0.5rem',
                  }}
                  onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = '#C9A96E' }}
                  onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = '#1A1410' }}
                >
                  {loading ? (
                    <>
                      <div style={{
                        width: '14px', height: '14px',
                        border: '1.5px solid rgba(247,242,235,0.3)',
                        borderTopColor: '#F7F2EB',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite',
                      }} />
                      Accediendo...
                    </>
                  ) : (
                    'Acceder al panel'
                  )}
                </button>
              </form>
            </div>

            {/* Footer */}
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.6rem',
              color: '#8B8177',
              textAlign: 'center',
              marginTop: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.3rem',
            }}>
              Hecho con <Heart size={10} style={{ color: '#C9A96E' }} fill="#C9A96E" /> en Sevilla
            </p>

          </motion.div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  )
}

export default Login
