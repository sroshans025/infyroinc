import { Helmet } from 'react-helmet-async'
import { SEO, SITE_URL } from '../../data/seo'

/** Per-page <title>, description, canonical, Open Graph, Twitter card and brand favicon. */
export default function Seo({ page }) {
  const s = SEO[page] ?? SEO.home
  const url = `${SITE_URL}${s.path === '/' ? '/' : s.path}`
  const image = `${SITE_URL}/og-logo.png`
  return (
    <Helmet prioritizeSeoTags>
      <title>{s.title}</title>
      <meta name="description" content={s.description} />
      {s.noindex ? <meta name="robots" content="noindex" /> : <link rel="canonical" href={url} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Infyro Inc." />
      <meta property="og:title" content={s.title} />
      <meta property="og:description" content={s.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={s.title} />
      <meta name="twitter:description" content={s.description} />
      <link rel="icon" type="image/svg+xml" href={s.favicon} />
    </Helmet>
  )
}
