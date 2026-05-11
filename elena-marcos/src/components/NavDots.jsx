import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const secciones = [
  { id: 'hero',         label: 'Inicio'        },
  { id: 'historia',     label: 'Nuestra historia' },
  { id: 'carta',        label: 'Nuestra carta'  },
  { id: 'lugares',      label: 'Lugares'        },
  { id: 'itinerario',   label: 'Itinerario'     },
  { id: 'dresscode',    label: 'Dress Code'     },
  { id: 'bandasonora',  label: 'Banda Sonora'   },
  { id: 'album',        label: 'Álbum de fotos' },
  { id: 'confirmacion', label: 'Confirmación'   },
]

function NavDots() {
  const [activa, setActiva] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiva(entry.target.id)
          }
        })
      },
      { threshold: 0.4 }
    )

    secciones.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50
                    hidden md:flex flex-col items-end gap-3">
      {secciones.map(({ id, label }) => {
        const esActiva = activa === id

        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="group flex items-center gap-3"
            aria-label={`Ir a ${label}`}
          >
            {/* Tooltip */}
            <span className={`font-sans text-xs tracking-wide
                             transition-all duration-300 whitespace-nowrap
                             ${esActiva
                               ? 'opacity-100 text-verde-oscuro translate-x-0'
                               : 'opacity-0 text-marron translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                             }`}>
              {label}
            </span>

            {/* Dot */}
            <div className="relative flex items-center justify-center">
              {esActiva && (
                <motion.div
                  layoutId="dot-ring"
                  className="absolute w-6 h-6 rounded-full border-2 border-tierra"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
              <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300
                              ${esActiva
                                ? 'bg-tierra scale-100'
                                : 'bg-marron/30 scale-75 group-hover:bg-marron/60 group-hover:scale-100'
                              }`}
              />
            </div>
          </button>
        )
      })}
    </nav>
  )
}

export default NavDots