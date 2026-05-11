import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * SobreAnimado
 * 
 * Se muestra cuando el invitado accede con su QR (?i=slug) y no ha abierto
 * el sobre antes. Al abrirlo, se guarda en localStorage y se entra a la invitación.
 * 
 * Props:
 *   nombreInvitado  — string con el nombre del invitado (ej: "María & José")
 *   onAbrir         — callback que se llama cuando el sobre termina de abrirse
 */
function SobreAnimado({ nombreInvitado, onAbrir }) {
  const [fase, setFase] = useState('cerrado') 
  // fases: 'cerrado' → 'abriendo' → 'abierto' → 'saliendo'

  const handleClick = () => {
    if (fase !== 'cerrado') return
    setFase('abriendo')

    // Abre la solapa
    setTimeout(() => setFase('abierto'), 800)

    // Sale de la pantalla y llama al callback
    setTimeout(() => {
      setFase('saliendo')
    }, 2200)

    setTimeout(() => {
      onAbrir()
    }, 3000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #3D5A3E 0%, #2a3d2b 50%, #1e2e1f 100%)' }}
    >
      {/* Textura de fondo sutil */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #7D9B76 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, #C4956A 0%, transparent 40%),
                            radial-gradient(circle at 60% 80%, #7D9B76 0%, transparent 35%)`,
        }}
      />

      {/* Partículas decorativas */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-tierra/40"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Texto superior */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-center mb-10 px-6"
      >
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-sage/70 mb-3">
          Tienes una invitación
        </p>
        <h2 className="font-serif text-2xl md:text-3xl text-crema">
          {nombreInvitado}
        </h2>
      </motion.div>

      {/* ─── EL SOBRE ─── */}
      <motion.div
        className="relative cursor-pointer select-none"
        style={{ width: 280, height: 200 }}
        onClick={handleClick}
        animate={fase === 'saliendo' ? { y: -60, opacity: 0, scale: 0.9 } : {}}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        whileHover={fase === 'cerrado' ? { scale: 1.02 } : {}}
      >
        {/* Sombra del sobre */}
        <motion.div
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full"
          style={{
            width: 220,
            height: 20,
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)',
            filter: 'blur(6px)',
          }}
          animate={fase === 'abriendo' || fase === 'abierto' ? { opacity: 0.2 } : { opacity: 1 }}
        />

        {/* Cuerpo del sobre */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, #F5F0E8 0%, #ede8df 100%)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 4px 20px rgba(0,0,0,0.2)',
          }}
        >
          {/* Triángulo inferior (base del sobre, siempre visible) */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: '55%',
              background: 'linear-gradient(180deg, #ede8df 0%, #e5dfd4 100%)',
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            }}
          />

          {/* Triángulo izquierdo */}
          <div
            className="absolute left-0 top-0 bottom-0"
            style={{
              width: '50%',
              background: 'linear-gradient(135deg, #ddd7cc 0%, #e5dfd4 60%)',
              clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
            }}
          />

          {/* Triángulo derecho */}
          <div
            className="absolute right-0 top-0 bottom-0"
            style={{
              width: '50%',
              background: 'linear-gradient(225deg, #ddd7cc 0%, #e5dfd4 60%)',
              clipPath: 'polygon(100% 0, 0 50%, 100% 100%)',
            }}
          />

          {/* Sello de lacre central */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            animate={
              fase === 'abriendo'
                ? { scale: [1, 1.1, 0], opacity: [1, 1, 0] }
                : {}
            }
            transition={{ duration: 0.5, times: [0, 0.3, 1] }}
          >
            {/* Círculo de lacre */}
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle at 35% 35%, #d4896a 0%, #C4956A 40%, #a37050 100%)',
                boxShadow: '0 3px 12px rgba(196,149,106,0.5), inset 0 1px 2px rgba(255,255,255,0.3)',
              }}
            >
              {/* Monograma */}
              <span
                className="font-serif text-white text-xl font-bold"
                style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)', letterSpacing: '-1px' }}
              >
                E&M
              </span>
            </div>
            {/* Borde del lacre */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: '1px solid rgba(196,149,106,0.4)',
                transform: 'scale(1.08)',
              }}
            />
          </motion.div>
        </div>

        {/* ─── SOLAPA SUPERIOR (se abre hacia arriba) ─── */}
        <motion.div
          className="absolute top-0 left-0 right-0 z-20 origin-top"
          style={{ height: '55%' }}
          animate={
            fase === 'abriendo' || fase === 'abierto' || fase === 'saliendo'
              ? { rotateX: -160, opacity: 0.6 }
              : { rotateX: 0 }
          }
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <div
            className="w-full h-full"
            style={{
              background: 'linear-gradient(180deg, #e8e2d8 0%, #ddd7cc 100%)',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              transformOrigin: 'top center',
              boxShadow: 'inset 0 -2px 8px rgba(0,0,0,0.08)',
            }}
          />
        </motion.div>

        {/* ─── CARTA que sale del sobre ─── */}
        <AnimatePresence>
          {(fase === 'abierto' || fase === 'saliendo') && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: -60, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="absolute left-4 right-4 bottom-4 z-30 rounded-xl overflow-hidden"
              style={{
                background: 'linear-gradient(160deg, #FDFCFA 0%, #F5F0E8 100%)',
                boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
                padding: '16px',
                textAlign: 'center',
              }}
            >
              {/* Líneas decorativas de la carta */}
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="h-px w-8 bg-tierra/30" />
                <span className="text-tierra text-xs">✦</span>
                <div className="h-px w-8 bg-tierra/30" />
              </div>
              <p className="font-serif text-verde-oscuro text-sm leading-relaxed">
                Elena & Marcos
              </p>
              <p className="font-sans text-xs text-marron/60 mt-1 tracking-widest uppercase">
                os invitan
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Instrucción debajo del sobre */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: fase === 'cerrado' ? 1 : 0, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-10 text-center"
      >
        <motion.p
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="font-sans text-xs tracking-[0.25em] uppercase text-crema/50"
        >
          Toca para abrir
        </motion.p>
        <div className="mt-3 flex justify-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full bg-tierra/40"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Firma WedClick abajo */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 font-sans text-xs text-crema/30 tracking-widest"
      >
        WedClick
      </motion.p>
    </motion.div>
  )
}

export default SobreAnimado