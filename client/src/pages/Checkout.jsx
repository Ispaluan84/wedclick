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
  Smartphone, Star, Zap, Check, Loader2,
} from 'lucide-react'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
})

const planesInfo = {
  esencial: {
    nombre: 'Esencial', precio: 149, icono: Heart,
    incluye: [
      'Diseño 100% personalizado', 'Cuenta atrás hasta el gran día',
      'Historia de amor y carta de novios', 'Ubicaciones con mapa interactivo',
      'Itinerario hora a hora', 'Dress code con paleta de colores',
      'Confirmación de asistencia', 'Playlist colaborativa',
      'Enlace único compartible', 'Una ronda de revisión',
    ],
  },
  premium: {
    nombre: 'Premium', precio: 249, icono: Star,
    incluye: [
      'Todo lo del plan Esencial', 'QR personalizado por invitado/pareja',
      'Sobre animado con nombre del invitado', 'Animación de apertura tipo carta',
      'Sello personalizado con fecha', 'Dos rondas de revisión',
    ],
  },
  lanzamiento: {
    nombre: 'Lanzamiento', precio: 299, icono: Zap,
    incluye: [
      'Todo lo del plan Premium', 'Álbum colaborativo de fotos',
      '2 meses de hosting del álbum', 'Álbum en alta resolución al finalizar',
      'Tres rondas de revisión',
    ],
  },
}

const estilos  = ['Romántico y clásico','Moderno y minimalista','Rústico y natural','Bohemio y floral','Elegante y sofisticado','Otro']
const canales  = [{ value: 'whatsapp', label: 'WhatsApp', emoji: '💬' },{ value: 'telefono', label: 'Teléfono', emoji: '📞' },{ value: 'email', label: 'Email', emoji: '📧' }]
const horarios = ['Mañanas (9:00 - 13:00)','Tardes (15:00 - 19:00)','Cualquier hora']

// Estilos de input reutilizables
const inputCls = `w-full pl-11 pr-4 py-3 bg-transparent border-0 border-b border-ink/15
  font-sans text-sm text-ink placeholder:text-warm-gray/40
  focus:outline-none focus:border-w-gold transition-colors duration-300`

const labelCls = 'font-sans text-[0.6rem] tracking-[0.2em] uppercase text-warm-gray block mb-2'

/* ── Formulario de pago Stripe ── */
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
        confirmParams: { return_url: `${window.location.origin}/checkout/success` },
      })
      if (stripeError) { setError(stripeError.message); setLoading(false) }
    } catch {
      setError('Ha ocurrido un error. Por favor inténtalo de nuevo.')
      setLoading(false)
    }
  }

  return (
    <motion.div {...fadeUp(0)}>
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} type="button"
          className="w-9 h-9 border border-ink/15 flex items-center justify-center
                     hover:border-w-gold transition-colors duration-300">
          <ChevronLeft size={16} className="text-ink" />
        </button>
        <h2 className="font-serif text-2xl text-ink">Pago seguro</h2>
      </div>

      {/* Resumen */}
      <div className="border border-w-gold/20 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="font-sans text-sm font-light text-warm-gray">Plan {plan.nombre}</span>
          <span className="font-sans text-sm text-ink">{plan.precio}€ total</span>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-ink/8">
          <div>
            <span className="font-sans text-sm text-ink">Reserva ahora (50%)</span>
            <p className="font-sans text-xs text-warm-gray mt-0.5">Resto a la entrega</p>
          </div>
          <span className="font-serif text-2xl text-ink">{mitad}€</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <PaymentElement />
        {error && <p className="font-sans text-xs text-w-rose">{error}</p>}
        <button type="submit" disabled={!stripe || loading}
          className="group flex items-center justify-center gap-2 w-full py-4
                     bg-ink text-cream font-sans text-xs tracking-[0.15em] uppercase font-light
                     hover:bg-warm-dark transition-colors duration-300
                     disabled:opacity-40 disabled:cursor-not-allowed">
          {loading
            ? <><Loader2 size={13} className="animate-spin" /> Procesando...</>
            : <>🔒 Pagar {mitad}€ de reserva</>
          }
        </button>
        <p className="font-sans text-xs text-warm-gray/50 text-center">
          Pago seguro procesado por Stripe · Cifrado SSL
        </p>
      </form>
    </motion.div>
  )
}

/* ── Componente principal ── */
function Checkout() {
  const { plan: planId } = useParams()
  const navigate         = useNavigate()
  const plan             = planesInfo[planId]

  const [paso, setPaso]                 = useState(1)
  const [clientSecret, setClientSecret] = useState('')
  const [mitad, setMitad]               = useState(0)
  const [loading, setLoading]           = useState(false)
  const [error, setError]               = useState('')

  const [formulario, setFormulario] = useState({
    novio1: '', novio2: '', fechaBoda: '', numInvitados: '',
    lugarCeremonia: '', lugarCelebracion: '', estilo: '',
    email: '', telefono: '', canalContacto: 'whatsapp',
    horarioContacto: '', notas: '',
  })

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <div className="text-center">
          <h2 className="font-serif text-2xl text-ink mb-4">Plan no encontrado</h2>
          <button onClick={() => navigate('/#precios')}
            className="font-sans text-sm text-warm-gray hover:text-ink transition-colors">
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
    const requeridos = ['novio1','novio2','fechaBoda','email','telefono','numInvitados','lugarCeremonia','lugarCelebracion','estilo','horarioContacto']
    for (const campo of requeridos) {
      if (!formulario[campo].trim()) { setError('Por favor rellena todos los campos obligatorios'); return }
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
    } catch {
      setError('Error al conectar con el servidor. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const Icono = plan.icono

  return (
    <div className="min-h-screen bg-paper py-12 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div {...fadeUp(0)} className="text-center mb-14">
          <a href="/" className="inline-block mb-8">
            <img src="/Logo_WedClick.png" alt="WedClick" className="h-10 mx-auto" />
          </a>

          {/* Pasos */}
          <div className="flex items-center justify-center gap-4">
            {[{ n: 1, label: 'Tus datos' }, { n: 2, label: 'Pago' }].map((p, i) => (
              <div key={p.n} className="flex items-center gap-4">
                <div className={`flex items-center gap-2 transition-opacity duration-300 ${paso >= p.n ? 'opacity-100' : 'opacity-30'}`}>
                  <div className={`w-7 h-7 flex items-center justify-center font-sans text-xs
                    ${paso >= p.n ? 'bg-ink text-cream' : 'border border-ink/20 text-warm-gray'}`}>
                    {p.n}
                  </div>
                  <span className={`font-sans text-xs tracking-widest uppercase hidden sm:block
                    ${paso >= p.n ? 'text-ink' : 'text-warm-gray'}`}>
                    {p.label}
                  </span>
                </div>
                {i === 0 && <div className="w-10 h-px bg-ink/10" />}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Columna izquierda — resumen plan */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-1">
            <div className="border border-w-gold/20 p-6 sticky top-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 border border-w-gold/25 flex items-center justify-center">
                  <Icono size={16} className="text-w-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-ink">Plan {plan.nombre}</h3>
                  <p className="font-sans text-xs text-warm-gray">{plan.precio}€ total</p>
                </div>
              </div>

              {/* Desglose 50/50 */}
              <div className="flex items-center justify-between p-4 bg-cream mb-6">
                <div>
                  <p className="font-sans text-[10px] tracking-widest uppercase text-warm-gray">Pagas ahora</p>
                  <p className="font-serif text-xl text-ink">{plan.precio / 2}€</p>
                </div>
                <div className="text-right">
                  <p className="font-sans text-[10px] tracking-widest uppercase text-warm-gray">A la entrega</p>
                  <p className="font-serif text-xl text-warm-gray/50">{plan.precio / 2}€</p>
                </div>
              </div>

              {/* Incluye */}
              <ul className="flex flex-col gap-2.5">
                {plan.incluye.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="text-w-gold text-[10px] mt-1 flex-shrink-0">✦</span>
                    <span className="font-sans text-xs font-light text-warm-gray">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Columna derecha — formulario / pago */}
          <motion.div {...fadeUp(0.2)} className="lg:col-span-2">
            <div className="border border-ink/8 p-8 md:p-10 bg-paper">
              <AnimatePresence mode="wait">

                {/* ── Paso 1 ── */}
                {paso === 1 && (
                  <motion.div key="formulario"
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>

                    <h2 className="font-serif text-2xl text-ink mb-2">Cuéntanos sobre vuestra boda</h2>
                    <p className="font-sans font-light text-warm-gray text-sm mb-10">
                      Esta información nos ayudará a empezar a crear vuestra invitación perfecta.
                    </p>

                    <div className="flex flex-col gap-10">

                      {/* Nombres */}
                      <div>
                        <p className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-w-gold mb-6">Los novios</p>
                        <div className="grid sm:grid-cols-2 gap-6">
                          {[{ name: 'novio1', placeholder: 'Elena' }, { name: 'novio2', placeholder: 'Marcos' }].map((f, i) => (
                            <div key={f.name}>
                              <label className={labelCls}>Novio/a {i + 1} *</label>
                              <div className="relative">
                                <User size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-warm-gray/40" />
                                <input type="text" name={f.name} value={formulario[f.name]}
                                  onChange={handleChange} placeholder={f.placeholder} className={inputCls} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Fecha e invitados */}
                      <div>
                        <p className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-w-gold mb-6">La boda</p>
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div>
                            <label className={labelCls}>Fecha de la boda *</label>
                            <div className="relative">
                              <Calendar size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-warm-gray/40" />
                              <input type="date" name="fechaBoda" value={formulario.fechaBoda}
                                onChange={handleChange} className={inputCls} />
                            </div>
                          </div>
                          <div>
                            <label className={labelCls}>Número de invitados *</label>
                            <div className="relative">
                              <Users size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-warm-gray/40" />
                              <input type="number" name="numInvitados" value={formulario.numInvitados}
                                onChange={handleChange} placeholder="150" min="1" className={inputCls} />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Lugares */}
                      <div>
                        <p className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-w-gold mb-6">Lugares</p>
                        <div className="flex flex-col gap-6">
                          {[
                            { name: 'lugarCeremonia',   placeholder: 'Iglesia de Santa María, Sevilla',    label: 'Lugar de la ceremonia *' },
                            { name: 'lugarCelebracion', placeholder: 'Hacienda El Esparragal, Sevilla',   label: 'Lugar de la celebración *' },
                          ].map((f) => (
                            <div key={f.name}>
                              <label className={labelCls}>{f.label}</label>
                              <div className="relative">
                                <MapPin size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-warm-gray/40" />
                                <input type="text" name={f.name} value={formulario[f.name]}
                                  onChange={handleChange} placeholder={f.placeholder} className={inputCls} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Estilo */}
                      <div>
                        <p className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-w-gold mb-6">Estilo</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {estilos.map((estilo) => (
                            <button key={estilo} type="button"
                              onClick={() => setFormulario((prev) => ({ ...prev, estilo }))}
                              className={`py-3 px-3 border font-sans text-xs text-center transition-all duration-200
                                ${formulario.estilo === estilo
                                  ? 'bg-ink text-cream border-ink'
                                  : 'bg-transparent text-warm-gray border-ink/15 hover:border-w-gold/40'}`}>
                              {estilo}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Contacto */}
                      <div>
                        <p className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-w-gold mb-6">Contacto</p>
                        <div className="flex flex-col gap-6">
                          <div className="grid sm:grid-cols-2 gap-6">
                            {[
                              { name: 'email',    type: 'email', placeholder: 'elena@email.com',  Icon: Mail,  label: 'Email *' },
                              { name: 'telefono', type: 'tel',   placeholder: '+34 600 000 000', Icon: Phone, label: 'Teléfono *' },
                            ].map(({ name, type, placeholder, Icon, label }) => (
                              <div key={name}>
                                <label className={labelCls}>{label}</label>
                                <div className="relative">
                                  <Icon size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-warm-gray/40" />
                                  <input type={type} name={name} value={formulario[name]}
                                    onChange={handleChange} placeholder={placeholder} className={inputCls} />
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Canal */}
                          <div>
                            <label className={labelCls}>¿Cómo preferís que os contactemos? *</label>
                            <div className="flex gap-2">
                              {canales.map((canal) => (
                                <button key={canal.value} type="button"
                                  onClick={() => setFormulario((prev) => ({ ...prev, canalContacto: canal.value }))}
                                  className={`flex-1 py-3 px-3 border font-sans text-xs transition-all duration-200
                                    flex items-center justify-center gap-2
                                    ${formulario.canalContacto === canal.value
                                      ? 'bg-ink text-cream border-ink'
                                      : 'bg-transparent text-warm-gray border-ink/15 hover:border-w-gold/40'}`}>
                                  <span>{canal.emoji}</span>
                                  <span className="hidden sm:block">{canal.label}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Horario */}
                          <div>
                            <label className={labelCls}>Horario preferido de contacto *</label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                              {horarios.map((horario) => (
                                <button key={horario} type="button"
                                  onClick={() => setFormulario((prev) => ({ ...prev, horarioContacto: horario }))}
                                  className={`py-3 px-3 border font-sans text-xs text-center transition-all duration-200
                                    flex items-center justify-center gap-1.5
                                    ${formulario.horarioContacto === horario
                                      ? 'bg-ink text-cream border-ink'
                                      : 'bg-transparent text-warm-gray border-ink/15 hover:border-w-gold/40'}`}>
                                  <Clock size={11} />
                                  {horario}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Notas */}
                      <div>
                        <label className={labelCls}>Notas adicionales / Ideas</label>
                        <textarea name="notas" value={formulario.notas} onChange={handleChange}
                          placeholder="Contadnos cualquier idea, detalle especial o referencia..." rows={4}
                          className={`${inputCls} resize-none pl-0`} />
                      </div>

                      {error && <p className="font-sans text-xs text-w-rose">{error}</p>}

                      {/* Botón continuar */}
                      <button type="submit" onClick={handleSubmitFormulario} disabled={loading}
                        className="group flex items-center justify-center gap-2 w-full py-4
                                   bg-ink text-cream font-sans text-xs tracking-[0.15em] uppercase font-light
                                   hover:bg-warm-dark transition-colors duration-300
                                   disabled:opacity-40 disabled:cursor-not-allowed">
                        {loading
                          ? <><Loader2 size={13} className="animate-spin" /> Preparando pago...</>
                          : <>Continuar al pago <ChevronRight size={14} /></>
                        }
                      </button>

                      <p className="font-sans text-xs text-warm-gray/40 text-center">* Campos obligatorios</p>
                    </div>
                  </motion.div>
                )}

                {/* ── Paso 2 — Stripe ── */}
                {paso === 2 && clientSecret && (
                  <motion.div key="pago"
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <Elements stripe={stripePromise} options={{
                      clientSecret,
                      appearance: {
                        theme: 'stripe',
                        variables: {
                          colorPrimary:    '#1A1410',
                          colorBackground: '#FBF8F3',
                          colorText:       '#1A1410',
                          borderRadius:    '0px',
                          fontFamily:      'DM Sans, system-ui, sans-serif',
                        },
                      },
                    }}>
                      <FormularioPago plan={plan} mitad={mitad} onBack={() => setPaso(1)} />
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