import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence }     from 'framer-motion'
import { supabase }                    from '../../lib/supabase'
import { QRCodeCanvas }                from 'qrcode.react'
import jsPDF                           from 'jspdf'       
import QRCodeLib                       from 'qrcode'
import {
  Users, Plus, Trash2, Copy, Check,
  QrCode, Upload, ChevronDown, Link2,
  Search, Eye, EyeOff, RefreshCw, Download, Mail
} from 'lucide-react'


const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
})

// Genera un slug único de 8 caracteres
const generarSlug = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

// URL base de la invitación (ajustar por boda en producción)
const BASE_URL = 'https://elena-marcos.wedclick.es'

function AdminInvitados() {
  const [bodas, setBodas]               = useState([])
  const [bodaId, setBodaId]             = useState('')
  const [invitados, setInvitados]       = useState([])
  const [loading, setLoading]           = useState(false)
  const [guardando, setGuardando]       = useState(false)
  const [busqueda, setBusqueda]         = useState('')
  const [copiados, setCopiados]         = useState({})
  const [qrVisibles, setQrVisibles]     = useState({})
  const [textoLista, setTextoLista]     = useState('')
  const [modalLista, setModalLista]     = useState(false)
  const [nuevoNombre, setNuevoNombre]   = useState('')
  const canvasRefs                      = useRef({})

  // ── Cargar lista de bodas activas ──
  useEffect(() => {
    const cargarBodas = async () => {
      const { data } = await supabase
        .from('ordenes')
        .select('id, novio1, novio2, email, estado')
        .eq('estado', 'activo')
        .order('created_at', { ascending: false })

      if (data) setBodas(data)
      if (data?.length) setBodaId(data[0].id)
    }
    cargarBodas()
  }, [])

  // ── Cargar invitados de la boda seleccionada ──
  useEffect(() => {
    if (!bodaId) return
    cargarInvitados()
  }, [bodaId])

  const cargarInvitados = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('invitados')
      .select('*')
      .eq('boda_id', bodaId)
      .order('created_at', { ascending: true })

    if (!error && data) setInvitados(data)
    setLoading(false)
  }

  // ── Añadir un invitado individualmente ──
  const añadirInvitado = async () => {
    if (!nuevoNombre.trim() || !bodaId) return
    setGuardando(true)

    const slug = generarSlug()
    const { data, error } = await supabase
      .from('invitados')
      .insert({ boda_id: bodaId, nombre: nuevoNombre.trim(), slug })
      .select()
      .single()

    if (!error && data) {
      setInvitados(prev => [...prev, data])
      setNuevoNombre('')
    }
    setGuardando(false)
  }

  // ── Subir lista de nombres (uno por línea) ──
  const subirLista = async () => {
    if (!textoLista.trim() || !bodaId) return
    setGuardando(true)

    const nombres = textoLista
      .split('\n')
      .map(n => n.trim())
      .filter(n => n.length > 0)

    const nuevos = nombres.map(nombre => ({
      boda_id: bodaId,
      nombre,
      slug: generarSlug(),
    }))

    const { data, error } = await supabase
      .from('invitados')
      .insert(nuevos)
      .select()

    if (!error && data) {
      setInvitados(prev => [...prev, ...data])
    }

    setTextoLista('')
    setModalLista(false)
    setGuardando(false)
  }

  // ── Eliminar invitado ──
  const eliminarInvitado = async (id) => {
    if (!confirm('¿Eliminar este invitado?')) return
    await supabase.from('invitados').delete().eq('id', id)
    setInvitados(prev => prev.filter(i => i.id !== id))
  }

  // ── Regenerar slug ──
  const regenerarSlug = async (id) => {
    const nuevoSlug = generarSlug()
    const { error } = await supabase
      .from('invitados')
      .update({ slug: nuevoSlug, visto: false, visto_at: null })
      .eq('id', id)

    if (!error) {
      setInvitados(prev => prev.map(i => i.id === id ? { ...i, slug: nuevoSlug, visto: false } : i))
    }
  }

  // ── Copiar enlace ──
  const copiarEnlace = (slug) => {
    const url = `${BASE_URL}/?i=${slug}`
    navigator.clipboard.writeText(url)
    setCopiados(prev => ({ ...prev, [slug]: true }))
    setTimeout(() => setCopiados(prev => ({ ...prev, [slug]: false })), 2000)
  }

  // ── Mostrar / ocultar QR ──
  const toggleQr = (slug) => {
    setQrVisibles(prev => ({ ...prev, [slug]: !prev[slug] }))
  }

  // ── Descargar QR individual (abre en nueva pestaña para guardar) ──
  const descargarQr = (slug, nombre) => {
    const el = document.getElementById(`qr-${slug}`)
    if (!el) return
    const a = document.createElement('a')
    a.href = el.toDataURL('image/png')
    a.download = `QR_${nombre.replace(/\s/g, '_')}.png`
    a.click()
  }

  const descargarTodoPDF = async () => {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const porFila = 3
  const size = 55
  const padX = 15
  const padY = 20
  const gapX = 10
  const gapY = 22
  const anchoTotal = size + gapX

  for (let i = 0; i < invitadosFiltrados.length; i++) {
    const inv = invitadosFiltrados[i]
    const col = i % porFila
    const fila = Math.floor((i % (porFila * 4)) / porFila)

    if (i > 0 && i % (porFila * 4) === 0) doc.addPage()

    const x = padX + col * anchoTotal
    const y = padY + fila * (size + gapY)

    const url = `${BASE_URL}/?i=${inv.slug}`
    const imgData = await QRCodeLib.toDataURL(url, {
      width: 200,
      margin: 1,
      color: { dark: '#3D5A3E', light: '#FDFCFA' },
    })

    doc.addImage(imgData, 'PNG', x, y, size, size)

    doc.setFontSize(9)
    doc.setTextColor(40, 40, 40)
    doc.text(inv.nombre, x + size / 2, y + size + 5, { align: 'center' })

    doc.setFontSize(6)
    doc.setTextColor(130, 130, 130)
    doc.text(url, x + size / 2, y + size + 10, { align: 'center', maxWidth: size })
  }

  doc.save('invitados-wedclick.pdf')
}
 
  // ── Filtrar por búsqueda ──
  const invitadosFiltrados = invitados.filter(i =>
    i.nombre?.toLowerCase().includes(busqueda.toLowerCase())
  )

  const bodaActual = bodas.find(b => b.id === bodaId)
  const vistos     = invitados.filter(i => i.visto).length

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">

      {/* ── Cabecera ── */}
      <motion.div {...fadeUp(0)} className="mb-8">
        <h1 className="font-serif text-3xl text-azul-oscuro mb-1">
          Invitados
        </h1>
        <p className="font-sans text-sm text-marron/60">
          Gestiona la lista de invitados y sus códigos QR personalizados
        </p>
      </motion.div>

      {/* ── Selector de boda ── */}
      <motion.div {...fadeUp(0.1)} className="mb-6">
        <label className="font-sans text-xs text-marron/60 uppercase tracking-widest mb-2 block">
          Boda
        </label>
        <div className="relative w-full max-w-sm">
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
            {bodas.length === 0 && (
              <option value="">No hay bodas activas</option>
            )}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-marron/40 pointer-events-none" />
        </div>
      </motion.div>

      {/* ── Estadísticas rápidas ── */}
      {bodaId && (
        <motion.div {...fadeUp(0.15)} className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total invitados', valor: invitados.length, color: 'text-azul-oscuro' },
            { label: 'Han visto',       valor: vistos,            color: 'text-sage' },
            { label: 'Sin abrir',       valor: invitados.length - vistos, color: 'text-tierra' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl p-4 border border-gris-claro/50">
              <p className={`font-serif text-3xl font-bold ${stat.color}`}>{stat.valor}</p>
              <p className="font-sans text-xs text-marron/50 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      )}

      {/* ── Barra de acciones ── */}
      <motion.div {...fadeUp(0.2)} className="flex flex-wrap gap-3 mb-6">

        {/* Buscar */}
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-marron/40" />
          <input
            type="text"
            placeholder="Buscar invitado..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gris-claro rounded-xl
                       font-sans text-sm text-azul-oscuro placeholder:text-marron/30
                       focus:outline-none focus:border-azul-oscuro transition"
          />
        </div>

        {/* Subir lista */}
        <button
          onClick={() => setModalLista(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gris-claro
                     bg-white font-sans text-sm text-azul-oscuro hover:border-azul-oscuro transition"
        >
          <Upload size={15} />
          Subir lista
        </button>
        {/* Descargar lista */}
        <button
            onClick={descargarTodoPDF}
            disabled={invitados.length === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gris-claro
                        bg-white font-sans text-sm text-azul-oscuro hover:border-azul-oscuro transition
                        disabled:opacity-40 disabled:cursor-not-allowed"
        >
            <Download size={15} />
                Descargar PDF
        </button>
      </motion.div>

      {/* ── Añadir invitado individual ── */}
      <motion.div {...fadeUp(0.25)} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Nombre del invitado (ej: María & José)"
          value={nuevoNombre}
          onChange={e => setNuevoNombre(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && añadirInvitado()}
          className="flex-1 px-4 py-2.5 bg-white border border-gris-claro rounded-xl
                     font-sans text-sm text-azul-oscuro placeholder:text-marron/30
                     focus:outline-none focus:border-azul-oscuro transition"
        />
        <button
          onClick={añadirInvitado}
          disabled={guardando || !nuevoNombre.trim()}
          className="flex items-center gap-2 px-4 py-2.5 bg-azul-oscuro text-crema
                     rounded-xl font-sans text-sm hover:opacity-90 transition
                     disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Plus size={16} />
          Añadir
        </button>
      </motion.div>

      {/* ── Lista de invitados ── */}
      <motion.div {...fadeUp(0.3)}>
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-azul-oscuro/20 border-t-azul-oscuro rounded-full animate-spin" />
          </div>
        ) : invitadosFiltrados.length === 0 ? (
          <div className="text-center py-16 text-marron/40 font-sans text-sm">
            {busqueda ? 'No se encontraron invitados' : 'Aún no hay invitados. Añade uno arriba o sube una lista.'}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {invitadosFiltrados.map((inv, i) => (
              <motion.div
                key={inv.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-white border border-gris-claro/60 rounded-2xl overflow-hidden"
              >
                {/* Fila principal */}
                <div className="flex items-center gap-3 px-4 py-3">

                  {/* Indicador visto */}
                  <div
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${inv.visto ? 'bg-sage' : 'bg-gris-claro'}`}
                    title={inv.visto ? 'Ha abierto el sobre' : 'Aún no ha accedido'}
                  />

                  {/* Nombre */}
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-sm font-medium text-azul-oscuro truncate">
                      {inv.nombre}
                    </p>
                    <p className="font-mono text-xs text-marron/40 mt-0.5">
                      {`${BASE_URL}/?i=${inv.slug}`}
                    </p>
                  </div>

                  {/* Acciones */}
                  <div className="flex items-center gap-1 flex-shrink-0">

                    {/* Copiar enlace */}
                    <button
                      onClick={() => copiarEnlace(inv.slug)}
                      title="Copiar enlace"
                      className="p-2 rounded-lg hover:bg-crema transition text-marron/50 hover:text-azul-oscuro"
                    >
                      {copiados[inv.slug] ? <Check size={15} className="text-sage" /> : <Copy size={15} />}
                    </button>

                    {/* Ver/Ocultar QR */}
                    <button
                      onClick={() => toggleQr(inv.slug)}
                      title="Ver QR"
                      className="p-2 rounded-lg hover:bg-crema transition text-marron/50 hover:text-azul-oscuro"
                    >
                      <QrCode size={15} />
                    </button>

                    {/* Regenerar slug */}
                    <button
                      onClick={() => regenerarSlug(inv.id)}
                      title="Regenerar código (invalida el anterior)"
                      className="p-2 rounded-lg hover:bg-crema transition text-marron/50 hover:text-tierra"
                    >
                      <RefreshCw size={15} />
                    </button>

                    {/* Eliminar */}
                    <button
                      onClick={() => eliminarInvitado(inv.id)}
                      title="Eliminar"
                      className="p-2 rounded-lg hover:bg-red-50 transition text-marron/50 hover:text-red-500"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* QR expandible */}
                <AnimatePresence>
                  {qrVisibles[inv.slug] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden border-t border-gris-claro/50"
                    >
                      <div className="p-4 bg-crema/30">
  <div className="flex items-start gap-6">
    <QRCodeCanvas
      value={`${BASE_URL}/?i=${inv.slug}`}
      size={96}
      fgColor="#3D5A3E"
      bgColor="#FDFCFA"
      className="rounded-lg flex-shrink-0"
      id={`qr-${inv.slug}`}
    />
    <div className="flex flex-col gap-2 flex-1">
      <p className="font-sans text-xs text-marron/60 break-all">
        {`${BASE_URL}/?i=${inv.slug}`}
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => descargarQr(inv.slug, inv.nombre)}
          className="flex items-center gap-2 px-3 py-2 bg-azul-oscuro text-crema rounded-lg font-sans text-xs hover:opacity-90 transition"
        >
          <Download size={14} />
          Descargar QR
        </button>
        <button
          onClick={() => copiarEnlace(inv.slug)}
          className="flex items-center gap-2 px-3 py-2 border border-gris-claro bg-white text-azul-oscuro rounded-lg font-sans text-xs hover:border-azul-oscuro transition"
        >
          {copiados[inv.slug] ? <Check size={14} className="text-sage" /> : <Copy size={14} />}
          {copiados[inv.slug] ? 'Copiado' : 'Copiar enlace'}
        </button>
        
        <a  href={`https://wa.me/?text=${encodeURIComponent(`Hola ${inv.nombre} 💌 Aquí tienes tu invitación personalizada: ${BASE_URL}/?i=${inv.slug}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 bg-[#25D366] text-white rounded-lg font-sans text-xs hover:opacity-90 transition"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </a>
        
        <a  href={`mailto:?subject=Tu invitación de boda&body=Hola ${inv.nombre},%0A%0AAquí tienes tu invitación personalizada:%0A${BASE_URL}/?i=${inv.slug}`}
          className="flex items-center gap-2 px-3 py-2 bg-tierra text-white rounded-lg font-sans text-xs hover:opacity-90 transition"
        >
          <Mail size={14} />
          Email
        </a>
      </div>
    </div>
  </div>
</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* ── Modal: subir lista ── */}
      <AnimatePresence>
        {modalLista && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={e => e.target === e.currentTarget && setModalLista(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl"
            >
              <h3 className="font-serif text-xl text-azul-oscuro mb-1">
                Subir lista de invitados
              </h3>
              <p className="font-sans text-sm text-marron/60 mb-4">
                Escribe un nombre por línea. Las parejas y familias cuentan como 1 QR.
              </p>

              <textarea
                value={textoLista}
                onChange={e => setTextoLista(e.target.value)}
                rows={10}
                placeholder={"María & José García\nFamilia Ruiz\nCarmen López\nAntonio & Laura"}
                className="w-full px-4 py-3 border border-gris-claro rounded-xl
                           font-sans text-sm text-azul-oscuro placeholder:text-marron/30
                           focus:outline-none focus:border-azul-oscuro transition resize-none"
              />

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setModalLista(false)}
                  className="flex-1 py-2.5 border border-gris-claro rounded-xl
                             font-sans text-sm text-marron hover:bg-crema transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={subirLista}
                  disabled={guardando || !textoLista.trim()}
                  className="flex-1 py-2.5 bg-azul-oscuro text-crema rounded-xl
                             font-sans text-sm hover:opacity-90 transition
                             disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {guardando ? 'Generando...' : `Generar QRs`}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminInvitados