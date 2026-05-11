import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { supabase } from './lib/supabaseClient'
import Invitation from './pages/Invitation'
import SobreAnimado from './components/SobreAnimado'

function App() {
  const [estado, setEstado] = useState('cargando')
  // estados: 'cargando' | 'sobre' | 'invitacion'

  const [nombreInvitado, setNombreInvitado] = useState('')

  useEffect(() => {
    const iniciar = async () => {
      // ── 1. Leer el parámetro ?i= de la URL ──
      const params = new URLSearchParams(window.location.search)
      const slug   = params.get('i')

      // Sin QR → va directo a la invitación (modo demo/preview)
      if (!slug) {
        setEstado('invitacion')
        return
      }

      // ── 2. ¿Ya abrió el sobre antes? (localStorage) ──
      const yaAbrio = localStorage.getItem(`sobre_${slug}`)
      if (yaAbrio) {
        setEstado('invitacion')
        return
      }

      // ── 3. Consultar el nombre en Supabase ──
      try {
        const { data, error } = await supabase
          .from('invitados')
          .select('nombre, slug')
          .eq('slug', slug)
          .single()

        if (error || !data) {
          // Slug no encontrado → entra igualmente sin nombre
          setEstado('invitacion')
          return
        }

        setNombreInvitado(data.nombre)
        setEstado('sobre')

        // Marcar en Supabase que el invitado ha accedido
        await supabase
          .from('invitados')
          .update({ visto: true, visto_at: new Date().toISOString() })
          .eq('slug', slug)

      } catch {
        setEstado('invitacion')
      }
    }

    iniciar()
  }, [])

  const handleAbrirSobre = () => {
    // Guardar en localStorage para que no vuelva a ver el sobre
    const params = new URLSearchParams(window.location.search)
    const slug   = params.get('i')
    if (slug) localStorage.setItem(`sobre_${slug}`, '1')

    setEstado('invitacion')
  }

  if (estado === 'cargando') {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center"
        style={{ background: '#3D5A3E' }}
      >
        <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      {estado === 'sobre' ? (
        <SobreAnimado
          key="sobre"
          nombreInvitado={nombreInvitado}
          onAbrir={handleAbrirSobre}
        />
      ) : (
        <Invitation key="invitacion" />
      )}
    </AnimatePresence>
  )
}

export default App