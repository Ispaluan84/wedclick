import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence }      from 'framer-motion'
import { supabase }                     from '../../lib/supabase'
import {
  Wand2, Save, Eye, EyeOff, Code2, Sliders,
  ChevronDown, GripVertical, Plus, Trash2,
  Check, AlertCircle, Loader2, RefreshCw,
  Palette, Type, Layout, Image, Music,
  MapPin, Clock, Shirt, Heart, Camera
} from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
})

// ── Secciones disponibles ──────────────────────────────────
const SECCIONES_DISPONIBLES = [
  { id: 'hero',         label: 'Hero',          icono: Image,   descripcion: 'Portada con nombres y cuenta atrás' },
  { id: 'historia',     label: 'Historia',      icono: Heart,   descripcion: 'Nuestra historia de amor' },
  { id: 'carta',        label: 'Carta',         icono: Heart,   descripcion: 'Carta de los novios' },
  { id: 'lugares',      label: 'Lugares',       icono: MapPin,  descripcion: 'Ceremonia y celebración' },
  { id: 'itinerario',   label: 'Itinerario',    icono: Clock,   descripcion: 'El día hora a hora' },
  { id: 'dresscode',    label: 'Dress Code',    icono: Shirt,   descripcion: 'Código de vestimenta' },
  { id: 'bandasonora',  label: 'Banda Sonora',  icono: Music,   descripcion: 'Playlist colaborativa' },
  { id: 'album',        label: 'Álbum',         icono: Camera,  descripcion: 'Álbum colaborativo de fotos' },
  { id: 'confirmacion', label: 'Confirmación',  icono: Check,   descripcion: 'Formulario de asistencia' },
]

const FUENTES = [
  { id: 'clasica',    label: 'Clásica',    preview: 'Cormorant Garamond' },
  { id: 'moderna',    label: 'Moderna',    preview: 'Playfair Display' },
  { id: 'romantica',  label: 'Romántica',  preview: 'Great Vibes' },
  { id: 'minimalista',label: 'Minimalista',preview: 'Montserrat' },
]

const PALETAS = [
  { id: 'bosque',       label: 'Bosque',       primario: '#3D5A3E', secundario: '#C4956A' },
  { id: 'mediterraneo', label: 'Mediterráneo', primario: '#2C5F8A', secundario: '#E8A87C' },
  { id: 'romantico',    label: 'Romántico',    primario: '#8B3A52', secundario: '#D4A5A5' },
  { id: 'dorado',       label: 'Dorado',       primario: '#2D2926', secundario: '#C9A84C' },
  { id: 'lavanda',      label: 'Lavanda',      primario: '#5C4E7B', secundario: '#C4A882' },
  { id: 'marino',       label: 'Marino',       primario: '#1B3A5C', secundario: '#A67C52' },
]

const ICONOS_ITINERARIO = [
  'Church', 'Wine', 'UtensilsCrossed', 'Music',
  'Camera', 'PartyPopper', 'Car', 'Star'
]

// ── Config por defecto ─────────────────────────────────────
const CONFIG_DEFAULT = {
  novio1: '',
  novio2: '',
  fecha: '',
  lugar: '',
  fotoHero: null,
  colorPrimario: '#3D5A3E',
  colorSecundario: '#C4956A',
  fuente: 'clasica',
  secciones: ['hero', 'historia', 'carta', 'lugares', 'itinerario', 'dresscode', 'bandasonora', 'album', 'confirmacion'],
  hero: { overlayOpacity: 0.5 },
  carta: { texto: '' },
  dresscode: {
    etiqueta: 'Elegante formal',
    descripcion: 'La celebración será al aire libre y en interior',
    nota: '',
    colores: [
      { nombre: 'Verde salvia', hex: '#7D9B76' },
      { nombre: 'Tierra',       hex: '#C4956A' },
    ],
    si: [],
    no: [],
  },
  itinerario: {
    momentos: [],
  },
}

// ── Componente Input ───────────────────────────────────────
function Campo({ label, children }) {
  return (
    <div>
      <label className="font-sans text-xs text-marron/60 uppercase tracking-widest mb-1.5 block">
        {label}
      </label>
      {children}
    </div>
  )
}

const inputCls = `w-full px-3 py-2.5 bg-crema border border-gris-claro rounded-xl
  font-sans text-sm text-azul-oscuro placeholder:text-marron/30
  focus:outline-none focus:border-azul-oscuro transition`

// ── Sección: General ───────────────────────────────────────
function TabGeneral({ config, onChange }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4">
        <Campo label="Nombre 1">
          <input className={inputCls} value={config.novio1 || ''} placeholder="Elena"
            onChange={e => onChange('novio1', e.target.value)} />
        </Campo>
        <Campo label="Nombre 2">
          <input className={inputCls} value={config.novio2 || ''} placeholder="Marcos"
            onChange={e => onChange('novio2', e.target.value)} />
        </Campo>
      </div>
      <Campo label="Fecha y hora de la boda">
        <input className={inputCls} type="datetime-local" value={config.fecha?.slice(0,16) || ''}
          onChange={e => onChange('fecha', e.target.value)} />
      </Campo>
      <Campo label="Lugar">
        <input className={inputCls} value={config.lugar || ''} placeholder="Sevilla, España"
          onChange={e => onChange('lugar', e.target.value)} />
      </Campo>
      <Campo label="URL foto hero (opcional)">
        <input className={inputCls} value={config.fotoHero || ''} placeholder="https://..."
          onChange={e => onChange('fotoHero', e.target.value || null)} />
      </Campo>
      <Campo label="Opacidad overlay hero">
        <div className="flex items-center gap-3">
          <input type="range" min="0" max="1" step="0.05"
            value={config.hero?.overlayOpacity ?? 0.5}
            onChange={e => onChange('hero', { ...config.hero, overlayOpacity: parseFloat(e.target.value) })}
            className="flex-1 accent-verde-oscuro" />
          <span className="font-mono text-xs text-marron/60 w-8">
            {Math.round((config.hero?.overlayOpacity ?? 0.5) * 100)}%
          </span>
        </div>
      </Campo>
    </div>
  )
}

// ── Sección: Diseño ────────────────────────────────────────
function TabDiseno({ config, onChange }) {
  return (
    <div className="flex flex-col gap-6">

      {/* Paletas */}
      <Campo label="Paleta de colores">
        <div className="grid grid-cols-3 gap-2 mt-1">
          {PALETAS.map(p => (
            <button
              key={p.id}
              onClick={() => {
                onChange('colorPrimario', p.primario)
                onChange('colorSecundario', p.secundario)
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition text-left
                ${config.colorPrimario === p.primario
                  ? 'border-azul-oscuro bg-azul-oscuro/5'
                  : 'border-gris-claro hover:border-azul-oscuro/40'
                }`}
            >
              <div className="flex gap-1 flex-shrink-0">
                <div className="w-4 h-4 rounded-full border border-white/50"
                  style={{ background: p.primario }} />
                <div className="w-4 h-4 rounded-full border border-white/50"
                  style={{ background: p.secundario }} />
              </div>
              <span className="font-sans text-xs text-azul-oscuro truncate">{p.label}</span>
            </button>
          ))}
        </div>
      </Campo>

      {/* Colores custom */}
      <div className="grid grid-cols-2 gap-4">
        <Campo label="Color primario">
          <div className="flex items-center gap-2">
            <input type="color" value={config.colorPrimario || '#3D5A3E'}
              onChange={e => onChange('colorPrimario', e.target.value)}
              className="w-10 h-10 rounded-lg border border-gris-claro cursor-pointer" />
            <span className="font-mono text-xs text-marron/60">{config.colorPrimario}</span>
          </div>
        </Campo>
        <Campo label="Color secundario">
          <div className="flex items-center gap-2">
            <input type="color" value={config.colorSecundario || '#C4956A'}
              onChange={e => onChange('colorSecundario', e.target.value)}
              className="w-10 h-10 rounded-lg border border-gris-claro cursor-pointer" />
            <span className="font-mono text-xs text-marron/60">{config.colorSecundario}</span>
          </div>
        </Campo>
      </div>

      {/* Fuentes */}
      <Campo label="Tipografía">
        <div className="grid grid-cols-2 gap-2 mt-1">
          {FUENTES.map(f => (
            <button
              key={f.id}
              onClick={() => onChange('fuente', f.id)}
              className={`px-4 py-3 rounded-xl border text-left transition
                ${config.fuente === f.id
                  ? 'border-azul-oscuro bg-azul-oscuro/5'
                  : 'border-gris-claro hover:border-azul-oscuro/40'
                }`}
            >
              <p className="font-sans text-xs text-marron/60 mb-1">{f.label}</p>
              <p className="text-sm text-azul-oscuro" style={{ fontFamily: f.preview }}>
                Elena & Marcos
              </p>
            </button>
          ))}
        </div>
      </Campo>
    </div>
  )
}

// ── Sección: Secciones ─────────────────────────────────────
function TabSecciones({ config, onChange }) {
  const secciones = config.secciones || []

  const toggle = (id) => {
    if (secciones.includes(id)) {
      onChange('secciones', secciones.filter(s => s !== id))
    } else {
      onChange('secciones', [...secciones, id])
    }
  }

  const mover = (id, dir) => {
    const idx    = secciones.indexOf(id)
    const newIdx = idx + dir
    if (newIdx < 0 || newIdx >= secciones.length) return
    const arr = [...secciones]
    arr.splice(idx, 1)
    arr.splice(newIdx, 0, id)
    onChange('secciones', arr)
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="font-sans text-xs text-marron/60 mb-2">
        Activa, desactiva y reordena las secciones de la invitación.
      </p>
      {SECCIONES_DISPONIBLES.map(sec => {
        const Icono  = sec.icono
        const activa = secciones.includes(sec.id)
        const idx    = secciones.indexOf(sec.id)

        return (
          <div
            key={sec.id}
            className={`flex items-center gap-3 p-3 rounded-xl border transition
              ${activa ? 'bg-white border-gris-claro' : 'bg-crema/50 border-gris-claro/50 opacity-60'}`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
              ${activa ? 'bg-azul-oscuro/10' : 'bg-gris-claro/50'}`}>
              <Icono size={14} className={activa ? 'text-azul-oscuro' : 'text-marron/40'} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-sans text-sm font-medium text-azul-oscuro">{sec.label}</p>
              <p className="font-sans text-xs text-marron/50 truncate">{sec.descripcion}</p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {activa && (
                <>
                  <button onClick={() => mover(sec.id, -1)} disabled={idx === 0}
                    className="p-1 rounded hover:bg-crema transition text-marron/40 disabled:opacity-20">
                    ↑
                  </button>
                  <button onClick={() => mover(sec.id, 1)} disabled={idx === secciones.length - 1}
                    className="p-1 rounded hover:bg-crema transition text-marron/40 disabled:opacity-20">
                    ↓
                  </button>
                </>
              )}
              <button
                onClick={() => toggle(sec.id)}
                className={`w-10 h-6 rounded-full transition-colors flex-shrink-0
                  ${activa ? 'bg-azul-oscuro' : 'bg-gris-claro'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform mx-1
                  ${activa ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── Sección: Contenido ─────────────────────────────────────
function TabContenido({ config, onChange }) {
  const [seccionAbierta, setSeccionAbierta] = useState('carta')

  const updateCarta = (val) => onChange('carta', { ...config.carta, texto: val })

  const updateDresscode = (key, val) =>
    onChange('dresscode', { ...config.dresscode, [key]: val })

  const addColorDresscode = () => {
    const colores = [...(config.dresscode?.colores || []), { nombre: '', hex: '#000000' }]
    updateDresscode('colores', colores)
  }

  const updateColorDresscode = (i, key, val) => {
    const colores = [...(config.dresscode?.colores || [])]
    colores[i] = { ...colores[i], [key]: val }
    updateDresscode('colores', colores)
  }

  const removeColorDresscode = (i) => {
    const colores = [...(config.dresscode?.colores || [])]
    colores.splice(i, 1)
    updateDresscode('colores', colores)
  }

  const addItem = (tipo) => {
    const items = [...(config.dresscode?.[tipo] || []), '']
    updateDresscode(tipo, items)
  }

  const updateItem = (tipo, i, val) => {
    const items = [...(config.dresscode?.[tipo] || [])]
    items[i] = val
    updateDresscode(tipo, items)
  }

  const removeItem = (tipo, i) => {
    const items = [...(config.dresscode?.[tipo] || [])]
    items.splice(i, 1)
    updateDresscode(tipo, items)
  }

  const addMomento = () => {
    const momentos = [...(config.itinerario?.momentos || []), {
      hora: '', titulo: '', descripcion: '', icono: 'Clock', color: 'sage'
    }]
    onChange('itinerario', { ...config.itinerario, momentos })
  }

  const updateMomento = (i, key, val) => {
    const momentos = [...(config.itinerario?.momentos || [])]
    momentos[i] = { ...momentos[i], [key]: val }
    onChange('itinerario', { ...config.itinerario, momentos })
  }

  const removeMomento = (i) => {
    const momentos = [...(config.itinerario?.momentos || [])]
    momentos.splice(i, 1)
    onChange('itinerario', { ...config.itinerario, momentos })
  }

  const secciones = [
    { id: 'carta',      label: 'Carta de los novios' },
    { id: 'dresscode',  label: 'Dress Code' },
    { id: 'itinerario', label: 'Itinerario' },
  ]

  return (
    <div className="flex flex-col gap-2">
      {secciones.map(sec => (
        <div key={sec.id} className="border border-gris-claro rounded-xl overflow-hidden bg-white">
          <button
            onClick={() => setSeccionAbierta(seccionAbierta === sec.id ? null : sec.id)}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-crema transition"
          >
            <span className="font-sans text-sm font-medium text-azul-oscuro">{sec.label}</span>
            <ChevronDown size={16} className={`text-marron/40 transition-transform ${seccionAbierta === sec.id ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {seccionAbierta === sec.id && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 pt-2 border-t border-gris-claro/50 flex flex-col gap-4">

                  {/* ── Carta ── */}
                  {sec.id === 'carta' && (
                    <Campo label="Texto de la carta">
                      <textarea
                        className={`${inputCls} resize-none`}
                        rows={6}
                        value={config.carta?.texto || ''}
                        placeholder="Queridos amigos y familia..."
                        onChange={e => updateCarta(e.target.value)}
                      />
                    </Campo>
                  )}

                  {/* ── DressCode ── */}
                  {sec.id === 'dresscode' && (
                    <>
                      <Campo label="Etiqueta">
                        <input className={inputCls} value={config.dresscode?.etiqueta || ''}
                          onChange={e => updateDresscode('etiqueta', e.target.value)} />
                      </Campo>
                      <Campo label="Descripción">
                        <input className={inputCls} value={config.dresscode?.descripcion || ''}
                          onChange={e => updateDresscode('descripcion', e.target.value)} />
                      </Campo>
                      <Campo label="Nota final">
                        <input className={inputCls} value={config.dresscode?.nota || ''}
                          onChange={e => updateDresscode('nota', e.target.value)} />
                      </Campo>

                      <Campo label="Paleta de colores">
                        <div className="flex flex-col gap-2 mt-1">
                          {(config.dresscode?.colores || []).map((c, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <input type="color" value={c.hex}
                                onChange={e => updateColorDresscode(i, 'hex', e.target.value)}
                                className="w-8 h-8 rounded border border-gris-claro cursor-pointer" />
                              <input className={`${inputCls} flex-1`} value={c.nombre}
                                placeholder="Nombre del color"
                                onChange={e => updateColorDresscode(i, 'nombre', e.target.value)} />
                              <button onClick={() => removeColorDresscode(i)}
                                className="p-1.5 text-red-400 hover:text-red-600 transition">
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                          <button onClick={addColorDresscode}
                            className="flex items-center gap-2 text-xs text-azul-oscuro hover:text-azul-oscuro/70 transition">
                            <Plus size={14} /> Añadir color
                          </button>
                        </div>
                      </Campo>

                      {['si', 'no'].map(tipo => (
                        <Campo key={tipo} label={tipo === 'si' ? 'Sí, por favor' : 'Mejor evitar'}>
                          <div className="flex flex-col gap-2 mt-1">
                            {(config.dresscode?.[tipo] || []).map((item, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <input className={`${inputCls} flex-1`} value={item}
                                  onChange={e => updateItem(tipo, i, e.target.value)} />
                                <button onClick={() => removeItem(tipo, i)}
                                  className="p-1.5 text-red-400 hover:text-red-600 transition">
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            ))}
                            <button onClick={() => addItem(tipo)}
                              className="flex items-center gap-2 text-xs text-azul-oscuro hover:text-azul-oscuro/70 transition">
                              <Plus size={14} /> Añadir ítem
                            </button>
                          </div>
                        </Campo>
                      ))}
                    </>
                  )}

                  {/* ── Itinerario ── */}
                  {sec.id === 'itinerario' && (
                    <div className="flex flex-col gap-3">
                      {(config.itinerario?.momentos || []).map((m, i) => (
                        <div key={i} className="bg-crema/50 rounded-xl p-3 flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <span className="font-sans text-xs font-medium text-azul-oscuro">
                              Momento {i + 1}
                            </span>
                            <button onClick={() => removeMomento(i)}
                              className="p-1 text-red-400 hover:text-red-600 transition">
                              <Trash2 size={13} />
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <input className={inputCls} value={m.hora} placeholder="12:00h"
                              onChange={e => updateMomento(i, 'hora', e.target.value)} />
                            <select className={inputCls} value={m.color}
                              onChange={e => updateMomento(i, 'color', e.target.value)}>
                              <option value="sage">Verde</option>
                              <option value="tierra">Tierra</option>
                            </select>
                          </div>
                          <input className={inputCls} value={m.titulo} placeholder="Título"
                            onChange={e => updateMomento(i, 'titulo', e.target.value)} />
                          <textarea className={`${inputCls} resize-none`} rows={2}
                            value={m.descripcion} placeholder="Descripción"
                            onChange={e => updateMomento(i, 'descripcion', e.target.value)} />
                          <select className={inputCls} value={m.icono}
                            onChange={e => updateMomento(i, 'icono', e.target.value)}>
                            {ICONOS_ITINERARIO.map(ic => (
                              <option key={ic} value={ic}>{ic}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                      <button onClick={addMomento}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-dashed
                          border-gris-claro text-xs text-azul-oscuro hover:border-azul-oscuro transition">
                        <Plus size={14} /> Añadir momento
                      </button>
                    </div>
                  )}

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

// ── Componente principal ───────────────────────────────────
function AdminConstructor() {
  const [bodas, setBodas]           = useState([])
  const [bodaId, setBodaId]         = useState('')
  const [config, setConfig]         = useState(CONFIG_DEFAULT)
  const [configId, setConfigId]     = useState(null)
  const [tab, setTab]               = useState('general')
  const [modoCode, setModoCode]     = useState(false)
  const [jsonCode, setJsonCode]     = useState('')
  const [jsonError, setJsonError]   = useState('')
  const [guardando, setGuardando]   = useState(false)
  const [guardado, setGuardado]     = useState(false)
  const [loading, setLoading]       = useState(false)
  const [previewKey, setPreviewKey] = useState(0)

  // Cargar bodas activas
  useEffect(() => {
    const cargar = async () => {
      const { data } = await supabase
        .from('ordenes')
        .select('id, novio1, novio2, email')
        .eq('estado', 'activo')
        .order('created_at', { ascending: false })
      if (data) setBodas(data)
      if (data?.length) setBodaId(data[0].id)
    }
    cargar()
  }, [])

  // Cargar config de la boda seleccionada
  useEffect(() => {
    if (!bodaId) return
    const cargar = async () => {
      setLoading(true)
      const { data } = await supabase
        .from('configuraciones')
        .select('id, config')
        .eq('boda_id', bodaId)
        .single()

      if (data) {
        setConfigId(data.id)
        setConfig(data.config)
        setJsonCode(JSON.stringify(data.config, null, 2))
      } else {
        setConfigId(null)
        setConfig(CONFIG_DEFAULT)
        setJsonCode(JSON.stringify(CONFIG_DEFAULT, null, 2))
      }
      setLoading(false)
    }
    cargar()
  }, [bodaId])

  // Sync jsonCode cuando config cambia en modo visual
  useEffect(() => {
    if (!modoCode) setJsonCode(JSON.stringify(config, null, 2))
  }, [config, modoCode])

  const handleChange = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }

  const handleJsonChange = (val) => {
    setJsonCode(val)
    try {
      const parsed = JSON.parse(val)
      setConfig(parsed)
      setJsonError('')
    } catch {
      setJsonError('JSON inválido')
    }
  }

  const handleGuardar = async () => {
    setGuardando(true)
    setPreviewKey(k => k + 1)
    try {
      if (configId) {
        await supabase
          .from('configuraciones')
          .update({ config, updated_at: new Date().toISOString() })
          .eq('id', configId)
      } else {
        const { data } = await supabase
          .from('configuraciones')
          .insert({ boda_id: bodaId, config })
          .select()
          .single()
        if (data) setConfigId(data.id)
      }
      setGuardado(true)
      setTimeout(() => setGuardado(false), 2500)
    } catch (e) {
      console.error(e)
    } finally {
      setGuardando(false)
    }
  }

  const tabs = [
    { id: 'general',   label: 'General',   icono: Sliders },
    { id: 'diseno',    label: 'Diseño',    icono: Palette },
    { id: 'secciones', label: 'Secciones', icono: Layout  },
    { id: 'contenido', label: 'Contenido', icono: Type    },
  ]

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">

      {/* Cabecera */}
      <motion.div {...fadeUp(0)} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-azul-oscuro mb-1 flex items-center gap-3">
            <Wand2 size={28} className="text-tierra" />
            Constructor
          </h1>
          <p className="font-sans text-sm text-marron/60">
            Configura la invitación sin tocar código
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Toggle modo código */}
          <button
            onClick={() => setModoCode(!modoCode)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border font-sans text-sm transition
              ${modoCode
                ? 'bg-azul-oscuro text-crema border-azul-oscuro'
                : 'bg-white text-azul-oscuro border-gris-claro hover:border-azul-oscuro'
              }`}
          >
            <Code2 size={15} />
            {modoCode ? 'Modo visual' : 'Modo código'}
          </button>

          {/* Guardar */}
          <button
            onClick={handleGuardar}
            disabled={guardando || (modoCode && !!jsonError)}
            className="flex items-center gap-2 px-4 py-2 bg-azul-oscuro text-crema
              rounded-xl font-sans text-sm hover:opacity-90 transition
              disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {guardando ? <Loader2 size={15} className="animate-spin" /> :
             guardado  ? <Check size={15} className="text-sage" /> :
                         <Save size={15} />}
            {guardado ? 'Guardado' : 'Guardar'}
          </button>
        </div>
      </motion.div>

      {/* Selector de boda */}
      <motion.div {...fadeUp(0.1)} className="mb-6">
        <div className="relative max-w-sm">
          <select
            value={bodaId}
            onChange={e => setBodaId(e.target.value)}
            className="w-full appearance-none bg-white border border-gris-claro rounded-xl
              px-4 py-3 pr-10 font-sans text-sm text-azul-oscuro
              focus:outline-none focus:border-azul-oscuro transition"
          >
            {bodas.map(b => (
              <option key={b.id} value={b.id}>
                {b.novio1} & {b.novio2} — {b.email}
              </option>
            ))}
            {bodas.length === 0 && <option value="">No hay bodas activas</option>}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-marron/40 pointer-events-none" />
        </div>
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-azul-oscuro/30" />
        </div>
      ) : modoCode ? (
        /* ── Modo código ── */
        <motion.div {...fadeUp(0.2)}>
          {jsonError && (
            <div className="flex items-center gap-2 mb-3 px-3 py-2 bg-red-50 rounded-xl border border-red-200">
              <AlertCircle size={14} className="text-red-500" />
              <span className="font-sans text-xs text-red-600">{jsonError}</span>
            </div>
          )}
          <textarea
            value={jsonCode}
            onChange={e => handleJsonChange(e.target.value)}
            className="w-full h-[600px] px-4 py-4 bg-azul-oscuro text-crema/90
              font-mono text-xs rounded-2xl border border-azul-oscuro/20
              focus:outline-none focus:border-tierra resize-none leading-relaxed"
            spellCheck={false}
          />
        </motion.div>
      ) : (
        /* ── Modo visual ── */
        <motion.div {...fadeUp(0.2)}>
          {/* Tabs */}
          <div className="flex gap-1 mb-6 bg-white border border-gris-claro rounded-xl p-1">
            {tabs.map(t => {
              const Icono = t.icono
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg
                    font-sans text-sm transition
                    ${tab === t.id
                      ? 'bg-azul-oscuro text-crema'
                      : 'text-marron/60 hover:text-azul-oscuro'
                    }`}
                >
                  <Icono size={14} />
                  <span className="hidden sm:block">{t.label}</span>
                </button>
              )
            })}
          </div>

          {/* Contenido del tab */}
          <div className="bg-white border border-gris-claro rounded-2xl p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {tab === 'general'   && <TabGeneral   config={config} onChange={handleChange} />}
                {tab === 'diseno'    && <TabDiseno    config={config} onChange={handleChange} />}
                {tab === 'secciones' && <TabSecciones config={config} onChange={handleChange} />}
                {tab === 'contenido' && <TabContenido config={config} onChange={handleChange} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* ── Preview ── */}
      <motion.div {...fadeUp(0.3)} className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <p className="font-sans text-sm font-medium text-azul-oscuro">Preview en vivo</p>
          <button
            onClick={() => setPreviewKey(k => k + 1)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gris-claro
              bg-white font-sans text-xs text-marron hover:border-azul-oscuro transition"
          >
            <RefreshCw size={12} />
            Recargar
          </button>
        </div>
        <div className="rounded-2xl overflow-hidden border border-gris-claro shadow-sm"
          style={{ height: 600 }}>
          <iframe
            key={previewKey}
            src={import.meta.env.VITE_INVITACION_URL || 'http://localhost:5174'}
            className="w-full h-full"
            title="Preview invitación"
          />
        </div>
      </motion.div>

    </div>
  )
}

export default AdminConstructor