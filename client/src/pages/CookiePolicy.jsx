import { motion } from 'framer-motion'
import { useCookies } from '../context/CookieContext'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
})

const cookiesTecnicas = [
  {
    nombre:   'wedclick-cookies',
    finalidad:'Guardar vuestra decisión sobre el banner de cookies (aceptadas / rechazadas), para no volver a preguntar en cada visita.',
    duracion: 'Permanente (hasta que la borréis manualmente)',
    titular:  'WedClick (propia)',
  },
]

const cookiesAnaliticas = [
  {
    nombre:   '_ga',
    finalidad:'Distinguir usuarios únicos, asignando un identificador anónimo para generar estadísticas de uso de la web.',
    duracion: '2 años',
    titular:  'Google Analytics (tercero)',
  },
  {
    nombre:   'G-D62456N7EB',
    finalidad:'Mantener el estado de la sesión dentro de Google Analytics para esta propiedad concreta.',
    duracion: '2 años',
    titular:  'Google Analytics (tercero)',
  },
]

function TablaCookies({ filas }) {
  return (
    <div className="overflow-x-auto border border-w-gold-light rounded-xl">
      <table className="w-full text-left border-collapse min-w-[560px]">
        <thead>
          <tr className="bg-cream">
            <th className="font-sans text-[0.65rem] tracking-widest uppercase text-warm-gray px-4 py-3">Cookie</th>
            <th className="font-sans text-[0.65rem] tracking-widest uppercase text-warm-gray px-4 py-3">Finalidad</th>
            <th className="font-sans text-[0.65rem] tracking-widest uppercase text-warm-gray px-4 py-3">Duración</th>
            <th className="font-sans text-[0.65rem] tracking-widest uppercase text-warm-gray px-4 py-3">Titular</th>
          </tr>
        </thead>
        <tbody>
          {filas.map((f) => (
            <tr key={f.nombre} className="border-t border-w-gold-light/60">
              <td className="font-mono text-xs text-ink px-4 py-3 align-top whitespace-nowrap">{f.nombre}</td>
              <td className="font-sans text-xs text-warm-gray px-4 py-3 align-top leading-relaxed">{f.finalidad}</td>
              <td className="font-sans text-xs text-warm-gray px-4 py-3 align-top whitespace-nowrap">{f.duracion}</td>
              <td className="font-sans text-xs text-warm-gray px-4 py-3 align-top whitespace-nowrap">{f.titular}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CookiePolicy() {
  const { consent, acceptCookies, rejectCookies } = useCookies()

  return (
    <div className="min-h-screen bg-paper px-6 md:px-14 py-20">
      <div className="max-w-3xl mx-auto">

        <motion.div {...fadeUp(0)}>
          <a href="/" className="inline-block mb-10">
            <img src="/Logo_WedClick.png" alt="WedClick" className="h-14" />
          </a>
          <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-w-gold mb-3">
            Información legal
          </p>
          <h1 className="font-serif text-3xl md:text-4xl text-ink mb-3">
            Política de Cookies
          </h1>
          <p className="font-sans text-xs text-warm-gray mb-12">
            Última actualización: 03/10/2026
          </p>
        </motion.div>

        <motion.div {...fadeUp(0.1)} className="flex flex-col gap-10 font-sans text-sm text-warm-gray leading-relaxed">

          <section>
            <h2 className="font-serif text-xl text-ink mb-3">¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que un sitio web instala en vuestro
              ordenador, tablet o móvil cuando lo visitáis. Permiten, entre otras cosas, almacenar
              y recuperar información sobre vuestros hábitos de navegación o sobre vuestro equipo
              y, dependiendo de la información que contengan y de la forma en que lo utilicéis,
              pueden usarse para reconoceros.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-ink mb-3">¿Qué cookies utiliza WedClick?</h2>
            <p className="mb-6">
              En <strong className="text-ink">wedclick.es</strong> utilizamos los siguientes tipos de cookies:
            </p>

            <h3 className="font-sans text-xs tracking-widest uppercase text-w-gold mb-3 mt-6">
              Cookies técnicas (necesarias)
            </h3>
            <p className="mb-4">
              Son imprescindibles para el funcionamiento básico de la web y no requieren
              consentimiento. Se instalan siempre, estéis o no de acuerdo con el resto de cookies.
            </p>
            <TablaCookies filas={cookiesTecnicas} />

            <h3 className="font-sans text-xs tracking-widest uppercase text-w-gold mb-3 mt-8">
              Cookies analíticas (requieren vuestro consentimiento)
            </h3>
            <p className="mb-4">
              Utilizamos Google Analytics para entender cómo se usa la web (páginas más visitadas,
              tiempo de permanencia, origen de las visitas) y así poder mejorarla. Estas cookies
              solo se instalan si pulsáis <strong className="text-ink">"Aceptar todas"</strong> en
              el banner de cookies; si pulsáis "Rechazar", no se cargan en ningún momento.
            </p>
            <TablaCookies filas={cookiesAnaliticas} />
          </section>

          <section>
            <h2 className="font-serif text-xl text-ink mb-3">¿Cómo podéis gestionar vuestras preferencias?</h2>
            <p className="mb-4">
              Podéis cambiar vuestra decisión sobre las cookies analíticas en cualquier momento
              borrando los datos de navegación de vuestro navegador para este sitio (esto
              hará que el banner vuelva a aparecer en vuestra próxima visita) o mediante el
              siguiente botón:
            </p>

            <div className="flex flex-wrap gap-3 mb-4">
              <button
                onClick={rejectCookies}
                className="font-sans text-xs tracking-[0.15em] uppercase px-6 py-3 border border-ink/15
                           text-ink hover:bg-ink hover:text-cream transition-colors duration-300"
              >
                Rechazar cookies analíticas
              </button>
              <button
                onClick={acceptCookies}
                className="font-sans text-xs tracking-[0.15em] uppercase px-6 py-3
                           bg-w-gold border border-w-gold text-ink hover:bg-ink hover:text-cream
                           hover:border-ink transition-colors duration-300"
              >
                Aceptar cookies analíticas
              </button>
            </div>

            <p className="font-sans text-xs text-warm-gray/70">
              Preferencia actual: {
                consent === 'accepted' ? 'cookies analíticas aceptadas' :
                consent === 'rejected' ? 'cookies analíticas rechazadas' :
                'aún no indicada'
              }
            </p>

            <p className="mt-4">
              También podéis configurar u oponeros al uso de cookies directamente desde las
              opciones de vuestro navegador:
            </p>
            <ul className="list-disc list-inside mt-2 flex flex-col gap-1">
              <li>
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noreferrer"
                   className="text-w-gold underline underline-offset-2">Google Chrome</a>
              </li>
              <li>
                <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noreferrer"
                   className="text-w-gold underline underline-offset-2">Mozilla Firefox</a>
              </li>
              <li>
                <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noreferrer"
                   className="text-w-gold underline underline-offset-2">Safari</a>
              </li>
              <li>
                <a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noreferrer"
                   className="text-w-gold underline underline-offset-2">Microsoft Edge</a>
              </li>
            </ul>

            <p className="mt-4">
              Para las cookies de Google Analytics en concreto, también podéis instalar el{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer"
                 className="text-w-gold underline underline-offset-2">
                complemento de inhabilitación para navegadores de Google Analytics
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-ink mb-3">Más información</h2>
            <p>
              Para cualquier duda sobre esta Política de Cookies, podéis escribirnos a{' '}
              <a href="mailto:wedclick93@gmail.com" className="text-w-gold underline underline-offset-2">
                wedclick93@gmail.com
              </a>. Para información sobre cómo tratamos vuestros datos personales, consultad
              nuestra{' '}
              <a href="/privacidad" className="text-w-gold underline underline-offset-2">
                Política de Privacidad
              </a>.
            </p>
          </section>

        </motion.div>
      </div>
    </div>
  )
}

export default CookiePolicy