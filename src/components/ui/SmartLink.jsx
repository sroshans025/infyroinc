import { forwardRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { usePageTransition } from '../layout/PageTransition'
import { brandForPath } from '../../data/navigation'

const isExternal = (href) => /^https?:\/\//.test(href)
const isProtocol = (href) => /^(mailto:|tel:)/.test(href)

/**
 * One link component for every href shape:
 *  - "#id"            → in-page anchor (native smooth scroll + scroll-margin)
 *  - "/path" "/p#id"  → React Router <Link>; cross-brand targets play the page transition (FINAL §5.2)
 *  - "https://…"      → new tab, rel="noopener noreferrer"
 *  - "mailto:/tel:"   → plain anchor
 *  - null/undefined   → plain text (e.g. a social URL that is still TODO)
 */
const SmartLink = forwardRef(function SmartLink({ href, children, external, onClick, ...rest }, ref) {
  const { pathname } = useLocation()
  const { go } = usePageTransition()

  if (!href) return <span {...rest}>{children}</span>
  if (external || isExternal(href)) {
    return (
      <a ref={ref} href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} {...rest}>
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    )
  }
  if (href.startsWith('#') || isProtocol(href)) {
    return (
      <a ref={ref} href={href} onClick={onClick} {...rest}>
        {children}
      </a>
    )
  }

  const handle = (e) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const targetPath = href.split(/[?#]/)[0] || '/'
    if (brandForPath(targetPath).key !== brandForPath(pathname).key) {
      e.preventDefault()
      go(href)
    }
  }
  return (
    <Link ref={ref} to={href} onClick={handle} {...rest}>
      {children}
    </Link>
  )
})

export default SmartLink
