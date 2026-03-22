import { useEffect, useRef, useState } from 'react'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [sectionIndex, setSectionIndex] = useState(0)
  const TOTAL_SECTIONS = 5

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY
      const maxScroll = document.body.scrollHeight - window.innerHeight
      const p = maxScroll > 0 ? Math.min(scrollTop / maxScroll, 1) : 0
      setProgress(p)
      const idx = Math.min(Math.round(p * (TOTAL_SECTIONS - 1)), TOTAL_SECTIONS - 1)
      setSectionIndex(idx)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { progress, sectionIndex }
}

export function scrollToSection(index: number, totalSections = 5) {
  const maxScroll = document.body.scrollHeight - window.innerHeight
  window.scrollTo({ top: (index / (totalSections - 1)) * maxScroll, behavior: 'smooth' })
}
