import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface ProjectsSectionProps {
  isActive: boolean
}

const PROJECTS = [
  {
    num: '01',
    title: 'Oral Cancer Detection AI',
    desc: 'Deep CNN system for clinical-grade oral cancer detection from medical imagery.',
    tags: [
      { text: 'PyTorch', cls: 'ptag-blue' },
      { text: 'CNN', cls: 'ptag-violet' },
      { text: 'Medical AI', cls: 'ptag-cyan' },
    ],
  },
  {
    num: '02',
    title: 'IoT Ayurvedic Pulse Diagnosis',
    desc: 'Hardware + AI fusion: IoT sensors with ML for traditional Ayurvedic pulse diagnosis.',
    tags: [
      { text: 'IoT', cls: 'ptag-blue' },
      { text: 'TensorFlow', cls: 'ptag-violet' },
      { text: 'Hardware', cls: 'ptag-cyan' },
    ],
  },
  {
    num: '03',
    title: 'NLP Chatbot System',
    desc: 'Context-aware conversational AI with multi-turn dialogue and RAG knowledge retrieval.',
    tags: [
      { text: 'NLP', cls: 'ptag-blue' },
      { text: 'LLM', cls: 'ptag-violet' },
      { text: 'RAG', cls: 'ptag-cyan' },
    ],
  },
  {
    num: '04',
    title: 'Facial Feature Extraction',
    desc: 'Real-time facial landmark detection pipeline with emotion recognition capabilities.',
    tags: [
      { text: 'OpenCV', cls: 'ptag-blue' },
      { text: 'MediaPipe', cls: 'ptag-violet' },
      { text: 'Vision', cls: 'ptag-cyan' },
    ],
  },
]

export default function ProjectsSection({ isActive }: ProjectsSectionProps) {
  const ref = useRef<HTMLDivElement>(null!)
  const animated = useRef(false)

  useEffect(() => {
    if (!isActive || animated.current) return
    animated.current = true
    const header = ref.current.querySelector('.projects-header')
    const cards = ref.current.querySelectorAll('.project-card')
    gsap.fromTo(header,
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 0.75, ease: 'power3.out' }
    )
    gsap.fromTo(cards,
      { opacity: 0, y: 30, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.1, ease: 'power3.out', delay: 0.18 }
    )
  }, [isActive])

  return (
    <div className="section-wrapper" id="projects" ref={ref}>
      <div className="projects-layout">
        <div className="projects-header" style={{ opacity: 0 }}>
          <div className="section-eyebrow" style={{ justifyContent: 'flex-end' }}>Portfolio</div>
          <h2 className="projects-heading">
            Featured <em>Projects</em>
          </h2>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div key={i} className="glass-card project-card" style={{ opacity: 0 }}>
              <div className="project-num">{p.num} / PROJECT</div>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <div className="project-tags">
                {p.tags.map((t, j) => (
                  <span key={j} className={`ptag ${t.cls}`}>{t.text}</span>
                ))}
              </div>
              <a className="project-link" href="#" onClick={e => e.preventDefault()}>
                View on GitHub →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
