import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Camera, Upload, X, ZoomIn, ChevronLeft, ChevronRight,
  Image as ImageIcon, User, Clock, Plus, Lock
} from 'lucide-react'
import { supabase } from '../lib/supabaseClient'

const BODA_ID   = import.meta.env.VITE_BODA_ID
const FECHA_BODA = import.meta.env.VITE_FECHA_BODA

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-60px' },
  transition:  { duration: 0.8, delay, ease: 'easeOut' },
})

/* ─────────────────────────────────────────────
   Lightbox — sin opción de descarga
   ───────────────────────────────────────────── */
function Lightbox({ foto, onClose, onPrev, onNext }) {
  if (!foto) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm
                 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full
                   bg-white/10 hover:bg-white/20 flex items-center
                   justify-center transition-colors"
      >
        <X size={20} className="text-white" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-4 z-10 w-12 h-12 rounded-full
                   bg-white/10 hover:bg-white/20 flex items-center
                   justify-center transition-colors"
      >
        <ChevronLeft size={24} className="text-white" />
      </button>

      <motion.div
        key={foto.id}
        initial={{ opacity: 0, scale: 0.9 }}
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
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

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
   Formulario subida — conectado a Supabase
   ───────────────────────────────────────────── */
function FormularioSubida({ onUpload, onClose }) {
  const [nombre, setNombre]         = useState('')
  const [preview, setPreview]       = useState(null)
  const [archivo, setArchivo]       = useState(null)
  const [error, setError]           = useState('')
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading]   = useState(false)
  const inputRef = useRef(null)

  const handleFile = (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Solo se permiten archivos de imagen')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('La imagen no puede superar los 10MB')
      return
    }
    setError('')
    setArchivo(file)
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target.result)
    reader.readAsDataURL(file)
  }

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true)
    else if (e.type === 'dragleave') setDragActive(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0])
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!nombre.trim()) { setError('Escribe tu nombre'); return }
    if (!archivo)       { setError('Selecciona una foto'); return }

    setUploading(true)

    try {
      // 1. Subir al Storage
      const extension     = archivo.name.split('.').pop()
      const nombreArchivo = `${Date.now()}-${Math.random()
        .toString(36).substring(7)}.${extension}`
      const storagePath   = `${BODA_ID}/${nombreArchivo}`

      const { error: uploadError } = await supabase.storage
        .from('fotos-bodas')
        .upload(storagePath, archivo, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) throw uploadError

      // 2. Obtener URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('fotos-bodas')
        .getPublicUrl(storagePath)

      // 3. Guardar en tabla fotos
      const { data: fotoData, error: dbError } = await supabase
        .from('fotos')
        .insert({
          boda_id:        BODA_ID,
          url:            publicUrl,
          nombre_archivo: nombreArchivo,
          autor:          nombre.trim(),
          storage_path:   storagePath,
        })
        .select()
        .single()

      if (dbError) throw dbError

      onUpload(fotoData)
      setNombre('')
      setPreview(null)
      setArchivo(null)
      onClose()

    } catch (err) {
      console.error('Error subiendo foto:', err)
      setError('Error al subir la foto. Inténtalo de nuevo.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-black/5"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sage/10
                          flex items-center justify-center">
            <Upload size={18} className="text-sage" />
          </div>
          <h4 className="font-serif text-lg text-verde-oscuro">
            Sube tu foto
          </h4>
        </div>
        <button
          onClick={onClose}
          type="button"
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200
                     flex items-center justify-center transition-colors"
        >
          <X size={16} className="text-gray-500" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* Nombre */}
        <div>
          <label className="font-sans text-xs text-marron tracking-wide
                            uppercase mb-1.5 block">
            Tu nombre
          </label>
          <div className="relative">
            <User size={16} className="absolute left-4 top-1/2
                                       -translate-y-1/2 text-gray-400" />
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

        {/* Zona de subida */}
        <div>
          <label className="font-sans text-xs text-marron tracking-wide
                            uppercase mb-1.5 block">
            Foto
          </label>

          {!preview ? (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl p-8
                         flex flex-col items-center justify-center gap-3
                         cursor-pointer transition-all
                         ${dragActive
                           ? 'border-sage bg-sage/5'
                           : 'border-gray-200 hover:border-sage/50 hover:bg-sage/5'
                         }`}
            >
              <div className="w-14 h-14 rounded-full bg-tierra/10
                              flex items-center justify-center">
                <Camera size={24} className="text-tierra" />
              </div>
              <p className="font-sans text-sm text-marron text-center">
                <span className="font-medium text-verde-oscuro">
                  Haz clic para seleccionar
                </span>
                <br />
                <span className="text-xs text-marron/60">
                  o arrastra tu foto aquí
                </span>
              </p>
              <span className="font-sans text-xs text-marron/40">
                JPG, PNG · Máx. 10MB
              </span>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFile(e.target.files[0])}
                className="hidden"
              />
            </div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover"
              />
              <button
                type="button"
                onClick={() => { setPreview(null); setArchivo(null) }}
                className="absolute top-3 right-3 w-8 h-8 rounded-full
                           bg-black/50 hover:bg-black/70 flex items-center
                           justify-center transition-colors"
              >
                <X size={14} className="text-white" />
              </button>
            </div>
          )}
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
          disabled={uploading}
          className="w-full py-3.5 rounded-xl bg-verde-oscuro text-white
                     font-sans text-sm tracking-wide uppercase
                     hover:bg-verde-oscuro/90 transition-colors
                     flex items-center justify-center gap-2
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30
                              border-t-white rounded-full animate-spin" />
              Subiendo...
            </>
          ) : (
            <>
              <Upload size={16} />
              Subir foto al álbum
            </>
          )}
        </button>
      </form>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Tarjeta de foto
   ───────────────────────────────────────────── */
function FotoCard({ foto, index, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative rounded-2xl overflow-hidden shadow-sm
                 border border-black/5 cursor-pointer aspect-square"
      onClick={() => onOpen(foto)}
    >
      <img
        src={foto.url}
        alt={`Foto de ${foto.autor}`}
        className="w-full h-full object-cover transition-transform
                   duration-700 group-hover:scale-110"
      />

      {/* Overlay hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40
                      transition-all duration-300 flex items-center justify-center">
        <ZoomIn size={24} className="text-white opacity-0
                                      group-hover:opacity-100
                                      transition-opacity duration-300" />
      </div>

      {/* Info inferior */}
      <div className="absolute bottom-0 left-0 right-0 p-3
                      bg-gradient-to-t from-black/50 to-transparent">
        <div className="flex items-center gap-1.5">
          <User size={10} className="text-white/80" />
          <span className="font-sans text-xs text-white/80 truncate">
            {foto.autor}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Sección bloqueada — antes de la boda
   ───────────────────────────────────────────── */
function AlbumBloqueado({ fechaBoda }) {
  const diasRestantes = Math.ceil(
    (new Date(fechaBoda) - new Date()) / (1000 * 60 * 60 * 24)
  )

  return (
    <section id="album" className="bg-blanco-roto py-24 px-6 overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="font-sans text-xs tracking-widest uppercase
                           text-sage mb-4 block">
            Recuerdos
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-verde-oscuro mb-6">
            Álbum colaborativo
            <br />
            <span className="italic text-tierra">de nuestra boda</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="w-12 h-px bg-tierra opacity-50" />
            <span className="text-tierra text-lg">◆</span>
            <div className="w-12 h-px bg-tierra opacity-50" />
          </div>

          {/* Card bloqueada */}
          <div className="bg-white rounded-3xl p-10 shadow-sm border border-black/5
                          max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-tierra/10 border border-tierra/20
                            flex items-center justify-center mx-auto mb-6">
              <Lock size={28} className="text-tierra" />
            </div>
            <h3 className="font-serif text-2xl text-verde-oscuro mb-3">
              ¡Pronto podréis subir vuestras fotos!
            </h3>
            <p className="font-sans font-light text-marron text-sm leading-relaxed mb-6">
              El álbum se activará el día de la boda. Entonces podréis subir
              todas las fotos del gran día y crear juntos el recuerdo más especial.
            </p>
            <div className="bg-crema/50 rounded-2xl px-6 py-4 border border-tierra/20">
              <p className="font-sans text-xs text-marron/60 uppercase tracking-widest mb-1">
                El álbum se abre en
              </p>
              <p className="font-serif text-3xl text-tierra font-bold">
                {diasRestantes} día{diasRestantes !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Componente principal
   ───────────────────────────────────────────── */
function AlbumColaborativo() {
  const [fotos, setFotos]             = useState([])
  const [mostrarForm, setMostrarForm] = useState(false)
  const [fotoActiva, setFotoActiva]   = useState(null)
  const [loading, setLoading]         = useState(true)

  // Comprobar si la boda ya ha pasado
  const fechaBoda     = FECHA_BODA || import.meta.env.VITE_FECHA_BODA
  const bodaFinalizada = fechaBoda
    ? new Date() >= new Date(fechaBoda)
    : false

  useEffect(() => {
    if (!bodaFinalizada) {
      setLoading(false)
      return
    }

    cargarFotos()

    // Tiempo real — nuevas fotos
    const channel = supabase
      .channel('fotos-invitacion')
      .on(
        'postgres_changes',
        {
          event:  'INSERT',
          schema: 'public',
          table:  'fotos',
          filter: `boda_id=eq.${BODA_ID}`,
        },
        (payload) => {
          setFotos((prev) => [payload.new, ...prev])
        }
      )
      .on(
        'postgres_changes',
        {
          event:  'DELETE',
          schema:  'public',
          table:   'fotos',
          filter:  `boda_id=eq.${BODA_ID}`,
        },
        (payload) => {
          setFotos((prev) => prev.filter((f) => f.id !== payload.old.id))
        }
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [bodaFinalizada])

  const cargarFotos = async () => {
    try {
      const { data, error } = await supabase
        .from('fotos')
        .select('*')
        .eq('boda_id', BODA_ID)
        .order('created_at', { ascending: false })

      if (error) throw error
      if (data) setFotos(data)

    } catch (error) {
      console.error('Error cargando fotos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = (nuevaFoto) => {
    setFotos((prev) => [nuevaFoto, ...prev])
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

  // Si la boda no ha pasado mostrar sección bloqueada
  if (!bodaFinalizada) {
    return <AlbumBloqueado fechaBoda={fechaBoda} />
  }

  return (
    <section id="album" className="bg-blanco-roto py-24 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">

        {/* Encabezado */}
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <span className="font-sans text-xs tracking-widest uppercase
                           text-sage mb-4 block">
            Recuerdos
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-verde-oscuro mb-6">
            Álbum colaborativo
            <br />
            <span className="italic text-tierra">de nuestra boda</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-tierra opacity-50" />
            <span className="text-tierra text-lg">◆</span>
            <div className="w-12 h-px bg-tierra opacity-50" />
          </div>
          <p className="font-sans font-light text-marron max-w-xl mx-auto leading-relaxed">
            Ayudadnos a crear el álbum más especial. Subid vuestras fotos del
            gran día y entre todos construiremos los mejores recuerdos.
          </p>
        </motion.div>

        {/* Contador de fotos */}
        <motion.div {...fadeUp(0.1)} className="flex justify-center mb-10">
          <div className="bg-white rounded-full px-6 py-3 shadow-sm
                          border border-black/5 flex items-center gap-3">
            <ImageIcon size={16} className="text-tierra" />
            <span className="font-sans text-sm text-verde-oscuro">
              <strong className="font-medium">{fotos.length}</strong> fotos compartidas
            </span>
          </div>
        </motion.div>

        {/* Botón subir / Formulario */}
        <AnimatePresence mode="wait">
          {!mostrarForm ? (
            <motion.div
              key="boton"
              {...fadeUp(0.15)}
              className="flex justify-center mb-12"
            >
              <button
                onClick={() => setMostrarForm(true)}
                className="group flex items-center gap-3 px-8 py-4 rounded-2xl
                           bg-verde-oscuro text-white font-sans text-sm
                           tracking-wide uppercase hover:bg-verde-oscuro/90
                           transition-all shadow-sm hover:shadow-md"
              >
                <Plus size={18} className="group-hover:rotate-90
                                           transition-transform duration-300" />
                Subir una foto
              </button>
            </motion.div>
          ) : (
            <motion.div key="form" className="mb-12 max-w-lg mx-auto">
              <FormularioSubida
                onUpload={handleUpload}
                onClose={() => setMostrarForm(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Galería */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-verde-oscuro/20
                            border-t-verde-oscuro rounded-full animate-spin" />
          </div>
        ) : fotos.length === 0 ? (
          <motion.div {...fadeUp(0.2)} className="text-center py-12">
            <Camera size={48} className="text-gray-200 mx-auto mb-4" />
            <p className="font-sans text-sm text-marron/60">
              ¡Sé el primero en subir una foto!
            </p>
          </motion.div>
        ) : (
          <motion.div
            {...fadeUp(0.2)}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          >
            {fotos.map((foto, index) => (
              <FotoCard
                key={foto.id}
                foto={foto}
                index={index}
                onOpen={handleOpen}
              />
            ))}
          </motion.div>
        )}

        {/* Nota */}
        <motion.div {...fadeUp(0.4)} className="mt-12 text-center">
          <div className="bg-white rounded-2xl px-8 py-6 shadow-sm
                          border border-black/5 inline-block">
            <p className="font-sans text-sm text-marron font-light">
              📸 Las fotos se compartirán con los novios para crear
              el álbum definitivo de su boda.
              <br />
              <span className="text-xs text-marron/60 mt-1 block">
                ¡Cada momento cuenta, no dejéis de capturarlos!
              </span>
            </p>
          </div>
        </motion.div>

      </div>

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
    </section>
  )
}

export default AlbumColaborativo