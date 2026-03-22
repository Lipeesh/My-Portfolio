import { useRef, useEffect } from 'react'
import { useScrollProgress, scrollToSection } from './hooks/useScrollProgress'
import { useMouse } from './hooks/useMouse'

// 3D
import ThreeScene from './components/three/ThreeScene'

// UI sections
import HeroSection     from './components/sections/HeroSection'
import AboutSection    from './components/sections/AboutSection'
import SkillsSection   from './components/sections/SkillsSection'
import ProjectsSection from './components/sections/ProjectsSection'
import ContactSection  from './components/sections/ContactSection'

// UI chrome
import Navbar      from './components/ui/Navbar'
import SectionDots from './components/ui/SectionDots'
import ProgressBar from './components/ui/ProgressBar'
import CursorGlow  from './components/ui/CursorGlow'

export default function App() {
  const { progress, sectionIndex } = useScrollProgress()
  const mouseRef = useMouse()

  return (
    <>
      {/* ── Noise grain ── */}
      <div id="noise-overlay" />

      {/* ── Cursor glow ── */}
      <CursorGlow />

      {/* ── Progress bar ── */}
      <ProgressBar progress={progress} />

      {/* ── Fixed 3D canvas ── */}
      <div id="three-canvas-wrapper">
        <ThreeScene
          scrollProgress={progress}
          sectionIndex={sectionIndex}
          mouseRef={mouseRef}
        />
      </div>

      {/* ── Fixed chrome ── */}
      <Navbar sectionIndex={sectionIndex} />
      <SectionDots sectionIndex={sectionIndex} />

      {/* ── Scroll-driven UI sections ── */}
      <div id="scroll-root" style={{ height: '600vh' }}>
        {/* Each section is sticky — only one visible at a time */}
        <div style={{ position: 'sticky', top: 0, height: '100vh', zIndex: 20 }}>
          {sectionIndex === 0 && (
            <HeroSection
              isActive={sectionIndex === 0}
              onViewProjects={() => scrollToSection(3)}
              onContact={() => scrollToSection(4)}
            />
          )}
          {sectionIndex === 1 && (
            <AboutSection isActive={sectionIndex === 1} />
          )}
          {sectionIndex === 2 && (
            <SkillsSection isActive={sectionIndex === 2} />
          )}
          {sectionIndex === 3 && (
            <ProjectsSection isActive={sectionIndex === 3} />
          )}
          {sectionIndex === 4 && (
            <ContactSection isActive={sectionIndex === 4} />
          )}
        </div>
      </div>
    </>
  )
}
