import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase }           from '../lib/supabaseClient'
import { Music, Search, Plus, User, Disc3, Heart, X } from 'lucide-react'


const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.8, delay, ease: 'easeOut' },
})



function CancionCard({ cancion, index, onLike, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-white rounded-2xl p-4 shadow-sm border border-black/5
                 hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        {/* Número / Disco */}
        <div className="w-10 h-10 rounded-full bg-tierra/10
                        flex items-center justify-center flex-shrink-0
                        group-hover:bg-tierra/20 transition-colors">
          <Disc3 size={18} className="text-tierra group-hover:animate-spin" 
                 style={{ animationDuration: '3s' }} />
        </div>

        {/* Info canción */}
        <div className="flex-1 min-w-0">
          <h4 className="font-serif text-base text-verde-oscuro truncate">
            {cancion.cancion}
          </h4>
          <p className="font-sans text-xs text-marron font-light truncate">
            {cancion.artista}
          </p>
        </div>

        {/* Invitado */}
        <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
          <User size={12} className="text-sage" />
          <span className="font-sans text-xs text-sage">
            {cancion.invitado}
          </span>
        </div>

        {/* Like */}
        <button
          onClick={() => onLike(cancion.id)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                     bg-tierra/5 hover:bg-tierra/15 transition-colors
                     flex-shrink-0"
        >
          <Heart size={14} className="text-tierra" />
          <span className="font-sans text-xs text-tierra font-medium">
            {cancion.likes}
          </span>
        </button>
      </div>

      {/* Invitado en mobile */}
      <div className="sm:hidden flex items-center gap-1.5 mt-2 pl-14">
        <User size={11} className="text-sage" />
        <span className="font-sans text-xs text-sage">
          {cancion.invitado}
        </span>
      </div>
    </motion.div>
  )
}

function FormularioCancion({ onAdd, onClose }) {
  const [nombre, setNombre]   = useState('')
  const [cancion, setCancion] = useState('')
  const [artista, setArtista] = useState('')
  const [error, setError]     = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!nombre.trim() || !cancion.trim() || !artista.trim()) {
      setError('Por favor, rellena todos los campos')
      return
    }

    onAdd({
      cancion:  cancion.trim(),
      artista:  artista.trim(),
      invitado: nombre.trim(),
    })

    setNombre('')
    setCancion('')
    setArtista('')
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-black/5"
    >
      {/* Cabecera */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sage/10
                          flex items-center justify-center">
            <Plus size={18} className="text-sage" />
          </div>
          <h4 className="font-serif text-lg text-verde-oscuro">
            Sugiere una canción
          </h4>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200
                     flex items-center justify-center transition-colors"
        >
          <X size={16} className="text-gray-500" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Nombre */}
        <div>
          <label className="font-sans text-xs text-marron tracking-wide
                            uppercase mb-1.5 block">
            Tu nombre
          </label>
          <div className="relative">
            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2
                                       text-gray-400" />
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="¿Cómo te llamas?"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200
                         font-sans text-sm text-verde-oscuro placeholder:text-gray-300
                         focus:outline-none focus:ring-2 focus:ring-sage/30
                         focus:border-sage transition-all"
            />
          </div>
        </div>

        {/* Canción */}
        <div>
          <label className="font-sans text-xs text-marron tracking-wide
                            uppercase mb-1.5 block">
            Canción
          </label>
          <div className="relative">
            <Music size={16} className="absolute left-4 top-1/2 -translate-y-1/2
                                        text-gray-400" />
            <input
              type="text"
              value={cancion}
              onChange={(e) => setCancion(e.target.value)}
              placeholder="Nombre de la canción"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200
                         font-sans text-sm text-verde-oscuro placeholder:text-gray-300
                         focus:outline-none focus:ring-2 focus:ring-sage/30
                         focus:border-sage transition-all"
            />
          </div>
        </div>

        {/* Artista */}
        <div>
          <label className="font-sans text-xs text-marron tracking-wide
                            uppercase mb-1.5 block">
            Artista
          </label>
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2
                                         text-gray-400" />
            <input
              type="text"
              value={artista}
              onChange={(e) => setArtista(e.target.value)}
              placeholder="¿Quién la canta?"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200
                         font-sans text-sm text-verde-oscuro placeholder:text-gray-300
                         focus:outline-none focus:ring-2 focus:ring-sage/30
                         focus:border-sage transition-all"
            />
          </div>
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-sans text-xs text-red-500 text-center"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Botón enviar */}
        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-verde-oscuro text-white
                     font-sans text-sm tracking-wide uppercase
                     hover:bg-verde-oscuro/90 transition-colors
                     flex items-center justify-center gap-2 mt-2"
        >
          <Music size={16} />
          Añadir a la playlist
        </button>
      </form>
    </motion.div>
  )
}

function BandaSonora() {
  const [canciones, setCanciones]     = useState([])
  const [mostrarForm, setMostrarForm] = useState(false)
  const [loading, setLoading]         = useState(true)

  const BODA_ID = import.meta.env.VITE_BODA_ID

  useEffect(() => {
    cargarCanciones()

    const canal = supabase
      .channel('canciones-realtime')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'canciones',
        filter: `boda_id=eq.${BODA_ID}`,
      }, (payload) => {
        setCanciones(prev => [payload.new, ...prev])
      })
      .subscribe()

    return () => supabase.removeChannel(canal)
  }, [])

  const cargarCanciones = async () => {
    const { data } = await supabase
      .from('canciones')
      .select('*')
      .eq('boda_id', BODA_ID)
      .order('created_at', { ascending: false })

    if (data) setCanciones(data)
    setLoading(false)
  }

  const handleAdd = async (nueva) => {
    const { error } = await supabase
      .from('canciones')
      .insert({
        boda_id:  BODA_ID,
        cancion:  nueva.cancion,
        artista:  nueva.artista,
        invitado: nueva.invitado,
      })

      
      if (!error) {
        cargarCanciones()
      } else {
        console.log('error:', JSON.stringify(error))
    }
  }

  const handleLike = async (id) => {
    const cancion = canciones.find(c => c.id === id)
    if (!cancion) return
    const { error } = await supabase
      .from('canciones')
      .update({ likes: cancion.likes + 1 })
      .eq('id', id)

    if (!error) {
      setCanciones(prev =>
        prev.map(c => c.id === id ? { ...c, likes: c.likes + 1 } : c)
      )
    }
  }

  const totalCanciones = canciones.length

  return (
    <section id="bandasonora" className="bg-crema py-24 px-6 overflow-hidden">
      <div className="max-w-3xl mx-auto">

        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <span className="font-sans text-xs tracking-widest uppercase text-sage mb-4 block">
            Música
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-verde-oscuro mb-6">
            La banda sonora
            <br />
            <span className="italic text-tierra">de nuestra boda</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-tierra opacity-50" />
            <span className="text-tierra text-lg">◆</span>
            <div className="w-12 h-px bg-tierra opacity-50" />
          </div>
          <p className="font-sans font-light text-marron max-w-xl mx-auto leading-relaxed">
            Queremos que forméis parte de cada momento. Sugiere la canción que
            no puede faltar en nuestra fiesta y ayúdanos a crear la playlist
            perfecta.
          </p>
        </motion.div>

        <motion.div {...fadeUp(0.1)} className="flex justify-center mb-10">
          <div className="bg-white rounded-full px-6 py-3 shadow-sm
                          border border-black/5 flex items-center gap-3">
            <Music size={16} className="text-tierra" />
            <span className="font-sans text-sm text-verde-oscuro">
              <strong className="font-medium">{totalCanciones}</strong> canciones sugeridas
            </span>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!mostrarForm ? (
            <motion.div key="boton" {...fadeUp(0.15)} className="flex justify-center mb-10">
              <button
                onClick={() => setMostrarForm(true)}
                className="group flex items-center gap-3 px-8 py-4 rounded-2xl
                           bg-verde-oscuro text-white font-sans text-sm
                           tracking-wide uppercase hover:bg-verde-oscuro/90
                           transition-all shadow-sm hover:shadow-md"
              >
                <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                Sugerir una canción
              </button>
            </motion.div>
          ) : (
            <motion.div key="form" className="mb-10">
              <FormularioCancion
                onAdd={handleAdd}
                onClose={() => setMostrarForm(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div {...fadeUp(0.2)}>
          <div className="flex items-center gap-2 mb-6">
            <Disc3 size={16} className="text-sage" />
            <h3 className="font-serif text-lg text-verde-oscuro">
              Playlist colaborativa
            </h3>
          </div>
          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {canciones.map((cancion, index) => (
                <CancionCard
                  key={cancion.id}
                  cancion={cancion}
                  index={index}
                  onLike={handleLike}
                />
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.4)} className="mt-10 text-center">
          <p className="font-sans text-xs text-marron/60 italic">
            🎧 Las canciones más votadas sonarán durante la fiesta.
            ¡Haced que vuestro tema favorito llegue al top!
          </p>
        </motion.div>

      </div>
    </section>
  )
}

export default BandaSonora