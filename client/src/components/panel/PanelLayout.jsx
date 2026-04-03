import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Sun, Moon, LogOut, LayoutDashboard, CheckSquare, Music } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { supabase } from '../../lib/supabase'

const tabs = [
  { id: 'dashboard',     label: 'Dashboard',     icon: LayoutDashboard, path: '/panel/dashboard' },
  { id: 'confirmaciones', label: 'Confirmaciones', icon: CheckSquare,    path: '/panel/confirmaciones' },
  { id: 'canciones',     label: 'Canciones',     icon: Music,          path: '/panel/canciones' },
]

function PanelLayout({ children, boda }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const [loggingOut, setLoggingOut] = useState(false)

  const activeTab = tabs.find(t => location.pathname === t.path)?.id || 'dashboard'

  const handleLogout = async () => {
    setLoggingOut(true)
    await supabase.auth.signOut()
    navigate('/panel')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo + Boda */}
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center">
              <img src="/Logo_WedClick.png" alt="WedClick" className={`h-12 object-contain transition-all duration-300 ${ theme === 'dark' ? 'brightness-0 invert' : '' }`} />
            </a>
            <div className="hidden sm:block w-px h-6 bg-gray-200 dark:bg-gray-700" />
            <div className="hidden sm:flex flex-col">
              <span className="font-sans text-sm font-medium text-gray-900 dark:text-white">
                {boda?.nombre_pareja || 'Panel'}
              </span>
              <span className="font-sans text-xs text-gray-500 dark:text-gray-400">
                {boda?.fecha_boda
                  ? new Date(boda.fecha_boda).toLocaleDateString('es-ES', {
                      day: '2-digit', month: 'long', year: 'numeric'
                    })
                  : ''}
              </span>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700
                         text-gray-500 dark:text-gray-400 transition-colors"
              aria-label="Cambiar tema"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-2 px-3 py-2 rounded-lg
                         text-sm font-medium text-gray-600 dark:text-gray-300
                         hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Cerrar sesión</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => navigate(tab.path)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium
                              border-b-2 transition-colors whitespace-nowrap
                              ${isActive
                                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                              }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>

    </div>
  )
}

export default PanelLayout