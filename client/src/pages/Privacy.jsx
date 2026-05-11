import { motion } from 'framer-motion'
import { ArrowLeft, Shield } from 'lucide-react'
import SEO      from '../components/SEO'

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

function Privacy() {
  return (
    <>
    <SEO
      titulo="Política de Privacidad · WedClick"
      descripcion="Política de privacidad de WedClick. Información sobre el tratamiento de datos personales."
      url="https://wedclick.es/privacidad"
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
              <Shield size={14} className="text-tierra" />
              <span className="font-sans text-xs tracking-widest uppercase text-tierra">
                Legal
              </span>
            </div>
            <h1 className="font-serif text-4xl text-crema">
              Política de Privacidad
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

        <Section numero="1" titulo="Responsable del tratamiento">
          <div className="flex flex-col gap-2 font-sans font-light
                          text-marron text-sm leading-relaxed">
            <p><span className="font-semibold text-azul-oscuro">Nombre:</span> WedClick</p>
            <p><span className="font-semibold text-azul-oscuro">Web:</span> wedclick.es</p>
            <p><span className="font-semibold text-azul-oscuro">Email:</span> contacto@wedclick.es</p>
            <p><span className="font-semibold text-azul-oscuro">Teléfono:</span> +34 628 355 913</p>
          </div>
        </Section>

        <Section numero="2" titulo="Datos que recopilamos">
          <Parrafo>
            A través de los formularios de nuestra web recopilamos los siguientes datos:
          </Parrafo>
          <Lista items={[
            'Nombre de los novios',
            'Dirección de correo electrónico',
            'Número de teléfono',
            'Fecha y lugar de la boda',
            'Datos de pago (gestionados por Stripe — no almacenamos datos bancarios)',
            'Información sobre la invitación (estilo, número de invitados, etc.)',
            'Fotos subidas al álbum colaborativo',
            'Confirmaciones de asistencia de los invitados',
          ]} />
        </Section>

        <Section numero="3" titulo="Finalidad del tratamiento">
          <Parrafo>
            Los datos personales que nos facilitáis se utilizan exclusivamente para:
          </Parrafo>
          <Lista items={[
            'Gestionar y procesar el pago del servicio contratado',
            'Crear y entregar la invitación digital personalizada',
            'Enviar comunicaciones relacionadas con vuestro pedido',
            'Gestionar el panel de novios y el álbum colaborativo',
            'Atender vuestras consultas y solicitudes de soporte',
            'Cumplir con las obligaciones legales aplicables',
          ]} />
        </Section>

        <Section numero="4" titulo="Base legal del tratamiento">
          <Parrafo>
            La base legal para el tratamiento de vuestros datos es el consentimiento
            explícito que nos otorgáis al contratar el servicio y rellenar los
            formularios, de conformidad con el Reglamento General de Protección
            de Datos (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos
            Personales (LOPDGDD). El tratamiento de datos de pago se basa en la
            ejecución del contrato de prestación de servicios.
          </Parrafo>
        </Section>

        <Section numero="5" titulo="Conservación de los datos">
          <Parrafo>
            Los datos personales se conservarán durante el tiempo necesario para
            prestar el servicio contratado y, una vez finalizado, durante el tiempo
            exigido por la legislación aplicable (mínimo 5 años para datos fiscales).
            Las fotos del álbum colaborativo se conservarán hasta que los novios
            soliciten su eliminación o transcurrido un año desde la fecha de la boda.
          </Parrafo>
        </Section>

        <Section numero="6" titulo="Comunicación de datos a terceros">
          <Parrafo>
            WedClick no cede ni vende vuestros datos personales a terceros.
            Para la prestación del servicio utilizamos los siguientes proveedores
            que actúan como encargados del tratamiento:
          </Parrafo>
          <Lista items={[
            'Stripe — Procesamiento seguro de pagos (stripe.com/es/privacy)',
            'Supabase — Almacenamiento de datos y archivos (supabase.com/privacy)',
            'Resend — Envío de emails transaccionales (resend.com/privacy)',
            'Google Analytics — Análisis de tráfico web (solo si aceptáis las cookies)',
          ]} />
        </Section>

        <Section numero="7" titulo="Vuestros derechos">
          <Parrafo>
            Como titulares de los datos, podéis ejercer en cualquier momento
            los siguientes derechos:
          </Parrafo>
          <Lista items={[
            'Acceso: conocer qué datos tenemos sobre vosotros',
            'Rectificación: corregir datos inexactos o incompletos',
            'Supresión: solicitar la eliminación de vuestros datos',
            'Oposición: oponeros al tratamiento de vuestros datos',
            'Portabilidad: recibir vuestros datos en formato electrónico',
            'Limitación: solicitar la limitación del tratamiento',
          ]} />
          <Parrafo>
            Para ejercer cualquiera de estos derechos, contactadnos en{' '}
            <a
              href="mailto:contacto@wedclick.es"
              className="text-tierra hover:underline"
              >
              contacto@wedclick.es
            </a>
            . También podéis presentar una reclamación ante la Agencia Española
            de Protección de Datos (AEPD) en{' '}
            <a
              href="https://www.aepd.es"
              target="_blank"
              rel="noopener noreferrer"
              className="text-tierra hover:underline"
              >
              www.aepd.es
            </a>
            .
          </Parrafo>
        </Section>

        <Section numero="8" titulo="Política de cookies">
          <Parrafo>
            Nuestra web utiliza cookies propias y de terceros. Las cookies son
            pequeños archivos de texto que se almacenan en vuestro dispositivo
            cuando visitáis nuestra web.
          </Parrafo>

          {/* Tabla cookies */}
          <div className="rounded-2xl border border-beige-claro overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-azul-oscuro text-crema">
                  <th className="font-sans font-semibold text-left
                                 px-4 py-3 text-xs">
                    Cookie
                  </th>
                  <th className="font-sans font-semibold text-left
                                 px-4 py-3 text-xs">
                    Tipo
                  </th>
                  <th className="font-sans font-semibold text-left
                                 px-4 py-3 text-xs">
                    Finalidad
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name:    'wedclick-cookies',
                    type:    'Propia · Técnica',
                    purpose: 'Guardar vuestra preferencia de cookies',
                  },
                  {
                    name:    '_ga, _ga_*',
                    type:    'Google · Analítica',
                    purpose: 'Análisis de tráfico web (solo si aceptáis)',
                  },
                  {
                    name:    '__stripe_*',
                    type:    'Stripe · Técnica',
                    purpose: 'Procesamiento seguro de pagos',
                  },
                ].map((row, i) => (
                  <tr
                  key={row.name}
                  className={i % 2 === 0 ? 'bg-white' : 'bg-crema/50'}
                  >
                    <td className="font-mono text-xs text-azul-oscuro px-4 py-3">
                      {row.name}
                    </td>
                    <td className="font-sans text-xs text-marron px-4 py-3">
                      {row.type}
                    </td>
                    <td className="font-sans text-xs text-marron px-4 py-3">
                      {row.purpose}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Parrafo>
            Podéis gestionar vuestras preferencias de cookies en cualquier momento
            desde el banner de cookies que aparece al acceder a la web, o borrando
            las cookies desde la configuración de vuestro navegador.
          </Parrafo>
        </Section>

        <Section numero="9" titulo="Seguridad de los datos">
          <Parrafo>
            WedClick aplica medidas técnicas y organizativas apropiadas para
            proteger vuestros datos personales contra el acceso no autorizado,
            la pérdida o la destrucción. Los datos de pago son procesados
            directamente por Stripe bajo cifrado SSL y nunca son almacenados
            en nuestros servidores. Las fotos y datos del álbum se almacenan
            en Supabase con acceso restringido.
          </Parrafo>
        </Section>

        <Section numero="10" titulo="Cambios en la política de privacidad">
          <Parrafo>
            WedClick se reserva el derecho de modificar esta política de privacidad
            para adaptarla a cambios legislativos o cambios en nuestros servicios.
            Os recomendamos revisarla periódicamente. La fecha de última actualización
            aparece al inicio de este documento.
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
            ¿Tenéis alguna duda sobre cómo tratamos vuestros datos?
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

export default Privacy