// Banda animada entre Hero y el resto de la landing
const items = [
  'Diseño personalizado',
  'RSVP integrado',
  'Álbum colaborativo',
  'Playlist de invitados',
  'Mapa interactivo',
  'Cuenta atrás',
  'QR por invitado',
  'Gestión en tiempo real',
  'Sobre animado',
  'Dress code visual',
]

function Ticker() {
  const doubled = [...items, ...items]

  return (
    <div
      className="bg-ink overflow-hidden py-4 border-y border-warm-dark/40"
      aria-hidden="true"
    >
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-3.5 flex-shrink-0">
            <span className="font-sans text-[0.62rem] tracking-[0.18em] uppercase text-cream/50">
              {item}
            </span>
            <span className="text-w-gold text-[0.5rem]">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default Ticker
