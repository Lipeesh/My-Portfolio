import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface HeroSectionProps {
  isActive: boolean
  onViewProjects: () => void
  onContact: () => void
}

export default function HeroSection({ isActive, onViewProjects, onContact }: HeroSectionProps) {
  const contentRef = useRef<HTMLDivElement>(null!)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true
    const el = contentRef.current
    const children = el.querySelectorAll('.hero-anim')
    gsap.fromTo(children,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.75, stagger: 0.12, ease: 'power3.out', delay: 0.5 }
    )
  }, [])

  return (
    <div className="section-wrapper" id="hero">
      <div className="hero-content" ref={contentRef}>
        <div className="hero-badge hero-anim">
          AI Engineer · Available for Work
        </div>
        <h1 className="hero-name hero-anim">
          Lipeesh<br />Acharya
        </h1>
        <p className="hero-role hero-anim">Artificial Intelligence Engineer</p>
        <p className="hero-tagline hero-anim">
          Building Intelligent Systems · From Research to Production
        </p>
        <div className="hero-buttons hero-anim">
          <button className="btn-primary" onClick={onViewProjects}>
            View Projects ↗
          </button>
          <button className="btn-ghost" onClick={onContact}>
            Contact Me
          </button>
        </div>
      </div>
      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </div>
  )
}
