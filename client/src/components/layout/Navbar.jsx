import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Heart, Shield, LayoutDashboard } from 'lucide-react'

function Navbar() {
  const [menuOpen, setMenuOpen]   = useState(false)
  const [scrolled, setScrolled]   = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#como-funciona', label: 'Cómo funciona' },
    { href: '#demo',    label: 'La invitación'  },
    { href: '#precios',       label: 'Precios'        },
    { href: '#faq',           label: 'FAQ'            },
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
                  ${scrolled
                    ? 'bg-crema/95 backdrop-blur-md shadow-sm border-b border-beige-claro'
                    : 'bg-transparent'
                  }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img
            src="/Logo_WedClick.png"
            alt="WedClick"
            className="h-10"
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-sm text-azul-oscuro/70
                         hover:text-azul-oscuro transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop botones */}
        <div className="hidden md:flex items-center gap-2">

          {/* Panel novios */}
          <a
            href="/panel"
            className="flex items-center gap-2 px-4 py-2 rounded-xl
                       bg-crema border border-beige-claro font-sans text-xs
                       text-azul-oscuro hover:bg-beige-claro transition-colors"
          >
            <Heart size={12} className="text-tierra" fill="#CFC29B" />
            Panel novios
          </a>

          {/* Admin — discreto */}
          <a
            href="/admin"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl
                       bg-azul-oscuro/5 border border-azul-oscuro/10
                       font-sans text-xs text-azul-oscuro/50
                       hover:bg-azul-oscuro/10 hover:text-azul-oscuro
                       transition-colors"
            title="Administración"
          >
            <Shield size={12} />
          </a>

          {/* CTA */}
          <a
            href="#precios"
            className="px-5 py-2.5 rounded-xl bg-azul-oscuro text-crema
                       font-sans text-sm font-medium border border-beige-claro
                       hover:bg-beige-claro hover:text-azul-oscuro
                       transition-colors duration-300 shadow-sm"
          >
            Crear mi invitación
          </a>
        </div>

        {/* Mobile — botones + hamburguesa */}
        <div className="md:hidden flex items-center gap-2">

          {/* Panel novios mobile */}
          <a
            href="/panel"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl
                       bg-crema border border-beige-claro font-sans text-xs
                       text-azul-oscuro hover:bg-beige-claro transition-colors"
          >
            <Heart size={12} className="text-tierra" fill="#CFC29B" />
            <span className="hidden sm:block">Panel</span>
          </a>

          {/* Admin mobile — solo icono */}
          <a
            href="/admin"
            className="w-8 h-8 rounded-xl bg-azul-oscuro/5 border border-azul-oscuro/10
                       flex items-center justify-center
                       hover:bg-azul-oscuro/10 transition-colors"
            title="Admin"
          >
            <Shield size={14} className="text-azul-oscuro/40" />
          </a>

          {/* Hamburguesa */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 rounded-xl bg-crema border border-beige-claro
                       flex items-center justify-center
                       hover:bg-beige-claro transition-colors"
          >
            {menuOpen
              ? <X size={18} className="text-azul-oscuro" />
              : <Menu size={18} className="text-azul-oscuro" />
            }
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
            transition={{ duration: 0.3 }}
            className="md:hidden bg-crema/98 backdrop-blur-md
                       border-t border-beige-claro overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-sans text-sm text-azul-oscuro/70
                             hover:text-azul-oscuro py-3 border-b
                             border-beige-claro/50 transition-colors"
                >
                  {link.label}
                </a>
              ))}

              {/* CTA mobile */}
              <a
                href="#precios"
                onClick={() => setMenuOpen(false)}
                className="mt-3 w-full py-3 rounded-xl bg-azul-oscuro text-crema
                           font-sans text-sm font-medium text-center
                           border border-beige-claro
                           hover:bg-beige-claro hover:text-azul-oscuro
                           transition-colors duration-300"
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