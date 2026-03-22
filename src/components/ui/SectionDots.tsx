import { scrollToSection } from '../../hooks/useScrollProgress'

interface SectionDotsProps {
  sectionIndex: number
  total?: number
}

export default function SectionDots({ sectionIndex, total = 5 }: SectionDotsProps) {
  return (
    <div className="section-dots">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`sdot${sectionIndex === i ? ' active' : ''}`}
          onClick={() => scrollToSection(i, total)}
          title={['Hero', 'About', 'Skills', 'Projects', 'Contact'][i]}
        />
      ))}
    </div>
  )
}
