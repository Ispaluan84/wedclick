import SEO from '../../components/SEO'
import { useEffect, useState } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import {
  LayoutDashboard, Users, ShoppingBag,
  TrendingUp, LogOut, Menu, X,
  Shield, Bell, ChevronRight, ScanLine, Wand2
} from 'lucide-react'

const navLinks = [
  {
    href:  '/admin/dashboard',
    label: 'Inicio',
    icono: LayoutDashboard,
  },
  {
    href: '/admin/constructor',
    label: 'Constructor',
    icono: Wand2
  },
  {
    href:  '/admin/ordenes',
    label: 'Órdenes',
    icono: ShoppingBag,
  },
  {
    href:  '/admin/clientes',
    label: 'Clientes',
    icono: Users,
  },
  {
    href: '/admin/invitados',
    label: 'Invitados',
    iconos: ScanLine,
  },
  {
    href:  '/admin/estadisticas',
    label: 'Estadísticas',
    icono: TrendingUp,
  },
]

function AdminDashboard() {
  const navigate  = useNavigate()
  const location  = useLocation()

  const [admin, setAdmin]         = useState(null)
  const [loading, setLoading]     = useState(true)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        navigate('/admin')
        return
      }

  // Verificar que es admin
const { data: adminData, error } = await supabase
  .from('admin_users')
  .select('*')
  .eq('id', session.user.id)

console.log('Admin check:', adminData, error)

if (error || !adminData || adminData.length === 0) {
  await supabase.auth.signOut()
  navigate('/admin')
  return
}

      setAdmin(adminData[0])
      setLoading(false)
    }

    checkAdmin()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) navigate('/admin')
      }
    )

    return () => subscription.unsubscribe()
  }, [navigate])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-crema flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-azul-oscuro/20
                          border-t-azul-oscuro rounded-full animate-spin" />
          <p className="font-sans text-sm text-marron">Verificando acceso...</p>
        </div>
      </div>
    )
  }

  return (
    <>
    <SEO noIndex={true} />
    <div className="min-h-screen bg-crema flex">

      {/* ── Sidebar Desktop ── */}
      <aside className="hidden md:flex flex-col w-64 bg-azul-oscuro
                        min-h-screen fixed left-0 top-0 z-40">

        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <img
            src="/Logo_WedClick.png"
            alt="WedClick"
            className="h-10 brightness-0 invert mb-3"
            />
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full
                          bg-white/10 border border-white/10 w-fit">
            <Shield size={12} className="text-tierra" />
            <span className="font-sans text-xs text-crema/70 tracking-widest uppercase">
              Admin
            </span>
          </div>
        </div>

        {/* Info admin */}
        {admin && (
          <div className="p-4 mx-4 mt-4 rounded-2xl bg-white/10
          border border-white/10">
            <p className="font-sans text-sm text-crema font-medium truncate">
              {admin.nombre || admin.email}
            </p>
            <p className="font-sans text-xs text-crema/50 truncate">
              {admin.email}
            </p>
          </div>
        )}

        {/* Navegación */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
          {navLinks.map((link) => {
            const Icono  = link.icono || 'span'
            const activo = location.pathname === link.href
            
            return (
              <button
              key={link.href}
              onClick={() => navigate(link.href)}
              className={`w-full flex items-center gap-3 px-4 py-3
                rounded-xl font-sans text-sm transition-all
                ${activo
                  ? 'bg-white/15 text-crema font-medium'
                  : 'text-crema/60 hover:bg-white/10 hover:text-crema'
                }`}
                >
                <Icono size={18} />
                {link.label}
                {activo && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-tierra" />
                )}
              </button>
            )
          })}
        </nav>

        {/* Volver a landing */}
        <div className="px-4 pb-2">
          <button
            onClick={() => navigate('/landing')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
            text-crema/40 hover:bg-white/10 hover:text-crema
            font-sans text-xs transition-all"
            >
            <ChevronRight size={14} className="rotate-180" />
            Volver a la web
          </button>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
            text-crema/60 hover:bg-white/10 hover:text-crema
            font-sans text-sm transition-all"
            >
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* ── Mobile Header ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50
                      bg-azul-oscuro px-4 py-3
                      flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/Logo_WedClick.png"
            alt="WedClick"
            className="h-8 brightness-0 invert"
            />
          <span className="font-sans text-xs text-crema/50 uppercase tracking-widest">
            Admin
          </span>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-crema"
          type="button"
          >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
          initial={{ opacity: 0, x: -280 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -280 }}
          transition={{ duration: 0.3 }}
          className="md:hidden fixed inset-0 z-40 bg-azul-oscuro pt-16"
          >
            <div className="p-4 flex flex-col gap-2 h-full">
              {admin && (
                <div className="p-4 rounded-2xl bg-white/10
                border border-white/10 mb-4">
                  <p className="font-sans text-sm text-crema">
                    {admin.nombre || admin.email}
                  </p>
                  <p className="font-sans text-xs text-crema/50">
                    {admin.email}
                  </p>
                </div>
              )}

              {navLinks.map((link) => {
                const Icono  = link.icono
                const activo = location.pathname === link.href

                return (
                  <button
                  key={link.href}
                  onClick={() => {
                    navigate(link.href)
                    setMenuOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3
                    rounded-xl font-sans text-sm transition-all
                    ${activo
                      ? 'bg-white/15 text-crema font-medium'
                      : 'text-crema/60 hover:bg-white/10 hover:text-crema'
                    }`}
                    >
                    <Icono size={18} />
                    {link.label}
                  </button>
                )
              })}

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3
                           rounded-xl text-crema/60 hover:bg-white/10
                           hover:text-crema font-sans text-sm transition-all
                           mt-auto border-t border-white/10 pt-4"
                           >
                <LogOut size={18} />
                Cerrar sesión
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Contenido principal ── */}
      <main className="flex-1 md:ml-64 pt-16 md:pt-0 min-h-screen">
        <Outlet context={{ admin }} />
      </main>
    </div>
    </>
  )
}

export default AdminDashboard