import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import {
  Search, ShoppingBag, ChevronDown, ChevronUp,
  Mail, Phone, MapPin, Calendar, Palette,
  MessageSquare, Clock, Euro, Check, X,
  Edit2, Save
} from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
})

const estadoOpciones = [
  { value: 'pendiente',   label: '⏳ Pendiente',   color: 'bg-tierra/10 text-tierra'           },
  { value: 'en_proceso',  label: '🔄 En proceso',  color: 'bg-azul-oscuro/10 text-azul-oscuro'  },
  { value: 'completada',  label: '✓ Completada',   color: 'bg-verde-suave/10 text-verde-suave'  },
  { value: 'cancelada',   label: '✗ Cancelada',    color: 'bg-red-100 text-red-500'             },
]

function OrdenCard({ orden, index, onUpdate }) {
  const [expandida, setExpandida]     = useState(false)
  const [editandoEstado, setEditando] = useState(false)
  const [nuevoEstado, setNuevoEstado] = useState(orden.estado)
  const [guardando, setGuardando]     = useState(false)

  const estadoInfo = estadoOpciones.find((e) => e.value === orden.estado)
    || estadoOpciones[0]

  const handleGuardarEstado = async () => {
    setGuardando(true)
    try {
      const { error } = await supabase
        .from('ordenes')
        .update({ estado: nuevoEstado })
        .eq('id', orden.id)

      if (!error) {
        onUpdate(orden.id, { estado: nuevoEstado })
        setEditando(false)
      }
    } catch (err) {
      console.error('Error actualizando estado:', err)
    } finally {
      setGuardando(false)
    }
  }

  const handleMarcarPagado = async () => {
    if (!confirm('¿Marcar el segundo pago como recibido?')) return

    setGuardando(true)
    try {
      const { error } = await supabase
        .from('ordenes')
        .update({
          importe_pagado:    orden.importe_total,
          importe_pendiente: 0,
          estado:            'completada',
        })
        .eq('id', orden.id)

      if (!error) {
        onUpdate(orden.id, {
          importe_pagado:    orden.importe_total,
          importe_pendiente: 0,
          estado:            'completada',
        })
      }
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setGuardando(false)
    }
  }

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
            {orden.novio1?.charAt(0).toUpperCase()}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="font-sans text-sm text-azul-oscuro font-medium truncate">
            {orden.novio1} & {orden.novio2}
          </p>
          <p className="font-sans text-xs text-marron/60 truncate">
            {orden.email} · Plan {orden.plan}
          </p>
        </div>

        {/* Pagos */}
        <div className="hidden sm:flex flex-col items-end flex-shrink-0">
          <p className="font-sans text-sm text-verde-suave font-medium">
            {((orden.importe_pagado || 0) / 100).toFixed(0)}€ pagado
          </p>
          {orden.importe_pendiente > 0 && (
            <p className="font-sans text-xs text-tierra">
              {((orden.importe_pendiente || 0) / 100).toFixed(0)}€ pendiente
            </p>
          )}
        </div>

        {/* Estado */}
        <span className={`hidden md:block flex-shrink-0 px-3 py-1 rounded-full
                         font-sans text-xs font-medium ${estadoInfo.color}`}>
          {estadoInfo.label}
        </span>

        {/* Expandir */}
        <button className="flex-shrink-0 text-marron/40">
          {expandida ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
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
              <div className="grid sm:grid-cols-2 gap-4 mb-6">

                {/* Datos de contacto */}
                <div className="flex items-start gap-3">
                  <Mail size={14} className="text-marron/40 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-sans text-xs text-marron/40 uppercase tracking-wide">
                      Email
                    </p>
                    <p className="font-sans text-sm text-azul-oscuro">
                      {orden.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={14} className="text-marron/40 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-sans text-xs text-marron/40 uppercase tracking-wide">
                      Teléfono · {orden.canal_contacto}
                    </p>
                    <p className="font-sans text-sm text-azul-oscuro">
                      {orden.telefono}
                    </p>
                    <p className="font-sans text-xs text-marron/50">
                      {orden.horario_contacto}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar size={14} className="text-marron/40 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-sans text-xs text-marron/40 uppercase tracking-wide">
                      Fecha de boda
                    </p>
                    <p className="font-sans text-sm text-azul-oscuro">
                      {orden.fecha_boda
                        ? new Date(orden.fecha_boda).toLocaleDateString('es-ES', {
                            day: 'numeric', month: 'long', year: 'numeric'
                          })
                        : 'No especificada'
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={14} className="text-marron/40 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-sans text-xs text-marron/40 uppercase tracking-wide">
                      Lugares
                    </p>
                    <p className="font-sans text-sm text-azul-oscuro">
                      {orden.lugar_ceremonia || 'No especificado'}
                    </p>
                    <p className="font-sans text-xs text-marron/60">
                      {orden.lugar_celebracion}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Palette size={14} className="text-marron/40 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-sans text-xs text-marron/40 uppercase tracking-wide">
                      Estilo
                    </p>
                    <p className="font-sans text-sm text-azul-oscuro">
                      {orden.estilo || 'No especificado'}
                    </p>
                  </div>
                </div>

                {orden.notas && (
                  <div className="flex items-start gap-3 sm:col-span-2">
                    <MessageSquare size={14} className="text-marron/40 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-sans text-xs text-marron/40 uppercase tracking-wide mb-1">
                        Notas
                      </p>
                      <p className="font-sans text-sm text-azul-oscuro italic">
                        "{orden.notas}"
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <Clock size={14} className="text-marron/40 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-sans text-xs text-marron/40 uppercase tracking-wide">
                      Fecha de orden
                    </p>
                    <p className="font-sans text-sm text-azul-oscuro">
                      {new Date(orden.created_at).toLocaleDateString('es-ES', {
                        day: 'numeric', month: 'long', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Euro size={14} className="text-marron/40 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-sans text-xs text-marron/40 uppercase tracking-wide">
                      Pagos
                    </p>
                    <p className="font-sans text-sm text-verde-suave font-medium">
                      {((orden.importe_pagado || 0) / 100).toFixed(0)}€ cobrado
                    </p>
                    {orden.importe_pendiente > 0 && (
                      <p className="font-sans text-xs text-tierra">
                        {((orden.importe_pendiente || 0) / 100).toFixed(0)}€ pendiente
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Acciones */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-beige-claro">

                {/* Cambiar estado */}
                {editandoEstado ? (
                  <div className="flex items-center gap-2">
                    <select
                      value={nuevoEstado}
                      onChange={(e) => setNuevoEstado(e.target.value)}
                      className="font-sans text-sm text-azul-oscuro px-3 py-2
                                 rounded-xl border border-beige-claro bg-crema/30
                                 focus:outline-none focus:ring-2 focus:ring-azul-oscuro/20"
                    >
                      {estadoOpciones.map((e) => (
                        <option key={e.value} value={e.value}>
                          {e.label}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleGuardarEstado}
                      disabled={guardando}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl
                                 bg-azul-oscuro text-crema font-sans text-sm
                                 hover:bg-beige-claro hover:text-azul-oscuro
                                 transition-colors disabled:opacity-50"
                    >
                      <Save size={14} />
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditando(false)}
                      className="w-8 h-8 rounded-xl bg-gray-100 flex items-center
                                 justify-center hover:bg-gray-200 transition-colors"
                    >
                      <X size={14} className="text-gray-500" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setEditando(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl
                               bg-crema border border-beige-claro font-sans text-sm
                               text-azul-oscuro hover:bg-beige-claro transition-colors"
                  >
                    <Edit2 size={14} />
                    Cambiar estado
                  </button>
                )}

                {/* Marcar segundo pago */}
                {orden.importe_pendiente > 0 && (
                  <button
                    onClick={handleMarcarPagado}
                    disabled={guardando}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl
                               bg-verde-suave/10 border border-verde-suave/20
                               text-verde-suave font-sans text-sm
                               hover:bg-verde-suave/20 transition-colors
                               disabled:opacity-50"
                  >
                    <Check size={14} />
                    Marcar 2º pago recibido
                  </button>
                )}

                {/* Contactar por email */}
                <a
                  href={`mailto:${orden.email}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl
                             bg-crema border border-beige-claro font-sans text-sm
                             text-azul-oscuro hover:bg-beige-claro transition-colors"
                >
                  <Mail size={14} />
                  Enviar email
                </a>

                {/* Contactar por WhatsApp */}
                {orden.telefono && (
                  <a
                    href={`https://wa.me/${orden.telefono.replace(/\s/g, '').replace('+', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl
                               bg-green-50 border border-green-200 font-sans text-sm
                               text-green-700 hover:bg-green-100 transition-colors"
                  >
                    💬 WhatsApp
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function AdminOrdenes() {
  const [ordenes, setOrdenes]   = useState([])
  const [filtradas, setFiltradas] = useState([])
  const [loading, setLoading]   = useState(true)
  const [busqueda, setBusqueda] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('todos')
  const [filtroPlan, setFiltroPlan]     = useState('todos')

  useEffect(() => {
    cargarOrdenes()
  }, [])

  useEffect(() => {
    let resultado = [...ordenes]

    if (filtroEstado !== 'todos') {
      resultado = resultado.filter((o) => o.estado === filtroEstado)
    }

    if (filtroPlan !== 'todos') {
      resultado = resultado.filter((o) => o.plan === filtroPlan)
    }

    if (busqueda.trim()) {
      const term = busqueda.toLowerCase()
      resultado = resultado.filter(
        (o) =>
          o.novio1?.toLowerCase().includes(term) ||
          o.novio2?.toLowerCase().includes(term) ||
          o.email?.toLowerCase().includes(term)
      )
    }

    setFiltradas(resultado)
  }, [ordenes, filtroEstado, filtroPlan, busqueda])

  const cargarOrdenes = async () => {
    try {
      const { data, error } = await supabase
        .from('ordenes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      if (data) {
        setOrdenes(data)
        setFiltradas(data)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = (id, cambios) => {
    setOrdenes((prev) =>
      prev.map((o) => o.id === id ? { ...o, ...cambios } : o)
    )
  }

  const pendientesPago = ordenes.filter((o) => o.importe_pendiente > 0).length

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
          Órdenes
        </h1>
        <p className="font-sans text-sm text-marron/60">
          Gestiona todos los pedidos
        </p>
      </motion.div>

      {/* Alerta pagos pendientes */}
      {pendientesPago > 0 && (
        <motion.div
          {...fadeUp(0.05)}
          className="bg-tierra/10 border border-tierra/20 rounded-2xl
                     px-6 py-4 mb-6 flex items-center gap-3"
        >
          <span className="text-xl">⚠️</span>
          <p className="font-sans text-sm text-tierra">
            <strong>{pendientesPago} orden{pendientesPago > 1 ? 'es' : ''}</strong> con
            segundo pago pendiente de cobro
          </p>
        </motion.div>
      )}

      {/* Filtros */}
      <motion.div
        {...fadeUp(0.1)}
        className="flex flex-col sm:flex-row gap-3 mb-6"
      >
        {/* Búsqueda */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2
                                       -translate-y-1/2 text-gray-400" />
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

        {/* Filtro estado */}
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="px-4 py-3 rounded-xl border border-beige-claro bg-white
                     font-sans text-sm text-azul-oscuro
                     focus:outline-none focus:ring-2 focus:ring-azul-oscuro/20"
        >
          <option value="todos">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="en_proceso">En proceso</option>
          <option value="completada">Completada</option>
          <option value="cancelada">Cancelada</option>
        </select>

        {/* Filtro plan */}
        <select
          value={filtroPlan}
          onChange={(e) => setFiltroPlan(e.target.value)}
          className="px-4 py-3 rounded-xl border border-beige-claro bg-white
                     font-sans text-sm text-azul-oscuro
                     focus:outline-none focus:ring-2 focus:ring-azul-oscuro/20"
        >
          <option value="todos">Todos los planes</option>
          <option value="esencial">Esencial</option>
          <option value="premium">Premium</option>
          <option value="lanzamiento">Lanzamiento</option>
        </select>
      </motion.div>

      {/* Lista de órdenes */}
      <div className="flex flex-col gap-3">
        {filtradas.length === 0 ? (
          <motion.div {...fadeUp(0.15)} className="text-center py-12">
            <ShoppingBag size={40} className="text-beige-claro mx-auto mb-3" />
            <p className="font-sans text-sm text-marron/60">
              {busqueda || filtroEstado !== 'todos' || filtroPlan !== 'todos'
                ? 'No hay resultados para esta búsqueda'
                : 'Aún no hay órdenes'
              }
            </p>
          </motion.div>
        ) : (
          filtradas.map((orden, index) => (
            <OrdenCard
              key={orden.id}
              orden={orden}
              index={index}
              onUpdate={handleUpdate}
            />
          ))
        )}
      </div>

      {filtradas.length > 0 && (
        <motion.p
          {...fadeUp(0.2)}
          className="text-center font-sans text-xs text-marron/40 mt-6"
        >
          {filtradas.length} de {ordenes.length} órdenes
        </motion.p>
      )}
    </div>
  )
}

export default AdminOrdenes