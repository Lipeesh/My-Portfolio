import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface AboutSectionProps {
  isActive: boolean
}

export default function AboutSection({ isActive }: AboutSectionProps) {
  const ref = useRef<HTMLDivElement>(null!)
  const animated = useRef(false)

  useEffect(() => {
    if (!isActive || animated.current) return
    animated.current = true
    const cards = ref.current.querySelectorAll('.about-card')
    const left = ref.current.querySelector('.about-left-content')
    gsap.fromTo(left,
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
    )
    gsap.fromTo(cards,
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out', delay: 0.15 }
    )
  }, [isActive])

  return (
    <div className="section-wrapper" id="about" ref={ref}>
      <div className="about-layout">
        <div className="about-left-content" style={{ opacity: 0 }}>
          <div className="section-eyebrow">About Me</div>
          <h2 className="about-heading">
            Architect of<br />
            <em>Intelligent<br />Systems</em>
          </h2>
          <p className="about-bio">
            AI Engineer specializing in turning cutting-edge research into production-ready systems.
            Passionate about neural architectures, computer vision, and the future of AI interfaces.
          </p>
          <div className="about-stats">
            <div className="stat-item">
              <div className="stat-num">3+</div>
              <div className="stat-label">Years AI Dev</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">12+</div>
              <div className="stat-label">AI Projects</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">4</div>
              <div className="stat-label">Publications</div>
            </div>
          </div>
        </div>

        <div className="about-cards">
          {[
            {
              icon: '🎓',
              title: 'Education',
              text: 'B.Tech Computer Science & AI · Specialized in Machine Learning, Deep Learning & Computer Vision'
            },
            {
              icon: '⚡',
              title: 'Experience',
              text: '3+ years building production AI systems · Medical imaging · NLP pipelines · IoT intelligence'
            },
            {
              icon: '🔬',
              title: 'Research',
              text: 'Computer Vision · Natural Language Processing · Ayurvedic AI · IoT + AI Integration'
            },
          ].map((card, i) => (
            <div key={i} className="glass-card about-card" style={{ opacity: 0 }}>
              <div className="about-card-icon">{card.icon}</div>
              <h4>{card.title}</h4>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
