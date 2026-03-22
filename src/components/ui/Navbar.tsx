import { scrollToSection } from '../../hooks/useScrollProgress'

interface NavbarProps {
  sectionIndex: number
}

const NAV_ITEMS = ['Home', 'About', 'Skills', 'Projects', 'Contact']

export default function Navbar({ sectionIndex }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="nav-logo">LA/</div>
      <ul className="nav-links">
        {NAV_ITEMS.map((item, i) => (
          <li key={i}>
            <a
              onClick={(e) => { e.preventDefault(); scrollToSection(i) }}
              style={{
                color: sectionIndex === i
                  ? 'rgba(240,244,255,0.95)'
                  : undefined,
                cursor: 'pointer',
              }}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
      <button
        className="nav-hire"
        onClick={() => scrollToSection(4)}
      >
        Hire Me
      </button>
    </nav>
  )
}
