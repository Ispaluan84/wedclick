import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import {
  TrendingUp, Euro, ShoppingBag,
  Users, Calendar, Award
} from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
})

function AdminEstadisticas() {
  const [datos, setDatos]   = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      const { data: ordenes } = await supabase
        .from('ordenes')
        .select('*')
        .order('created_at', { ascending: false })

      if (ordenes) {
        // Por plan
        const porPlan = {
          esencial:    ordenes.filter((o) => o.plan === 'esencial').length,
          premium:     ordenes.filter((o) => o.plan === 'premium').length,
          lanzamiento: ordenes.filter((o) => o.plan === 'lanzamiento').length,
        }

        // Por estado
        const porEstado = {
          pendiente:   ordenes.filter((o) => o.estado === 'pendiente').length,
          en_proceso:  ordenes.filter((o) => o.estado === 'en_proceso').length,
          completada:  ordenes.filter((o) => o.estado === 'completada').length,
          cancelada:   ordenes.filter((o) => o.estado === 'cancelada').length,
        }

        // Ingresos
        const ingresosTotales   = ordenes.reduce((acc, o) => acc + (o.importe_pagado    || 0), 0)
        const ingresosPendientes = ordenes.reduce((acc, o) => acc + (o.importe_pendiente || 0), 0)

        // Por mes (últimos 6 meses)
        const ahora   = new Date()
        const meses   = []
        for (let i = 5; i >= 0; i--) {
          const fecha = new Date(ahora.getFullYear(), ahora.getMonth() - i, 1)
          const mes   = fecha.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })
          const count = ordenes.filter((o) => {
            const d = new Date(o.created_at)
            return d.getMonth() === fecha.getMonth() &&
                   d.getFullYear() === fecha.getFullYear()
          }).length
          meses.push({ mes, count })
        }

        // Plan más vendido
        const planMasVendido = Object.entries(porPlan)
          .sort((a, b) => b[1] - a[1])[0]

        setDatos({
          porPlan,
          porEstado,
          ingresosTotales,
          ingresosPendientes,
          totalOrdenes: ordenes.length,
          meses,
          planMasVendido: planMasVendido[0],
          ticketMedio: ordenes.length > 0
            ? (ingresosTotales / ordenes.length / 100).toFixed(0)
            : 0,
        })
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

  const maxMes = Math.max(...(datos?.meses.map((m) => m.count) || [1]))

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">

      {/* Header */}
      <motion.div {...fadeUp(0)} className="mb-8">
        <h1 className="font-serif text-3xl text-azul-oscuro mb-1">
          Estadísticas
        </h1>
        <p className="font-sans text-sm text-marron/60">
          Resumen del negocio
        </p>
      </motion.div>

      {/* KPIs principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            titulo:    'Ingresos totales',
            valor:     `${(datos?.ingresosTotales / 100).toFixed(0)}€`,
            icono:     Euro,
            color:     'verde',
            delay:     0.05,
          },
          {
            titulo:    'Por cobrar',
            valor:     `${(datos?.ingresosPendientes / 100).toFixed(0)}€`,
            icono:     TrendingUp,
            color:     'tierra',
            delay:     0.1,
          },
          {
            titulo:    'Total órdenes',
            valor:     datos?.totalOrdenes,
            icono:     ShoppingBag,
            color:     'azul',
            delay:     0.15,
          },
          {
            titulo:    'Ticket medio',
            valor:     `${datos?.ticketMedio}€`,
            icono:     Award,
            color:     'verde',
            delay:     0.2,
          },
        ].map((kpi) => {
          const Icono = kpi.icono
          const colores = {
            verde:  { bg: 'bg-verde-suave/10', text: 'text-verde-suave' },
            tierra: { bg: 'bg-tierra/10',      text: 'text-tierra'      },
            azul:   { bg: 'bg-azul-oscuro/10', text: 'text-azul-oscuro' },
          }
          const c = colores[kpi.color]

          return (
            <motion.div
              key={kpi.titulo}
              {...fadeUp(kpi.delay)}
              className="bg-white rounded-2xl p-6 shadow-sm border border-beige-claro"
            >
              <div className={`w-10 h-10 rounded-xl ${c.bg}
                              flex items-center justify-center mb-3`}>
                <Icono size={18} className={c.text} />
              </div>
              <p className={`font-serif text-2xl font-bold ${c.text} mb-1`}>
                {kpi.valor}
              </p>
              <p className="font-sans text-xs text-marron/60">
                {kpi.titulo}
              </p>
            </motion.div>
          )
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">

        {/* Órdenes por mes */}
        <motion.div
          {...fadeUp(0.25)}
          className="bg-white rounded-2xl p-6 shadow-sm border border-beige-claro"
        >
          <h3 className="font-serif text-lg text-azul-oscuro mb-6">
            Órdenes por mes
          </h3>
          <div className="flex items-end gap-2 h-32">
            {datos?.meses.map((mes) => (
              <div key={mes.mes} className="flex-1 flex flex-col items-center gap-2">
                <span className="font-sans text-xs text-azul-oscuro font-medium">
                  {mes.count || ''}
                </span>
                <div
                  className="w-full bg-azul-oscuro/10 rounded-t-lg transition-all"
                  style={{
                    height: `${maxMes > 0 ? (mes.count / maxMes) * 100 : 0}%`,
                    minHeight: mes.count > 0 ? '8px' : '2px',
                    backgroundColor: mes.count > 0 ? '#243763' : '#D9C7A6',
                  }}
                />
                <span className="font-sans text-[10px] text-marron/50
                                 text-center leading-tight">
                  {mes.mes}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Por plan */}
        <motion.div
          {...fadeUp(0.3)}
          className="bg-white rounded-2xl p-6 shadow-sm border border-beige-claro"
        >
          <h3 className="font-serif text-lg text-azul-oscuro mb-6">
            Ventas por plan
          </h3>
          <div className="flex flex-col gap-4">
            {[
              { plan: 'esencial',    label: 'Esencial',    color: 'bg-verde-suave' },
              { plan: 'premium',     label: 'Premium',     color: 'bg-azul-oscuro' },
              { plan: 'lanzamiento', label: 'Lanzamiento', color: 'bg-tierra'      },
            ].map(({ plan, label, color }) => {
              const count = datos?.porPlan[plan] || 0
              const total = datos?.totalOrdenes  || 1
              const pct   = Math.round((count / total) * 100)

              return (
                <div key={plan}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-sans text-sm text-azul-oscuro">
                      {label}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-sm font-medium text-azul-oscuro">
                        {count}
                      </span>
                      <span className="font-sans text-xs text-marron/40">
                        ({pct}%)
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-crema rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, delay: 0.4 }}
                      className={`h-full rounded-full ${color}`}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Por estado */}
      <motion.div
        {...fadeUp(0.35)}
        className="bg-white rounded-2xl p-6 shadow-sm border border-beige-claro"
      >
        <h3 className="font-serif text-lg text-azul-oscuro mb-6">
          Estado de las órdenes
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { key: 'pendiente',  label: 'Pendientes',  color: 'text-tierra',      bg: 'bg-tierra/10'      },
            { key: 'en_proceso', label: 'En proceso',  color: 'text-azul-oscuro', bg: 'bg-azul-oscuro/10' },
            { key: 'completada', label: 'Completadas', color: 'text-verde-suave', bg: 'bg-verde-suave/10'  },
            { key: 'cancelada',  label: 'Canceladas',  color: 'text-red-500',     bg: 'bg-red-50'          },
          ].map(({ key, label, color, bg }) => (
            <div
              key={key}
              className={`${bg} rounded-2xl p-4 text-center`}
            >
              <p className={`font-serif text-3xl font-bold ${color} mb-1`}>
                {datos?.porEstado[key] || 0}
              </p>
              <p className="font-sans text-xs text-marron/60">
                {label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  )
}

export default AdminEstadisticas