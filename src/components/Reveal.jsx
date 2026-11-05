import { useEffect, useRef, useState } from 'react'

// Fades and lifts its children into view once they scroll on screen.
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)
  const [armed, setArmed] = useState(false)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    setArmed(true)
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          obs.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <Tag ref={ref} style={{ '--d': `${delay}ms` }} className={`${armed ? 'reveal' : ''} ${shown ? 'is-in' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
