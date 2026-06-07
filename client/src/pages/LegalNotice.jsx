import { motion } from 'framer-motion'
import { ArrowLeft, Scale } from 'lucide-react'
import SEO from '../components/SEO'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})

const Section = ({ numero, titulo, children }) => (
  <div className="flex flex-col gap-4">
    <h2 className="font-serif text-2xl text-ink">{numero}. {titulo}</h2>
    <div className="w-8 h-px bg-w-gold/50" />
    {children}
  </div>
)

const Lista = ({ items }) => (
  <ul className="flex flex-col gap-2">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-3 font-sans font-light text-warm-gray text-sm leading-relaxed">
        <span className="text-w-gold mt-1 flex-shrink-0 text-[10px]">✦</span>
        {item}
      </li>
    ))}
  </ul>
)

const Parrafo = ({ children }) => (
  <p className="font-sans font-light text-warm-gray text-sm leading-relaxed">{children}</p>
)

function LegalNotice() {
  return (
    <>
      <SEO
        titulo="Aviso Legal · WedClick"
        descripcion="Aviso legal de WedClick. Condiciones de uso del sitio web."
        url="https://wedclick.es/aviso-legal"
        noIndex={true}
      />
      <div className="min-h-screen bg-paper">

        {/* Header */}
        <div className="bg-ink py-16 px-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #C9A96E 1px, transparent 0)`, backgroundSize: '32px 32px' }} />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-w-gold/30 to-transparent" />

          <div className="relative max-w-3xl mx-auto">
            <motion.a {...fadeUp(0)} href="/"
              className="inline-flex items-center gap-2 text-cream/40 hover:text-cream transition-colors duration-200 font-sans text-xs tracking-widest uppercase mb-10">
              <ArrowLeft size={14} />
              Volver al inicio
            </motion.a>

            <motion.div {...fadeUp(0.1)} className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Scale size={13} className="text-w-gold" />
                <span className="font-sans text-[0.6rem] tracking-[0.25em] uppercase text-w-gold">Legal</span>
              </div>
              <h1 className="font-serif text-4xl text-cream">Aviso Legal</h1>
              <p className="font-sans font-light text-cream/40 text-sm">
                Última actualización: {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Contenido */}
        <motion.div {...fadeUp(0.2)} className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-12">

          <Section numero="1" titulo="Datos identificativos">
            <Parrafo>En cumplimiento de la Ley 34/2002 de Servicios de la Sociedad de la Información (LSSI-CE), os informamos de los datos identificativos del titular de este sitio web:</Parrafo>
            <div className="flex flex-col gap-2 font-sans font-light text-warm-gray text-sm leading-relaxed">
              {[
                { label: 'Nombre comercial', value: 'WedClick' },
                { label: 'Web',              value: 'wedclick.es' },
                { label: 'Email',            value: 'contacto@wedclick.es' },
                { label: 'Teléfono',         value: '+34 628 355 913' },
              ].map(({ label, value }) => (
                <p key={label}><span className="font-medium text-ink">{label}:</span> {value}</p>
              ))}
            </div>
          </Section>

          <Section numero="2" titulo="Objeto y ámbito de aplicación">
            <Parrafo>
              El presente Aviso Legal regula el acceso y uso del sitio web wedclick.es,
              cuya actividad es el diseño y desarrollo de invitaciones de boda digitales personalizadas.
            </Parrafo>
            <Parrafo>
              El acceso y uso de este sitio web implica la aceptación plena y sin reservas
              de todas las disposiciones incluidas en este Aviso Legal.
            </Parrafo>
          </Section>

          <Section numero="3" titulo="Propiedad intelectual e industrial">
            <Parrafo>
              Todos los contenidos de este sitio web, incluyendo textos, imágenes, diseños,
              logotipos, iconos y código fuente, son propiedad de WedClick o de terceros que
              han autorizado su uso, y están protegidos por la legislación sobre propiedad intelectual.
            </Parrafo>
            <Parrafo>
              Queda expresamente prohibida la reproducción, distribución o transformación de cualquier
              contenido sin autorización previa y por escrito de WedClick.
            </Parrafo>
          </Section>

          <Section numero="4" titulo="Condiciones de uso">
            <Parrafo>El usuario se compromete a no emplear los contenidos y servicios para:</Parrafo>
            <Lista items={[
              'Incurrir en actividades ilícitas, ilegales o contrarias a la buena fe',
              'Difundir contenidos de carácter racista, xenófobo o discriminatorio',
              'Introducir o difundir virus informáticos o cualquier sistema que cause daños',
              'Intentar acceder o manipular los datos de otros usuarios',
              'Reproducir o copiar los contenidos sin autorización expresa',
            ]} />
          </Section>

          <Section numero="5" titulo="Condiciones del servicio">
            <Parrafo>WedClick ofrece un servicio de creación de invitaciones de boda digitales personalizadas. Las condiciones específicas son:</Parrafo>
            <Lista items={[
              'El pago se realiza en dos partes: 50% al contratar y 50% antes de la entrega',
              'El plazo de entrega se acordará con el cliente tras la contratación',
              'Las revisiones incluidas en cada plan se detallan en la página de precios',
              'WedClick se reserva el derecho de rechazar proyectos que no se ajusten a sus valores',
              'El cliente es responsable de la veracidad de los datos proporcionados',
            ]} />
          </Section>

          <Section numero="6" titulo="Exclusión de responsabilidad">
            <Parrafo>WedClick no se hace responsable de los daños derivados de:</Parrafo>
            <Lista items={[
              'La falta de disponibilidad del sitio web por causas técnicas o de fuerza mayor',
              'Los errores producidos por el uso de un navegador desactualizado',
              'Los contenidos de sitios web de terceros accesibles mediante enlaces',
              'La introducción de datos falsos por parte del usuario en los formularios',
              'Problemas técnicos derivados del dispositivo o conexión del usuario',
            ]} />
          </Section>

          <Section numero="7" titulo="Enlaces a terceros">
            <Parrafo>
              Este sitio web puede contener enlaces a sitios de terceros. WedClick no controla
              ni se hace responsable de los contenidos o políticas de privacidad de dichos sitios.
            </Parrafo>
          </Section>

          <Section numero="8" titulo="Legislación aplicable y jurisdicción">
            <Parrafo>
              El presente Aviso Legal se rige por la legislación española. Para la resolución
              de cualquier controversia, las partes se someten a la jurisdicción de los
              Juzgados y Tribunales españoles.
            </Parrafo>
          </Section>

          <Section numero="9" titulo="Modificaciones">
            <Parrafo>
              WedClick se reserva el derecho de modificar en cualquier momento el presente
              Aviso Legal. Os recomendamos que lo reviséis periódicamente.
            </Parrafo>
          </Section>

          {/* CTA final */}
          <div className="flex flex-col items-center gap-6 pt-8 border-t border-w-gold/15">
            <div className="flex items-center gap-4">
              <div className="w-10 h-px bg-w-gold/30" />
              <span className="text-w-gold text-[10px]">✦</span>
              <div className="w-10 h-px bg-w-gold/30" />
            </div>
            <p className="font-sans font-light text-sm text-warm-gray text-center">
              ¿Tenéis alguna duda sobre el aviso legal?
              <br className="hidden md:block" />
              Escribidnos y os respondemos encantados.
            </p>
            <a href="mailto:contacto@wedclick.es"
              className="inline-flex items-center gap-2 px-7 py-4 bg-ink text-cream
                         font-sans text-xs tracking-[0.15em] uppercase font-light
                         hover:bg-warm-dark transition-colors duration-300">
              contacto@wedclick.es
            </a>
          </div>

        </motion.div>
      </div>
    </>
  )
}

export default LegalNotice