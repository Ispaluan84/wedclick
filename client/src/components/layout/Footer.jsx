import { Heart, Instagram, Mail, Phone, MapPin, Shield, Scale } from 'lucide-react'
import { WHATSAPP_URL, PHONE_NUMBER } from '../../lib/contact'

function FooterLanding() {
  return (
    <footer className="bg-ink text-cream">

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-8 md:px-14 py-20">
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-14">

          {/* Columna 1 — Marca */}
          <div>
            <p className="font-serif italic text-[1.9rem] text-cream mb-4">Wedclick</p>
            <p className="font-sans font-light text-[0.82rem] leading-[1.85] text-warm-gray max-w-xs mb-8">
              Invitaciones digitales diseñadas para que el primer recuerdo de vuestra boda sea perfecto.
            </p>
            <span className="ornament-line mb-8 block" />
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/wedclick"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-warm-gray/30 flex items-center justify-center
                           hover:border-w-gold hover:text-w-gold transition-all duration-300"
                data-hover
              >
                <Instagram size={15} />
              </a>
              <a
                href="mailto:contacto@wedclick.es"
                className="w-9 h-9 border border-warm-gray/30 flex items-center justify-center
                           hover:border-w-gold hover:text-w-gold transition-all duration-300"
                data-hover
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Columna 2 — Navegación */}
          <div>
            <p className="font-sans text-[0.58rem] tracking-[0.2em] uppercase text-w-gold mb-6">
              Navegación
            </p>
            <ul className="flex flex-col gap-3 list-none">
              {[
                { href: '#como-funciona', label: 'Cómo funciona'  },
                { href: '#demo',          label: 'La invitación'  },
                { href: '#precios',       label: 'Precios'        },
                { href: '#testimonios',   label: 'Testimonios'    },
                { href: '#faq',           label: 'FAQ'            },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-sans font-light text-[0.82rem] text-warm-gray
                               hover:text-cream transition-colors duration-300"
                    data-hover
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3 — Servicio */}
          <div>
            <p className="font-sans text-[0.58rem] tracking-[0.2em] uppercase text-w-gold mb-6">
              Servicio
            </p>
            <ul className="flex flex-col gap-3 list-none">
              {['Plan Esencial', 'Plan Premium', 'Oferta Lanzamiento', 'Ver demo en vivo'].map((item) => (
                <li key={item}>
                  <a
                    href="#precios"
                    className="font-sans font-light text-[0.82rem] text-warm-gray
                               hover:text-cream transition-colors duration-300"
                    data-hover
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4 — Contacto */}
          <div>
            <p className="font-sans text-[0.58rem] tracking-[0.2em] uppercase text-w-gold mb-6">
              Contacto
            </p>
            <ul className="flex flex-col gap-4 text-warm-gray">
              <li className="flex items-center gap-3">
                <Phone size={14} className="flex-shrink-0 text-w-gold/60" />
                <a href={`tel:${PHONE_NUMBER.replace(/\s/g,'')}`}
                   className="font-sans font-light text-[0.82rem] hover:text-cream transition-colors"
                   data-hover>
                  {PHONE_NUMBER}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="flex-shrink-0 text-w-gold/60" />
                <a href="mailto:contacto@wedclick.es"
                   className="font-sans font-light text-[0.82rem] hover:text-cream transition-colors"
                   data-hover>
                  contacto@wedclick.es
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="flex-shrink-0 mt-0.5 text-w-gold/60" />
                <span className="font-sans font-light text-[0.82rem]">Sevilla, España</span>
              </li>
            </ul>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 font-sans text-[0.65rem]
                         tracking-[0.1em] uppercase px-5 py-3
                         border border-w-gold/40 text-w-gold hover:bg-w-gold hover:text-ink
                         transition-all duration-300"
              data-hover
            >
              💬 WhatsApp directo
            </a>
          </div>

        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-warm-dark/60">
        <div className="max-w-7xl mx-auto px-8 md:px-14 py-7
                        flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="font-sans text-[0.6rem] tracking-[0.06em] text-warm-gray/50">
            © {new Date().getFullYear()} WedClick. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-6">
            <a href="/privacidad"
               className="flex items-center gap-1.5 font-sans text-[0.58rem] tracking-[0.08em]
                          uppercase text-warm-gray/50 hover:text-warm-gray transition-colors"
               data-hover>
              <Shield size={11} /> Privacidad
            </a>
            <a href="/aviso-legal"
               className="flex items-center gap-1.5 font-sans text-[0.58rem] tracking-[0.08em]
                          uppercase text-warm-gray/50 hover:text-warm-gray transition-colors"
               data-hover>
              <Scale size={11} /> Aviso Legal
            </a>
          </div>

          <p className="font-sans text-[0.6rem] text-warm-gray/50 flex items-center gap-1">
            Hecho con <Heart size={11} className="text-w-gold" fill="#C9A96E" /> en Sevilla
          </p>
        </div>
      </div>

    </footer>
  )
}

export default FooterLanding
