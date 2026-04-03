import { useEffect, useState, useMemo } from 'react'
import {
  CheckCircle,
  XCircle,
  Users,
  Bus,
  Car,
  Warning,
} from '@phosphor-icons/react'
import { supabase } from '../../lib/supabase'

const stats_config = [
  {
    key:   'confirmados',
    label: 'Confirmados',
    icon:  CheckCircle,
    color: '#6A8DAD',
  },
  {
    key:   'noAsisten',
    label: 'No asisten',
    icon:  XCircle,
    color: '#B98362',
  },
  {
    key:   'total',
    label: 'Registros totales',
    icon:  Users,
    color: '#333E50',
  },
  {
    key:   'bus',
    label: 'Van en bus',
    icon:  Bus,
    color: '#6A8DAD',
  },
  {
    key:   'coche',
    label: 'Van en coche',
    icon:  Car,
    color: '#D9C99E',
  },
  {
    key:   'conAlergenos',
    label: 'Con alérgenos',
    icon:  Warning,
    color: '#B98362',
  },
]

function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl p-7
                 border border-gray-100 dark:border-gray-700
                 flex flex-col items-center justify-center gap-4
                 text-center hover:shadow-sm transition-shadow duration-300"
    >
      {/* Icono Phosphor con estilo duotone */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon
          size={32}
          weight="duotone"
          style={{ color }}
        />
      </div>

      {/* Número */}
      <p
        className="font-serif text-6xl font-bold leading-none"
        style={{ color }}
      >
        {value}
      </p>

      {/* Separador */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-px" style={{ backgroundColor: color, opacity: 0.3 }} />
        <div className="w-1 h-1 rounded-full" style={{ backgroundColor: color, opacity: 0.3 }} />
        <div className="w-6 h-px" style={{ backgroundColor: color, opacity: 0.3 }} />
      </div>

      {/* Label */}
      <p className="font-sans text-xs tracking-widest uppercase text-gray-400 dark:text-gray-500">
        {label}
      </p>
    </div>
  )
}

function DashboardHome({ boda }) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!boda?.id) return

    const loadConfirmaciones = async () => {
      const { data, error } = await supabase
        .from('confirmaciones')
        .select('*')
        .eq('boda_id', boda.id)
        .order('created_at', { ascending: true })

      if (!error) setRows(data || [])
      setLoading(false)
    }

    loadConfirmaciones()
  }, [boda])

  const stats = useMemo(() => {
    const total        = rows.length
    const confirmados  = rows.filter(r => r.asistencia === 'si').length
    const noAsisten    = rows.filter(r => r.asistencia === 'no').length
    const bus          = rows.filter(r => r.transporte === 'bus').length
    const coche        = rows.filter(r => r.transporte === 'coche').length
    const conAlergenos = rows.filter(r =>
      r.alergenos &&
      r.alergenos.trim() !== '' &&
      r.alergenos.trim().toLowerCase() !== 'ninguno'
    ).length

    return { total, confirmados, noAsisten, bus, coche, conAlergenos }
  }, [rows])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-gray-200 dark:border-gray-700
                        border-t-blueWillow rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8">

      {/* Título */}
      <div className="flex flex-col gap-1">
        <h1 className="font-serif text-2xl text-gray-900 dark:text-white">
          Resumen general
        </h1>
        <p className="font-sans text-sm text-gray-400 dark:text-gray-500">
          Vista rápida del estado de las confirmaciones
        </p>
      </div>

      {/* Separador decorativo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-px bg-goldAccent opacity-50" />
        <div className="w-1.5 h-1.5 rounded-full bg-goldAccent opacity-50" />
        <div className="w-8 h-px bg-goldAccent opacity-50" />
      </div>

      {/* Tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats_config.map((s) => (
          <StatCard
            key={s.key}
            label={s.label}
            value={stats[s.key]}
            icon={s.icon}
            color={s.color}
          />
        ))}
      </div>

      {/* Nota */}
      <div className="flex items-center gap-3 pt-2">
        <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
        <p className="font-sans text-xs text-gray-400 dark:text-gray-500">
          Los datos se actualizan en tiempo real. Usa las pestañas superiores para ver el detalle completo.
        </p>
      </div>

    </div>
  )
}

export default DashboardHome