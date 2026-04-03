import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Download, Filter, CheckCircle2, XCircle, BusFront, Car } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import PanelLayout from '../../components/panel/PanelLayout'

function Confirmaciones() {
  const navigate = useNavigate()
  const [boda, setBoda] = useState(null)
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [filterAsistencia, setFilterAsistencia] = useState('todas')
  const [filterTransporte, setFilterTransporte] = useState('todos')
  const [filterAlergenos, setFilterAlergenos] = useState('todos')

  // Cargar boda y datos
  useEffect(() => {
    const loadData = async () => {
      const { data: authData } = await supabase.auth.getUser()
      if (!authData?.user) {
        navigate('/panel')
        return
      }

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

      const { data: confData } = await supabase
        .from('confirmaciones')
        .select('*')
        .eq('boda_id', bodaData.id)
        .order('created_at', { ascending: true })

      if (confData) setRows(confData)
      setLoading(false)
    }

    loadData()
  }, [navigate])

  // Filtrado
  const filteredRows = useMemo(() => {
    return rows.filter(row => {
      const text = `${row.nombre || ''} ${row.email || ''}`.toLowerCase()
      if (search && !text.includes(search.toLowerCase())) return false

      if (filterAsistencia === 'si' && row.asistencia !== 'si') return false
      if (filterAsistencia === 'no' && row.asistencia !== 'no') return false

      if (filterTransporte === 'bus' && row.transporte !== 'bus') return false
      if (filterTransporte === 'coche' && row.transporte !== 'coche') return false

      if (filterAlergenos === 'con') {
        const has = row.alergenos && row.alergenos.trim() !== '' && row.alergenos.trim().toLowerCase() !== 'ninguno'
        if (!has) return false
      }

      return true
    })
  }, [rows, search, filterAsistencia, filterTransporte, filterAlergenos])

  const handleExport = () => {
    window.print()
  }

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
              Confirmaciones
            </h1>
            <p className="font-sans text-sm text-gray-500 dark:text-gray-400 mt-1">
              Listado completo de invitados y sus respuestas
            </p>
          </div>

          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900
                       text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100
                       transition-colors print:hidden"
          >
            <Download size={16} />
            Exportar / Imprimir
          </button>
        </div>

        {/* Filtros */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 
                        flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between print:hidden">
          
          {/* Buscador */}
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700
                         rounded-lg pl-9 pr-4 py-2 text-sm font-sans text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                         placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          </div>

          {/* Selectores */}
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <Filter size={14} />
              Filtros:
            </div>

            <select
              value={filterAsistencia}
              onChange={(e) => setFilterAsistencia(e.target.value)}
              className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700
                         rounded-lg px-3 py-1.5 text-sm font-sans text-gray-700 dark:text-gray-200
                         focus:outline-none focus:border-blue-500"
            >
              <option value="todas">Todas las asistencias</option>
              <option value="si">Solo confirmados</option>
              <option value="no">Solo no asisten</option>
            </select>

            <select
              value={filterTransporte}
              onChange={(e) => setFilterTransporte(e.target.value)}
              className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700
                         rounded-lg px-3 py-1.5 text-sm font-sans text-gray-700 dark:text-gray-200
                         focus:outline-none focus:border-blue-500"
            >
              <option value="todos">Todos los transportes</option>
              <option value="bus">Solo bus</option>
              <option value="coche">Solo coche</option>
            </select>

            <select
              value={filterAlergenos}
              onChange={(e) => setFilterAlergenos(e.target.value)}
              className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700
                         rounded-lg px-3 py-1.5 text-sm font-sans text-gray-700 dark:text-gray-200
                         focus:outline-none focus:border-blue-500"
            >
              <option value="todos">Con y sin alérgenos</option>
              <option value="con">Solo con alérgenos</option>
            </select>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {filteredRows.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-sans text-sm text-gray-500 dark:text-gray-400">
                No hay resultados que coincidan con los filtros actuales.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-900/50 sticky top-0">
                  <tr>
                    <th className="text-left px-4 py-3 font-sans text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Nombre
                    </th>
                    <th className="text-left px-4 py-3 font-sans text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Email
                    </th>
                    <th className="text-left px-4 py-3 font-sans text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Asistencia
                    </th>
                    <th className="text-left px-4 py-3 font-sans text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Transporte
                    </th>
                    <th className="text-left px-4 py-3 font-sans text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Bus Ida
                    </th>
                    <th className="text-left px-4 py-3 font-sans text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Bus Vuelta
                    </th>
                    <th className="text-left px-4 py-3 font-sans text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Alérgenos
                    </th>
                    <th className="text-left px-4 py-3 font-sans text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Mensaje
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {filteredRows.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="px-4 py-3 font-sans text-gray-900 dark:text-white font-medium">
                        {row.nombre || '-'}
                      </td>
                      <td className="px-4 py-3 font-sans text-gray-500 dark:text-gray-400">
                        {row.email || '-'}
                      </td>
                      <td className="px-4 py-3">
                        {row.asistencia === 'si' && (
                          <span className="inline-flex items-center gap-1.5 text-green-600 dark:text-green-400">
                            <CheckCircle2 size={14} />
                            <span className="text-xs font-medium">Sí</span>
                          </span>
                        )}
                        {row.asistencia === 'no' && (
                          <span className="inline-flex items-center gap-1.5 text-red-500 dark:text-red-400">
                            <XCircle size={14} />
                            <span className="text-xs font-medium">No</span>
                          </span>
                        )}
                        {!row.asistencia && <span className="text-gray-400">-</span>}
                      </td>
                      <td className="px-4 py-3">
                        {row.transporte === 'bus' && (
                          <span className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                            <BusFront size={14} />
                            <span className="text-xs">Bus</span>
                          </span>
                        )}
                        {row.transporte === 'coche' && (
                          <span className="inline-flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                            <Car size={14} />
                            <span className="text-xs">Coche</span>
                          </span>
                        )}
                        {!row.transporte && <span className="text-gray-400">-</span>}
                      </td>
                      <td className="px-4 py-3 font-sans text-gray-600 dark:text-gray-300">
                        {row.bus_ida || '-'}
                      </td>
                      <td className="px-4 py-3 font-sans text-gray-600 dark:text-gray-300">
                        {row.bus_vuelta || '-'}
                      </td>
                      <td className="px-4 py-3 font-sans text-gray-600 dark:text-gray-300 max-w-xs truncate">
                        {row.alergenos || '-'}
                      </td>
                      <td className="px-4 py-3 font-sans text-gray-500 dark:text-gray-400 max-w-xs truncate italic">
                        {row.mensaje || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Resultado */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 print:hidden">
          <p>
            Mostrando {filteredRows.length} de {rows.length} registros
          </p>
        </div>

      </div>
    </PanelLayout>
  )
}

export default Confirmaciones