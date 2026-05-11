import { Heart, Instagram, Mail, Phone, MapPin, Shield, Scale } from 'lucide-react'

function FooterLanding() {
  return (
    <footer className="bg-verde-oscuro text-crema">

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">

          {/* Columna 1 — Marca */}
          <div>
            <h3 className="font-serif text-2xl mb-4 text-crema">
              Wed<span className="text-tierra">Click</span>
            </h3>
            <p className="font-sans font-light text-crema/80 text-sm
                          leading-relaxed mb-6">
              Creamos invitaciones de boda digitales que enamoran.
              Cada detalle pensado para que vuestro gran día empiece
              desde el primer clic.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/wedclick"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-crema/10 hover:bg-crema/20
                           flex items-center justify-center transition-colors"
              >
                <Instagram size={18} className="text-crema" />
              </a>
              <a
                href="mailto:contacto@wedclick.es"
                className="w-10 h-10 rounded-full bg-crema/10 hover:bg-crema/20
                           flex items-center justify-center transition-colors"
              >
                <Mail size={18} className="text-crema" />
              </a>
            </div>
          </div>

          {/* Columna 2 — Navegación */}
          <div>
            <h4 className="font-sans text-xs tracking-widest uppercase
                           text-crema/50 mb-6">
              Navegación
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { href: '#como-funciona',   label: 'Cómo funciona'   },
                { href: '#invitacion',       label: 'La invitación'   },
                { href: '#precios',          label: 'Precios'         },
                { href: '#testimonios',      label: 'Testimonios'     },
                { href: '#faq',              label: 'FAQ'             },
                { href: '/landing#precios',  label: 'Ver demo'        },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-crema/80
                               hover:text-tierra transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3 — Contacto */}
          <div>
            <h4 className="font-sans text-xs tracking-widest uppercase
                           text-crema/50 mb-6">
              Contacto
            </h4>
            <ul className="flex flex-col gap-4 text-crema/80">
              <li className="flex items-center gap-3">
                <Phone size={16} className="flex-shrink-0" />
                <a
                  href="tel:+34628355913"
                  className="font-sans text-sm hover:text-tierra transition-colors"
                >
                  +34 628 355 913
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="flex-shrink-0" />
                <a
                  href="mailto:contacto@wedclick.es"
                  className="font-sans text-sm hover:text-tierra transition-colors"
                >
                  contacto@wedclick.es
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <span className="font-sans text-sm">Sevilla, España</span>
              </li>
            </ul>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/34628355913"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5
                         rounded-xl bg-tierra/60 hover:bg-tierra/80
                         text-crema text-sm font-sans transition-colors"
            >
              💬 WhatsApp directo
            </a>
          </div>

        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-tierra/30">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row
                        items-center justify-between gap-4">

          {/* Copyright */}
          <p className="font-sans text-xs text-crema/50">
            © {new Date().getFullYear()} WedClick. Todos los derechos reservados.
          </p>

          {/* Enlaces legales */}
          <div className="flex items-center gap-6">
            <a
              href="/privacidad"
              className="flex items-center gap-1.5 font-sans text-xs
                         text-crema/50 hover:text-crema transition-colors"
            >
              <Shield size={12} />
              Privacidad
            </a>
            <a
              href="/aviso-legal"
              className="flex items-center gap-1.5 font-sans text-xs
                         text-crema/50 hover:text-crema transition-colors"
            >
              <Scale size={12} />
              Aviso Legal
            </a>
          </div>

          {/* Hecho con amor */}
          <p className="font-sans text-xs text-crema/50 flex items-center gap-1">
            Hecho con <Heart size={12} className="text-tierra" fill="#C4956A" /> en Sevilla
          </p>

        </div>
      </div>
    </footer>
  )
}

export default FooterLanding