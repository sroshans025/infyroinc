/**
 * Image with explicit aspect ratio — or, with no photography supplied, a designed brand-mood gradient.
 */
const MOODS = {
  studios:
    'radial-gradient(70% 60% at 22% 28%, rgba(251,191,36,.55) 0%, transparent 60%), radial-gradient(70% 70% at 82% 70%, rgba(194,65,12,.6) 0%, transparent 65%), radial-gradient(50% 40% at 60% 30%, rgba(253,230,138,.25) 0%, transparent 70%), linear-gradient(160deg, #5A3520 0%, #2A1810 60%, #120B07 100%)',
  'studios-light':
    'radial-gradient(120% 90% at 20% 15%, rgba(253,186,116,.6) 0%, transparent 55%), radial-gradient(90% 80% at 85% 90%, rgba(180,83,9,.33) 0%, transparent 60%), linear-gradient(160deg, #F5E6D8 0%, #E9CFB8 100%)',
  construction:
    'radial-gradient(70% 60% at 78% 22%, rgba(251,146,60,.6) 0%, transparent 60%), radial-gradient(60% 50% at 70% 35%, rgba(254,215,170,.3) 0%, transparent 70%), linear-gradient(175deg, #78716C 0%, #44403C 45%, #1C1917 100%)',
  'construction-light':
    'radial-gradient(110% 80% at 80% 10%, #FED7AA 0%, transparent 55%), linear-gradient(170deg, #E7E5E4 0%, #D6D3D1 100%)',
  tech:
    'radial-gradient(90% 90% at 20% 20%, rgba(96,165,250,.55) 0%, transparent 60%), radial-gradient(80% 80% at 80% 80%, rgba(139,92,246,.5) 0%, transparent 60%), linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
}

export default function Media({ src, alt = '', aspect, mood = 'studios', className = '', imgClassName = '', priority = false, sizes, children }) {
  const style = aspect ? { aspectRatio: aspect } : undefined
  const pos = className.split(' ').some((c) => c === 'absolute' || c === 'fixed') ? '' : 'relative'
  return (
    <div className={`${pos} overflow-hidden ${className}`} style={style}>
      {src ? (
        <img
          src={src}
          alt={alt}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          fetchpriority={priority ? 'high' : undefined}
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
        />
      ) : (
        <div aria-hidden="true" className={`absolute inset-0 ${imgClassName}`} style={{ backgroundImage: MOODS[mood] ?? MOODS.studios }} />
      )}
      {children}
    </div>
  )
}
