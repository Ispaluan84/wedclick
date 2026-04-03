import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Music, Search } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import PanelLayout from '../../components/panel/PanelLayout'


function Canciones() {
  const navigate = useNavigate()
  const [boda, setBoda] = useState(null)
  const [canciones, setCanciones] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const loadData = async () => {
      // 1. Verificar usuario
      const { data: authData } = await supabase.auth.getUser()
      if (!authData?.user) {
        navigate('/panel')
        return
      }

      // 2. Cargar boda
      const { data: bodaData } = await supabase
        .from('bodas')
        .select('*')
        .eq('user_id', authData.user.id)
        .single()

      if (!bodaData) {
        setLoading(false)
        return
      }
      setBoda(bodaData)

      // 3. Cargar canciones
      const { data: cancionesData } = await supabase
        .from('canciones')
        .select('*')
        .eq('boda_id', bodaData.id)
        .order('created_at', { ascending: false })

      if (cancionesData) setCanciones(cancionesData)
      setLoading(false)
    }

    loadData()
  }, [navigate])

  const filtered = useMemo(() => {
    if (!search) return canciones
    const term = search.toLowerCase()
    return canciones.filter(c =>
      c.cancion?.toLowerCase().includes(term) ||
      c.artista?.toLowerCase().includes(term) ||
      c.invitado?.toLowerCase().includes(term)
    )
  }, [canciones, search])

  if (loading || !boda) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-300 dark:border-gray-600 border-t-blue-600 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <PanelLayout boda={boda}>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl text-gray-900 dark:text-white">
              🎵 Banda Sonora
            </h1>
            <p className="font-sans text-sm text-gray-500 dark:text-gray-400 mt-1">
              Canciones propuestas por vuestros invitados
            </p>
          </div>

          {/* Buscador */}
          <div className="relative max-w-xs w-full">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar canción, artista o invitado..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                         rounded-lg pl-9 pr-4 py-2 text-sm font-sans text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                         placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <p className="font-sans text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Total canciones
            </p>
            <p className="font-serif text-2xl text-gray-900 dark:text-white mt-1">
              {canciones.length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <p className="font-sans text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Invitados únicos
            </p>
            <p className="font-serif text-2xl text-gray-900 dark:text-white mt-1">
              {new Set(canciones.map(c => c.invitado)).size}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <p className="font-sans text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Artistas distintos
            </p>
            <p className="font-serif text-2xl text-gray-900 dark:text-white mt-1">
              {new Set(canciones.map(c => c.artista)).size}
            </p>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <Music size={40} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <p className="font-sans text-sm text-gray-500 dark:text-gray-400">
                {canciones.length === 0
                  ? 'Aún no hay canciones propuestas'
                  : 'No hay resultados para tu búsqueda'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-900/50">
                  <tr>
                    <th className="text-left px-4 py-3 font-sans text-xs font-medium
                                   text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Invitado
                    </th>
                    <th className="text-left px-4 py-3 font-sans text-xs font-medium
                                   text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Canción
                    </th>
                    <th className="text-left px-4 py-3 font-sans text-xs font-medium
                                   text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Artista
                    </th>
                    <th className="text-left px-4 py-3 font-sans text-xs font-medium
                                   text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Fecha
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {filtered.map((c) => (
                    <tr
                      key={c.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="px-4 py-3 font-sans text-gray-700 dark:text-gray-200">
                        {c.invitado || '-'}
                      </td>
                      <td className="px-4 py-3 font-sans text-gray-900 dark:text-white font-medium">
                        {c.cancion || '-'}
                      </td>
                      <td className="px-4 py-3 font-sans text-gray-600 dark:text-gray-300">
                        {c.artista || '-'}
                      </td>
                      <td className="px-4 py-3 font-sans text-xs text-gray-400 dark:text-gray-500">
                        {new Date(c.created_at).toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </PanelLayout>
  )
}

export default Canciones