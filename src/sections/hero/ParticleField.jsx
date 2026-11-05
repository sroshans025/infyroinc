import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../../components/hooks.js'

const LINK = 120 // max px between two dots for a line
const REACH = 150 // pointer influence radius

// Constellation behind the hero panel. Dots drift, get pushed away from and brighten near the
// pointer, and join up with nearby dots. Pauses off-screen / in background tabs.
export default function ParticleField({ className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = prefersReducedMotion()
    const mouse = { x: -9999, y: -9999 }
    let w = 0
    let h = 0
    let dpr = 1
    let dots = []
    let raf = 0
    let onScreen = true

    const build = () => {
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const cap = w < 768 ? 35 : 80
      const n = Math.min(cap, Math.floor((w * h) / 14000))
      dots = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1 + 0.7,
      }))
    }

    const step = (move) => {
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < dots.length; i++) {
        const p = dots[i]
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const d = Math.hypot(dx, dy)
        const near = d < REACH ? 1 - d / REACH : 0
        if (move) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > w) p.vx *= -1
          if (p.y < 0 || p.y > h) p.vy *= -1
          if (near) {
            p.x += (dx / (d || 1)) * near * 1.1
            p.y += (dy / (d || 1)) * near * 1.1
          }
        }
        for (let j = i + 1; j < dots.length; j++) {
          const q = dots[j]
          const lx = p.x - q.x
          const ly = p.y - q.y
          const ld = lx * lx + ly * ly
          if (ld < LINK * LINK) {
            ctx.strokeStyle = `rgba(76,156,245,${(1 - Math.sqrt(ld) / LINK) * 0.22})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }
        ctx.fillStyle = `rgba(${123 + near * 132},${180 + near * 75},${247 + near * 8},${0.35 + near * 0.65})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r + near * 1.2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const loop = () => {
      raf = 0
      step(true)
      start()
    }
    const start = () => {
      if (!raf && onScreen && !document.hidden && !reduce) raf = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onLeave = () => {
      mouse.x = mouse.y = -9999
    }
    const onResize = () => {
      build()
      step(false)
    }

    // Defer setup so the canvas never competes with first paint
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 200))
    const cancelIdle = window.cancelIdleCallback || clearTimeout
    let io
    let ro
    const idleId = idle(() => {
      build()
      step(false)
      start()
      io = new IntersectionObserver(([e]) => {
        onScreen = e.isIntersecting
        start()
      })
      io.observe(canvas)
      ro = new ResizeObserver(onResize)
      ro.observe(canvas)
    })

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.addEventListener('visibilitychange', start)
    return () => {
      cancelIdle(idleId)
      cancelAnimationFrame(raf)
      io?.disconnect()
      ro?.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('visibilitychange', start)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />
}
