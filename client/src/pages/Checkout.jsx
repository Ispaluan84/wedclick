import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  User, Mail, Phone, MapPin, Calendar,
  Users, MessageCircle, Clock,
  ChevronRight, ChevronLeft, Heart,
  Smartphone, Star, Zap, Check
} from 'lucide-react'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
})

const planesInfo = {
  esencial: {
    nombre:  'Esencial',
    precio:  149,
    icono:   Heart,
    incluye: [
      'Diseño 100% personalizado',
      'Cuenta atrás hasta el gran día',
      'Historia de amor y carta de novios',
      'Ubicaciones con mapa interactivo',
      'Itinerario hora a hora',
      'Dress code con paleta de colores',
      'Confirmación de asistencia',
      'Playlist colaborativa',
      'Enlace único compartible',
      'Una ronda de revisión',
    ],
  },
  premium: {
    nombre:  'Premium',
    precio:  249,
    icono:   Star,
    incluye: [
      'Todo lo del plan Esencial',
      'QR personalizado por invitado/pareja',
      'Sobre animado con nombre del invitado',
      'Animación de apertura tipo carta',
      'Sello personalizado con fecha',
      'Dos rondas de revisión',
    ],
  },
  lanzamiento: {
    nombre:  'Lanzamiento',
    precio:  299,
    icono:   Zap,
    incluye: [
      'Todo lo del plan Premium',
      'Álbum colaborativo de fotos',
      '2 meses de hosting del álbum',
      'Álbum en alta resolución al finalizar',
      'Tres rondas de revisión',
    ],
  },
}

const estilos = [
  'Romántico y clásico',
  'Moderno y minimalista',
  'Rústico y natural',
  'Bohemio y floral',
  'Elegante y sofisticado',
  'Otro',
]

const canales = [
  { value: 'whatsapp', label: 'WhatsApp', emoji: '💬' },
  { value: 'telefono', label: 'Teléfono', emoji: '📞' },
  { value: 'email',    label: 'Email',    emoji: '📧' },
]

const horarios = [
  'Mañanas (9:00 - 13:00)',
  'Tardes (15:00 - 19:00)',
  'Cualquier hora',
]

/* ─────────────────────────────────────────────
   Formulario de pago Stripe
   ───────────────────────────────────────────── */
function FormularioPago({ plan, mitad, onBack }) {
  const stripe   = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setError('')

    try {
      const { error: stripeError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
      })

      if (stripeError) {
        setError(stripeError.message)
        setLoading(false)
      }

    } catch (err) {
      setError('Ha ocurrido un error. Por favor inténtalo de nuevo.')
      setLoading(false)
    }
  }

  return (
    <motion.div {...fadeUp(0)}>

      {/* Header con botón volver */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={onBack}
          type="button"
          className="w-10 h-10 rounded-full bg-crema border border-beige-claro
                     flex items-center justify-center hover:bg-beige-claro
                     transition-colors"
        >
          <ChevronLeft size={18} className="text-azul-oscuro" />
        </button>
        <h2 className="font-serif text-2xl text-azul-oscuro">
          Pago seguro
        </h2>
      </div>

      {/* Resumen del pago */}
      <div className="bg-crema rounded-2xl p-6 border border-beige-claro mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="font-sans text-sm text-marron">
            Plan {plan.nombre}
          </span>
          <span className="font-sans text-sm text-azul-oscuro font-medium">
            {plan.precio}€ total
          </span>
        </div>
        <div className="flex items-center justify-between pt-4
                        border-t border-beige-claro">
          <div>
            <span className="font-sans text-sm font-semibold text-azul-oscuro">
              Reserva ahora (50%)
            </span>
            <p className="font-sans text-xs text-marron/60 mt-0.5">
              Resto a la entrega del proyecto
            </p>
          </div>
          <span className="font-serif text-2xl font-bold text-azul-oscuro">
            {mitad}€
          </span>
        </div>
      </div>

      {/* Formulario Stripe */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <PaymentElement />

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-sans text-sm text-red-500 text-center"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full py-4 rounded-2xl bg-azul-oscuro text-crema
                     font-sans font-semibold text-sm uppercase tracking-wide
                     border border-beige-claro
                     hover:bg-beige-claro hover:text-azul-oscuro
                     transition-colors duration-300 shadow-md
                     disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-crema/30 border-t-crema
                              rounded-full animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              🔒 Pagar {mitad}€ de reserva
            </>
          )}
        </button>

        <p className="font-sans text-xs text-marron/50 text-center">
          Pago seguro procesado por Stripe.
          Tus datos están protegidos con cifrado SSL.
        </p>
      </form>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Componente principal — Checkout
   ───────────────────────────────────────────── */
function Checkout() {
  const { plan: planId } = useParams()
  const navigate         = useNavigate()
  const plan             = planesInfo[planId]

  const [paso, setPaso]                   = useState(1)
  const [clientSecret, setClientSecret]   = useState('')
  const [mitad, setMitad]                 = useState(0)
  const [loading, setLoading]             = useState(false)
  const [error, setError]                 = useState('')

  const [formulario, setFormulario] = useState({
    novio1:           '',
    novio2:           '',
    fechaBoda:        '',
    numInvitados:     '',
    lugarCeremonia:   '',
    lugarCelebracion: '',
    estilo:           '',
    email:            '',
    telefono:         '',
    canalContacto:    'whatsapp',
    horarioContacto:  '',
    notas:            '',
  })

  // Plan no encontrado
  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-crema">
        <div className="text-center">
          <h2 className="font-serif text-2xl text-azul-oscuro mb-4">
            Plan no encontrado
          </h2>
          <button
            onClick={() => navigate('/landing#precios')}
            className="font-sans text-sm text-marron hover:text-azul-oscuro
                       transition-colors"
          >
            ← Volver a precios
          </button>
        </div>
      </div>
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormulario((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitFormulario = async (e) => {
    e.preventDefault()
    setError('')

    // Validación
    const requeridos = [
      'novio1', 'novio2', 'fechaBoda', 'email',
      'telefono', 'numInvitados', 'lugarCeremonia',
      'lugarCelebracion', 'estilo', 'horarioContacto',
    ]

    for (const campo of requeridos) {
      if (!formulario[campo].trim()) {
        setError('Por favor rellena todos los campos obligatorios')
        return
      }
    }

    setLoading(true)

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/checkout/create-payment-intent`,
        { plan: planId, formulario }
      )

      setClientSecret(data.clientSecret)
      setMitad(data.amount / 100)
      setPaso(2)

    } catch (err) {
      setError('Error al conectar con el servidor. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const Icono = plan.icono

  return (
    <div className="min-h-screen bg-crema py-12 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header con logo y pasos */}
        <motion.div {...fadeUp(0)} className="text-center mb-12">
          <a href="/" className="inline-block mb-6">
            <img
              src="/Logo_WedClick.png"
              alt="WedClick"
              className="h-12 mx-auto"
            />
          </a>

          {/* Indicador de pasos */}
          <div className="flex items-center justify-center gap-3">
            <div className={`flex items-center gap-2
                            ${paso >= 1 ? 'opacity-100' : 'opacity-40'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center
                              font-sans text-sm font-bold
                              ${paso >= 1
                                ? 'bg-azul-oscuro text-crema'
                                : 'bg-beige-claro text-marron'}`}>
                1
              </div>
              <span className="font-sans text-sm text-azul-oscuro hidden sm:block">
                Tus datos
              </span>
            </div>

            <div className="w-12 h-px bg-beige-claro" />

            <div className={`flex items-center gap-2
                            ${paso >= 2 ? 'opacity-100' : 'opacity-40'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center
                              font-sans text-sm font-bold
                              ${paso >= 2
                                ? 'bg-azul-oscuro text-crema'
                                : 'bg-beige-claro text-marron'}`}>
                2
              </div>
              <span className="font-sans text-sm text-azul-oscuro hidden sm:block">
                Pago
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Columna izquierda — Resumen del plan */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-beige-claro
                            sticky top-8">

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-azul-oscuro/10
                                flex items-center justify-center">
                  <Icono size={20} className="text-azul-oscuro" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-azul-oscuro">
                    Plan {plan.nombre}
                  </h3>
                  <p className="font-sans text-xs text-marron">
                    {plan.precio}€ total
                  </p>
                </div>
              </div>

              {/* Desglose 50/50 */}
              <div className="flex items-center justify-between p-4 bg-crema
                              rounded-2xl border border-beige-claro mb-6">
                <div>
                  <p className="font-sans text-xs text-marron">Pagas ahora</p>
                  <p className="font-serif text-2xl text-azul-oscuro font-bold">
                    {plan.precio / 2}€
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-sans text-xs text-marron">A la entrega</p>
                  <p className="font-serif text-2xl text-marron/40 font-bold">
                    {plan.precio / 2}€
                  </p>
                </div>
              </div>

              {/* Lista de lo que incluye */}
              <ul className="flex flex-col gap-2">
                {plan.incluye.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check size={14} className="text-verde-suave mt-0.5 flex-shrink-0" />
                    <span className="font-sans text-xs text-marron">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Columna derecha — Formulario / Pago */}
          <motion.div {...fadeUp(0.2)} className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-beige-claro">

              <AnimatePresence mode="wait">

                {/* ── Paso 1 — Formulario de datos ── */}
                {paso === 1 && (
                  <motion.div
                    key="formulario"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="font-serif text-2xl text-azul-oscuro mb-2">
                      Cuéntanos sobre vuestra boda
                    </h2>
                    <p className="font-sans text-sm text-marron mb-8">
                      Esta información nos ayudará a empezar a crear vuestra
                      invitación perfecta.
                    </p>

                    <form onSubmit={handleSubmitFormulario} className="flex flex-col gap-8">

                      {/* ── Nombres ── */}
                      <div>
                        <h3 className="font-sans text-xs tracking-widest uppercase
                                       text-marron/60 mb-4 flex items-center gap-2">
                          <span>💑</span> Los novios
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="font-sans text-xs text-marron
                                             tracking-wide uppercase mb-1.5 block">
                              Nombre novio/a 1 *
                            </label>
                            <div className="relative">
                              <User size={16} className="absolute left-4 top-1/2
                                                         -translate-y-1/2 text-gray-400" />
                              <input
                                type="text"
                                name="novio1"
                                value={formulario.novio1}
                                onChange={handleChange}
                                placeholder="Elena"
                                className="w-full pl-11 pr-4 py-3 rounded-xl
                                           border border-beige-claro bg-crema/30
                                           font-sans text-sm text-azul-oscuro
                                           placeholder:text-gray-300
                                           focus:outline-none focus:ring-2
                                           focus:ring-azul-oscuro/20
                                           focus:border-azul-oscuro transition-all"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="font-sans text-xs text-marron
                                             tracking-wide uppercase mb-1.5 block">
                              Nombre novio/a 2 *
                            </label>
                            <div className="relative">
                              <User size={16} className="absolute left-4 top-1/2
                                                         -translate-y-1/2 text-gray-400" />
                              <input
                                type="text"
                                name="novio2"
                                value={formulario.novio2}
                                onChange={handleChange}
                                placeholder="Marcos"
                                className="w-full pl-11 pr-4 py-3 rounded-xl
                                           border border-beige-claro bg-crema/30
                                           font-sans text-sm text-azul-oscuro
                                           placeholder:text-gray-300
                                           focus:outline-none focus:ring-2
                                           focus:ring-azul-oscuro/20
                                           focus:border-azul-oscuro transition-all"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ── Fecha y número de invitados ── */}
                      <div>
                        <h3 className="font-sans text-xs tracking-widest uppercase
                                       text-marron/60 mb-4 flex items-center gap-2">
                          <span>📅</span> La boda
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="font-sans text-xs text-marron
                                             tracking-wide uppercase mb-1.5 block">
                              Fecha de la boda *
                            </label>
                            <div className="relative">
                              <Calendar size={16} className="absolute left-4 top-1/2
                                                             -translate-y-1/2 text-gray-400" />
                              <input
                                type="date"
                                name="fechaBoda"
                                value={formulario.fechaBoda}
                                onChange={handleChange}
                                className="w-full pl-11 pr-4 py-3 rounded-xl
                                           border border-beige-claro bg-crema/30
                                           font-sans text-sm text-azul-oscuro
                                           focus:outline-none focus:ring-2
                                           focus:ring-azul-oscuro/20
                                           focus:border-azul-oscuro transition-all"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="font-sans text-xs text-marron
                                             tracking-wide uppercase mb-1.5 block">
                              Número de invitados *
                            </label>
                            <div className="relative">
                              <Users size={16} className="absolute left-4 top-1/2
                                                          -translate-y-1/2 text-gray-400" />
                              <input
                                type="number"
                                name="numInvitados"
                                value={formulario.numInvitados}
                                onChange={handleChange}
                                placeholder="150"
                                min="1"
                                className="w-full pl-11 pr-4 py-3 rounded-xl
                                           border border-beige-claro bg-crema/30
                                           font-sans text-sm text-azul-oscuro
                                           placeholder:text-gray-300
                                           focus:outline-none focus:ring-2
                                           focus:ring-azul-oscuro/20
                                           focus:border-azul-oscuro transition-all"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ── Lugares ── */}
                      <div>
                        <h3 className="font-sans text-xs tracking-widest uppercase
                                       text-marron/60 mb-4 flex items-center gap-2">
                          <span>📍</span> Lugares
                        </h3>
                        <div className="flex flex-col gap-4">
                          <div>
                            <label className="font-sans text-xs text-marron
                                             tracking-wide uppercase mb-1.5 block">
                              Lugar de la ceremonia *
                            </label>
                            <div className="relative">
                              <MapPin size={16} className="absolute left-4 top-1/2
                                                           -translate-y-1/2 text-gray-400" />
                              <input
                                type="text"
                                name="lugarCeremonia"
                                value={formulario.lugarCeremonia}
                                onChange={handleChange}
                                placeholder="Iglesia de Santa María, Sevilla"
                                className="w-full pl-11 pr-4 py-3 rounded-xl
                                           border border-beige-claro bg-crema/30
                                           font-sans text-sm text-azul-oscuro
                                           placeholder:text-gray-300
                                           focus:outline-none focus:ring-2
                                           focus:ring-azul-oscuro/20
                                           focus:border-azul-oscuro transition-all"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="font-sans text-xs text-marron
                                             tracking-wide uppercase mb-1.5 block">
                              Lugar de la celebración *
                            </label>
                            <div className="relative">
                              <MapPin size={16} className="absolute left-4 top-1/2
                                                           -translate-y-1/2 text-gray-400" />
                              <input
                                type="text"
                                name="lugarCelebracion"
                                value={formulario.lugarCelebracion}
                                onChange={handleChange}
                                placeholder="Hacienda El Esparragal, Sevilla"
                                className="w-full pl-11 pr-4 py-3 rounded-xl
                                           border border-beige-claro bg-crema/30
                                           font-sans text-sm text-azul-oscuro
                                           placeholder:text-gray-300
                                           focus:outline-none focus:ring-2
                                           focus:ring-azul-oscuro/20
                                           focus:border-azul-oscuro transition-all"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ── Estilo ── */}
                      <div>
                        <h3 className="font-sans text-xs tracking-widest uppercase
                                       text-marron/60 mb-4 flex items-center gap-2">
                          <span>🎨</span> Estilo
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {estilos.map((estilo) => (
                            <button
                              key={estilo}
                              type="button"
                              onClick={() => setFormulario((prev) => ({ ...prev, estilo }))}
                              className={`py-2.5 px-3 rounded-xl border font-sans text-xs
                                         transition-all text-center
                                         ${formulario.estilo === estilo
                                           ? 'bg-azul-oscuro text-crema border-azul-oscuro'
                                           : 'bg-crema/30 text-marron border-beige-claro hover:border-azul-oscuro/30'
                                         }`}
                            >
                              {estilo}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* ── Contacto ── */}
                      <div>
                        <h3 className="font-sans text-xs tracking-widest uppercase
                                       text-marron/60 mb-4 flex items-center gap-2">
                          <span>📞</span> Contacto
                        </h3>
                        <div className="flex flex-col gap-4">

                          {/* Email y teléfono */}
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <label className="font-sans text-xs text-marron
                                               tracking-wide uppercase mb-1.5 block">
                                Email *
                              </label>
                              <div className="relative">
                                <Mail size={16} className="absolute left-4 top-1/2
                                                           -translate-y-1/2 text-gray-400" />
                                <input
                                  type="email"
                                  name="email"
                                  value={formulario.email}
                                  onChange={handleChange}
                                  placeholder="elena@email.com"
                                  className="w-full pl-11 pr-4 py-3 rounded-xl
                                             border border-beige-claro bg-crema/30
                                             font-sans text-sm text-azul-oscuro
                                             placeholder:text-gray-300
                                             focus:outline-none focus:ring-2
                                             focus:ring-azul-oscuro/20
                                             focus:border-azul-oscuro transition-all"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="font-sans text-xs text-marron
                                               tracking-wide uppercase mb-1.5 block">
                                Teléfono *
                              </label>
                              <div className="relative">
                                <Phone size={16} className="absolute left-4 top-1/2
                                                            -translate-y-1/2 text-gray-400" />
                                <input
                                  type="tel"
                                  name="telefono"
                                  value={formulario.telefono}
                                  onChange={handleChange}
                                  placeholder="+34 600 000 000"
                                  className="w-full pl-11 pr-4 py-3 rounded-xl
                                             border border-beige-claro bg-crema/30
                                             font-sans text-sm text-azul-oscuro
                                             placeholder:text-gray-300
                                             focus:outline-none focus:ring-2
                                             focus:ring-azul-oscuro/20
                                             focus:border-azul-oscuro transition-all"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Canal de contacto */}
                          <div>
                            <label className="font-sans text-xs text-marron
                                             tracking-wide uppercase mb-1.5 block">
                              ¿Cómo preferís que os contactemos? *
                            </label>
                            <div className="flex gap-3">
                              {canales.map((canal) => (
                                <button
                                  key={canal.value}
                                  type="button"
                                  onClick={() => setFormulario((prev) => ({
                                    ...prev, canalContacto: canal.value,
                                  }))}
                                  className={`flex-1 py-3 px-4 rounded-xl border
                                             font-sans text-sm transition-all
                                             flex items-center justify-center gap-2
                                             ${formulario.canalContacto === canal.value
                                               ? 'bg-azul-oscuro text-crema border-azul-oscuro'
                                               : 'bg-crema/30 text-marron border-beige-claro hover:border-azul-oscuro/30'
                                             }`}
                                >
                                  <span>{canal.emoji}</span>
                                  <span className="hidden sm:block">{canal.label}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Horario */}
                          <div>
                            <label className="font-sans text-xs text-marron
                                             tracking-wide uppercase mb-1.5 block">
                              Horario preferido de contacto *
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                              {horarios.map((horario) => (
                                <button
                                  key={horario}
                                  type="button"
                                  onClick={() => setFormulario((prev) => ({
                                    ...prev, horarioContacto: horario,
                                  }))}
                                  className={`py-2.5 px-3 rounded-xl border font-sans text-xs
                                             transition-all text-center
                                             flex items-center justify-center gap-1
                                             ${formulario.horarioContacto === horario
                                               ? 'bg-azul-oscuro text-crema border-azul-oscuro'
                                               : 'bg-crema/30 text-marron border-beige-claro hover:border-azul-oscuro/30'
                                             }`}
                                >
                                  <Clock size={12} />
                                  {horario}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ── Notas ── */}
                      <div>
                        <label className="font-sans text-xs text-marron
                                         tracking-wide uppercase mb-1.5 block">
                          Notas adicionales / Ideas
                        </label>
                        <textarea
                          name="notas"
                          value={formulario.notas}
                          onChange={handleChange}
                          placeholder="Contadnos cualquier idea, detalle especial o referencia que tengáis en mente..."
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl border border-beige-claro
                                     bg-crema/30 font-sans text-sm text-azul-oscuro
                                     placeholder:text-gray-300 resize-none
                                     focus:outline-none focus:ring-2
                                     focus:ring-azul-oscuro/20
                                     focus:border-azul-oscuro transition-all"
                        />
                      </div>

                      {/* Error */}
                      <AnimatePresence>
                        {error && (
                          <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="font-sans text-sm text-red-500 text-center"
                          >
                            {error}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      {/* Botón continuar */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-2xl bg-azul-oscuro text-crema
                                   font-sans font-semibold text-sm uppercase tracking-wide
                                   border border-beige-claro
                                   hover:bg-beige-claro hover:text-azul-oscuro
                                   transition-colors duration-300 shadow-md
                                   disabled:opacity-50 disabled:cursor-not-allowed
                                   flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-crema/30
                                            border-t-crema rounded-full animate-spin" />
                            Preparando pago...
                          </>
                        ) : (
                          <>
                            Continuar al pago
                            <ChevronRight size={16} />
                          </>
                        )}
                      </button>

                      <p className="font-sans text-xs text-marron/50 text-center">
                        * Campos obligatorios
                      </p>

                    </form>
                  </motion.div>
                )}

                {/* ── Paso 2 — Pago Stripe ── */}
                {paso === 2 && clientSecret && (
                  <motion.div
                    key="pago"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Elements
                      stripe={stripePromise}
                      options={{
                        clientSecret,
                        appearance: {
                          theme: 'stripe',
                          variables: {
                            colorPrimary:    '#243763',
                            colorBackground: '#F1EFE6',
                            colorText:       '#243763',
                            borderRadius:    '12px',
                            fontFamily:      'Inter, sans-serif',
                          },
                        },
                      }}
                    >
                      <FormularioPago
                        plan={plan}
                        mitad={mitad}
                        onBack={() => setPaso(1)}
                      />
                    </Elements>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Checkout