import { usePageMeta } from '../components/hooks.js'
import { Arrow, Button, Container } from '../components/ui.jsx'

export default function NotFound() {
  usePageMeta('Page not found')
  return (
    <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden bg-ink">
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/30 blur-[120px]" />
      <Container className="text-center">
        <p className="font-display text-8xl font-extrabold gradient-text sm:text-9xl">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold text-white">This page isn&rsquo;t here.</h1>
        <p className="mt-3 text-slate-400">The address may be incorrect, or the page may have moved.</p>
        <div className="mt-8">
          <Button to="/" size="lg">
            Return to Home <Arrow />
          </Button>
        </div>
      </Container>
    </section>
  )
}
