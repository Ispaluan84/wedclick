import { motion } from 'framer-motion'
import { ArrowLeft, Shield } from 'lucide-react'
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

function Privacy() {
  return (
    <>
      <SEO
        titulo="Política de Privacidad · WedClick"
        descripcion="Política de privacidad de WedClick."
        url="https://wedclick.es/privacidad"
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
                <Shield size={13} className="text-w-gold" />
                <span className="font-sans text-[0.6rem] tracking-[0.25em] uppercase text-w-gold">Legal</span>
              </div>
              <h1 className="font-serif text-4xl text-cream">Política de Privacidad</h1>
              <p className="font-sans font-light text-cream/40 text-sm">
                Última actualización: {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Contenido */}
        <motion.div {...fadeUp(0.2)} className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-12">

          <Section numero="1" titulo="Responsable del tratamiento">
            <div className="flex flex-col gap-2 font-sans font-light text-warm-gray text-sm leading-relaxed">
              {[
                { label: 'Nombre', value: 'WedClick' },
                { label: 'Web',    value: 'wedclick.es' },
                { label: 'Email',  value: 'contacto@wedclick.es' },
                { label: 'Teléfono', value: '+34 628 355 913' },
              ].map(({ label, value }) => (
                <p key={label}><span className="font-medium text-ink">{label}:</span> {value}</p>
              ))}
            </div>
          </Section>

          <Section numero="2" titulo="Datos que recopilamos">
            <Parrafo>A través de los formularios de nuestra web recopilamos los siguientes datos:</Parrafo>
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
            <Parrafo>Los datos personales que nos facilitáis se utilizan exclusivamente para:</Parrafo>
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
              explícito que nos otorgáis al contratar el servicio y rellenar los formularios,
              de conformidad con el Reglamento General de Protección de Datos (RGPD) y la
              Ley Orgánica 3/2018 de Protección de Datos Personales (LOPDGDD).
            </Parrafo>
          </Section>

          <Section numero="5" titulo="Conservación de los datos">
            <Parrafo>
              Los datos personales se conservarán durante el tiempo necesario para prestar el
              servicio contratado y, una vez finalizado, durante el tiempo exigido por la
              legislación aplicable (mínimo 5 años para datos fiscales).
            </Parrafo>
          </Section>

          <Section numero="6" titulo="Comunicación de datos a terceros">
            <Parrafo>WedClick no cede ni vende vuestros datos personales a terceros. Para la prestación del servicio utilizamos los siguientes proveedores:</Parrafo>
            <Lista items={[
              'Stripe — Procesamiento seguro de pagos (stripe.com/es/privacy)',
              'Supabase — Almacenamiento de datos y archivos (supabase.com/privacy)',
              'Resend — Envío de emails transaccionales (resend.com/privacy)',
              'Google Analytics — Análisis de tráfico web (solo si aceptáis las cookies)',
            ]} />
          </Section>

          <Section numero="7" titulo="Vuestros derechos">
            <Parrafo>Como titulares de los datos, podéis ejercer en cualquier momento los siguientes derechos:</Parrafo>
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
              <a href="mailto:contacto@wedclick.es" className="text-w-gold hover:text-w-gold-light transition-colors underline underline-offset-2">
                contacto@wedclick.es
              </a>. También podéis presentar una reclamación ante la AEPD en{' '}
              <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-w-gold hover:text-w-gold-light transition-colors underline underline-offset-2">
                www.aepd.es
              </a>.
            </Parrafo>
          </Section>

          <Section numero="8" titulo="Política de cookies">
            <Parrafo>Nuestra web utiliza cookies propias y de terceros para mejorar vuestra experiencia.</Parrafo>
            <div className="border border-w-gold/20 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: '#1A1410' }}>
                    {['Cookie', 'Tipo', 'Finalidad'].map(h => (
                      <th key={h} className="font-sans font-medium text-left px-4 py-3 text-xs text-cream/60 tracking-widest uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'wedclick-cookies', type: 'Propia · Técnica',    purpose: 'Guardar vuestra preferencia de cookies' },
                    { name: '_ga, _ga_*',       type: 'Google · Analítica',  purpose: 'Análisis de tráfico web (solo si aceptáis)' },
                    { name: '__stripe_*',       type: 'Stripe · Técnica',    purpose: 'Procesamiento seguro de pagos' },
                  ].map((row, i) => (
                    <tr key={row.name} style={{ background: i % 2 === 0 ? '#FBF8F3' : '#F7F2EB' }}>
                      <td className="font-mono text-xs text-ink px-4 py-3">{row.name}</td>
                      <td className="font-sans text-xs text-warm-gray px-4 py-3">{row.type}</td>
                      <td className="font-sans text-xs text-warm-gray px-4 py-3">{row.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section numero="9" titulo="Seguridad de los datos">
            <Parrafo>
              WedClick aplica medidas técnicas y organizativas apropiadas para proteger vuestros datos.
              Los datos de pago son procesados directamente por Stripe bajo cifrado SSL y nunca se almacenan en nuestros servidores.
            </Parrafo>
          </Section>

          <Section numero="10" titulo="Cambios en la política de privacidad">
            <Parrafo>
              WedClick se reserva el derecho de modificar esta política para adaptarla a cambios legislativos.
              Os recomendamos revisarla periódicamente.
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
              ¿Tenéis alguna duda sobre cómo tratamos vuestros datos?
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

export default Privacy