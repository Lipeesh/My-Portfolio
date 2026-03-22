import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    let mouseX = 0, mouseY = 0
    let currentX = 0, currentY = 0
    let raf: number

    function onMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    function animate() {
      currentX += (mouseX - currentX) * 0.08
      currentY += (mouseY - currentY) * 0.08
      if (ref.current) {
        ref.current.style.left = currentX + 'px'
        ref.current.style.top  = currentY + 'px'
      }
      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div id="cursor-glow" ref={ref} />
}
