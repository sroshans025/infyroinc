import { ChevronRight } from 'lucide-react'
import Seo from '../components/layout/Seo'
import Button from '../components/ui/Button'
import SmartLink from '../components/ui/SmartLink'
import Mark from '../components/brand/Mark'
import { BRANDS, COMPANY_KEYS } from '../data/navigation'

/** 404 — plain message with links back to the group and the three companies. */
export default function NotFound() {
  return (
    <>
      <Seo page="notFound" />
      <section className="flex min-h-[70svh] items-center bg-white pb-16 pt-[calc(var(--nav-h)+40px)]" aria-labelledby="nf-title">
        <div className="container-content text-center">
          <Mark size={88} className="mx-auto" />
          <p className="t-eyebrow mt-8 text-brand-ink">Error 404</p>
          <h1 id="nf-title" className="t-h1 mt-3">
            Page not found
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[16px] text-muted">The page you are looking for does not exist or has moved.</p>
          <Button href="/" className="mt-8">
            Go to the home page
          </Button>
          <ul className="mt-8 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-8">
            {COMPANY_KEYS.map((k) => (
              <li key={k}>
                <SmartLink href={BRANDS[k].path} className="inline-flex min-h-[44px] items-center gap-0.5 text-[15px] font-semibold text-brand-ink hover:underline">
                  {BRANDS[k].name}
                  <ChevronRight aria-hidden="true" className="h-4 w-4" />
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
