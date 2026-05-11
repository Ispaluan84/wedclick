import { useConfig }       from '../hooks/useConfig'
import Hero                from '../components/Hero'
import Historia            from '../components/Historia'
import CartaNovios         from '../components/CartaNovios'
import Lugares             from '../components/Lugares'
import Itinerario          from '../components/Itinerario'
import DressCode           from '../components/DressCode'
import BandaSonora         from '../components/BandaSonora'
import AlbumColaborativo   from '../components/AlbumColaborativo'
import Confirmacion        from '../components/Confirmacion'
import NavDots             from '../components/NavDots'

const SECCIONES = {
  hero:         Hero,
  historia:     Historia,
  carta:        CartaNovios,
  lugares:      Lugares,
  itinerario:   Itinerario,
  dresscode:    DressCode,
  bandasonora:  BandaSonora,
  album:        AlbumColaborativo,
  confirmacion: Confirmacion,
}

function Invitation() {
  const { config, loading } = useConfig()

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-crema">
        <div className="w-8 h-8 border-2 border-verde-oscuro/20 border-t-verde-oscuro rounded-full animate-spin" />
      </div>
    )
  }

  const secciones = config?.secciones || Object.keys(SECCIONES)

  return (
    <>
      <NavDots />
      <main>
        {secciones.map(id => {
          const Componente = SECCIONES[id]
          if (!Componente) return null
          return <Componente key={id} config={config} />
        })}
      </main>
    </>
  )
}

export default Invitation