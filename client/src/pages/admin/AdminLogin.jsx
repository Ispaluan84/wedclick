import SEO from '../../components/SEO'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Mail, Lock, Eye, EyeOff, Shield, ArrowLeft } from 'lucide-react'

function AdminLogin() {
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
      const { data: authData, error: authError } = await supabase.auth
        .signInWithPassword({ email, password })
      if (authError) { setError('Email o contraseña incorrectos'); setLoading(false); return }

      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('id, rol')
        .eq('id', authData.user.id)

      if (adminError || !adminData || adminData.length === 0) {
        await supabase.auth.signOut()
        setError('No tienes permisos de administrador')
        setLoading(false)
        return
      }
      navigate('/admin/dashboard')
    } catch (err) {
      console.error('Error:', err)
      setError('Ha ocurrido un error. Inténtalo de nuevo.')
      setLoading(false)
    }
  }

  return (
    <>
      <SEO noIndex={true} />

      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#1A1410' }}>

        {/* Barra superior */}
        <div className="flex items-center justify-between px-8 py-6">
          <a
            href="/"
            className="flex items-center gap-2 group"
            style={{ color: '#8B8177', textDecoration: 'none' }}
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform duration-300"
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

          <img src="/Logo_WedClick.png" alt="WedClick" style={{ height: '2rem', opacity: 0.7 }} />
        </div>

        {/* Contenido central */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            style={{ width: '100%', maxWidth: '420px' }}
          >

            {/* Header */}
            <div className="text-center mb-10">
              {/* Badge admin */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1.25rem',
                border: '1px solid rgba(201,169,110,0.3)',
                marginBottom: '1.5rem',
              }}>
                <Shield size={13} style={{ color: '#C9A96E' }} />
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.6rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#C9A96E',
                }}>
                  Panel Administrador
                </span>
              </div>

              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                fontWeight: 700,
                color: '#F7F2EB',
                marginBottom: '0.5rem',
                lineHeight: 1.1,
              }}>
                Acceso restringido
              </h1>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: '0.88rem',
                color: '#8B8177',
              }}>
                Solo para administradores de Wedclick
              </p>
            </div>

            {/* Card formulario — fondo paper sobre ink */}
            <div style={{
              background: '#FBF8F3',
              border: '1px solid #C9A96E30',
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
                      placeholder="admin@wedclick.es"
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

                {/* Botón — dorado para admin */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: loading ? '#8B8177' : '#C9A96E',
                    color: '#1A1410',
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
                    fontWeight: 500,
                  }}
                  onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = '#1A1410'; e.currentTarget.style.color = '#C9A96E' }}
                  onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = '#C9A96E'; e.currentTarget.style.color = '#1A1410' }}
                >
                  {loading ? (
                    <>
                      <div style={{
                        width: '14px', height: '14px',
                        border: '1.5px solid rgba(26,20,16,0.2)',
                        borderTopColor: '#1A1410',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite',
                      }} />
                      Verificando...
                    </>
                  ) : (
                    <>
                      <Shield size={13} />
                      Acceder al panel
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Nota discreta */}
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.6rem',
              color: '#8B8177',
              textAlign: 'center',
              marginTop: '2rem',
              letterSpacing: '0.08em',
            }}>
              Acceso restringido · Wedclick © {new Date().getFullYear()}
            </p>

          </motion.div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  )
}

export default AdminLogin
