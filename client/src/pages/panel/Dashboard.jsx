import SEO from '../../components/SEO'
import { useEffect, useState } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import {
  LayoutDashboard, Users, Music, Camera,
  LogOut, Menu, X, Heart, Calendar, Bell
} from 'lucide-react'

const navLinks = [
  {
    href:  '/panel/dashboard',
    label: 'Inicio',
    icono: LayoutDashboard,
  },
  {
    href:  '/panel/confirmaciones',
    label: 'Confirmaciones',
    icono: Users,
  },
  {
    href:  '/panel/canciones',
    label: 'Canciones',
    icono: Music,
  },
  {
    href:  '/panel/fotos',
    label: 'Álbum de fotos',
    icono: Camera,
  },
]

function Dashboard() {
  const navigate  = useNavigate()
  const location  = useLocation()

  const [user, setUser]               = useState(null)
  const [boda, setBoda]               = useState(null)
  const [loading, setLoading]         = useState(true)
  const [menuOpen, setMenuOpen]       = useState(false)
  const [notificaciones, setNotificaciones] = useState([])
  const [mostrarNotifs, setMostrarNotifs]   = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        navigate('/panel')
        return
      }

      setUser(session.user)

      // Obtener datos de la boda
      const { data: bodaData } = await supabase
        .from('bodas')
        .select('*')
        .eq('user_id', session.user.id)
        .single()

      if (bodaData) setBoda(bodaData)
      setLoading(false)
    }

    checkSession()

    // Escuchar cambios de sesión
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) navigate('/panel')
      }
    )

    return () => subscription.unsubscribe()
  }, [navigate])

  // Notificaciones en tiempo real
  useEffect(() => {
    if (!boda?.id) return

    const channel = supabase
      .channel(`confirmaciones-rt-${boda.id}`)
      .on(
        'postgres_changes',
        {
          event:  'INSERT',
          schema: 'public',
          table:  'confirmaciones',
          filter: `boda_id=eq.${boda.id}`,
        },
        (payload) => {
          const nueva = payload.new
          const asiste = nueva.asistencia === 'si'

          setNotificaciones((prev) => [
            {
              id:      nueva.id,
              mensaje: asiste
                ? `✅ ${nueva.nombre} ha confirmado su asistencia`
                : `❌ ${nueva.nombre} no podrá asistir`,
              tipo:    asiste ? 'confirmado' : 'rechazado',
              hora:    new Date().toLocaleTimeString('es-ES', {
                hour: '2-digit', minute: '2-digit'
              }),
            },
            ...prev.slice(0, 9), // máximo 10 notificaciones
          ])
        }
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [boda])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/panel')
  }

  const limpiarNotificaciones = () => {
    setNotificaciones([])
    setMostrarNotifs(false)
  }

  // Días para la boda
  const diasParaBoda = boda?.fecha_boda
    ? Math.ceil(
        (new Date(boda.fecha_boda) - new Date()) / (1000 * 60 * 60 * 24)
      )
    : null

  if (loading) {
    return (
      <div className="min-h-screen bg-crema flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-azul-oscuro/20
                          border-t-azul-oscuro rounded-full animate-spin" />
          <p className="font-sans text-sm text-marron">
            Cargando tu panel...
          </p>
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
            className="h-10 brightness-0 invert"
          />
        </div>

        {/* Info de la boda */}
        {boda && (
          <div className="p-4 mx-4 mt-4 rounded-2xl bg-white/10
                          border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Heart size={14} className="text-tierra" fill="#CFC29B" />
              <span className="font-serif text-sm text-crema truncate">
                {boda.nombre_pareja}
              </span>
            </div>
            {diasParaBoda !== null && (
              <div className="flex items-center gap-2">
                <Calendar size={12} className="text-crema/60 flex-shrink-0" />
                <span className="font-sans text-xs text-crema/60">
                  {diasParaBoda > 0
                    ? `${diasParaBoda} días para la boda`
                    : diasParaBoda === 0
                    ? '¡Hoy es el gran día! 🎉'
                    : 'Ya os habéis casado 🎊'
                  }
                </span>
              </div>
            )}
          </div>
        )}

        {/* Navegación */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
          {navLinks.map((link) => {
            const Icono  = link.icono
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

        {/* Footer sidebar */}
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
        <img
          src="/Logo_WedClick.png"
          alt="WedClick"
          className="h-8 brightness-0 invert"
          />

        <div className="flex items-center gap-3">
          {/* Campanita notificaciones mobile */}
          <button
            onClick={() => setMostrarNotifs(!mostrarNotifs)}
            className="relative text-crema"
            >
            <Bell size={20} />
            {notificaciones.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full
              bg-tierra text-white text-[10px] font-bold
              flex items-center justify-center">
                {notificaciones.length > 9 ? '9+' : notificaciones.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-crema"
            type="button"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
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

              {/* Info boda mobile */}
              {boda && (
                <div className="p-4 rounded-2xl bg-white/10
                border border-white/10 mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Heart size={14} className="text-tierra" fill="#CFC29B" />
                    <span className="font-serif text-sm text-crema">
                      {boda.nombre_pareja}
                    </span>
                  </div>
                  {diasParaBoda !== null && (
                    <span className="font-sans text-xs text-crema/60">
                      {diasParaBoda > 0
                        ? `${diasParaBoda} días para la boda`
                        : '¡Hoy es el gran día! 🎉'
                      }
                    </span>
                  )}
                </div>
              )}

              {/* Links */}
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

              {/* Logout mobile */}
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

      {/* ── Panel de notificaciones (desktop) ── */}
      <div className="hidden md:block fixed top-4 right-4 z-50">
        <div className="relative">

          {/* Campanita desktop */}
          <button
            onClick={() => setMostrarNotifs(!mostrarNotifs)}
            className="relative w-10 h-10 rounded-full bg-white shadow-sm
                       border border-beige-claro flex items-center
                       justify-center hover:bg-crema transition-colors"
                       >
            <Bell size={18} className="text-azul-oscuro" />
            {notificaciones.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full
              bg-tierra text-white text-[10px] font-bold
                               flex items-center justify-center">
                {notificaciones.length > 9 ? '9+' : notificaciones.length}
              </span>
            )}
          </button>

          {/* Dropdown notificaciones */}
          <AnimatePresence>
            {mostrarNotifs && (
              <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-12 w-80 bg-white rounded-2xl
              shadow-xl border border-beige-claro overflow-hidden"
              >
                {/* Header notificaciones */}
                <div className="flex items-center justify-between
                                px-4 py-3 border-b border-beige-claro">
                  <h4 className="font-sans text-sm font-medium text-azul-oscuro">
                    Notificaciones
                  </h4>
                  {notificaciones.length > 0 && (
                    <button
                    onClick={limpiarNotificaciones}
                      className="font-sans text-xs text-marron/60
                      hover:text-azul-oscuro transition-colors"
                      >
                      Limpiar todo
                    </button>
                  )}
                </div>

                {/* Lista notificaciones */}
                {notificaciones.length === 0 ? (
                  <div className="px-4 py-8 text-center">
                    <Bell size={24} className="text-beige-claro mx-auto mb-2" />
                    <p className="font-sans text-sm text-marron/60">
                      No hay notificaciones
                    </p>
                  </div>
                ) : (
                  <ul className="divide-y divide-beige-claro max-h-72 overflow-y-auto">
                    {notificaciones.map((notif) => (
                      <li
                      key={notif.id}
                      className="px-4 py-3 flex items-start gap-3"
                      >
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0
                                        ${notif.tipo === 'confirmado'
                                          ? 'bg-verde-suave'
                                          : 'bg-red-400'
                                        }`}
                                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-sans text-sm text-azul-oscuro">
                            {notif.mensaje}
                          </p>
                          <p className="font-sans text-xs text-marron/40 mt-0.5">
                            Hoy a las {notif.hora}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Contenido principal ── */}
      <main className="flex-1 md:ml-64 pt-16 md:pt-0 min-h-screen">
        <Outlet context={{ boda, user, diasParaBoda }} />
      </main>

    </div>
    </>
  )
}

export default Dashboard