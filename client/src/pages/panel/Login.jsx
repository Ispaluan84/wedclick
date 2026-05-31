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

  const inputStyle = {
    width: '100%',
    paddingLeft: '2.75rem',
    paddingRight: '1rem',
    paddingTop: '0.9rem',
    paddingBottom: '0.9rem',
    border: '1px solid #E8D5B0',
    background: '#F7F2EB',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.9rem',
    color: '#1A1410',
    outline: 'none',
    boxSizing: 'border-box',
    borderRadius: 0,
    transition: 'border-color 0.3s',
  }

  return (
    <>
      <SEO noIndex={true} />
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400&display=swap');
      `}</style>

      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F7F2EB', cursor: 'auto' }}>

        {/* Barra superior */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 2rem' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#8B8177', textDecoration: 'none', fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            <ArrowLeft size={13} />
            Volver a la web
          </a>
          <img src="/Logo_WedClick.png" alt="WedClick" style={{ height: '2rem' }} />
        </div>

        {/* Centro */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            style={{ width: '100%', maxWidth: '400px' }}
          >
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <div style={{ width: '2.5rem', height: '1px', background: '#C9A96E' }} />
                <Heart size={15} style={{ color: '#C9A96E', margin: '0 0.75rem' }} fill="#C9A96E" />
                <div style={{ width: '2.5rem', height: '1px', background: '#C9A96E' }} />
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700, color: '#1A1410', marginBottom: '0.4rem', lineHeight: 1.1 }}>
                Panel de novios
              </h1>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '0.88rem', color: '#8B8177' }}>
                Accede para gestionar vuestra boda
              </p>
            </div>

            {/* Formulario */}
            <div style={{ background: '#FBF8F3', border: '1px solid #E8D5B0', padding: '2.5rem' }}>
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                <div>
                  <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8B8177', display: 'block', marginBottom: '0.5rem' }}>Email</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={14} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#C9A96E' }} />
                    <input
                      type="email" value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="elena@email.com" required style={inputStyle}
                      onFocus={e => e.target.style.borderColor = '#C9A96E'}
                      onBlur={e => e.target.style.borderColor = '#E8D5B0'}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8B8177', display: 'block', marginBottom: '0.5rem' }}>Contraseña</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={14} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#C9A96E' }} />
                    <input
                      type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••" required style={{ ...inputStyle, paddingRight: '3rem' }}
                      onFocus={e => e.target.style.borderColor = '#C9A96E'}
                      onBlur={e => e.target.style.borderColor = '#E8D5B0'}
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)}
                      style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#8B8177', padding: 0 }}>
                      {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', color: '#C4786A', textAlign: 'center', padding: '0.6rem', border: '1px solid rgba(196,120,106,0.2)', background: 'rgba(196,120,106,0.05)' }}>
                    {error}
                  </motion.p>
                )}

                <button type="submit" disabled={loading}
                  style={{ width: '100%', padding: '1rem', background: '#1A1410', color: '#F7F2EB', fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem', opacity: loading ? 0.6 : 1 }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#C9A96E' }}
                  onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#1A1410' }}
                >
                  {loading
                    ? <><div style={{ width: 14, height: 14, border: '1.5px solid rgba(247,242,235,0.3)', borderTopColor: '#F7F2EB', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />Accediendo...</>
                    : 'Acceder al panel'
                  }
                </button>
              </form>
            </div>

            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', color: '#8B8177', textAlign: 'center', marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
              Hecho con <Heart size={10} style={{ color: '#C9A96E' }} fill="#C9A96E" /> en Sevilla
            </p>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Login
