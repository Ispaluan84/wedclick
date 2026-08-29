import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import { X, UserPlus, Loader2 } from 'lucide-react'

const PLANES = [
  { value: 'esencial',    label: 'Esencial (149€)'    },
  { value: 'premium',     label: 'Premium (249€)'     },
  { value: 'lanzamiento', label: 'Lanzamiento (299€)' },
]

const ESTADOS = [
  { value: 'pendiente',  label: 'Pendiente'  },
  { value: 'en_proceso', label: 'En proceso' },
  { value: 'completada', label: 'Completada' },
  { value: 'cancelada',  label: 'Cancelada'  },
]

const TIPOS_COBRO = [
  {
    value:       'manual',
    label:       'Cobro manual (transferencia, Bizum, efectivo...)',
    description: 'El importe se contabiliza con normalidad en las estadísticas.',
  },
  {
    value:       'sin_coste',
    label:       'Sin coste / cortesía',
    description: 'No vas a ingresar nada por esta orden. No se contabilizará en las estadísticas ni en los ingresos.',
  },
]

const initialForm = {
  novio1:            '',
  novio2:            '',
  email:             '',
  telefono:          '',
  canal_contacto:    '',
  fecha_boda:        '',
  lugar_ceremonia:   '',
  lugar_celebracion: '',
  estilo:            '',
  notas:             '',
  plan:              'esencial',
  estado:            'pendiente',
  tipoCobro:         'manual',
  importe_total:     '',
  importe_pagado:    '',
}

function ModalNuevaOrden({ abierto, onClose, onCreada }) {
  const [form, setForm]         = useState(initialForm)
  const [guardando, setGuardando] = useState(false)
  const [error, setError]       = useState('')

  if (!abierto) return null

  const handleChange = (campo) => (e) => {
    setForm((prev) => ({ ...prev, [campo]: e.target.value }))
  }

  const handleClose = () => {
    if (guardando) return
    setForm(initialForm)
    setError('')
    onClose()
  }

  const esSinCoste = form.tipoCobro === 'sin_coste'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.novio1 || !form.novio2 || !form.email) {
      setError('Nombre de los novios y email son obligatorios.')
      return
    }

    setGuardando(true)
    try {
      const totalEuros  = esSinCoste ? 0 : parseFloat(form.importe_total  || 0)
      const pagadoEuros = esSinCoste ? 0 : parseFloat(form.importe_pagado || 0)

      const importeTotalCent  = Math.round(totalEuros  * 100)
      const importePagadoCent = Math.round(pagadoEuros * 100)
      const importePendienteCent = Math.max(importeTotalCent - importePagadoCent, 0)

      const nuevaOrden = {
        novio1:              form.novio1,
        novio2:              form.novio2,
        email:               form.email,
        telefono:            form.telefono || null,
        canal_contacto:      form.canal_contacto || null,
        fecha_boda:          form.fecha_boda || null,
        lugar_ceremonia:     form.lugar_ceremonia || null,
        lugar_celebracion:   form.lugar_celebracion || null,
        estilo:              form.estilo || null,
        notas:               form.notas || null,
        plan:                form.plan,
        estado:              form.estado,
        importe_total:       importeTotalCent,
        importe_pagado:      importePagadoCent,
        importe_pendiente:   importePendienteCent,
        origen:              esSinCoste ? 'manual_sin_coste' : 'manual',
        excluir_estadisticas: esSinCoste,
      }

      const { data, error: dbError } = await supabase
        .from('ordenes')
        .insert([nuevaOrden])
        .select()

      if (dbError) throw dbError

      if (data && data[0]) {
        onCreada(data[0])
      }
      setForm(initialForm)
      onClose()
    } catch (err) {
      console.error('Error creando orden manual:', err)
      setError('No se ha podido guardar. Revisa los datos e inténtalo de nuevo.')
    } finally {
      setGuardando(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 z-50 flex items-center
                   justify-center p-4 overflow-y-auto"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-xl w-full max-w-2xl
                     my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Cabecera */}
          <div className="px-6 py-5 border-b border-beige-claro
                          flex items-center justify-between sticky top-0
                          bg-white z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-azul-oscuro/10
                              flex items-center justify-center">
                <UserPlus size={18} className="text-azul-oscuro" />
              </div>
              <div>
                <h2 className="font-serif text-xl text-azul-oscuro">
                  Añadir cliente manualmente
                </h2>
                <p className="font-sans text-xs text-marron/60">
                  Crea una orden sin pasar por el pago con Stripe
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-xl bg-gray-100 flex items-center
                         justify-center hover:bg-gray-200 transition-colors
                         flex-shrink-0"
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl
                              px-4 py-3 font-sans text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Novios */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-sans text-xs text-marron/60 uppercase
                                  tracking-wide mb-1.5 block">
                  Novio/a 1 *
                </label>
                <input
                  type="text"
                  value={form.novio1}
                  onChange={handleChange('novio1')}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-beige-claro
                             font-sans text-sm text-azul-oscuro
                             focus:outline-none focus:ring-2 focus:ring-azul-oscuro/20
                             focus:border-azul-oscuro transition-all"
                />
              </div>
              <div>
                <label className="font-sans text-xs text-marron/60 uppercase
                                  tracking-wide mb-1.5 block">
                  Novio/a 2 *
                </label>
                <input
                  type="text"
                  value={form.novio2}
                  onChange={handleChange('novio2')}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-beige-claro
                             font-sans text-sm text-azul-oscuro
                             focus:outline-none focus:ring-2 focus:ring-azul-oscuro/20
                             focus:border-azul-oscuro transition-all"
                />
              </div>
            </div>

            {/* Contacto */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-sans text-xs text-marron/60 uppercase
                                  tracking-wide mb-1.5 block">
                  Email *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-beige-claro
                             font-sans text-sm text-azul-oscuro
                             focus:outline-none focus:ring-2 focus:ring-azul-oscuro/20
                             focus:border-azul-oscuro transition-all"
                />
              </div>
              <div>
                <label className="font-sans text-xs text-marron/60 uppercase
                                  tracking-wide mb-1.5 block">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={form.telefono}
                  onChange={handleChange('telefono')}
                  placeholder="+34..."
                  className="w-full px-4 py-2.5 rounded-xl border border-beige-claro
                             font-sans text-sm text-azul-oscuro
                             focus:outline-none focus:ring-2 focus:ring-azul-oscuro/20
                             focus:border-azul-oscuro transition-all"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-sans text-xs text-marron/60 uppercase
                                  tracking-wide mb-1.5 block">
                  Canal de contacto
                </label>
                <input
                  type="text"
                  value={form.canal_contacto}
                  onChange={handleChange('canal_contacto')}
                  placeholder="WhatsApp, Instagram, referido..."
                  className="w-full px-4 py-2.5 rounded-xl border border-beige-claro
                             font-sans text-sm text-azul-oscuro
                             focus:outline-none focus:ring-2 focus:ring-azul-oscuro/20
                             focus:border-azul-oscuro transition-all"
                />
              </div>
              <div>
                <label className="font-sans text-xs text-marron/60 uppercase
                                  tracking-wide mb-1.5 block">
                  Fecha de la boda
                </label>
                <input
                  type="date"
                  value={form.fecha_boda}
                  onChange={handleChange('fecha_boda')}
                  className="w-full px-4 py-2.5 rounded-xl border border-beige-claro
                             font-sans text-sm text-azul-oscuro
                             focus:outline-none focus:ring-2 focus:ring-azul-oscuro/20
                             focus:border-azul-oscuro transition-all"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-sans text-xs text-marron/60 uppercase
                                  tracking-wide mb-1.5 block">
                  Lugar de ceremonia
                </label>
                <input
                  type="text"
                  value={form.lugar_ceremonia}
                  onChange={handleChange('lugar_ceremonia')}
                  className="w-full px-4 py-2.5 rounded-xl border border-beige-claro
                             font-sans text-sm text-azul-oscuro
                             focus:outline-none focus:ring-2 focus:ring-azul-oscuro/20
                             focus:border-azul-oscuro transition-all"
                />
              </div>
              <div>
                <label className="font-sans text-xs text-marron/60 uppercase
                                  tracking-wide mb-1.5 block">
                  Lugar de celebración
                </label>
                <input
                  type="text"
                  value={form.lugar_celebracion}
                  onChange={handleChange('lugar_celebracion')}
                  className="w-full px-4 py-2.5 rounded-xl border border-beige-claro
                             font-sans text-sm text-azul-oscuro
                             focus:outline-none focus:ring-2 focus:ring-azul-oscuro/20
                             focus:border-azul-oscuro transition-all"
                />
              </div>
            </div>

            <div>
              <label className="font-sans text-xs text-marron/60 uppercase
                                tracking-wide mb-1.5 block">
                Estilo
              </label>
              <input
                type="text"
                value={form.estilo}
                onChange={handleChange('estilo')}
                className="w-full px-4 py-2.5 rounded-xl border border-beige-claro
                           font-sans text-sm text-azul-oscuro
                           focus:outline-none focus:ring-2 focus:ring-azul-oscuro/20
                           focus:border-azul-oscuro transition-all"
              />
            </div>

            <div>
              <label className="font-sans text-xs text-marron/60 uppercase
                                tracking-wide mb-1.5 block">
                Notas
              </label>
              <textarea
                value={form.notas}
                onChange={handleChange('notas')}
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl border border-beige-claro
                           font-sans text-sm text-azul-oscuro resize-none
                           focus:outline-none focus:ring-2 focus:ring-azul-oscuro/20
                           focus:border-azul-oscuro transition-all"
              />
            </div>

            {/* Plan y estado */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-sans text-xs text-marron/60 uppercase
                                  tracking-wide mb-1.5 block">
                  Plan
                </label>
                <select
                  value={form.plan}
                  onChange={handleChange('plan')}
                  className="w-full px-4 py-2.5 rounded-xl border border-beige-claro
                             font-sans text-sm text-azul-oscuro bg-white
                             focus:outline-none focus:ring-2 focus:ring-azul-oscuro/20"
                >
                  {PLANES.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-sans text-xs text-marron/60 uppercase
                                  tracking-wide mb-1.5 block">
                  Estado
                </label>
                <select
                  value={form.estado}
                  onChange={handleChange('estado')}
                  className="w-full px-4 py-2.5 rounded-xl border border-beige-claro
                             font-sans text-sm text-azul-oscuro bg-white
                             focus:outline-none focus:ring-2 focus:ring-azul-oscuro/20"
                >
                  {ESTADOS.map((e) => (
                    <option key={e.value} value={e.value}>{e.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tipo de cobro */}
            <div>
              <label className="font-sans text-xs text-marron/60 uppercase
                                tracking-wide mb-2 block">
                Forma de pago
              </label>
              <div className="flex flex-col gap-2">
                {TIPOS_COBRO.map((tipo) => (
                  <label
                    key={tipo.value}
                    className={`flex items-start gap-3 px-4 py-3 rounded-xl border
                               cursor-pointer transition-colors
                               ${form.tipoCobro === tipo.value
                                  ? 'border-azul-oscuro bg-azul-oscuro/5'
                                  : 'border-beige-claro hover:bg-crema/40'}`}
                  >
                    <input
                      type="radio"
                      name="tipoCobro"
                      value={tipo.value}
                      checked={form.tipoCobro === tipo.value}
                      onChange={handleChange('tipoCobro')}
                      className="mt-1"
                    />
                    <div>
                      <p className="font-sans text-sm text-azul-oscuro font-medium">
                        {tipo.label}
                      </p>
                      <p className="font-sans text-xs text-marron/60">
                        {tipo.description}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Importes, solo si es cobro manual */}
            {!esSinCoste && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-sans text-xs text-marron/60 uppercase
                                    tracking-wide mb-1.5 block">
                    Importe total (€)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.importe_total}
                    onChange={handleChange('importe_total')}
                    className="w-full px-4 py-2.5 rounded-xl border border-beige-claro
                               font-sans text-sm text-azul-oscuro
                               focus:outline-none focus:ring-2 focus:ring-azul-oscuro/20
                               focus:border-azul-oscuro transition-all"
                  />
                </div>
                <div>
                  <label className="font-sans text-xs text-marron/60 uppercase
                                    tracking-wide mb-1.5 block">
                    Importe ya pagado (€)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.importe_pagado}
                    onChange={handleChange('importe_pagado')}
                    className="w-full px-4 py-2.5 rounded-xl border border-beige-claro
                               font-sans text-sm text-azul-oscuro
                               focus:outline-none focus:ring-2 focus:ring-azul-oscuro/20
                               focus:border-azul-oscuro transition-all"
                  />
                </div>
              </div>
            )}

            {esSinCoste && (
              <div className="bg-tierra/10 border border-tierra/20 rounded-xl
                              px-4 py-3 font-sans text-xs text-tierra">
                Esta orden se guardará con importe 0€ y no se incluirá en
                ingresos, ticket medio ni el resto de estadísticas del panel.
              </div>
            )}

            {/* Acciones */}
            <div className="flex items-center justify-end gap-3 pt-2
                            border-t border-beige-claro">
              <button
                type="button"
                onClick={handleClose}
                disabled={guardando}
                className="px-4 py-2.5 rounded-xl font-sans text-sm
                           text-marron/70 hover:bg-crema transition-colors
                           disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={guardando}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                           bg-azul-oscuro text-crema font-sans text-sm
                           hover:bg-beige-claro hover:text-azul-oscuro
                           transition-colors disabled:opacity-60"
              >
                {guardando && <Loader2 size={14} className="animate-spin" />}
                {guardando ? 'Guardando...' : 'Añadir cliente'}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ModalNuevaOrden