import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Timer, BookOpen, MapPin, ClipboardList, Music2, QrCode,
  Smartphone, CheckCircle, Images, MessageCircle,
  Shirt, Clock, Heart, Camera, Check, Sparkles,
  Mail, Star, Zap
} from 'lucide-react'

const WHATSAPP_NUMBER  = '34627147039'
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hola, me gustaría información sobre las invitaciones de boda de WedClick 💍'
)

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.8, delay, ease: 'easeOut' },
})

const planes = [
  {
    id:          'esencial',
    nombre:      'Esencial',
    precio:      '149',
    descripcion: 'Todo lo que necesitáis para una invitación digital elegante y completa.',
    icono:       Heart,
    color:       'verde-suave',
    destacado:   false,
    incluye: [
      { icono: Heart,         texto: 'Diseño 100% personalizado'           },
      { icono: Timer,         texto: 'Cuenta atrás hasta el gran día'      },
      { icono: BookOpen,      texto: 'Historia de amor y carta de novios'  },
      { icono: MapPin,        texto: 'Ubicaciones con mapa interactivo'    },
      { icono: Clock,         texto: 'Itinerario hora a hora'              },
      { icono: Shirt,         texto: 'Dress code con paleta de colores'    },
      { icono: ClipboardList, texto: 'Confirmación de asistencia'          },
      { icono: Music2,        texto: 'Playlist colaborativa'               },
      { icono: Smartphone,    texto: 'Enlace único compartible'            },
      { icono: CheckCircle,   texto: 'Una ronda de revisión'               },
    ],
    noIncluye: [
      'QR personalizado por invitado',
      'Sobre animado con nombre',
      'Álbum colaborativo de fotos',
    ],
    cta: 'Solicitar plan Esencial',
  },
  {
    id:          'premium',
    nombre:      'Premium',
    precio:      '249',
    descripcion: 'La experiencia completa con QR personalizado y sobre animado para cada invitado.',
    icono:       Mail,
    color:       'azul-oscuro',
    destacado:   true,
    incluye: [
      { icono: Heart,         texto: 'Todo lo del plan Esencial'           },
      { icono: QrCode,        texto: 'QR personalizado por invitado/pareja'},
      { icono: Mail,          texto: 'Sobre animado con nombre del invitado'},
      { icono: Star,          texto: 'Animación de apertura tipo carta'    },
      { icono: Sparkles,      texto: 'Sello personalizado con fecha'       },
      { icono: CheckCircle,   texto: 'Dos rondas de revisión'              },
    ],
    noIncluye: [
      'Álbum colaborativo de fotos',
    ],
    cta: 'Solicitar plan Premium',
  },
  {
    id:          'lanzamiento',
    nombre:      'Lanzamiento',
    precio:      '299',
    descripcion: 'Oferta exclusiva de estreno. Todo Premium más álbum colaborativo con hosting incluido.',
    icono:       Zap,
    color:       'tierra',
    destacado:   false,
    badge:       '🎁 Oferta de estreno',
    incluye: [
      { icono: Heart,         texto: 'Todo lo del plan Premium'            },
      { icono: Camera,        texto: 'Álbum colaborativo de fotos'         },
      { icono: Images,        texto: '2 meses de hosting del álbum'        },
      { icono: Images,        texto: 'Álbum en alta resolución al finalizar'},
      { icono: CheckCircle,   texto: 'Tres rondas de revisión'             },
    ],
    noIncluye: [],
    cta: 'Solicitar oferta de lanzamiento',
  },
]

function PlanCard({ plan, index }) {
  const navigate = useNavigate()
  const Icono = plan.icono

  const estilos = {
    'verde-suave': {
      bg:         'bg-blanco-roto',
      iconoBg:    'bg-verde-suave/10',
      iconoColor: 'text-verde-suave',
      badge:      'bg-verde-suave/10 text-verde-suave border-verde-suave/20',
      precio:     'text-verde-suave',
      check:      'text-verde-suave',
      btn:        'bg-verde-suave text-crema border border-verde-suave hover:bg-verde-suave/90',
    },
    'azul-oscuro': {
      bg:         'bg-azul-oscuro',
      iconoBg:    'bg-crema/10',
      iconoColor: 'text-crema',
      badge:      'bg-crema/10 text-crema border-crema/20',
      precio:     'text-crema',
      check:      'text-crema',
      btn:        'bg-crema text-azul-oscuro border border-beige-claro hover:bg-beige-claro',
    },
    'tierra': {
      bg:         'bg-blanco-roto',
      iconoBg:    'bg-tierra/10',
      iconoColor: 'text-tierra',
      badge:      'bg-tierra/10 text-tierra border-tierra/20',
      precio:     'text-tierra',
      check:      'text-tierra',
      btn:        'bg-tierra text-crema border border-tierra hover:bg-tierra/90',
    },
  }

  const s = estilos[plan.color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`relative rounded-3xl p-8 shadow-sm border border-black/5
                  flex flex-col gap-6 ${s.bg}
                  ${plan.destacado ? 'ring-2 ring-azul-oscuro ring-offset-2 scale-105' : ''}`}
    >
      {/* Badge destacado */}
      {plan.destacado && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-block font-sans text-xs tracking-widest uppercase
                           bg-azul-oscuro text-crema px-6 py-2 rounded-full shadow-sm">
            ⭐ Más popular
          </span>
        </div>
      )}

      {/* Badge oferta */}
      {plan.badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className={`inline-block font-sans text-xs tracking-widest uppercase
                           border px-6 py-2 rounded-full shadow-sm ${s.badge}`}>
            {plan.badge}
          </span>
        </div>
      )}

      {/* Cabecera */}
      <div className="flex items-center gap-4 mt-2">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${s.iconoBg}`}>
          <Icono size={22} className={s.iconoColor} />
        </div>
        <div>
          <h3 className={`font-serif text-xl ${plan.destacado ? 'text-crema' : 'text-azul-oscuro'}`}>
            {plan.nombre}
          </h3>
          <p className={`font-sans text-xs font-light ${plan.destacado ? 'text-crema/70' : 'text-marron'}`}>
            {plan.descripcion}
          </p>
        </div>
      </div>

      {/* Separador */}
      <div className={`w-full h-px ${plan.destacado ? 'bg-crema/20' : 'bg-black/5'}`} />

      {/* Precio */}
      <div className="flex items-end gap-1">
        <span className={`font-serif text-6xl font-bold ${s.precio}`}>
          {plan.precio}
        </span>
        <span className={`font-serif text-2xl mb-2 ${s.precio}`}>€</span>
      </div>

      {/* Lo que incluye */}
      <ul className="flex flex-col gap-2.5 flex-1">
        {plan.incluye.map((item) => {
          const ItemIcono = item.icono
          return (
            <li key={item.texto} className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center
                              flex-shrink-0 ${s.iconoBg}`}>
                <Check size={12} className={s.check} />
              </div>
              <span className={`font-sans text-sm ${plan.destacado ? 'text-crema/90' : 'text-marron'}`}>
                {item.texto}
              </span>
            </li>
          )
        })}

        {/* Lo que NO incluye */}
        {plan.noIncluye.map((item) => (
          <li key={item} className="flex items-center gap-3 opacity-40">
            <div className="w-5 h-5 rounded-full flex items-center justify-center
                            flex-shrink-0 bg-gray-200">
              <span className="text-[10px] text-gray-400">✕</span>
            </div>
            <span className={`font-sans text-sm line-through
                             ${plan.destacado ? 'text-crema/50' : 'text-marron/50'}`}>
              {item}
            </span>
          </li>
        ))}
      </ul>

      {/* Separador */}
      <div className={`w-full h-px ${plan.destacado ? 'bg-crema/20' : 'bg-black/5'}`} />

      {/* CTA */}
      <button
        onClick={() => navigate(`/checkout/${plan.id}`)}
        className={`flex items-center justify-center gap-2 w-full
                   font-sans font-semibold text-sm px-6 py-4 rounded-2xl
                   transition-all duration-300 shadow-sm hover:shadow-md
                   tracking-wide uppercase ${s.btn}`}
      >
        <MessageCircle size={16} />
        {plan.cta}
      </button>
    </motion.div>
  )
}

function Pricing() {
  return (
    <section id="precios" className="bg-blanco-roto py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Encabezado */}
        <motion.div {...fadeUp(0)} className="text-center mb-20">
          <span className="font-sans text-xs tracking-widest uppercase text-verde-suave mb-4 block">
            Precios
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-azul-oscuro mb-6">
            Una inversión única
            <br />
            <span className="italic text-tierra">para un día irrepetible</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-tierra opacity-50" />
            <span className="text-tierra text-lg">◆</span>
            <div className="w-12 h-px bg-tierra opacity-50" />
          </div>
          <p className="font-sans font-light text-marron max-w-xl mx-auto leading-relaxed">
            Sin sorpresas. Sin letra pequeña.
            Solo vuestra historia, bien contada.
          </p>
        </motion.div>

        {/* Grid de planes */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {planes.map((plan, index) => (
            <PlanCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing