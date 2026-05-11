import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import {
  Search, Users, Mail, Phone,
  Calendar, ShoppingBag, Euro
} from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
})

function AdminClientes() {
  const [clientes, setClientes]   = useState([])
  const [filtrados, setFiltrados] = useState([])
  const [loading, setLoading]     = useState(true)
  const [busqueda, setBusqueda]   = useState('')

  useEffect(() => {
    cargarClientes()
  }, [])

  useEffect(() => {
    if (!busqueda.trim()) {
      setFiltrados(clientes)
      return
    }
    const term = busqueda.toLowerCase()
    setFiltrados(
      clientes.filter(
        (c) =>
          c.nombre?.toLowerCase().includes(term) ||
          c.email?.toLowerCase().includes(term)
      )
    )
  }, [clientes, busqueda])

  const cargarClientes = async () => {
    try {
      // Obtener órdenes agrupadas por email
      const { data: ordenes, error } = await supabase
        .from('ordenes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      if (ordenes) {
        // Agrupar por email (un cliente puede tener varias órdenes)
        const clientesMap = {}
        ordenes.forEach((orden) => {
          if (!clientesMap[orden.email]) {
            clientesMap[orden.email] = {
              email:          orden.email,
              nombre:         `${orden.novio1} & ${orden.novio2}`,
              telefono:       orden.telefono,
              canal_contacto: orden.canal_contacto,
              ordenes:        [],
              total_pagado:   0,
              total_pendiente: 0,
              primera_orden:  orden.created_at,
            }
          }
          clientesMap[orden.email].ordenes.push(orden)
          clientesMap[orden.email].total_pagado    += orden.importe_pagado    || 0
          clientesMap[orden.email].total_pendiente += orden.importe_pendiente || 0
        })

        const listaClientes = Object.values(clientesMap)
        setClientes(listaClientes)
        setFiltrados(listaClientes)
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
          Clientes
        </h1>
        <p className="font-sans text-sm text-marron/60">
          Todas las parejas que han contratado
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div {...fadeUp(0.05)} className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-beige-claro">
          <div className="w-10 h-10 rounded-xl bg-azul-oscuro/10
                          flex items-center justify-center mb-3">
            <Users size={20} className="text-azul-oscuro" />
          </div>
          <p className="font-serif text-3xl text-azul-oscuro font-bold mb-1">
            {clientes.length}
          </p>
          <p className="font-sans text-sm text-marron/60">
            Clientes totales
          </p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-beige-claro">
          <div className="w-10 h-10 rounded-xl bg-verde-suave/10
                          flex items-center justify-center mb-3">
            <Euro size={20} className="text-verde-suave" />
          </div>
          <p className="font-serif text-3xl text-verde-suave font-bold mb-1">
            {(clientes.reduce((acc, c) => acc + c.total_pagado, 0) / 100).toFixed(0)}€
          </p>
          <p className="font-sans text-sm text-marron/60">
            Total facturado
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
            placeholder="Buscar cliente por nombre o email..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-beige-claro
                       bg-white font-sans text-sm text-azul-oscuro
                       placeholder:text-gray-300
                       focus:outline-none focus:ring-2 focus:ring-azul-oscuro/20
                       focus:border-azul-oscuro transition-all"
          />
        </div>
      </motion.div>

      {/* Lista clientes */}
      <div className="flex flex-col gap-3">
        {filtrados.length === 0 ? (
          <motion.div {...fadeUp(0.15)} className="text-center py-12">
            <Users size={40} className="text-beige-claro mx-auto mb-3" />
            <p className="font-sans text-sm text-marron/60">
              {busqueda ? 'No hay resultados' : 'Aún no hay clientes'}
            </p>
          </motion.div>
        ) : (
          filtrados.map((cliente, index) => (
            <motion.div
              key={cliente.email}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-beige-claro"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-azul-oscuro/10
                                flex items-center justify-center flex-shrink-0">
                  <span className="font-serif text-lg text-azul-oscuro font-bold">
                    {cliente.nombre?.charAt(0).toUpperCase()}
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-lg text-azul-oscuro mb-1">
                    {cliente.nombre}
                  </h3>

                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Mail size={12} className="text-marron/40" />
                      <span className="font-sans text-xs text-marron">
                        {cliente.email}
                      </span>
                    </div>
                    {cliente.telefono && (
                      <div className="flex items-center gap-1.5">
                        <Phone size={12} className="text-marron/40" />
                        <span className="font-sans text-xs text-marron">
                          {cliente.telefono}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-marron/40" />
                      <span className="font-sans text-xs text-marron">
                        Cliente desde {new Date(cliente.primera_orden)
                          .toLocaleDateString('es-ES', {
                            day: 'numeric', month: 'long', year: 'numeric'
                          })}
                      </span>
                    </div>
                  </div>

                  {/* Órdenes */}
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5
                                    rounded-xl bg-crema border border-beige-claro">
                      <ShoppingBag size={12} className="text-azul-oscuro" />
                      <span className="font-sans text-xs text-azul-oscuro">
                        {cliente.ordenes.length} orden{cliente.ordenes.length > 1 ? 'es' : ''}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5
                                    rounded-xl bg-verde-suave/10 border border-verde-suave/20">
                      <Euro size={12} className="text-verde-suave" />
                      <span className="font-sans text-xs text-verde-suave font-medium">
                        {(cliente.total_pagado / 100).toFixed(0)}€ pagado
                      </span>
                    </div>
                    {cliente.total_pendiente > 0 && (
                      <div className="flex items-center gap-2 px-3 py-1.5
                                      rounded-xl bg-tierra/10 border border-tierra/20">
                        <Euro size={12} className="text-tierra" />
                        <span className="font-sans text-xs text-tierra font-medium">
                          {(cliente.total_pendiente / 100).toFixed(0)}€ pendiente
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <a
                    href={`mailto:${cliente.email}`}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl
                               bg-crema border border-beige-claro font-sans text-xs
                               text-azul-oscuro hover:bg-beige-claro transition-colors"
                  >
                    <Mail size={12} />
                    Email
                  </a>
                  {cliente.telefono && (
                    <a
                      href={`https://wa.me/${cliente.telefono.replace(/\s/g, '').replace('+', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl
                                 bg-green-50 border border-green-200 font-sans text-xs
                                 text-green-700 hover:bg-green-100 transition-colors"
                    >
                      💬 WhatsApp
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {filtrados.length > 0 && (
        <motion.p
          {...fadeUp(0.2)}
          className="text-center font-sans text-xs text-marron/40 mt-6"
        >
          {filtrados.length} de {clientes.length} clientes
        </motion.p>
      )}
    </div>
  )
}

export default AdminClientes