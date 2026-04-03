import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})

function Privacy() {
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
              Política de Privacidad
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
            1. Responsable del tratamiento
          </h2>
          <div className="w-12 h-px bg-goldAccent" />
          <div className="flex flex-col gap-2 font-sans font-light text-gray-500 text-sm leading-relaxed">
            <p><span className="font-semibold text-slateGray">Nombre:</span> WedClick</p>
            <p><span className="font-semibold text-slateGray">Web:</span> wedclick.es</p>
            <p><span className="font-semibold text-slateGray">Email:</span> contacto@wedclick.es</p>
            <p><span className="font-semibold text-slateGray">Teléfono:</span> +34 628 355 913</p>
          </div>
        </div>

        {/* Sección 2 */}
        <div className="flex flex-col gap-4">
          <h2 className="font-serif text-2xl text-slateGray">
            2. Datos que recopilamos
          </h2>
          <div className="w-12 h-px bg-goldAccent" />
          <p className="font-sans font-light text-gray-500 text-sm leading-relaxed">
            A través de los formularios de contacto de nuestra web recopilamos los siguientes datos:
          </p>
          <ul className="flex flex-col gap-2 font-sans font-light text-gray-500 text-sm leading-relaxed">
            {[
              'Nombre y apellidos',
              'Dirección de correo electrónico',
              'Número de teléfono (opcional)',
              'Fecha de la boda',
              'Mensaje o consulta',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-goldAccent mt-1">◆</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Sección 3 */}
        <div className="flex flex-col gap-4">
          <h2 className="font-serif text-2xl text-slateGray">
            3. Finalidad del tratamiento
          </h2>
          <div className="w-12 h-px bg-goldAccent" />
          <p className="font-sans font-light text-gray-500 text-sm leading-relaxed">
            Los datos personales que nos facilitáis se utilizan exclusivamente para:
          </p>
          <ul className="flex flex-col gap-2 font-sans font-light text-gray-500 text-sm leading-relaxed">
            {[
              'Atender vuestras consultas y solicitudes de información',
              'Gestionar la prestación del servicio contratado',
              'Enviar información relacionada con vuestro pedido',
              'Cumplir con las obligaciones legales aplicables',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-goldAccent mt-1">◆</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Sección 4 */}
        <div className="flex flex-col gap-4">
          <h2 className="font-serif text-2xl text-slateGray">
            4. Base legal del tratamiento
          </h2>
          <div className="w-12 h-px bg-goldAccent" />
          <p className="font-sans font-light text-gray-500 text-sm leading-relaxed">
            La base legal para el tratamiento de vuestros datos es el consentimiento 
            explícito que nos otorgáis al rellenar y enviar el formulario de contacto, 
            de conformidad con el Reglamento General de Protección de Datos (RGPD) 
            y la Ley Orgánica 3/2018 de Protección de Datos Personales (LOPDGDD).
          </p>
        </div>

        {/* Sección 5 */}
        <div className="flex flex-col gap-4">
          <h2 className="font-serif text-2xl text-slateGray">
            5. Conservación de los datos
          </h2>
          <div className="w-12 h-px bg-goldAccent" />
          <p className="font-sans font-light text-gray-500 text-sm leading-relaxed">
            Los datos personales se conservarán durante el tiempo necesario para 
            atender vuestra consulta y, en caso de contratar nuestros servicios, 
            durante la vigencia de la relación contractual más el tiempo exigido 
            por la legislación aplicable.
          </p>
        </div>

        {/* Sección 6 */}
        <div className="flex flex-col gap-4">
          <h2 className="font-serif text-2xl text-slateGray">
            6. Comunicación de datos a terceros
          </h2>
          <div className="w-12 h-px bg-goldAccent" />
          <p className="font-sans font-light text-gray-500 text-sm leading-relaxed">
            WedClick no cede ni vende vuestros datos personales a terceros. 
            No obstante, para la prestación del servicio utilizamos los siguientes 
            proveedores que actúan como encargados del tratamiento:
          </p>
          <ul className="flex flex-col gap-2 font-sans font-light text-gray-500 text-sm leading-relaxed">
            {[
              'Formspree (gestión del formulario de contacto)',
              'Google Analytics (análisis de tráfico web, solo si aceptáis las cookies)',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-goldAccent mt-1">◆</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Sección 7 */}
        <div className="flex flex-col gap-4">
          <h2 className="font-serif text-2xl text-slateGray">
            7. Vuestros derechos
          </h2>
          <div className="w-12 h-px bg-goldAccent" />
          <p className="font-sans font-light text-gray-500 text-sm leading-relaxed">
            Como titulares de los datos, podéis ejercer en cualquier momento los siguientes derechos:
          </p>
          <ul className="flex flex-col gap-2 font-sans font-light text-gray-500 text-sm leading-relaxed">
            {[
              'Acceso: conocer qué datos tenemos sobre vosotros',
              'Rectificación: corregir datos inexactos o incompletos',
              'Supresión: solicitar la eliminación de vuestros datos',
              'Oposición: oponeros al tratamiento de vuestros datos',
              'Portabilidad: recibir vuestros datos en formato electrónico',
              'Limitación: solicitar la limitación del tratamiento',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-goldAccent mt-1">◆</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="font-sans font-light text-gray-500 text-sm leading-relaxed">
            Para ejercer cualquiera de estos derechos, podéis contactarnos en{' '}
            <a
              href="mailto:contacto@wedclick.es"
              className="text-blueWillow hover:underline"
            >
              contacto@wedclick.es
            </a>
            . También podéis presentar una reclamación ante la Agencia Española 
            de Protección de Datos (AEPD) en{' '}
            <a
              href="https://www.aepd.es"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blueWillow hover:underline"
            >
              www.aepd.es
            </a>
            .
          </p>
        </div>

        {/* Sección 8 */}
        <div className="flex flex-col gap-4">
          <h2 className="font-serif text-2xl text-slateGray">
            8. Política de cookies
          </h2>
          <div className="w-12 h-px bg-goldAccent" />
          <p className="font-sans font-light text-gray-500 text-sm leading-relaxed">
            Nuestra web utiliza cookies propias y de terceros. Las cookies son 
            pequeños archivos de texto que se almacenan en vuestro dispositivo 
            cuando visitáis nuestra web.
          </p>
          <div className="bg-warmWhite rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slateGray text-white">
                  <th className="font-sans font-semibold text-left px-4 py-3 text-xs">Cookie</th>
                  <th className="font-sans font-semibold text-left px-4 py-3 text-xs">Tipo</th>
                  <th className="font-sans font-semibold text-left px-4 py-3 text-xs">Finalidad</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'wedclick-cookies', type: 'Propia · Técnica', purpose: 'Guardar vuestra preferencia de cookies' },
                  { name: '_ga, _ga_*',       type: 'Google · Analítica', purpose: 'Análisis de tráfico web (solo si aceptáis)' },
                ].map((row, i) => (
                  <tr key={row.name} className={i % 2 === 0 ? 'bg-white' : 'bg-warmWhite'}>
                    <td className="font-sans text-xs text-slateGray px-4 py-3 font-mono">{row.name}</td>
                    <td className="font-sans text-xs text-gray-500 px-4 py-3">{row.type}</td>
                    <td className="font-sans text-xs text-gray-500 px-4 py-3">{row.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sección 9 */}
        <div className="flex flex-col gap-4">
          <h2 className="font-serif text-2xl text-slateGray">
            9. Cambios en la política de privacidad
          </h2>
          <div className="w-12 h-px bg-goldAccent" />
          <p className="font-sans font-light text-gray-500 text-sm leading-relaxed">
            WedClick se reserva el derecho de modificar esta política de privacidad 
            para adaptarla a cambios legislativos o cambios en nuestros servicios. 
            Os recomendamos revisarla periódicamente. La fecha de última actualización 
            aparece al inicio de este documento.
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
            ¿Tenéis alguna duda sobre cómo tratamos vuestros datos?
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

export default Privacy