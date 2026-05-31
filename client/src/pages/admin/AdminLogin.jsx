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
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password })
      if (authError) { setError('Email o contraseña incorrectos'); setLoading(false); return }

      const { data: adminData, error: adminError } = await supabase
        .from('admin_users').select('id, rol').eq('id', authData.user.id)

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

  const inputStyle = {
    width: '100%',
    paddingLeft: '2.75rem',
    paddingRight: '1rem',
    paddingTop: '0.9rem',
    paddingBottom: '0.9rem',
    border: '1px solid #2A2520',
    background: '#1A1410',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.9rem',
    color: '#F7F2EB',
    outline: 'none',
    boxSizing: 'border-box',
    borderRadius: 0,
    transition: 'border-color 0.3s',
  }

  return (
    <>
      <SEO noIndex={true} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#1A1410', cursor: 'auto' }}>

        {/* Barra superior */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 2rem' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#8B8177', textDecoration: 'none', fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            <ArrowLeft size={13} />
            Volver a la web
          </a>
          <img src="/Logo_WedClick.png" alt="WedClick" style={{ height: '2rem', opacity: 0.5 }} />
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
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.25rem', border: '1px solid rgba(201,169,110,0.3)', marginBottom: '1.5rem' }}>
                <Shield size={13} style={{ color: '#C9A96E' }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9A96E' }}>
                  Panel Administrador
                </span>
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700, color: '#F7F2EB', marginBottom: '0.4rem', lineHeight: 1.1 }}>
                Acceso restringido
              </h1>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: '0.88rem', color: '#8B8177' }}>
                Solo para administradores de Wedclick
              </p>
            </div>

            {/* Formulario — fondo oscuro */}
            <div style={{ background: '#1A1410', border: '1px solid rgba(201,169,110,0.2)', padding: '2.5rem' }}>
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                <div>
                  <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8B8177', display: 'block', marginBottom: '0.5rem' }}>Email</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={14} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#C9A96E' }} />
                    <input
                      type="email" value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="admin@wedclick.es" required style={inputStyle}
                      onFocus={e => e.target.style.borderColor = '#C9A96E'}
                      onBlur={e => e.target.style.borderColor = '#2A2520'}
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
                      onBlur={e => e.target.style.borderColor = '#2A2520'}
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
                  style={{ width: '100%', padding: '1rem', background: '#C9A96E', color: '#1A1410', fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem', fontWeight: 500, opacity: loading ? 0.6 : 1 }}
                  onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = '#F7F2EB' } }}
                  onMouseLeave={e => { if (!loading) { e.currentTarget.style.background = '#C9A96E' } }}
                >
                  {loading
                    ? <><div style={{ width: 14, height: 14, border: '1.5px solid rgba(26,20,16,0.2)', borderTopColor: '#1A1410', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />Verificando...</>
                    : <><Shield size={13} />Acceder al panel</>
                  }
                </button>
              </form>
            </div>

            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', color: '#8B8177', textAlign: 'center', marginTop: '1.5rem', letterSpacing: '0.08em' }}>
              Acceso restringido · Wedclick © {new Date().getFullYear()}
            </p>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default AdminLogin
