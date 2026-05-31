import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// El cursor personalizado solo se activa en la landing page (ruta "/")
function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const mouse   = useRef({ x: 0, y: 0 })
  const ring    = useRef({ x: 0, y: 0 })
  const raf     = useRef(0)
  const location = useLocation()

  const isLanding = location.pathname === '/'

  useEffect(() => {
    if (!isLanding) return

    document.body.classList.add('wedclick-landing')

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top  = e.clientY + 'px'
      }
    }

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.11
      ring.current.y += (mouse.current.y - ring.current.y) * 0.11
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px'
        ringRef.current.style.top  = ring.current.y + 'px'
      }
      raf.current = requestAnimationFrame(animate)
    }

    const addHover = () => {
      dotRef.current?.classList.add('is-hover')
      ringRef.current?.classList.add('is-hover')
    }
    const removeHover = () => {
      dotRef.current?.classList.remove('is-hover')
      ringRef.current?.classList.remove('is-hover')
    }

    const bindHoverables = () => {
      document.querySelectorAll('[data-hover], a, button').forEach((el) => {
        el.addEventListener('mouseenter', addHover)
        el.addEventListener('mouseleave', removeHover)
      })
    }

    document.addEventListener('mousemove', onMove)
    raf.current = requestAnimationFrame(animate)

    // Pequeño delay para que el DOM esté montado
    const t = setTimeout(bindHoverables, 300)

    return () => {
      document.body.classList.remove('wedclick-landing')
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
      clearTimeout(t)
    }
  }, [isLanding])

  if (!isLanding) return null

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}

export default Cursor
