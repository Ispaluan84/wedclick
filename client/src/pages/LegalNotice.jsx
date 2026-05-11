import { motion }           from 'framer-motion'
import { ArrowLeft, Scale } from 'lucide-react'
import SEO                  from '../components/SEO'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})

const Section = ({ numero, titulo, children }) => (
  <div className="flex flex-col gap-4">
    <h2 className="font-serif text-2xl text-azul-oscuro">
      {numero}. {titulo}
    </h2>
    <div className="w-12 h-px bg-tierra opacity-60" />
    {children}
  </div>
)

const Lista = ({ items }) => (
  <ul className="flex flex-col gap-2">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-2
                                font-sans font-light text-marron
                                text-sm leading-relaxed">
        <span className="text-tierra mt-1 flex-shrink-0">◆</span>
        {item}
      </li>
    ))}
  </ul>
)

const Parrafo = ({ children }) => (
  <p className="font-sans font-light text-marron text-sm leading-relaxed">
    {children}
  </p>
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
    <div className="min-h-screen bg-crema">

      {/* Header */}
      <div className="bg-azul-oscuro py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.a
            {...fadeUp(0)}
            href="/"
            className="inline-flex items-center gap-2 text-crema/50
            hover:text-crema transition-colors duration-200
            font-sans text-sm mb-8"
            >
            <ArrowLeft size={16} />
            Volver al inicio
          </motion.a>

          <motion.div {...fadeUp(0.1)} className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Scale size={14} className="text-tierra" />
              <span className="font-sans text-xs tracking-widest
                               uppercase text-tierra">
                Legal
              </span>
            </div>
            <h1 className="font-serif text-4xl text-crema">
              Aviso Legal
            </h1>
            <p className="font-sans font-light text-crema/50 text-sm">
              Última actualización: {new Date().toLocaleDateString('es-ES', {
                day: 'numeric', month: 'long', year: 'numeric'
              })}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contenido */}
      <motion.div
        {...fadeUp(0.2)}
        className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-12"
        >

        <Section numero="1" titulo="Datos identificativos">
          <Parrafo>
            En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la
            Sociedad de la Información y de Comercio Electrónico (LSSI-CE), os
            informamos de los datos identificativos del titular de este sitio web:
          </Parrafo>
          <div className="flex flex-col gap-2 font-sans font-light
                          text-marron text-sm leading-relaxed">
            {[
              { label: 'Nombre comercial', value: 'WedClick'            },
              { label: 'Web',              value: 'wedclick.es'         },
              { label: 'Email',            value: 'contacto@wedclick.es' },
              { label: 'Teléfono',         value: '+34 628 355 913'     },
            ].map((item) => (
              <p key={item.label}>
                <span className="font-semibold text-azul-oscuro">
                  {item.label}:
                </span>{' '}
                {item.value}
              </p>
            ))}
          </div>
        </Section>

        <Section numero="2" titulo="Objeto y ámbito de aplicación">
          <Parrafo>
            El presente Aviso Legal regula el acceso y uso del sitio web wedclick.es,
            titularidad de WedClick, cuya actividad es el diseño y desarrollo de
            invitaciones de boda digitales personalizadas.
          </Parrafo>
          <Parrafo>
            El acceso y uso de este sitio web implica la aceptación plena y sin
            reservas de todas las disposiciones incluidas en este Aviso Legal.
            Si no estáis de acuerdo con alguna de estas condiciones, os rogamos
            que no accedáis ni utilicéis este sitio web.
          </Parrafo>
        </Section>

        <Section numero="3" titulo="Propiedad intelectual e industrial">
          <Parrafo>
            Todos los contenidos de este sitio web, incluyendo pero no limitándose a
            textos, imágenes, diseños, logotipos, iconos, código fuente y estructura,
            son propiedad de WedClick o de terceros que han autorizado su uso, y están
            protegidos por la legislación española e internacional sobre propiedad
            intelectual e industrial.
          </Parrafo>
          <Parrafo>
            Queda expresamente prohibida la reproducción, distribución, comunicación
            pública o transformación de cualquier contenido de este sitio web sin la
            autorización previa y por escrito de WedClick.
          </Parrafo>
        </Section>

        <Section numero="4" titulo="Condiciones de uso">
          <Parrafo>
            El usuario se compromete a hacer un uso adecuado de los contenidos y
            servicios que WedClick ofrece a través de su sitio web, y en particular
            a no emplearlos para:
          </Parrafo>
          <Lista items={[
            'Incurrir en actividades ilícitas, ilegales o contrarias a la buena fe',
            'Difundir contenidos o propaganda de carácter racista, xenófobo o discriminatorio',
            'Introducir o difundir virus informáticos o cualquier otro sistema físico o lógico que pueda causar daños',
            'Intentar acceder, utilizar o manipular los datos de otros usuarios',
            'Reproducir o copiar los contenidos del sitio web sin autorización expresa',
          ]} />
        </Section>

        <Section numero="5" titulo="Condiciones del servicio">
          <Parrafo>
            WedClick ofrece un servicio de creación de invitaciones de boda digitales
            personalizadas. Las condiciones específicas del servicio son:
          </Parrafo>
          <Lista items={[
            'El pago se realiza en dos partes: 50% al contratar y 50% antes de la entrega',
            'El plazo de entrega de la invitación se acordará con el cliente tras la contratación',
            'Las revisiones incluidas en cada plan se detallan en la página de precios',
            'WedClick se reserva el derecho de rechazar proyectos que no se ajusten a sus valores',
            'El cliente es responsable de la veracidad de los datos proporcionados',
          ]} />
        </Section>

        <Section numero="6" titulo="Exclusión de responsabilidad">
          <Parrafo>
            WedClick no se hace responsable de los daños y perjuicios de cualquier
            naturaleza que pudieran derivarse de:
          </Parrafo>
          <Lista items={[
            'La falta de disponibilidad o continuidad del sitio web por causas técnicas o de fuerza mayor',
            'Los errores o deficiencias de seguridad producidos por el uso de un navegador desactualizado',
            'Los contenidos de sitios web de terceros a los que se pueda acceder mediante enlaces desde este sitio',
            'La introducción de datos falsos o erróneos por parte del usuario en los formularios',
            'Problemas técnicos derivados del dispositivo o conexión del usuario',
          ]} />
        </Section>

        <Section numero="7" titulo="Enlaces a terceros">
          <Parrafo>
            Este sitio web puede contener enlaces a sitios web de terceros.
            WedClick no controla ni se hace responsable de los contenidos,
            políticas de privacidad o prácticas de dichos sitios web.
            Os recomendamos que reviséis las políticas de privacidad de
            cualquier sitio web que visitéis.
          </Parrafo>
        </Section>

        <Section numero="8" titulo="Legislación aplicable y jurisdicción">
          <Parrafo>
            El presente Aviso Legal se rige por la legislación española.
            Para la resolución de cualquier controversia derivada del acceso
            o uso de este sitio web, las partes se someten expresamente a la
            jurisdicción de los Juzgados y Tribunales españoles, con renuncia
            expresa a cualquier otro fuero que pudiera corresponderles.
          </Parrafo>
        </Section>

        <Section numero="9" titulo="Modificaciones">
          <Parrafo>
            WedClick se reserva el derecho de modificar, en cualquier momento
            y sin previo aviso, la presentación y configuración del sitio web,
            así como el presente Aviso Legal. Os recomendamos que lo reviséis
            periódicamente, ya que puede sufrir modificaciones.
          </Parrafo>
        </Section>

        {/* CTA final */}
        <div className="flex flex-col items-center gap-6 pt-8
                        border-t border-beige-claro">
          <div className="flex items-center gap-3">
            <div className="w-12 h-px bg-tierra opacity-50" />
            <span className="text-tierra">◆</span>
            <div className="w-12 h-px bg-tierra opacity-50" />
          </div>
          <p className="font-sans font-light text-sm text-marron/60 text-center">
            ¿Tenéis alguna duda sobre el aviso legal?
            <br className="hidden md:block" />
            Escribidnos y os respondemos encantados.
          </p>
          <a
            href="mailto:contacto@wedclick.es"
            className="flex items-center gap-2 px-6 py-3 rounded-xl
            bg-azul-oscuro text-crema font-sans text-sm
            border border-beige-claro
            hover:bg-beige-claro hover:text-azul-oscuro
            transition-colors duration-300"
            >
            contacto@wedclick.es
          </a>
        </div>

      </motion.div>
    </div>
  </>
  )
}

export default LegalNotice