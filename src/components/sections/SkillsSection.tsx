import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface SkillsSectionProps {
  isActive: boolean
}

const SKILLS = [
  { name: 'Python',          level: 95, color: '#3B82F6' },
  { name: 'TensorFlow',      level: 88, color: '#8B5CF6' },
  { name: 'PyTorch',         level: 85, color: '#06B6D4' },
  { name: 'Computer Vision', level: 90, color: '#3B82F6' },
  { name: 'NLP / LLMs',      level: 82, color: '#8B5CF6' },
  { name: 'IoT + AI',        level: 78, color: '#06B6D4' },
  { name: 'OpenCV',          level: 87, color: '#3B82F6' },
  { name: 'MLOps / Docker',  level: 72, color: '#8B5CF6' },
  { name: 'RAG Systems',     level: 80, color: '#06B6D4' },
]

export default function SkillsSection({ isActive }: SkillsSectionProps) {
  const ref = useRef<HTMLDivElement>(null!)
  const animated = useRef(false)

  useEffect(() => {
    if (!isActive || animated.current) return
    animated.current = true
    const items = ref.current.querySelectorAll('.skill-item')
    const header = ref.current.querySelector('.skills-header')
    gsap.fromTo(header,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
    )
    gsap.fromTo(items,
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.07, ease: 'power3.out', delay: 0.2 }
    )
    // Animate skill bars
    items.forEach((item, i) => {
      const fill = item.querySelector('.skill-level-fill') as HTMLElement
      if (fill) {
        const pct = SKILLS[i].level
        gsap.fromTo(fill,
          { width: '0%' },
          { width: `${pct}%`, duration: 1.1, delay: 0.3 + i * 0.07, ease: 'power2.out' }
        )
      }
    })
  }, [isActive])

  return (
    <div className="section-wrapper" id="skills" ref={ref}>
      <div className="skills-layout">
        <div className="skills-header" style={{ opacity: 0 }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Technical Arsenal</div>
          <h2 className="skills-heading">
            Skills &amp; <em>Technologies</em>
          </h2>
        </div>

        <div className="skills-grid">
          {SKILLS.map((skill, i) => (
            <div key={i} className="glass-card skill-item" style={{ opacity: 0 }}>
              <div
                className="skill-dot"
                style={{ background: skill.color, boxShadow: `0 0 10px ${skill.color}` }}
              />
              <span className="skill-name">{skill.name}</span>
              <div className="skill-level-wrap">
                <div className="skill-level-fill" style={{ width: 0 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
