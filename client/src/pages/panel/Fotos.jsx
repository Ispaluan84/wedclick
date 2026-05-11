import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import {
  Camera, Download, ZoomIn, X,
  ChevronLeft, ChevronRight,
  User, Clock, ImageIcon, Trash2
} from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
})

/* ─────────────────────────────────────────────
   Lightbox con descarga individual
   ───────────────────────────────────────────── */
function Lightbox({ foto, onClose, onPrev, onNext }) {
  if (!foto) return null

  const handleDescargar = async () => {
    try {
      const response = await fetch(foto.url)
      const blob     = await response.blob()
      const url      = URL.createObjectURL(blob)
      const a        = document.createElement('a')
      a.href         = url
      a.download     = foto.nombre_archivo || `foto-boda-${foto.id}.jpg`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error descargando foto:', error)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm
                 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Botones superiores */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <button
          onClick={(e) => { e.stopPropagation(); handleDescargar() }}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20
                     flex items-center justify-center transition-colors"
          title="Descargar foto"
        >
          <Download size={18} className="text-white" />
        </button>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20
                     flex items-center justify-center transition-colors"
        >
          <X size={20} className="text-white" />
        </button>
      </div>

      {/* Anterior */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-4 z-10 w-12 h-12 rounded-full
                   bg-white/10 hover:bg-white/20 flex items-center
                   justify-center transition-colors"
      >
        <ChevronLeft size={24} className="text-white" />
      </button>

      {/* Imagen */}
      <motion.div
        key={foto.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative max-w-4xl max-h-[80vh] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={foto.url}
          alt={`Foto de ${foto.autor}`}
          className="w-full h-full max-h-[70vh] object-contain rounded-2xl"
        />

        {/* Info inferior */}
        <div className="absolute bottom-0 left-0 right-0 p-4
                        bg-gradient-to-t from-black/60 to-transparent
                        rounded-b-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20
                            flex items-center justify-center">
              <User size={14} className="text-white" />
            </div>
            <div>
              <p className="font-sans text-sm text-white font-medium">
                {foto.autor}
              </p>
              <div className="flex items-center gap-1">
                <Clock size={10} className="text-white/60" />
                <span className="font-sans text-xs text-white/60">
                  {new Date(foto.created_at).toLocaleDateString('es-ES', {
                    day: 'numeric', month: 'long', year: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Siguiente */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-4 z-10 w-12 h-12 rounded-full
                   bg-white/10 hover:bg-white/20 flex items-center
                   justify-center transition-colors"
      >
        <ChevronRight size={24} className="text-white" />
      </button>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Componente principal Fotos
   ───────────────────────────────────────────── */
function Fotos() {
  const { boda }                        = useOutletContext()
  const [fotos, setFotos]               = useState([])
  const [loading, setLoading]           = useState(true)
  const [fotoActiva, setFotoActiva]     = useState(null)
  const [descargando, setDescargando]   = useState(false)
  const [eliminando, setEliminando]     = useState(null)

  useEffect(() => {
    if (!boda?.id) return
    cargarFotos()

    // Tiempo real — nuevas fotos
    const channel = supabase
      .channel(`fotos-panel-${boda.id}`)
      .on(
        'postgres_changes',
        {
          event:  'INSERT',
          schema: 'public',
          table:  'fotos',
          filter: `boda_id=eq.${boda.id}`,
        },
        (payload) => {
          setFotos((prev) => [payload.new, ...prev])
        }
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [boda])

  const cargarFotos = async () => {
    try {
      const { data, error } = await supabase
        .from('fotos')
        .select('*')
        .eq('boda_id', boda.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      if (data) setFotos(data)

    } catch (error) {
      console.error('Error cargando fotos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEliminar = async (foto, e) => {
    e.stopPropagation()
    if (!confirm(`¿Eliminar la foto de ${foto.autor}?`)) return

    setEliminando(foto.id)

    try {
      // Eliminar del Storage
      const { error: storageError } = await supabase.storage
        .from('fotos-bodas')
        .remove([foto.storage_path])

      if (storageError) throw storageError

      // Eliminar de la tabla
      const { error: dbError } = await supabase
        .from('fotos')
        .delete()
        .eq('id', foto.id)

        console.log('dbError:', dbError)
        console.log('foto.id:', foto.id)

      if (dbError) throw dbError

      setFotos((prev) => prev.filter((f) => f.id !== foto.id))

      // Si la foto activa es la eliminada cerrar lightbox
      if (fotoActiva?.id === foto.id) setFotoActiva(null)

    } catch (error) {
      console.error('Error eliminando foto:', error)
    } finally {
      setEliminando(null)
    }
  }

  // Descargar todas las fotos
  const handleDescargarTodas = async () => {
    if (fotos.length === 0) return
    setDescargando(true)

    try {
      for (const foto of fotos) {
        const response = await fetch(foto.url)
        const blob     = await response.blob()
        const url      = URL.createObjectURL(blob)
        const a        = document.createElement('a')
        a.href         = url
        a.download     = foto.nombre_archivo || `foto-boda-${foto.id}.jpg`
        a.click()
        URL.revokeObjectURL(url)
        // Pausa entre descargas para no saturar el navegador
        await new Promise((r) => setTimeout(r, 500))
      }
    } catch (error) {
      console.error('Error descargando fotos:', error)
    } finally {
      setDescargando(false)
    }
  }

  const handleOpen  = (foto) => setFotoActiva(foto)
  const handleClose = () => setFotoActiva(null)

  const handlePrev = () => {
    if (!fotoActiva) return
    const idx = fotos.findIndex((f) => f.id === fotoActiva.id)
    setFotoActiva(fotos[idx <= 0 ? fotos.length - 1 : idx - 1])
  }

  const handleNext = () => {
    if (!fotoActiva) return
    const idx = fotos.findIndex((f) => f.id === fotoActiva.id)
    setFotoActiva(fotos[idx >= fotos.length - 1 ? 0 : idx + 1])
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-azul-oscuro/20
                        border-t-azul-oscuro rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">

      {/* Header */}
      <motion.div {...fadeUp(0)} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-azul-oscuro mb-1">
            Álbum de fotos
          </h1>
          <p className="font-sans text-sm text-marron/60">
            Fotos subidas por vuestros invitados
          </p>
        </div>

        {fotos.length > 0 && (
          <button
            onClick={handleDescargarTodas}
            disabled={descargando}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                       bg-azul-oscuro text-crema font-sans text-sm
                       border border-beige-claro
                       hover:bg-beige-claro hover:text-azul-oscuro
                       transition-colors shadow-sm
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {descargando ? (
              <>
                <div className="w-4 h-4 border-2 border-crema/30
                                border-t-crema rounded-full animate-spin" />
                <span className="hidden sm:block">Descargando...</span>
              </>
            ) : (
              <>
                <Download size={16} />
                <span className="hidden sm:block">
                  Descargar todas ({fotos.length})
                </span>
              </>
            )}
          </button>
        )}
      </motion.div>

      {/* Stats */}
      <motion.div {...fadeUp(0.05)} className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-beige-claro">
          <div className="w-10 h-10 rounded-xl bg-azul-oscuro/10
                          flex items-center justify-center mb-3">
            <ImageIcon size={20} className="text-azul-oscuro" />
          </div>
          <p className="font-serif text-3xl text-azul-oscuro font-bold mb-1">
            {fotos.length}
          </p>
          <p className="font-sans text-sm text-marron/60">
            Fotos en el álbum
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-beige-claro">
          <div className="w-10 h-10 rounded-xl bg-verde-suave/10
                          flex items-center justify-center mb-3">
            <User size={20} className="text-verde-suave" />
          </div>
          <p className="font-serif text-3xl text-verde-suave font-bold mb-1">
            {new Set(fotos.map((f) => f.autor)).size}
          </p>
          <p className="font-sans text-sm text-marron/60">
            Invitados participaron
          </p>
        </div>
      </motion.div>

      {/* Galería */}
      {fotos.length === 0 ? (
        <motion.div {...fadeUp(0.1)} className="text-center py-16">
          <Camera size={48} className="text-beige-claro mx-auto mb-4" />
          <p className="font-sans text-sm text-marron/60 mb-2">
            Aún no hay fotos en el álbum
          </p>
          <p className="font-sans text-xs text-marron/40">
            Las fotos aparecerán aquí cuando los invitados
            las suban desde la invitación
          </p>
        </motion.div>
      ) : (
        <motion.div
          {...fadeUp(0.1)}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
        >
          <AnimatePresence>
            {fotos.map((foto, index) => (
              <motion.div
                key={foto.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: eliminando === foto.id ? 0.5 : 1,
                  scale:   eliminando === foto.id ? 0.95 : 1,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="group relative rounded-2xl overflow-hidden
                           aspect-square cursor-pointer shadow-sm
                           border border-beige-claro"
                onClick={() => handleOpen(foto)}
              >
                <img
                  src={foto.url}
                  alt={`Foto de ${foto.autor}`}
                  className="w-full h-full object-cover transition-transform
                             duration-500 group-hover:scale-110"
                />

                {/* Overlay hover */}
                <div className="absolute inset-0 bg-black/0
                                group-hover:bg-black/40 transition-all
                                duration-300 flex items-center justify-center">
                  <ZoomIn size={22} className="text-white opacity-0
                                                group-hover:opacity-100
                                                transition-opacity" />
                </div>

                {/* Info autor */}
                <div className="absolute bottom-0 left-0 right-0 p-2
                                bg-gradient-to-t from-black/60 to-transparent">
                  <p className="font-sans text-xs text-white/90 truncate">
                    {foto.autor}
                  </p>
                  <p className="font-sans text-[10px] text-white/50">
                    {new Date(foto.created_at).toLocaleDateString('es-ES')}
                  </p>
                </div>

                {/* Botones acción */}
                <div className="absolute top-2 right-2 flex gap-1
                                opacity-0 group-hover:opacity-100
                                transition-opacity duration-300">
                  {/* Descargar individual */}
                  <button
                    onClick={async (e) => {
                      e.stopPropagation()
                      const response = await fetch(foto.url)
                      const blob     = await response.blob()
                      const url      = URL.createObjectURL(blob)
                      const a        = document.createElement('a')
                      a.href         = url
                      a.download     = foto.nombre_archivo || `foto-${foto.id}.jpg`
                      a.click()
                      URL.revokeObjectURL(url)
                    }}
                    className="w-7 h-7 rounded-full bg-white/80
                               hover:bg-white flex items-center
                               justify-center transition-colors"
                    title="Descargar"
                  >
                    <Download size={12} className="text-azul-oscuro" />
                  </button>

                  {/* Eliminar */}
                  <button
                    onClick={(e) => handleEliminar(foto, e)}
                    disabled={eliminando === foto.id}
                    className="w-7 h-7 rounded-full bg-red-500/80
                               hover:bg-red-500 flex items-center
                               justify-center transition-colors
                               disabled:opacity-50"
                    title="Eliminar"
                  >
                    <Trash2 size={12} className="text-white" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Total */}
      {fotos.length > 0 && (
        <motion.p
          {...fadeUp(0.3)}
          className="text-center font-sans text-xs text-marron/40 mt-6"
        >
          {fotos.length} foto{fotos.length !== 1 ? 's' : ''} en el álbum
        </motion.p>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {fotoActiva && (
          <Lightbox
            foto={fotoActiva}
            onClose={handleClose}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Fotos