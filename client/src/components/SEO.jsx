import { Helmet } from 'react-helmet-async'

function SEO({
  titulo       = 'WedClick · Invitaciones de boda digitales y personalizadas',
  descripcion  = 'Invitaciones de boda digitales únicas y personalizadas. Sin plantillas, sin robots.',
  url          = 'https://wedclick.es',
  imagen       = 'https://wedclick.es/og-image.jpg',
  noIndex      = false,
}) {
  return (
    <Helmet>
      <title>{titulo}</title>
      <meta name="description" content={descripcion} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title"       content={titulo} />
      <meta property="og:description" content={descripcion} />
      <meta property="og:url"         content={url} />
      <meta property="og:image"       content={imagen} />

      {/* Twitter */}
      <meta name="twitter:title"       content={titulo} />
      <meta name="twitter:description" content={descripcion} />
      <meta name="twitter:image"       content={imagen} />
    </Helmet>
  )
}

export default SEO