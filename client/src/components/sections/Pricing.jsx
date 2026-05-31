import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Timer, BookOpen, MapPin, ClipboardList, Music2, QrCode,
  Smartphone, CheckCircle, Images, MessageCircle,
  Shirt, Clock, Heart, Camera, Check, Sparkles,
  Mail, Star, Zap,
} from 'lucide-react'

const planes = [
  {
    id:          'esencial',
    nombre:      'Esencial',
    precio:      '149',
    descripcion: 'Todo lo que necesitáis para una invitación digital elegante y completa.',
    icono:       Heart,
    featured:    false,
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
    featured:    true,
    badge:       'Más popular',
    incluye: [
      { icono: Heart,       texto: 'Todo lo del plan Esencial'            },
      { icono: QrCode,      texto: 'QR personalizado por invitado/pareja' },
      { icono: Mail,        texto: 'Sobre animado con nombre del invitado'},
      { icono: Star,        texto: 'Animación de apertura tipo carta'     },
      { icono: Sparkles,    texto: 'Sello personalizado con fecha'        },
      { icono: CheckCircle, texto: 'Dos rondas de revisión'               },
    ],
    noIncluye: ['Álbum colaborativo de fotos'],
    cta: 'Solicitar plan Premium',
  },
  {
    id:          'lanzamiento',
    nombre:      'Lanzamiento',
    precio:      '299',
    descripcion: 'Oferta exclusiva de estreno. Todo Premium más álbum colaborativo con hosting incluido.',
    icono:       Zap,
    featured:    false,
    badge:       '🎁 Oferta de estreno',
    incluye: [
      { icono: Heart,       texto: 'Todo lo del plan Premium'             },
      { icono: Camera,      texto: 'Álbum colaborativo de fotos'          },
      { icono: Images,      texto: '2 meses de hosting del álbum'         },
      { icono: Images,      texto: 'Álbum en alta resolución al finalizar'},
      { icono: CheckCircle, texto: 'Tres rondas de revisión'              },
    ],
    noIncluye: [],
    cta: 'Solicitar oferta de lanzamiento',
  },
]

function PlanCard({ plan, index }) {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.19, 1, 0.22, 1] }}
      className={`relative flex flex-col p-10 border transition-all duration-400 group
                  hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(26,20,16,0.08)]
                  ${plan.featured
                    ? 'bg-ink border-w-gold text-cream'
                    : 'bg-paper border-w-gold-light hover:border-w-gold/50'}`}
      data-hover
    >
      {/* Badge */}
      {(plan.badge || plan.featured) && (
        <span className={`absolute -top-px left-1/2 -translate-x-1/2
                          font-sans text-[0.52rem] tracking-[0.16em] uppercase px-5 py-1.5
                          ${plan.featured ? 'bg-w-gold text-ink' : 'bg-ink text-cream'}`}>
          {plan.badge || 'Más popular'}
        </span>
      )}

      {/* Nombre */}
      <p className={`font-sans text-[0.62rem] tracking-[0.2em] uppercase mb-6 mt-2
                     ${plan.featured ? 'text-w-gold' : 'text-warm-gray'}`}>
        {plan.nombre}
      </p>

      {/* Precio */}
      <div className="flex items-baseline gap-1 mb-4">
        <span className="font-serif text-xl text-w-gold">€</span>
        <span className={`font-serif text-6xl font-bold leading-none
                          ${plan.featured ? 'text-cream' : 'text-ink'}`}>
          {plan.precio}
        </span>
      </div>

      <p className={`font-sans font-light text-[0.82rem] leading-relaxed mb-8
                     ${plan.featured ? 'text-cream/70' : 'text-warm-gray'}`}>
        {plan.descripcion}
      </p>

      <div className={`w-full h-px mb-8 ${plan.featured ? 'bg-white/10' : 'bg-w-gold-light'}`} />

      {/* Features */}
      <ul className="flex-1 flex flex-col gap-3 mb-10 list-none">
        {plan.incluye.map((item) => (
          <li key={item.texto} className="flex items-start gap-3">
            <span className="mt-[6px] w-3.5 h-px bg-w-gold flex-shrink-0" />
            <span className={`font-sans font-light text-[0.82rem] leading-snug
                              ${plan.featured ? 'text-cream/85' : 'text-warm-gray'}`}>
              {item.texto}
            </span>
          </li>
        ))}
        {plan.noIncluye.map((item) => (
          <li key={item} className="flex items-start gap-3 opacity-35">
            <span className="mt-[6px] w-3.5 h-px bg-warm-gray flex-shrink-0" />
            <span className={`font-sans font-light text-[0.82rem] line-through
                              ${plan.featured ? 'text-cream/50' : 'text-warm-gray'}`}>
              {item}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={() => navigate(`/checkout/${plan.id}`)}
        className={`flex items-center justify-center gap-2 w-full
                   font-sans text-[0.65rem] tracking-[0.14em] uppercase py-4 border
                   transition-all duration-300
                   ${plan.featured
                     ? 'bg-w-gold border-w-gold text-ink hover:bg-cream hover:border-cream'
                     : 'bg-transparent border-w-gold-light text-ink hover:bg-w-gold hover:border-w-gold'}`}
      >
        <MessageCircle size={14} />
        {plan.cta}
      </button>
    </motion.div>
  )
}

function Pricing() {
  return (
    <section id="precios" className="bg-paper px-8 md:px-14 py-36 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="mb-20"
        >
          <p className="section-label mb-6" data-number="05">Precios</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-serif font-bold text-display-lg text-ink leading-[1.0]">
              Una inversión única para{' '}
              <em className="italic text-w-rose">un día irrepetible</em>
            </h2>
            <p className="font-sans font-light text-[0.88rem] text-warm-gray max-w-xs leading-relaxed">
              Sin sorpresas. Sin letra pequeña.
              Solo vuestra historia, bien contada.
            </p>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {planes.map((plan, index) => (
            <PlanCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>

        {/* Garantía */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center font-sans text-[0.62rem] tracking-[0.1em] uppercase
                     text-warm-gray mt-12"
        >
          ✦ &nbsp; Diseño 100% personalizado &nbsp; ✦ &nbsp; Cambios incluidos &nbsp; ✦ &nbsp; Soporte continuo
        </motion.p>

      </div>
    </section>
  )
}

export default Pricing
