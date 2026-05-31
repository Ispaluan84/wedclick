import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Shield } from 'lucide-react'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#como-funciona', label: 'Cómo funciona' },
    { href: '#demo',          label: 'La invitación'  },
    { href: '#precios',       label: 'Precios'        },
    { href: '#faq',           label: 'FAQ'            },
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
                  ${scrolled
                    ? 'nav-blur bg-cream/85 border-b border-w-gold-light/30 py-4'
                    : 'bg-transparent py-7'}`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center gap-3" data-hover>
          <img
            src="/Logo_WedClick.png"
            alt="WedClick"
            className="h-9 w-auto"
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="link-underline font-sans text-[0.68rem] tracking-[0.14em]
                           uppercase text-ink/60 hover:text-ink transition-colors duration-300"
                data-hover
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop — botones derechos */}
        <div className="hidden md:flex items-center gap-3">

          {/* Panel novios */}
          <a
            href="/panel"
            className="flex items-center gap-2 px-4 py-2.5
                       font-sans text-[0.65rem] tracking-[0.1em] uppercase
                       text-ink/60 border border-w-gold-light/60
                       hover:border-w-gold hover:text-ink transition-all duration-300"
            data-hover
          >
            <Heart size={11} className="text-w-gold" fill="#C9A96E" />
            Panel novios
          </a>

          {/* Admin — discreto */}
          <a
            href="/admin"
            className="w-9 h-9 flex items-center justify-center
                       border border-ink/10 text-ink/30
                       hover:border-ink/30 hover:text-ink/60 transition-all duration-300"
            title="Administración"
            data-hover
          >
            <Shield size={13} />
          </a>

          {/* CTA principal */}
          <a
            href="#precios"
            className="font-sans text-[0.65rem] tracking-[0.14em] uppercase
                       px-6 py-3 bg-ink text-cream
                       hover:bg-w-rose transition-all duration-300"
            data-hover
          >
            Crear mi invitación
          </a>
        </div>

        {/* Mobile — panel + hamburguesa */}
        <div className="md:hidden flex items-center gap-2">
          <a
            href="/panel"
            className="flex items-center gap-1.5 px-3 py-2
                       border border-w-gold-light/60 font-sans text-xs text-ink/60"
            data-hover
          >
            <Heart size={11} className="text-w-gold" fill="#C9A96E" />
            <span className="hidden sm:block">Panel</span>
          </a>

          <a
            href="/admin"
            className="w-9 h-9 flex items-center justify-center
                       border border-ink/10 text-ink/30"
            title="Admin"
            data-hover
          >
            <Shield size={13} />
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 flex flex-col gap-[5px] items-center justify-center
                       border border-ink/15 hover:border-w-gold transition-all"
            data-hover
          >
            <span className={`block w-5 h-px bg-ink transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block w-5 h-px bg-ink transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-ink transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="md:hidden nav-blur bg-cream/95 border-t border-w-gold-light/20 overflow-hidden"
          >
            <div className="px-8 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-sans text-[0.75rem] tracking-[0.12em] uppercase
                             text-ink/60 hover:text-ink py-4
                             border-b border-w-gold-light/20 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#precios"
                onClick={() => setMenuOpen(false)}
                className="mt-4 w-full py-4 bg-ink text-cream font-sans text-[0.68rem]
                           tracking-[0.14em] uppercase text-center
                           hover:bg-w-rose transition-all duration-300"
              >
                Crear mi invitación
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
