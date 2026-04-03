import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})

function LegalNotice() {
  return (
    <div className="min-h-screen bg-warmWhite">

      {/* Header */}
      <div className="bg-slateGray py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.a
            {...fadeUp(0)}
            href="/"
            className="inline-flex items-center gap-2 text-gray-400
                       hover:text-white transition-colors duration-200
                       font-sans text-sm mb-8 cursor-pointer"
          >
            <ArrowLeft size={16} />
            Volver al inicio
          </motion.a>
          <motion.div {...fadeUp(0.1)} className="flex flex-col gap-4">
            <span className="font-sans text-xs tracking-widest uppercase text-goldAccent">
              Legal
            </span>
            <h1 className="font-serif text-4xl text-white">
              Aviso Legal
            </h1>
            <p className="font-sans font-light text-gray-400 text-sm">
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

        {/* Sección 1 */}
        <div className="flex flex-col gap-4">
          <h2 className="font-serif text-2xl text-slateGray">
            1. Datos identificativos
          </h2>
          <div className="w-12 h-px bg-goldAccent" />
          <p className="font-sans font-light text-gray-500 text-sm leading-relaxed">
            En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la 
            Sociedad de la Información y de Comercio Electrónico (LSSI-CE), os 
            informamos de los datos identificativos del titular de este sitio web:
          </p>
          <div className="flex flex-col gap-2 font-sans font-light text-gray-500 text-sm leading-relaxed">
            {[
              { label: 'Nombre comercial',  value: 'WedClick'           },
              { label: 'Web',               value: 'wedclick.es'        },
              { label: 'Email',             value: 'contacto@wedclick.es' },
              { label: 'Teléfono',          value: '+34 628 355 913'    },
            ].map((item) => (
              <p key={item.label}>
                <span className="font-semibold text-slateGray">{item.label}:</span>{' '}
                {item.value}
              </p>
            ))}
          </div>
        </div>

        {/* Sección 2 */}
        <div className="flex flex-col gap-4">
          <h2 className="font-serif text-2xl text-slateGray">
            2. Objeto y ámbito de aplicación
          </h2>
          <div className="w-12 h-px bg-goldAccent" />
          <p className="font-sans font-light text-gray-500 text-sm leading-relaxed">
            El presente Aviso Legal regula el acceso y uso del sitio web wedclick.es, 
            titularidad de WedClick, cuya actividad es el diseño y desarrollo de 
            invitaciones de boda digitales personalizadas.
          </p>
          <p className="font-sans font-light text-gray-500 text-sm leading-relaxed">
            El acceso y uso de este sitio web implica la aceptación plena y sin 
            reservas de todas las disposiciones incluidas en este Aviso Legal. 
            Si no estáis de acuerdo con alguna de estas condiciones, os rogamos 
            que no accedáis ni utilicéis este sitio web.
          </p>
        </div>

        {/* Sección 3 */}
        <div className="flex flex-col gap-4">
          <h2 className="font-serif text-2xl text-slateGray">
            3. Propiedad intelectual e industrial
          </h2>
          <div className="w-12 h-px bg-goldAccent" />
          <p className="font-sans font-light text-gray-500 text-sm leading-relaxed">
            Todos los contenidos de este sitio web, incluyendo pero no limitándose a 
            textos, imágenes, diseños, logotipos, iconos, código fuente y estructura, 
            son propiedad de WedClick o de terceros que han autorizado su uso, y están 
            protegidos por la legislación española e internacional sobre propiedad 
            intelectual e industrial.
          </p>
          <p className="font-sans font-light text-gray-500 text-sm leading-relaxed">
            Queda expresamente prohibida la reproducción, distribución, comunicación 
            pública o transformación de cualquier contenido de este sitio web sin la 
            autorización previa y por escrito de WedClick.
          </p>
        </div>

        {/* Sección 4 */}
        <div className="flex flex-col gap-4">
          <h2 className="font-serif text-2xl text-slateGray">
            4. Condiciones de uso
          </h2>
          <div className="w-12 h-px bg-goldAccent" />
          <p className="font-sans font-light text-gray-500 text-sm leading-relaxed">
            El usuario se compromete a hacer un uso adecuado de los contenidos y 
            servicios que WedClick ofrece a través de su sitio web, y en particular 
            a no emplearlos para:
          </p>
          <ul className="flex flex-col gap-2 font-sans font-light text-gray-500 text-sm leading-relaxed">
            {[
              'Incurrir en actividades ilícitas, ilegales o contrarias a la buena fe',
              'Difundir contenidos o propaganda de carácter racista, xenófobo o discriminatorio',
              'Introducir o difundir virus informáticos o cualquier otro sistema físico o lógico que pueda causar daños',
              'Intentar acceder, utilizar o manipular los datos de otros usuarios',
              'Reproducir o copiar los contenidos del sitio web sin autorización expresa',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-goldAccent mt-1">◆</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Sección 5 */}
        <div className="flex flex-col gap-4">
          <h2 className="font-serif text-2xl text-slateGray">
            5. Exclusión de responsabilidad
          </h2>
          <div className="w-12 h-px bg-goldAccent" />
          <p className="font-sans font-light text-gray-500 text-sm leading-relaxed">
            WedClick no se hace responsable de los daños y perjuicios de cualquier 
            naturaleza que pudieran derivarse de:
          </p>
          <ul className="flex flex-col gap-2 font-sans font-light text-gray-500 text-sm leading-relaxed">
            {[
              'La falta de disponibilidad o continuidad del sitio web por causas técnicas o de fuerza mayor',
              'Los errores o deficiencias de seguridad producidos por el uso de un navegador desactualizado',
              'Los contenidos de sitios web de terceros a los que se pueda acceder mediante enlaces desde este sitio',
              'La introducción de datos falsos o erróneos por parte del usuario en los formularios de contacto',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-goldAccent mt-1">◆</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Sección 6 */}
        <div className="flex flex-col gap-4">
          <h2 className="font-serif text-2xl text-slateGray">
            6. Enlaces a terceros
          </h2>
          <div className="w-12 h-px bg-goldAccent" />
          <p className="font-sans font-light text-gray-500 text-sm leading-relaxed">
            Este sitio web puede contener enlaces a sitios web de terceros. 
            WedClick no controla ni se hace responsable de los contenidos, 
            políticas de privacidad o prácticas de dichos sitios web. 
            Os recomendamos que reviséis las políticas de privacidad de 
            cualquier sitio web que visitéis.
          </p>
        </div>

        {/* Sección 7 */}
        <div className="flex flex-col gap-4">
          <h2 className="font-serif text-2xl text-slateGray">
            7. Legislación aplicable y jurisdicción
          </h2>
          <div className="w-12 h-px bg-goldAccent" />
          <p className="font-sans font-light text-gray-500 text-sm leading-relaxed">
            El presente Aviso Legal se rige por la legislación española. 
            Para la resolución de cualquier controversia derivada del acceso 
            o uso de este sitio web, las partes se someten expresamente a la 
            jurisdicción de los Juzgados y Tribunales españoles, con renuncia 
            expresa a cualquier otro fuero que pudiera corresponderles.
          </p>
        </div>

        {/* Sección 8 */}
        <div className="flex flex-col gap-4">
          <h2 className="font-serif text-2xl text-slateGray">
            8. Modificaciones
          </h2>
          <div className="w-12 h-px bg-goldAccent" />
          <p className="font-sans font-light text-gray-500 text-sm leading-relaxed">
            WedClick se reserva el derecho de modificar, en cualquier momento 
            y sin previo aviso, la presentación y configuración del sitio web, 
            así como el presente Aviso Legal. Os recomendamos que lo reviséis 
            periódicamente, ya que puede sufrir modificaciones.
          </p>
        </div>

        {/* CTA final */}
        <div className="flex flex-col items-center gap-6 pt-8 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-px bg-goldAccent opacity-50" />
            <span className="text-goldAccent">◆</span>
            <div className="w-12 h-px bg-goldAccent opacity-50" />
          </div>
          <p className="font-sans font-light text-sm text-gray-400 text-center">
            ¿Tenéis alguna duda sobre el aviso legal?
            <br className="hidden md:block" />
            Escribidnos y os respondemos.
          </p>
          <a
            href="mailto:contacto@wedclick.es"
            className="btn-primary"
          >
            contacto@wedclick.es
          </a>
        </div>

      </motion.div>
    </div>
  )
}

export default LegalNotice