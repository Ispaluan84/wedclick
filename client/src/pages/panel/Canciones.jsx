import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import {
  Music, Search, Disc3, User,
  Clock, AlertCircle, Heart
} from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
})

function Canciones() {
  const { boda } = useOutletContext()

  const [canciones, setCanciones] = useState([])
  const [filtradas, setFiltradas] = useState([])
  const [loading, setLoading]     = useState(true)
  const [busqueda, setBusqueda]   = useState('')

  useEffect(() => {
    if (!boda?.id) return
    cargarCanciones()
  }, [boda])

  useEffect(() => {
    if (!busqueda.trim()) {
      setFiltradas(canciones)
      return
    }
    const term = busqueda.toLowerCase()
    setFiltradas(
      canciones.filter(
        (c) =>
          c.cancion?.toLowerCase().includes(term) ||
          c.artista?.toLowerCase().includes(term) ||
          c.invitado?.toLowerCase().includes(term)
      )
    )
  }, [canciones, busqueda])

  const cargarCanciones = async () => {
    try {
      const { data } = await supabase
        .from('canciones')
        .select('*')
        .eq('boda_id', boda.id)
        .order('created_at', { ascending: false })

      if (data) {
        setCanciones(data)
        setFiltradas(data)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-azul-oscuro/20
                        border-t-azul-oscuro rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">

      {/* Header */}
      <motion.div {...fadeUp(0)} className="mb-8">
        <h1 className="font-serif text-3xl text-azul-oscuro mb-1">
          Playlist de la boda
        </h1>
        <p className="font-sans text-sm text-marron/60">
          Canciones sugeridas por vuestros invitados
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div {...fadeUp(0.05)} className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-beige-claro">
          <div className="w-10 h-10 rounded-xl bg-azul-oscuro/10
                          flex items-center justify-center mb-3">
            <Music size={20} className="text-azul-oscuro" />
          </div>
          <p className="font-serif text-3xl text-azul-oscuro font-bold mb-1">
            {canciones.length}
          </p>
          <p className="font-sans text-sm text-marron/60">
            Canciones sugeridas
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-beige-claro">
          <div className="w-10 h-10 rounded-xl bg-verde-suave/10
                          flex items-center justify-center mb-3">
            <User size={20} className="text-verde-suave" />
          </div>
          <p className="font-serif text-3xl text-verde-suave font-bold mb-1">
            {new Set(canciones.map((c) => c.invitado)).size}
          </p>
          <p className="font-sans text-sm text-marron/60">
            Invitados participaron
          </p>
        </div>
      </motion.div>

      {/* Búsqueda */}
      <motion.div {...fadeUp(0.1)} className="mb-6">
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2
                                       -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por canción, artista o invitado..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-beige-claro
                       bg-white font-sans text-sm text-azul-oscuro
                       placeholder:text-gray-300
                       focus:outline-none focus:ring-2 focus:ring-azul-oscuro/20
                       focus:border-azul-oscuro transition-all"
          />
        </div>
      </motion.div>

      {/* Lista de canciones */}
      <motion.div {...fadeUp(0.15)} className="flex flex-col gap-3">
        {filtradas.length === 0 ? (
          <div className="text-center py-12">
            <Music size={40} className="text-beige-claro mx-auto mb-3" />
            <p className="font-sans text-sm text-marron/60">
              {busqueda
                ? 'No hay resultados para esta búsqueda'
                : 'Aún no hay canciones sugeridas'
              }
            </p>
          </div>
        ) : (
          filtradas.map((cancion, index) => (
            <motion.div
              key={cancion.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              className="bg-white rounded-2xl p-4 shadow-sm border border-beige-claro
                         flex items-center gap-4"
            >
              {/* Número */}
              <span className="font-sans text-sm text-marron/30 w-6
                               text-right flex-shrink-0">
                {index + 1}
              </span>

              {/* Icono disco */}
              <div className="w-10 h-10 rounded-full bg-azul-oscuro/10
                              flex items-center justify-center flex-shrink-0">
                <Disc3 size={18} className="text-azul-oscuro" />
              </div>

              {/* Info canción */}
              <div className="flex-1 min-w-0">
                <p className="font-sans text-sm text-azul-oscuro font-medium truncate">
                  {cancion.cancion}
                </p>
                <p className="font-sans text-xs text-marron/60 truncate">
                  {cancion.artista}
                </p>
              </div>

              {/* Invitado */}
              <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
                <User size={12} className="text-verde-suave" />
                <span className="font-sans text-xs text-verde-suave">
                  {cancion.invitado}
                </span>
              </div>

              {/* Fecha */}
              <div className="hidden md:flex items-center gap-1.5 flex-shrink-0">
                <Clock size={12} className="text-marron/30" />
                <span className="font-sans text-xs text-marron/40">
                  {new Date(cancion.created_at).toLocaleDateString('es-ES')}
                </span>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Total */}
      {filtradas.length > 0 && (
        <motion.p {...fadeUp(0.3)} className="text-center font-sans text-xs
                                               text-marron/40 mt-6">
          {filtradas.length} de {canciones.length} canciones
        </motion.p>
      )}

    </div>
  )
}

export default Canciones