import { motion, useReducedMotion } from 'framer-motion'
import Seo from '../components/layout/Seo'
import { PillLink } from '../components/ui/Button'
import Button from '../components/ui/Button'
import GridSpotlight from '../components/precision/GridSpotlight'
import { Stencil } from '../components/precision/Primitives'
import { FACETS, FACET_KEYS, VIEWBOX, BLUE } from '../components/brand/InfyroMark'
import { BRANDS, COMPANY_KEYS } from '../data/navigation'

const DRIFT = { tech: { x: 18, y: -16, r: -8 }, studios: { x: -20, y: 18, r: 7 }, construction: { x: 22, y: 6, r: 5 } }

/** 404 (FINAL §5.2): the facets drift apart and slowly float. */
export default function NotFound() {
  const reduce = useReducedMotion()
  return (
    <>
      <Seo page="notFound" />
      <section className="relative flex min-h-[86svh] items-center overflow-hidden bg-white pb-20 pt-[calc(var(--nav-h)+40px)]" aria-labelledby="nf-title">
        <GridSpotlight variant="blueprint" />
        <div className="container-content relative text-center">
          <svg viewBox={VIEWBOX} className="mx-auto h-40 w-auto overflow-visible" aria-hidden="true">
            {FACET_KEYS.map((k, i) => (
              <motion.path
                key={k}
                d={FACETS[k]}
                fill={BLUE}
                stroke={BLUE}
                strokeWidth={4}
                strokeLinejoin="round"
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                animate={reduce ? { x: DRIFT[k].x, y: DRIFT[k].y } : { x: DRIFT[k].x, y: [DRIFT[k].y, DRIFT[k].y - 5, DRIFT[k].y], rotate: DRIFT[k].r }}
                transition={reduce ? { duration: 0 } : { x: { duration: 1.2, ease: 'easeOut' }, rotate: { duration: 1.2 }, y: { duration: 5 + i, repeat: Infinity, ease: 'easeInOut' } }}
              />
            ))}
          </svg>
          <Stencil n={404} label="Off-grid" className="mt-12" />
          <h1 id="nf-title" className="t-h1 mt-4">
            This page went off-grid.
          </h1>
          <Button href="/" className="mt-10">
            Go to Infyro Inc.
          </Button>
          <ul className="mt-10 flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-8">
            {COMPANY_KEYS.map((k) => (
              <li key={k}>
                <PillLink href={BRANDS[k].path}>{BRANDS[k].name}</PillLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
