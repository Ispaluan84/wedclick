import { Helmet } from 'react-helmet-async'

function SEO({
  titulo      = 'WedClick · Invitaciones de boda digitales y personalizadas',
  descripcion = 'Invitaciones de boda digitales únicas y personalizadas. Sin plantillas, sin robots.',
  url         = 'https://wedclick.es',
  imagen      = 'https://wedclick.es/og-image.jpg',
  tipo        = 'website',
  noIndex     = false,
}) {
  return (
    <Helmet>
      <title>{titulo}</title>
      <meta name="description"  content={descripcion} />
      <link rel="canonical"     href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type"        content={tipo} />
      <meta property="og:title"       content={titulo} />
      <meta property="og:description" content={descripcion} />
      <meta property="og:url"         content={url} />
      <meta property="og:image"       content={imagen} />
      <meta property="og:locale"      content="es_ES" />
      <meta property="og:site_name"   content="WedClick" />

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={titulo} />
      <meta name="twitter:description" content={descripcion} />
      <meta name="twitter:image"       content={imagen} />
    </Helmet>
  )
}

export default SEO