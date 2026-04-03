export default function Footer() {
  const footerLinks = [
    { label: 'Cómo funciona',   href: '#como-funciona'  },
    { label: 'Características', href: '#caracteristicas' },
    { label: 'Demo',            href: '#demo'            },
    { label: 'Extras',          href: '#extras'          },
    { label: 'FAQ',             href: '#faq'             },
    { label: 'Contacto',        href: '#contacto'        },
  ]

  const legalLinks = ['Privacidad', 'Aviso legal']

  return (
    <footer className="bg-slateGray text-white py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-6">

        {/* Logo */}
        <span className="font-serif text-2xl">
          Wed<span className="text-goldAccent">Click</span>
        </span>

        {/* Enlaces de navegación */}
        <div className="flex gap-6 flex-wrap justify-center">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Línea separadora */}
        <div className="w-full h-px bg-white/10" />

        {/* Copyright + Legal */}
        <div className="flex flex-wrap justify-between w-full gap-4 items-center">
          <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} WedClick · Todos los derechos reservados
          </p>
          <div className="flex gap-6">
            {[
              { label: 'Privacidad', href: '/privacidad' },
              { label: 'Aviso legal', href: '/aviso-legal' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-400 text-xs hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Mensaje final */}
        <p className="text-gray-500 text-xs text-center">
          Hecho con ♥ para las parejas que merecen lo mejor · wedclick.es
        </p>

      </div>
    </footer>
  )
}