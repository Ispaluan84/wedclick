import { useEffect } from 'react'
import { useCookies } from '../../context/CookieContext'

const GA_ID = 'G-C8QHKFK35M'

function loadGoogleAnalytics() {
  // Evitar cargarlo dos veces
  if (document.getElementById('ga-script')) return

  const script1 = document.createElement('script')
  script1.id    = 'ga-script'
  script1.async = true
  script1.src   = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script1)

  window.dataLayer = window.dataLayer || []
  function gtag() { window.dataLayer.push(arguments) }
  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', GA_ID)
}

function Analytics() {
  const { consent } = useCookies()

  useEffect(() => {
    if (consent === 'accepted') {
      loadGoogleAnalytics()
    }
  }, [consent])

  return null
}

export default Analytics