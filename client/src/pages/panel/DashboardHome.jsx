import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase/'
import {
  Users, Music, CheckCircle, XCircle,
  Clock, Heart, Calendar, TrendingUp,
  AlertCircle
} from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
})

function StatCard({ titulo, valor, subtitulo, icono: Icono, color, delay }) {
  const colores = {
    azul:  { bg: 'bg-azul-oscuro/10', text: 'text-azul-oscuro', icon: 'text-azul-oscuro' },
    verde: { bg: 'bg-verde-suave/10', text: 'text-verde-suave', icon: 'text-verde-suave' },
    tierra:{ bg: 'bg-tierra/10',      text: 'text-tierra',      icon: 'text-tierra'      },
    rojo:  { bg: 'bg-red-100',        text: 'text-red-500',     icon: 'text-red-500'     },
  }

  const c = colores[color] || colores.azul

  return (
    <motion.div
      {...fadeUp(delay)}
      className="bg-white rounded-2xl p-6 shadow-sm border border-beige-claro"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${c.bg}
                        flex items-center justify-center`}>
          <Icono size={22} className={c.icon} />
        </div>
      </div>
      <p className={`font-serif text-3xl font-bold ${c.text} mb-1`}>
        {valor}
      </p>
      <p className="font-sans text-sm text-azul-oscuro font-medium mb-0.5">
        {titulo}
      </p>
      {subtitulo && (
        <p className="font-sans text-xs text-marron/60">
          {subtitulo}
        </p>
      )}
    </motion.div>
  )
}

function DashboardHome() {
  const { boda, diasParaBoda } = useOutletContext()

  const [stats, setStats] = useState({
    total:      0,
    confirmados: 0,
    rechazados:  0,
    pendientes:  0,
    canciones:   0,
    acompanantes: 0,
  })
  const [ultimasConfirmaciones, setUltimasConfirmaciones] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!boda?.id) return
    cargarStats()
  }, [boda])

  const cargarStats = async () => {
    try {
      // Confirmaciones
      const { data: confirmaciones } = await supabase
        .from('confirmaciones')
        .select('*')
        .eq('boda_id', boda.id)
        .order('created_at', { ascending: false })

      if (confirmaciones) {
        const confirmados  = confirmaciones.filter((c) => c.asistencia === 'si')
        const rechazados   = confirmaciones.filter((c) => c.asistencia === 'no')
        const pendientes   = confirmaciones.filter((c) => !c.asistencia || c.asistencia === 'pendiente')
        const acompanantes = confirmados.reduce(
          (acc, c) => acc + (parseInt(c.acompanantes) || 0), 0
        )

        setStats((prev) => ({
          ...prev,
          total:       confirmaciones.length,
          confirmados: confirmados.length,
          rechazados:  rechazados.length,
          pendientes:  pendientes.length,
          acompanantes,
        }))

        setUltimasConfirmaciones(confirmaciones.slice(0, 5))
      }

      // Canciones
      const { count: totalCanciones } = await supabase
        .from('canciones')
        .select('*', { count: 'exact', head: true })
        .eq('boda_id', boda.id)

      setStats((prev) => ({ ...prev, canciones: totalCanciones || 0 }))

    } catch (error) {
      console.error('Error cargando stats:', error)
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

  const porcentajeConfirmados = stats.total > 0
    ? Math.round((stats.confirmados / stats.total) * 100)
    : 0

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">

      {/* Bienvenida */}
      <motion.div {...fadeUp(0)} className="mb-8">
        <h1 className="font-serif text-3xl text-azul-oscuro mb-1">
          ¡Hola, {boda?.nombre_pareja}! 👋
        </h1>
        <p className="font-sans text-sm text-marron/60">
          Aquí tienes el resumen de vuestra boda
        </p>
      </motion.div>

      {/* Cuenta atrás */}
      {diasParaBoda !== null && diasParaBoda > 0 && (
        <motion.div
          {...fadeUp(0.05)}
          className="bg-azul-oscuro rounded-2xl p-6 mb-8 flex items-center gap-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20
                          flex items-center justify-center flex-shrink-0">
            <Calendar size={28} className="text-crema" />
          </div>
          <div className="flex-1">
            <p className="font-sans text-xs text-crema/60 uppercase tracking-widest mb-1">
              Cuenta atrás
            </p>
            <p className="font-serif text-3xl text-crema font-bold">
              {diasParaBoda} días
            </p>
            <p className="font-sans text-sm text-crema/60">
              para vuestro gran día —{' '}
              {new Date(boda.fecha_boda).toLocaleDateString('es-ES', {
                day: 'numeric', month: 'long', year: 'numeric'
              })}
            </p>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Heart
                key={i}
                size={16}
                className="text-tierra"
                fill="#CFC29B"
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <StatCard
          titulo="Confirmados"
          valor={stats.confirmados}
          subtitulo={`${stats.acompanantes} acompañantes`}
          icono={CheckCircle}
          color="verde"
          delay={0.1}
        />
        <StatCard
          titulo="No asisten"
          valor={stats.rechazados}
          subtitulo="Han declinado"
          icono={XCircle}
          color="rojo"
          delay={0.15}
        />
        <StatCard
          titulo="Pendientes"
          valor={stats.pendientes}
          subtitulo="Sin responder"
          icono={Clock}
          color="tierra"
          delay={0.2}
        />
        <StatCard
          titulo="Total invitados"
          valor={stats.total}
          subtitulo="Han respondido"
          icono={Users}
          color="azul"
          delay={0.25}
        />
        <StatCard
          titulo="Canciones"
          valor={stats.canciones}
          subtitulo="En la playlist"
          icono={Music}
          color="verde"
          delay={0.3}
        />
        <StatCard
          titulo="Confirmación"
          valor={`${porcentajeConfirmados}%`}
          subtitulo="De respuesta"
          icono={TrendingUp}
          color="azul"
          delay={0.35}
        />
      </div>

      {/* Barra de progreso confirmaciones */}
      <motion.div
        {...fadeUp(0.4)}
        className="bg-white rounded-2xl p-6 shadow-sm border border-beige-claro mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-lg text-azul-oscuro">
            Estado de confirmaciones
          </h3>
          <span className="font-sans text-sm text-marron/60">
            {stats.total} respuestas
          </span>
        </div>

        {/* Barra */}
        <div className="h-3 bg-crema rounded-full overflow-hidden flex mb-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${porcentajeConfirmados}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="bg-verde-suave rounded-full"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${stats.total > 0 ? Math.round((stats.rechazados / stats.total) * 100) : 0}%` }}
            transition={{ duration: 1, delay: 0.6 }}
            className="bg-red-300 rounded-full"
          />
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-verde-suave" />
            <span className="font-sans text-xs text-marron">
              Confirmados ({stats.confirmados})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-300" />
            <span className="font-sans text-xs text-marron">
              No asisten ({stats.rechazados})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-crema border border-beige-claro" />
            <span className="font-sans text-xs text-marron">
              Pendientes ({stats.pendientes})
            </span>
          </div>
        </div>
      </motion.div>

      {/* Últimas confirmaciones */}
      <motion.div
        {...fadeUp(0.45)}
        className="bg-white rounded-2xl shadow-sm border border-beige-claro overflow-hidden"
      >
        <div className="p-6 border-b border-beige-claro flex items-center justify-between">
          <h3 className="font-serif text-lg text-azul-oscuro">
            Últimas confirmaciones
          </h3>
          {ultimasConfirmaciones.length > 0 && (
            <span className="font-sans text-xs text-marron/60">
              Más recientes primero
            </span>
          )}
        </div>

        {ultimasConfirmaciones.length === 0 ? (
          <div className="p-8 text-center">
            <AlertCircle size={32} className="text-beige-claro mx-auto mb-3" />
            <p className="font-sans text-sm text-marron/60">
              Aún no hay confirmaciones
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-beige-claro">
            {ultimasConfirmaciones.map((conf) => (
              <li key={conf.id} className="px-6 py-4 flex items-center gap-4">
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
                    {conf.acompanantes && parseInt(conf.acompanantes) > 0
                      ? ` · ${conf.acompanantes} acompañante${parseInt(conf.acompanantes) > 1 ? 's' : ''}`
                      : ''
                    }
                  </p>
                </div>

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
              </li>
            ))}
          </ul>
        )}
      </motion.div>

    </div>
  )
}

export default DashboardHome