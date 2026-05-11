import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import {
  Search, Filter, Users, CheckCircle,
  XCircle, Clock, ChevronDown, ChevronUp,
  Mail, Phone, Bus, AlertCircle, MessageSquare,
  Download
} from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
})

function ConfirmacionCard({ conf, index }) {
  const [expandida, setExpandida] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="bg-white rounded-2xl shadow-sm border border-beige-claro overflow-hidden"
    >
      {/* Cabecera */}
      <div
        className="px-6 py-4 flex items-center gap-4 cursor-pointer
                   hover:bg-crema/30 transition-colors"
        onClick={() => setExpandida(!expandida)}
      >
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-azul-oscuro/10
                        flex items-center justify-center flex-shrink-0">
          <span className="font-serif text-sm text-azul-oscuro font-bold">
            {conf.nombre?.charAt(0).toUpperCase()}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="font-sans text-sm text-azul-oscuro font-medium truncate">
            {conf.nombre}
          </p>
          <p className="font-sans text-xs text-marron/60 truncate">
            {conf.email}
          </p>
        </div>

        {/* Acompañantes */}
        {conf.acompanantes && parseInt(conf.acompanantes) > 0 && (
          <div className="hidden sm:flex items-center gap-1 flex-shrink-0">
            <Users size={12} className="text-marron/40" />
            <span className="font-sans text-xs text-marron/60">
              +{conf.acompanantes}
            </span>
          </div>
        )}

        {/* Estado */}
        <div className={`flex-shrink-0 px-3 py-1 rounded-full font-sans text-xs font-medium
                        ${conf.asistencia === 'si'
                          ? 'bg-verde-suave/10 text-verde-suave'
                          : conf.asistencia === 'no'
                          ? 'bg-red-100 text-red-500'
                          : 'bg-tierra/10 text-tierra'
                        }`}>
          {conf.asistencia === 'si'
            ? '✓ Asiste'
            : conf.asistencia === 'no'
            ? '✗ No asiste'
            : '? Pendiente'
          }
        </div>

        {/* Expandir */}
        <button className="flex-shrink-0 text-marron/40">
          {expandida
            ? <ChevronUp size={16} />
            : <ChevronDown size={16} />
          }
        </button>
      </div>

      {/* Detalle expandido */}
      <AnimatePresence>
        {expandida && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 border-t border-beige-claro">
              <div className="grid sm:grid-cols-2 gap-4">

                {conf.email && (
                  <div className="flex items-center gap-3">
                    <Mail size={14} className="text-marron/40 flex-shrink-0" />
                    <div>
                      <p className="font-sans text-xs text-marron/40 uppercase tracking-wide">
                        Email
                      </p>
                      <p className="font-sans text-sm text-azul-oscuro">
                        {conf.email}
                      </p>
                    </div>
                  </div>
                )}

                {conf.acompanantes && (
                  <div className="flex items-center gap-3">
                    <Users size={14} className="text-marron/40 flex-shrink-0" />
                    <div>
                      <p className="font-sans text-xs text-marron/40 uppercase tracking-wide">
                        Acompañantes
                      </p>
                      <p className="font-sans text-sm text-azul-oscuro">
                        {conf.acompanantes}
                      </p>
                    </div>
                  </div>
                )}

                {conf.transporte && (
                  <div className="flex items-center gap-3">
                    <Bus size={14} className="text-marron/40 flex-shrink-0" />
                    <div>
                      <p className="font-sans text-xs text-marron/40 uppercase tracking-wide">
                        Transporte
                      </p>
                      <p className="font-sans text-sm text-azul-oscuro">
                        {conf.transporte}
                        {conf.bus_ida && ` · Ida: ${conf.bus_ida}`}
                        {conf.bus_vuelta && ` · Vuelta: ${conf.bus_vuelta}`}
                      </p>
                    </div>
                  </div>
                )}

                {conf.alergenos && (
                  <div className="flex items-center gap-3">
                    <AlertCircle size={14} className="text-marron/40 flex-shrink-0" />
                    <div>
                      <p className="font-sans text-xs text-marron/40 uppercase tracking-wide">
                        Alérgenos
                      </p>
                      <p className="font-sans text-sm text-azul-oscuro">
                        {conf.alergenos}
                      </p>
                    </div>
                  </div>
                )}

                {conf.mensaje && (
                  <div className="flex items-start gap-3 sm:col-span-2">
                    <MessageSquare size={14} className="text-marron/40 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-sans text-xs text-marron/40 uppercase tracking-wide mb-1">
                        Mensaje
                      </p>
                      <p className="font-sans text-sm text-azul-oscuro italic">
                        "{conf.mensaje}"
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 sm:col-span-2">
                  <Clock size={14} className="text-marron/40 flex-shrink-0" />
                  <div>
                    <p className="font-sans text-xs text-marron/40 uppercase tracking-wide">
                      Fecha de confirmación
                    </p>
                    <p className="font-sans text-sm text-azul-oscuro">
                      {new Date(conf.created_at).toLocaleDateString('es-ES', {
                        day: 'numeric', month: 'long', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function Confirmaciones() {
  const { boda } = useOutletContext()

  const [confirmaciones, setConfirmaciones] = useState([])
  const [filtradas, setFiltradas]           = useState([])
  const [loading, setLoading]               = useState(true)
  const [busqueda, setBusqueda]             = useState('')
  const [filtro, setFiltro]                 = useState('todos')

  useEffect(() => {
    if (!boda?.id) return
    cargarConfirmaciones()
  }, [boda])

  useEffect(() => {
    let resultado = [...confirmaciones]

    // Filtro por asistencia
    if (filtro !== 'todos') {
      resultado = resultado.filter((c) => c.asistencia === filtro)
    }

    // Búsqueda por nombre o email
    if (busqueda.trim()) {
      const term = busqueda.toLowerCase()
      resultado = resultado.filter(
        (c) =>
          c.nombre?.toLowerCase().includes(term) ||
          c.email?.toLowerCase().includes(term)
      )
    }

    setFiltradas(resultado)
  }, [confirmaciones, filtro, busqueda])

  const cargarConfirmaciones = async () => {
    try {
      const { data } = await supabase
        .from('confirmaciones')
        .select('*')
        .eq('boda_id', boda.id)
        .order('created_at', { ascending: false })

      if (data) {
        setConfirmaciones(data)
        setFiltradas(data)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Estadísticas rápidas
  const confirmados  = confirmaciones.filter((c) => c.asistencia === 'si').length
  const rechazados   = confirmaciones.filter((c) => c.asistencia === 'no').length
  const pendientes   = confirmaciones.filter((c) => !c.asistencia || c.asistencia === 'pendiente').length
  const acompanantes = confirmaciones
    .filter((c) => c.asistencia === 'si')
    .reduce((acc, c) => acc + (parseInt(c.acompanantes) || 0), 0)

  // Exportar CSV
  const exportarCSV = () => {
    const headers = ['Nombre', 'Email', 'Asistencia', 'Acompañantes',
                     'Transporte', 'Bus ida', 'Bus vuelta', 'Alérgenos', 'Mensaje', 'Fecha']
    const rows = filtradas.map((c) => [
      c.nombre, c.email, c.asistencia, c.acompanantes,
      c.transporte, c.bus_ida, c.bus_vuelta, c.alergenos,
      c.mensaje, new Date(c.created_at).toLocaleDateString('es-ES')
    ])

    const csv = [headers, ...rows]
      .map((row) => row.map((v) => `"${v || ''}"`).join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `confirmaciones-${boda.nombre_pareja}.csv`
    a.click()
    URL.revokeObjectURL(url)
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
      <motion.div {...fadeUp(0)} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-azul-oscuro mb-1">
            Confirmaciones
          </h1>
          <p className="font-sans text-sm text-marron/60">
            Gestiona las respuestas de vuestros invitados
          </p>
        </div>
        <button
          onClick={exportarCSV}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                     bg-azul-oscuro text-crema font-sans text-sm
                     border border-beige-claro
                     hover:bg-beige-claro hover:text-azul-oscuro
                     transition-colors shadow-sm"
        >
          <Download size={16} />
          <span className="hidden sm:block">Exportar CSV</span>
        </button>
      </motion.div>

      {/* Stats rápidas */}
      <motion.div {...fadeUp(0.05)} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Confirmados',    valor: confirmados,   color: 'bg-verde-suave/10 text-verde-suave', icono: CheckCircle },
          { label: 'No asisten',     valor: rechazados,    color: 'bg-red-100 text-red-500',            icono: XCircle    },
          { label: 'Pendientes',     valor: pendientes,    color: 'bg-tierra/10 text-tierra',           icono: Clock      },
          { label: 'Acompañantes',   valor: acompanantes,  color: 'bg-azul-oscuro/10 text-azul-oscuro', icono: Users      },
        ].map((stat) => {
          const Icono = stat.icono
          return (
            <div key={stat.label}
                 className="bg-white rounded-2xl p-4 shadow-sm border border-beige-claro">
              <div className={`w-8 h-8 rounded-lg ${stat.color.split(' ')[0]}
                              flex items-center justify-center mb-3`}>
                <Icono size={16} className={stat.color.split(' ')[1]} />
              </div>
              <p className={`font-serif text-2xl font-bold ${stat.color.split(' ')[1]} mb-0.5`}>
                {stat.valor}
              </p>
              <p className="font-sans text-xs text-marron/60">
                {stat.label}
              </p>
            </div>
          )
        })}
      </motion.div>

      {/* Búsqueda y filtros */}
      <motion.div {...fadeUp(0.1)} className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre o email..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-beige-claro
                       bg-white font-sans text-sm text-azul-oscuro
                       placeholder:text-gray-300
                       focus:outline-none focus:ring-2 focus:ring-azul-oscuro/20
                       focus:border-azul-oscuro transition-all"
          />
        </div>

        <div className="flex gap-2">
          {[
            { value: 'todos', label: 'Todos'     },
            { value: 'si',    label: '✓ Asisten' },
            { value: 'no',    label: '✗ No'      },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFiltro(f.value)}
              className={`px-4 py-2.5 rounded-xl border font-sans text-sm
                         transition-all whitespace-nowrap
                         ${filtro === f.value
                           ? 'bg-azul-oscuro text-crema border-azul-oscuro'
                           : 'bg-white text-marron border-beige-claro hover:border-azul-oscuro/30'
                         }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Lista */}
      <div className="flex flex-col gap-3">
        {filtradas.length === 0 ? (
          <motion.div {...fadeUp(0.15)} className="text-center py-12">
            <Users size={40} className="text-beige-claro mx-auto mb-3" />
            <p className="font-sans text-sm text-marron/60">
              {busqueda || filtro !== 'todos'
                ? 'No hay resultados para esta búsqueda'
                : 'Aún no hay confirmaciones'
              }
            </p>
          </motion.div>
        ) : (
          filtradas.map((conf, index) => (
            <ConfirmacionCard key={conf.id} conf={conf} index={index} />
          ))
        )}
      </div>

      {/* Total filtrado */}
      {filtradas.length > 0 && (
        <motion.p {...fadeUp(0.2)} className="text-center font-sans text-xs
                                               text-marron/40 mt-6">
          Mostrando {filtradas.length} de {confirmaciones.length} confirmaciones
        </motion.p>
      )}

    </div>
  )
}

export default Confirmaciones