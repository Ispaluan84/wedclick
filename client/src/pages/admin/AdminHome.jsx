import { useEffect, useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import {
  ShoppingBag, Users, TrendingUp, Clock,
  CheckCircle, XCircle, AlertCircle,
  ArrowRight, Euro
} from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
})

function StatCard({ titulo, valor, subtitulo, icono: Icono, color, delay }) {
  const colores = {
    azul:   { bg: 'bg-azul-oscuro/10', text: 'text-azul-oscuro' },
    verde:  { bg: 'bg-verde-suave/10', text: 'text-verde-suave' },
    tierra: { bg: 'bg-tierra/10',      text: 'text-tierra'      },
    rojo:   { bg: 'bg-red-100',        text: 'text-red-500'     },
  }
  const c = colores[color] || colores.azul

  return (
    <motion.div
      {...fadeUp(delay)}
      className="bg-white rounded-2xl p-6 shadow-sm border border-beige-claro"
    >
      <div className={`w-12 h-12 rounded-xl ${c.bg}
                      flex items-center justify-center mb-4`}>
        <Icono size={22} className={c.text} />
      </div>
      <p className={`font-serif text-3xl font-bold ${c.text} mb-1`}>
        {valor}
      </p>
      <p className="font-sans text-sm text-azul-oscuro font-medium mb-0.5">
        {titulo}
      </p>
      {subtitulo && (
        <p className="font-sans text-xs text-marron/60">{subtitulo}</p>
      )}
    </motion.div>
  )
}

function AdminHome() {
  const { admin } = useOutletContext()
  const navigate  = useNavigate()

  const [stats, setStats]               = useState({
    totalOrdenes:     0,
    ordenesPendientes: 0,
    ordenesCompletadas: 0,
    ingresosTotales:  0,
    ingresosPendientes: 0,
    totalClientes:    0,
  })
  const [ultimasOrdenes, setUltimasOrdenes] = useState([])
  const [loading, setLoading]               = useState(true)

  useEffect(() => {
    cargarStats()
  }, [])

  const cargarStats = async () => {
    try {
      // Órdenes
      const { data: ordenes } = await supabase
        .from('ordenes')
        .select('*')
        .order('created_at', { ascending: false })

      if (ordenes) {
        const pendientes   = ordenes.filter((o) => o.estado === 'pendiente')
        const completadas  = ordenes.filter((o) => o.estado === 'completada')
        const ingresos     = ordenes.reduce((acc, o) => acc + (o.importe_pagado || 0), 0)
        const pendientePago = ordenes.reduce((acc, o) => acc + (o.importe_pendiente || 0), 0)

        setStats({
          totalOrdenes:       ordenes.length,
          ordenesPendientes:  pendientes.length,
          ordenesCompletadas: completadas.length,
          ingresosTotales:    ingresos / 100,
          ingresosPendientes: pendientePago / 100,
          totalClientes:      new Set(ordenes.map((o) => o.email)).size,
        })

        setUltimasOrdenes(ordenes.slice(0, 5))
      }

    } catch (error) {
      console.error('Error cargando stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const estadoColor = (estado) => {
    switch (estado) {
      case 'completada':  return 'bg-verde-suave/10 text-verde-suave'
      case 'pendiente':   return 'bg-tierra/10 text-tierra'
      case 'en_proceso':  return 'bg-azul-oscuro/10 text-azul-oscuro'
      case 'cancelada':   return 'bg-red-100 text-red-500'
      default:            return 'bg-gray-100 text-gray-500'
    }
  }

  const estadoLabel = (estado) => {
    switch (estado) {
      case 'completada':  return '✓ Completada'
      case 'pendiente':   return '⏳ Pendiente'
      case 'en_proceso':  return '🔄 En proceso'
      case 'cancelada':   return '✗ Cancelada'
      default:            return estado
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
    <div className="p-6 md:p-8 max-w-6xl mx-auto">

      {/* Bienvenida */}
      <motion.div {...fadeUp(0)} className="mb-8">
        <h1 className="font-serif text-3xl text-azul-oscuro mb-1">
          Panel de administración
        </h1>
        <p className="font-sans text-sm text-marron/60">
          Bienvenido, {admin?.nombre || admin?.email}
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <StatCard
          titulo="Total órdenes"
          valor={stats.totalOrdenes}
          subtitulo="Desde el inicio"
          icono={ShoppingBag}
          color="azul"
          delay={0.05}
        />
        <StatCard
          titulo="Pendientes"
          valor={stats.ordenesPendientes}
          subtitulo="Por gestionar"
          icono={Clock}
          color="tierra"
          delay={0.1}
        />
        <StatCard
          titulo="Completadas"
          valor={stats.ordenesCompletadas}
          subtitulo="Entregadas"
          icono={CheckCircle}
          color="verde"
          delay={0.15}
        />
        <StatCard
          titulo="Ingresos"
          valor={`${stats.ingresosTotales.toFixed(0)}€`}
          subtitulo="Total cobrado"
          icono={Euro}
          color="verde"
          delay={0.2}
        />
        <StatCard
          titulo="Por cobrar"
          valor={`${stats.ingresosPendientes.toFixed(0)}€`}
          subtitulo="Segundo pago pendiente"
          icono={AlertCircle}
          color="tierra"
          delay={0.25}
        />
        <StatCard
          titulo="Clientes"
          valor={stats.totalClientes}
          subtitulo="Parejas únicas"
          icono={Users}
          color="azul"
          delay={0.3}
        />
      </div>

      {/* Últimas órdenes */}
      <motion.div
        {...fadeUp(0.35)}
        className="bg-white rounded-2xl shadow-sm border border-beige-claro overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-beige-claro
                        flex items-center justify-between">
          <h3 className="font-serif text-lg text-azul-oscuro">
            Últimas órdenes
          </h3>
          <button
            onClick={() => navigate('/admin/ordenes')}
            className="flex items-center gap-1 font-sans text-xs
                       text-marron/60 hover:text-azul-oscuro transition-colors"
          >
            Ver todas
            <ArrowRight size={12} />
          </button>
        </div>

        {ultimasOrdenes.length === 0 ? (
          <div className="p-8 text-center">
            <ShoppingBag size={32} className="text-beige-claro mx-auto mb-3" />
            <p className="font-sans text-sm text-marron/60">
              Aún no hay órdenes
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-beige-claro">
                  <th className="px-6 py-3 text-left font-sans text-xs
                                 text-marron/50 uppercase tracking-widest">
                    Pareja
                  </th>
                  <th className="px-6 py-3 text-left font-sans text-xs
                                 text-marron/50 uppercase tracking-widest
                                 hidden sm:table-cell">
                    Plan
                  </th>
                  <th className="px-6 py-3 text-left font-sans text-xs
                                 text-marron/50 uppercase tracking-widest
                                 hidden md:table-cell">
                    Pagado
                  </th>
                  <th className="px-6 py-3 text-left font-sans text-xs
                                 text-marron/50 uppercase tracking-widest">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-beige-claro">
                {ultimasOrdenes.map((orden) => (
                  <tr
                    key={orden.id}
                    onClick={() => navigate('/admin/ordenes')}
                    className="hover:bg-crema/30 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <p className="font-sans text-sm text-azul-oscuro font-medium">
                        {orden.novio1} & {orden.novio2}
                      </p>
                      <p className="font-sans text-xs text-marron/50">
                        {orden.email}
                      </p>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="font-sans text-sm text-marron capitalize">
                        {orden.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <div>
                        <p className="font-sans text-sm text-verde-suave font-medium">
                          {((orden.importe_pagado || 0) / 100).toFixed(0)}€
                        </p>
                        {orden.importe_pendiente > 0 && (
                          <p className="font-sans text-xs text-tierra">
                            Falta: {((orden.importe_pendiente || 0) / 100).toFixed(0)}€
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full font-sans text-xs
                                       font-medium ${estadoColor(orden.estado)}`}>
                        {estadoLabel(orden.estado)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default AdminHome