import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface ContactSectionProps {
  isActive: boolean
}

export default function ContactSection({ isActive }: ContactSectionProps) {
  const ref = useRef<HTMLDivElement>(null!)
  const animated = useRef(false)

  useEffect(() => {
    if (!isActive || animated.current) return
    animated.current = true
    const el = ref.current
    const children = el.querySelectorAll('.contact-anim')
    gsap.fromTo(children,
      { opacity: 0, y: 32, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.1, ease: 'power3.out' }
    )
  }, [isActive])

  return (
    <div className="section-wrapper" id="contact" ref={ref}>
      <div className="contact-layout">
        <div className="section-eyebrow contact-anim" style={{ justifyContent: 'center', opacity: 0 }}>
          Get In Touch
        </div>

        <h2 className="contact-heading contact-anim" style={{ opacity: 0 }}>
          Let's Build<br />Something<br />Together
        </h2>

        <p className="contact-sub contact-anim" style={{ opacity: 0 }}>
          Open to AI engineering roles, research collaborations,<br />
          and exciting projects at the frontier of intelligence.
        </p>

        <a
          className="contact-email contact-anim"
          href="mailto:lipeesh.acharya@email.com"
          style={{ opacity: 0 }}
        >
          lipeesh.acharya@email.com
        </a>

        <div className="contact-links contact-anim" style={{ opacity: 0 }}>
          <a className="clink" href="mailto:lipeesh.acharya@email.com">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-10 7L2 7"/>
            </svg>
            Email
          </a>
          <a className="clink" href="https://github.com" target="_blank" rel="noreferrer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            GitHub
          </a>
          <a className="clink" href="https://linkedin.com" target="_blank" rel="noreferrer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
          <a className="clink clink-resume" href="#">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download Resume
          </a>
        </div>

        <p className="footer-note contact-anim" style={{ opacity: 0 }}>
          © 2025 Lipeesh Acharya — AI Engineer · All Rights Reserved
        </p>
      </div>
    </div>
  )
}
