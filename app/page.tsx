'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

// ════════════════════════════════════════════════════════════
// TYPES
// ════════════════════════════════════════════════════════════

type AppId = 'about' | 'projects' | 'skills' | 'journey' | 'voluntary' | 'awards' | 'contact'

interface AppDef {
  id: AppId
  title: string
  accent: string
}

interface WinState {
  id: AppId
  title: string
  accent: string
  x: number
  y: number
  w: number
  h: number
  z: number
  minimized: boolean
  maximized: boolean
  originX: number
  originY: number
}

// ════════════════════════════════════════════════════════════
// DATA
// ════════════════════════════════════════════════════════════

const SOCIALS = {
  github: 'https://github.com/Noman-2005',
  linkedin: 'https://www.linkedin.com/in/shibli-noman-arnob-1247b4335',
  email: 'sarnob2430277@bscse.uiu.ac.bd',
}

const BOOT_LINES = [
  'Initializing kernel',
  'Loading drivers: java.sys, react.sys, calculus.sys',
  'Mounting volumes',
  'Starting window compositor',
  'Starting shell',
]

const APPS: AppDef[] = [
  { id: 'about', title: 'About', accent: '#5b8def' },
  { id: 'projects', title: 'Projects', accent: '#7c6fff' },
  { id: 'skills', title: 'Skills', accent: '#e6a23c' },
  { id: 'journey', title: 'Journey', accent: '#4fb8a8' },
  { id: 'voluntary', title: 'Voluntary', accent: '#e6646e' },
  { id: 'awards', title: 'Awards', accent: '#e6a23c' },
  { id: 'contact', title: 'Contact', accent: '#5b8def' },
]

const SKILLS: Record<string, string[]> = {
  Languages: ['Java', 'JavaScript', 'TypeScript', 'Python'],
  Frontend: ['React', 'Next.js', 'Tailwind CSS', 'HTML / CSS'],
  'AI & Tools': ['Claude API', 'Git', 'VS Code', 'Vercel'],
  Mathematics: ['Calculus', 'Linear Algebra', 'Vector Analysis', 'Statistics'],
}

const PROJECTS = [
  { title: 'CreatorOS', desc: 'AI-powered social media creator platform — content calendar, trend hunter, and Claude API integrations.', tags: ['Next.js', 'Claude API', 'Vercel'] },
  { title: 'Java OOP Suite', desc: 'A collection of Java programs demonstrating abstraction, interfaces, polymorphism, and exception handling.', tags: ['Java', 'OOP'] },
  { title: 'Math Visualizer', desc: 'An interactive tool to visualize vector fields, line integrals, and multivariable calculus concepts.', tags: ['JavaScript', 'Canvas API'] },
]

const TIMELINE: { title: string; sub: string; status?: string }[] = [
  { title: 'Started Web Development', sub: 'Built first React projects, found a pull toward frontend engineering.' },
  { title: 'C, Java and Python', sub: 'Core programming fundamentals across three languages.' },
  { title: 'Calculus and Linear Algebra', sub: 'Differentiation, integration, matrix operations.', status: 'GPA 4.00' },
  { title: 'Coordinate Geometry and Vector Analysis', sub: "Vector fields, Green's and Divergence theorems.", status: 'GPA 4.00' },
  { title: 'Discrete Mathematics', sub: 'Logic, set theory, combinatorics, graph theory.', status: 'GPA 3.67' },
  { title: 'Object Oriented Programming', sub: 'Abstraction, polymorphism, interfaces, exceptions.', status: 'Ongoing' },
  { title: 'Data Structures & Algorithms', sub: 'Arrays, linked lists, trees, graphs, sorting.', status: 'GPA 4.00' },
  { title: 'Theory of Computation', sub: 'Automata, formal languages, Turing machines.', status: 'Ongoing' },
  { title: 'Digital Logic Design', sub: 'Logic gates, boolean algebra, sequential circuits.', status: 'GPA 4.00' },
]

const VOLUNTARY = [
  { title: 'Former Cadet Lance Corporal', org: 'Bangladesh National Cadet Corps (BNCC)', desc: 'Developed leadership, discipline, and teamwork. Participated in WINTEX-2021.' },
  { title: 'Lifelong Blood Donor', org: 'Quantum Foundation', desc: "Committed lifelong blood donor through one of Bangladesh's leading welfare organizations." },
  { title: 'Blood Donor', org: 'Bangladesh Thalassemia Foundation', desc: 'Active blood donor supporting thalassemia patients across Bangladesh.' },
]

const AWARDS = [
  { title: 'Lifelong Blood Donor Award', org: 'Quantum Foundation' },
  { title: 'Academic Excellence Award', org: 'BAF Shaheen College Kurmitola' },
]

// ════════════════════════════════════════════════════════════
// ICONS
// ════════════════════════════════════════════════════════════

function AppIcon({ id, size = 22, color = '#fff' }: { id: string; size?: number; color?: string }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none' as const }
  switch (id) {
    case 'about':
      return <svg {...common}><circle cx="12" cy="8" r="3.4" stroke={color} strokeWidth="1.6" /><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" stroke={color} strokeWidth="1.6" strokeLinecap="round" /></svg>
    case 'projects':
      return <svg {...common}><rect x="4" y="5" width="7" height="7" rx="1.4" stroke={color} strokeWidth="1.6" /><rect x="13" y="5" width="7" height="7" rx="1.4" stroke={color} strokeWidth="1.6" /><rect x="4" y="14" width="7" height="5" rx="1.4" stroke={color} strokeWidth="1.6" /><rect x="13" y="14" width="7" height="5" rx="1.4" stroke={color} strokeWidth="1.6" /></svg>
    case 'skills':
      return <svg {...common}><path d="M12 3l2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.8L12 3z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" /></svg>
    case 'journey':
      return <svg {...common}><path d="M5 19V8.5a2 2 0 0 1 1-1.7l5-3 5 3a2 2 0 0 1 1 1.7V19" stroke={color} strokeWidth="1.6" strokeLinejoin="round" /><path d="M9 19v-6h6v6" stroke={color} strokeWidth="1.6" strokeLinejoin="round" /></svg>
    case 'voluntary':
      return <svg {...common}><path d="M12 20s-7.5-4.7-7.5-10A4.5 4.5 0 0 1 12 7.2 4.5 4.5 0 0 1 19.5 10c0 5.3-7.5 10-7.5 10z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" /></svg>
    case 'awards':
      return <svg {...common}><circle cx="12" cy="9" r="5" stroke={color} strokeWidth="1.6" /><path d="M8.6 13.4 7 21l5-2.6 5 2.6-1.6-7.6" stroke={color} strokeWidth="1.6" strokeLinejoin="round" /></svg>
    case 'contact':
      return <svg {...common}><rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke={color} strokeWidth="1.6" /><path d="M4.5 7l6.4 5.2a1.7 1.7 0 0 0 2.1 0L19.5 7" stroke={color} strokeWidth="1.6" strokeLinecap="round" /></svg>
    case 'github':
      return <svg {...common} viewBox="0 0 24 24"><path fill={color} d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.9-2.78.62-3.37-1.21-3.37-1.21-.46-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.55 2.34 1.1 2.91.84.09-.65.35-1.1.63-1.35-2.22-.26-4.55-1.13-4.55-5.02 0-1.11.39-2.02 1.03-2.73-.1-.26-.45-1.31.1-2.72 0 0 .84-.27 2.75 1.04a9.4 9.4 0 0 1 5 0c1.91-1.31 2.75-1.04 2.75-1.04.55 1.41.2 2.46.1 2.72.64.71 1.03 1.62 1.03 2.73 0 3.9-2.34 4.76-4.57 5.01.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.2C22 6.58 17.52 2 12 2z" /></svg>
    default:
      return null
  }
}

// ════════════════════════════════════════════════════════════
// WALLPAPER — Aurora + Particle Trail
// ════════════════════════════════════════════════════════════

function Wallpaper() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let raf = 0
    let t = 0
    let particles: { x: number; y: number; life: number }[] = []

    const resize = () => {
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.fillStyle = '#08070d'
      ctx.fillRect(0, 0, width, height)
    }
    resize()

    const resizeObserver = new ResizeObserver(() => resize())
    resizeObserver.observe(canvas)

    if (reduced) return () => resizeObserver.disconnect()

    // Init particles
    particles = Array.from({ length: 110 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      life: 60 + Math.random() * 180,
    }))

    const angleAt = (x: number, y: number) => {
      const nx = x / width - 0.5
      const ny = y / height - 0.5
      return Math.sin(nx * 3.2 + t) * 1.6 + Math.cos(ny * 2.4 - t * 0.6) * 1.6
    }

    const draw = () => {
      // ── AURORA LAYER ──────────────────────────────────
      const auroraCount = 4
      for (let i = 0; i < auroraCount; i++) {
        const offset = (i / auroraCount) * Math.PI * 2
        const cx = width * (0.2 + 0.6 * ((Math.sin(t * 0.3 + offset) + 1) / 2))
        const cy = height * (0.1 + 0.5 * ((Math.sin(t * 0.2 + offset * 1.3) + 1) / 2))
        const rx = width * (0.28 + 0.1 * Math.sin(t * 0.4 + offset))
        const ry = height * (0.14 + 0.06 * Math.cos(t * 0.35 + offset))

        const colorSets = [
          'rgba(79,227,201,0.06)',
          'rgba(124,111,255,0.05)',
          'rgba(192,132,252,0.045)',
          'rgba(56,189,248,0.045)',
        ]

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rx)
        grad.addColorStop(0, colorSets[i])
        grad.addColorStop(0.5, colorSets[i])
        grad.addColorStop(1, 'rgba(8,7,13,0)')

        ctx.save()
        ctx.scale(1, ry / rx)
        ctx.beginPath()
        ctx.arc(cx, cy * (rx / ry), rx, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
        ctx.restore()
      }

      // ── PARTICLE TRAIL FLOW FIELD ─────────────────────
      ctx.fillStyle = 'rgba(8,7,13,0.06)'
      ctx.fillRect(0, 0, width, height)

      for (const p of particles) {
        const angle = angleAt(p.x, p.y)
        const nx = p.x + Math.cos(angle) * 1.1
        const ny = p.y + Math.sin(angle) * 1.1

        const grad = ctx.createLinearGradient(p.x, p.y, nx, ny)
        grad.addColorStop(0, 'rgba(140,123,255,0.0)')
        grad.addColorStop(1, 'rgba(79,227,201,0.35)')
        ctx.strokeStyle = grad
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(nx, ny)
        ctx.stroke()

        p.x = nx
        p.y = ny
        p.life -= 1

        if (p.life <= 0 || p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
          p.x = Math.random() * width
          p.y = Math.random() * height
          p.life = 60 + Math.random() * 180
        }
      }

      t += 0.0026
      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    return () => {
      resizeObserver.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        zIndex: 0,
      }}
    />
  )
}

// ════════════════════════════════════════════════════════════
// BOOT SCREEN
// ════════════════════════════════════════════════════════════

function BootScreen({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const total = BOOT_LINES.length
    let i = 0
    const interval = setInterval(() => {
      i++
      setStep(i)
      setProgress(Math.min(100, (i / total) * 100))
      if (i >= total) {
        clearInterval(interval)
        setTimeout(() => onDone(), 450)
      }
    }, 340)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#0a0a0f', zIndex: 9999,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{
        width: 46, height: 46, borderRadius: 13,
        background: 'linear-gradient(150deg, #5b8def, #7c6fff)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 28,
        boxShadow: '0 8px 28px rgba(91,141,239,0.35)',
      }}>
        <span style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.03em' }}>N</span>
      </div>

      <div style={{ width: 220 }}>
        <div style={{ height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 1, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: '#5b8def', transition: 'width 0.3s ease', borderRadius: 1 }} />
        </div>
        <div style={{
          marginTop: 14, fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)',
          textAlign: 'center', letterSpacing: '0.01em', height: 16,
        }}>
          {BOOT_LINES[Math.min(step, BOOT_LINES.length - 1)]}
        </div>
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════
// WINDOW
// ════════════════════════════════════════════════════════════

interface WindowProps {
  win: WinState
  isActive: boolean
  onClose: (id: AppId) => void
  onMinimize: (id: AppId) => void
  onMaximize: (id: AppId) => void
  onFocus: (id: AppId) => void
  onMove: (id: AppId, x: number, y: number) => void
  onResize: (id: AppId, w: number, h: number) => void
  children: React.ReactNode
}

function Window({ win, isActive, onClose, onMinimize, onMaximize, onFocus, onMove, onResize, children }: WindowProps) {
  const dragging = useRef(false)
  const resizing = useRef(false)
  const start = useRef({ x: 0, y: 0, winX: 0, winY: 0, w: 0, h: 0 })

  const onMouseDownTitlebar = (e: React.MouseEvent) => {
    if (e.detail === 2) { onMaximize(win.id); return }
    onFocus(win.id)
    dragging.current = true
    start.current = { x: e.clientX, y: e.clientY, winX: win.x, winY: win.y, w: 0, h: 0 }
  }

  const onMouseDownResize = (e: React.MouseEvent) => {
    e.stopPropagation()
    onFocus(win.id)
    resizing.current = true
    start.current = { x: e.clientX, y: e.clientY, winX: 0, winY: 0, w: win.w, h: win.h }
  }

  useEffect(() => {
    const onMove_ = (e: MouseEvent) => {
      if (dragging.current && !win.maximized) {
        const dx = e.clientX - start.current.x
        const dy = e.clientY - start.current.y
        onMove(win.id, Math.max(0, start.current.winX + dx), Math.max(0, start.current.winY + dy))
      }
      if (resizing.current) {
        const dx = e.clientX - start.current.x
        const dy = e.clientY - start.current.y
        onResize(win.id, Math.max(380, start.current.w + dx), Math.max(260, start.current.h + dy))
      }
    }
    const onUp = () => { dragging.current = false; resizing.current = false }
    window.addEventListener('mousemove', onMove_)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove_)
      window.removeEventListener('mouseup', onUp)
    }
  }, [win.id, win.maximized, onMove, onResize])

  if (win.minimized) return null

  const pos = win.maximized
    ? { left: 8, top: 8, width: 'calc(100% - 16px)', height: 'calc(100% - 60px)' }
    : { left: win.x, top: win.y, width: win.w, height: win.h }

  return (
    <div
      onMouseDown={() => onFocus(win.id)}
      style={{
        position: 'absolute',
        ...pos,
        background: '#1c1d24',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 11,
        boxShadow: isActive
          ? '0 30px 70px -10px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)'
          : '0 14px 36px -8px rgba(0,0,0,0.45)',
        zIndex: win.z,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transformOrigin: `${win.originX || 100}px ${win.originY || 600}px`,
        animation: 'windowOpen 0.32s cubic-bezier(0.16, 1, 0.3, 1)',
        transition: 'opacity 0.15s',
        opacity: isActive ? 1 : 0.94,
      }}
    >
      {/* Titlebar */}
      <div
        onMouseDown={onMouseDownTitlebar}
        style={{
          height: 40, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 10px 0 14px',
          background: '#21222b',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          cursor: win.maximized ? 'default' : 'move',
          userSelect: 'none',
        }}
      >
        <div style={{ display: 'flex', gap: 8 }}>
          <TrafficDot color="#e6646e" onClick={() => onClose(win.id)} symbol="×" />
          <TrafficDot color="#e6a23c" onClick={() => onMinimize(win.id)} symbol="−" />
          <TrafficDot color="#4fb8a8" onClick={() => onMaximize(win.id)} symbol={win.maximized ? '⤡' : '+'} />
        </div>
        <div style={{
          fontSize: '0.78rem', fontWeight: 500, color: 'rgba(255,255,255,0.55)',
          letterSpacing: '0.005em', position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        }}>
          {win.title}
        </div>
        <div style={{ width: 60 }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {children}
      </div>

      {!win.maximized && (
        <div
          onMouseDown={onMouseDownResize}
          style={{ position: 'absolute', right: 0, bottom: 0, width: 18, height: 18, cursor: 'nwse-resize' }}
        />
      )}
    </div>
  )
}

function TrafficDot({ color, onClick, symbol }: { color: string; onClick: () => void; symbol: string }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick() }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 13, height: 13, borderRadius: '50%', border: 'none',
        background: color, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.6rem', color: hover ? 'rgba(0,0,0,0.55)' : 'transparent',
        lineHeight: 1, padding: 0, transition: 'transform 0.1s',
        transform: hover ? 'scale(1.08)' : 'scale(1)',
      }}
    >
      {symbol}
    </button>
  )
}

// ════════════════════════════════════════════════════════════
// APP CONTENT
// ════════════════════════════════════════════════════════════

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: '0.68rem', fontWeight: 600, color: '#5b8def',
      textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14,
    }}>{children}</div>
  )
}

function AboutApp() {
  return (
    <div style={{ padding: '32px 30px' }}>
      <div style={{ display: 'flex', gap: 18, alignItems: 'center', marginBottom: 26 }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: 'linear-gradient(150deg, #5b8def, #7c6fff)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.5rem', fontWeight: 700, color: '#fff', flexShrink: 0,
          letterSpacing: '-0.02em',
        }}>SN</div>
        <div>
          <div style={{ fontSize: '1.05rem', color: '#f2f2f5', fontWeight: 600, letterSpacing: '-0.01em' }}>Shibli Noman Arnob</div>
          <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', marginTop: 3 }}>CSE Student, United International University</div>
        </div>
      </div>
      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.87rem', lineHeight: 1.75, marginBottom: 14 }}>
        I build products that feel good to use — spanning Java OOP, React frontends, and AI integrations.
      </p>
      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.87rem', lineHeight: 1.75, marginBottom: 24 }}>
        Outside of code, I explore calculus, linear algebra, and vector analysis. Currently open to internships and freelance work.
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {['React', 'Java', 'Next.js', 'AI APIs', 'Math'].map(t => (
          <span key={t} style={{
            fontSize: '0.72rem', padding: '5px 12px', borderRadius: 999,
            background: 'rgba(91,141,239,0.12)', color: '#8bb0f5',
            border: '1px solid rgba(91,141,239,0.2)', fontWeight: 500,
          }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

function SkillsApp() {
  return (
    <div style={{ padding: '32px 30px' }}>
      <SectionLabel>Tech stack</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 24 }}>
        {Object.entries(SKILLS).map(([cat, items]) => (
          <div key={cat}>
            <div style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.4)', marginBottom: 10, fontWeight: 500 }}>{cat}</div>
            {items.map(s => (
              <div key={s} style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.82)', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{s}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectsApp() {
  return (
    <div style={{ padding: '32px 30px' }}>
      <SectionLabel>Selected work</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {PROJECTS.map(p => (
          <div key={p.title} style={{ padding: 18, borderRadius: 10, background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '0.9rem', color: '#f2f2f5', fontWeight: 600, marginBottom: 6 }}>{p.title}</div>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.6, marginBottom: 12 }}>{p.desc}</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {p.tags.map(t => <span key={t} style={{ fontSize: '0.68rem', padding: '3px 9px', borderRadius: 999, background: 'rgba(124,111,255,0.12)', color: '#b3a6ff' }}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function JourneyApp() {
  return (
    <div style={{ padding: '32px 30px' }}>
      <SectionLabel>Coursework</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {TIMELINE.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, padding: '13px 0', borderBottom: i < TIMELINE.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
            <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', width: 16, flexShrink: 0, paddingTop: 2, fontWeight: 500 }}>{String(i + 1).padStart(2, '0')}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
                <div style={{ fontSize: '0.86rem', color: '#f2f2f5', fontWeight: 600 }}>{item.title}</div>
                {item.status && (
                  <span style={{ fontSize: '0.65rem', color: item.status === 'Ongoing' ? '#e6a23c' : '#4fb8a8', flexShrink: 0, fontWeight: 500 }}>{item.status}</span>
                )}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: 3, lineHeight: 1.5 }}>{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function VoluntaryApp() {
  return (
    <div style={{ padding: '32px 30px' }}>
      <SectionLabel>Giving back</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {VOLUNTARY.map(v => (
          <div key={v.title} style={{ padding: 18, borderRadius: 10, background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '0.86rem', color: '#f2f2f5', fontWeight: 600, marginBottom: 3 }}>{v.title}</div>
            <div style={{ fontSize: '0.76rem', color: '#e6646e', marginBottom: 9, fontWeight: 500 }}>{v.org}</div>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{v.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function AwardsApp() {
  return (
    <div style={{ padding: '32px 30px' }}>
      <SectionLabel>Certificates &amp; awards</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {AWARDS.map(a => (
          <div key={a.title} style={{ padding: '15px 18px', borderRadius: 10, background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(230,162,60,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <AppIcon id="awards" size={17} color="#e6a23c" />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#f2f2f5', fontWeight: 600 }}>{a.title}</div>
              <div style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{a.org}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ContactApp() {
  return (
    <div style={{ padding: '32px 30px' }}>
      <SectionLabel>Get in touch</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { label: 'GitHub', val: 'Noman-2005', href: SOCIALS.github },
          { label: 'LinkedIn', val: 'shibli-noman-arnob', href: SOCIALS.linkedin },
          { label: 'Email', val: SOCIALS.email, href: `mailto:${SOCIALS.email}` },
        ].map(c => (
          <a key={c.label} href={c.href} target="_blank" rel="noreferrer" style={{
            textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '13px 16px', borderRadius: 9, background: 'rgba(255,255,255,0.035)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>{c.label}</span>
            <span style={{ fontSize: '0.82rem', color: '#f2f2f5', fontWeight: 500 }}>{c.val}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

const APP_CONTENT: Record<AppId, () => JSX.Element> = {
  about: AboutApp, skills: SkillsApp, projects: ProjectsApp,
  journey: JourneyApp, voluntary: VoluntaryApp, awards: AwardsApp, contact: ContactApp,
}

// ════════════════════════════════════════════════════════════
// CLOCK
// ════════════════════════════════════════════════════════════

function useClock() {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

// ════════════════════════════════════════════════════════════
// DESKTOP ICON + DOCK BUTTON
// ════════════════════════════════════════════════════════════

function DesktopIcon({ app, onOpen }: { app: AppDef; onOpen: () => void }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onDoubleClick={onOpen}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7,
        width: 72, background: 'none', border: 'none', cursor: 'pointer', padding: 0,
      }}
    >
      <div style={{
        width: 46, height: 46, borderRadius: 12,
        background: hover ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.15s',
      }}>
        <AppIcon id={app.id} size={20} color={app.accent} />
      </div>
      <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.85)', textShadow: '0 1px 2px rgba(0,0,0,0.5)', fontWeight: 500 }}>{app.title}</span>
    </button>
  )
}

function DockButton({ children, label, active, running, onClick, refCb }: {
  children: React.ReactNode
  label: string
  active: boolean
  running?: boolean
  onClick: (e: React.MouseEvent) => void
  refCb: (el: HTMLButtonElement | null) => void
}) {
  const [hover, setHover] = useState(false)
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <button
        ref={refCb}
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          width: 42, height: 42, borderRadius: 11,
          background: hover ? 'rgba(255,255,255,0.1)' : 'transparent',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: hover ? 'translateY(-3px) scale(1.06)' : 'translateY(0) scale(1)',
          transition: 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.15s',
        }}
      >
        {children}
      </button>
      {active && (
        <div style={{
          position: 'absolute', bottom: -6, width: 4, height: 4, borderRadius: '50%',
          background: running ? '#5b8def' : 'rgba(255,255,255,0.4)',
        }} />
      )}
      {hover && (
        <div style={{
          position: 'absolute', bottom: 52, padding: '4px 9px', borderRadius: 6,
          background: 'rgba(20,20,26,0.95)', color: '#fff', fontSize: '0.68rem',
          whiteSpace: 'nowrap', border: '1px solid rgba(255,255,255,0.08)',
        }}>
          {label}
        </div>
      )}
    </div>
  )
}

// ════════════════════════════════════════════════════════════
// MAIN OS
// ════════════════════════════════════════════════════════════

export default function NomanOS() {
  const [booted, setBooted] = useState(false)
  const [windows, setWindows] = useState<WinState[]>([])
  const [activeId, setActiveId] = useState<AppId | null>(null)
  const [startOpen, setStartOpen] = useState(false)
  const zCounter = useRef(10)
  const taskbarRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const time = useClock()

  const openApp = useCallback((appId: AppId) => {
    setWindows(prev => {
      const existing = prev.find(w => w.id === appId)
      if (existing) {
        zCounter.current += 1
        return prev.map(w => w.id === appId ? { ...w, minimized: false, z: zCounter.current } : w)
      }
      const app = APPS.find(a => a.id === appId)!
      zCounter.current += 1
      const idx = prev.length
      const btn = taskbarRefs.current[appId]
      const rect = btn?.getBoundingClientRect()
      return [...prev, {
        id: appId, title: app.title, accent: app.accent,
        x: 120 + (idx % 4) * 40, y: 64 + (idx % 3) * 36,
        w: 520, h: 460, maximized: false,
        z: zCounter.current, minimized: false,
        originX: rect ? rect.left + rect.width / 2 : 100,
        originY: rect ? rect.top : typeof window !== 'undefined' ? window.innerHeight - 56 : 600,
      }]
    })
    setActiveId(appId)
    setStartOpen(false)
  }, [])

  const closeApp = (id: AppId) => setWindows(prev => prev.filter(w => w.id !== id))
  const minimizeApp = (id: AppId) => setWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: true } : w))
  const maximizeApp = (id: AppId) => setWindows(prev => prev.map(w => w.id === id ? { ...w, maximized: !w.maximized } : w))
  const focusApp = (id: AppId) => {
    zCounter.current += 1
    setWindows(prev => prev.map(w => w.id === id ? { ...w, z: zCounter.current } : w))
    setActiveId(id)
  }
  const moveWindow = (id: AppId, x: number, y: number) => setWindows(prev => prev.map(w => w.id === id ? { ...w, x, y } : w))
  const resizeWindow = (id: AppId, w_: number, h_: number) => setWindows(prev => prev.map(w => w.id === id ? { ...w, w: w_, h: h_ } : w))

  if (!booted) return <BootScreen onDone={() => setBooted(true)} />

  const dateStr = time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  const h = time.getHours() % 12 || 12
  const m = String(time.getMinutes()).padStart(2, '0')
  const ampm = time.getHours() >= 12 ? 'PM' : 'AM'

  return (
    <div
      style={{ position: 'fixed', inset: 0, fontFamily: "'Inter', -apple-system, sans-serif", overflow: 'hidden', userSelect: 'none' }}
      onClick={() => startOpen && setStartOpen(false)}
    >
      <Wallpaper />

      {/* Menu bar (top) */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 28,
        background: 'rgba(20,20,26,0.55)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px', zIndex: 50, fontSize: '0.78rem', color: 'rgba(255,255,255,0.75)',
      }}>
        <div style={{ fontWeight: 600 }}>
          {activeId ? APPS.find(a => a.id === activeId)?.title : 'NomanOS'}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ opacity: 0.7 }}>{dateStr}</span>
          <span style={{ fontWeight: 500 }}>{h}:{m} {ampm}</span>
        </div>
      </div>

      {/* Desktop icons */}
      <div style={{ position: 'absolute', top: 48, left: 28, display: 'flex', flexDirection: 'column', gap: 22, zIndex: 1 }}>
        {APPS.map(app => (
          <DesktopIcon key={app.id} app={app} onOpen={() => openApp(app.id)} />
        ))}
      </div>

      {/* Windows */}
      {windows.map(win => {
        const Content = APP_CONTENT[win.id]
        return (
          <Window
            key={win.id}
            win={win}
            isActive={activeId === win.id}
            onClose={closeApp}
            onMinimize={minimizeApp}
            onMaximize={maximizeApp}
            onFocus={focusApp}
            onMove={moveWindow}
            onResize={resizeWindow}
          >
            <Content />
          </Window>
        )
      })}

      {/* Start menu */}
      {startOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute', bottom: 70, left: '50%', transform: 'translateX(-50%)', width: 300,
            background: 'rgba(28,29,36,0.92)', backdropFilter: 'blur(28px)',
            border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16,
            padding: 18, zIndex: 999, boxShadow: '0 30px 70px rgba(0,0,0,0.55)',
            animation: 'startOpen 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', marginBottom: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Applications</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
            {APPS.map(app => (
              <button
                key={app.id}
                onClick={() => openApp(app.id)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7,
                  padding: '12px 4px', borderRadius: 10, background: 'transparent',
                  border: 'none', cursor: 'pointer',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ width: 34, height: 34, borderRadius: 9, background: `${app.accent}1f`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AppIcon id={app.id} size={16} color={app.accent} />
                </div>
                <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.7)' }}>{app.title}</span>
              </button>
            ))}
          </div>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '14px 0 10px' }} />
          <a
            href={SOCIALS.github} target="_blank" rel="noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 8, textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <AppIcon id="github" size={15} color="rgba(255,255,255,0.65)" />
            <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.75)' }}>View source on GitHub</span>
          </a>
        </div>
      )}

      {/* Dock */}
      <div style={{ position: 'absolute', bottom: 12, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 100 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6, padding: '8px 10px',
          background: 'rgba(28,29,36,0.7)', backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16,
          boxShadow: '0 16px 40px rgba(0,0,0,0.35)',
        }}>
          <DockButton
            label="Start"
            active={startOpen}
            onClick={(e) => { e.stopPropagation(); setStartOpen(s => !s) }}
            refCb={el => { taskbarRefs.current['__start'] = el }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="8" height="8" rx="1.5" fill="#5b8def" />
              <rect x="13" y="3" width="8" height="8" rx="1.5" fill="rgba(255,255,255,0.35)" />
              <rect x="3" y="13" width="8" height="8" rx="1.5" fill="rgba(255,255,255,0.35)" />
              <rect x="13" y="13" width="8" height="8" rx="1.5" fill="#5b8def" />
            </svg>
          </DockButton>

          <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.1)', margin: '0 2px' }} />

          {APPS.map(app => {
            const win = windows.find(w => w.id === app.id)
            return (
              <DockButton
                key={app.id}
                label={app.title}
                active={!!win}
                running={!!win && !win.minimized && activeId === app.id}
                onClick={(e) => {
                  e.stopPropagation()
                  if (win) { win.minimized ? openApp(app.id) : focusApp(app.id) } else { openApp(app.id) }
                }}
                refCb={el => { taskbarRefs.current[app.id] = el }}
              >
                <AppIcon id={app.id} size={18} color={win ? app.accent : 'rgba(255,255,255,0.55)'} />
              </DockButton>
            )
          })}
        </div>
      </div>

      <style>{`
        @keyframes windowOpen {
          from { opacity: 0; transform: scale(0.92) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes startOpen {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  )
}