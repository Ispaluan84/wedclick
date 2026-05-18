import { motion } from 'framer-motion'
import { ArrowRight, Smartphone, Eye } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.8, delay, ease: 'easeOut' },
})

const miniaturas = [
  { id: 1, titulo: 'Portada',          imagen: '/screenshots/demo-portada.jpg' },
  { id: 2, titulo: 'Historia de amor', imagen: '/screenshots/demo-historia.jpg' },
  { id: 3, titulo: 'Ubicaciones',      imagen: '/screenshots/demo-ubicaciones.jpg' },
  { id: 4, titulo: 'Itinerario',       imagen: '/screenshots/demo-itinerario.jpg' },
  { id: 5, titulo: 'Confirmación',     imagen: '/screenshots/demo-confirmacion.jpg' },
]

function DemoPreview() {
  return (
    <section id="demo" className="bg-crema py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Encabezado */}
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <span className="font-sans text-xs tracking-widest uppercase text-verde-suave mb-4 block">
            Demo en vivo
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-azul-oscuro mb-6">
            Descubre cómo será
            <br />
            <span className="italic text-tierra">vuestra invitación</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-tierra opacity-50" />
            <span className="text-tierra text-lg">◆</span>
            <div className="w-12 h-px bg-tierra opacity-50" />
          </div>
          <p className="font-sans font-light text-marron max-w-xl mx-auto leading-relaxed">
            Explorad la invitación de Elena & Marcos, nuestra demo interactiva.
            Navegad por cada sección y descubrid todas las funcionalidades.
          </p>
        </motion.div>

        {/* Layout: Mockup + Miniaturas */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Columna izquierda — Mockup teléfono */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Teléfono */}
              <div className="relative bg-azul-oscuro rounded-[3rem] p-3 shadow-2xl w-[280px]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6
                                bg-azul-oscuro rounded-b-2xl z-10" />
                <div className="rounded-[2.3rem] overflow-hidden bg-crema aspect-[9/19.5]">
                  <img
                    src="/screenshots/demo-portada.jpg"
                    alt="Demo Elena & Marcos"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-3 flex flex-col items-center
                                  justify-center text-center">
                    <span className="font-sans text-[9px] tracking-[0.2em] uppercase
                                     text-azul-oscuro/80 mb-2">
                      Nos casamos
                    </span>
                    <h3 className="font-serif text-xl text-azul-oscuro mb-1 drop-shadow-lg">
                      Elena & Marcos
                    </h3>
                    <div className="w-8 h-px bg-tierra my-2" />
                    <p className="font-sans text-[10px] text-marron/80">
                      15 de Septiembre, 2025
                    </p>
                  </div>
                </div>
              </div>

              {/* Decoración flotante */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-8 top-16 bg-crema rounded-2xl p-3
                           shadow-lg border border-beige-claro w-36"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-verde-suave/30
                                  flex items-center justify-center">
                    <span className="text-[10px]">🎵</span>
                  </div>
                  <div>
                    <p className="font-sans text-[10px] text-verde-suave font-medium">
                      Playlist
                    </p>
                    <p className="font-sans text-[8px] text-marron/60">
                      12 canciones
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -left-6 bottom-24 bg-crema rounded-2xl p-3
                           shadow-lg border border-beige-claro w-36"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-tierra/30
                                  flex items-center justify-center">
                    <span className="text-[10px]">📸</span>
                  </div>
                  <div>
                    <p className="font-sans text-[10px] text-verde-suave font-medium">
                      Álbum
                    </p>
                    <p className="font-sans text-[8px] text-marron/60">
                      48 fotos subidas
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Columna derecha — Miniaturas + CTA */}
          <div className="flex flex-col gap-8">
            
            {/* Info + CTA */}
            <motion.div {...fadeUp(0.4)} className="bg-crema rounded-3xl p-8
                                                     shadow-sm border border-beige-claro">
              <h3 className="font-serif text-xl text-azul-oscuro mb-3">
                La boda de Elena & Marcos
              </h3>
              <p className="font-sans font-light text-marron text-sm leading-relaxed mb-6">
                Explorad cada sección: la historia de amor, ubicaciones con mapa,
                itinerario, dress code, playlist colaborativa, álbum de fotos
                y confirmación de asistencia.
              </p>

              <a
                href="https://elena-marcos.wedclick.es"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-3.5 rounded-xl
                           bg-azul-oscuro text-crema border border-beige-claro
                           font-sans font-semibold text-sm uppercase
                           hover:bg-beige-claro hover:text-azul-oscuro
                           transition-colors duration-300 shadow-md"
              >
                <Smartphone size={16} />
                Ver demo completa
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default DemoPreview