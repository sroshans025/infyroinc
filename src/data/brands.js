// Brand registry + logo assets — docs/06 §1 and §4.4.
// Order is always Technologies → Studios → Construction.
import incLockup from '../assets/logos/inc-lockup.webp'
import incLockupWhite from '../assets/logos/inc-lockup-white.webp'
import wordmark from '../assets/logos/wordmark.webp'
import wordmarkWhite from '../assets/logos/wordmark-white.webp'
import techLockup from '../assets/logos/technologies-lockup.webp'
import techLockupWhite from '../assets/logos/technologies-lockup-white.webp'
import techBar from '../assets/logos/technologies-bar.webp'
import techBarWhite from '../assets/logos/technologies-bar-white.webp'
import studiosLockup from '../assets/logos/studios-lockup.webp'
import studiosLockupWhite from '../assets/logos/studios-lockup-white.webp'
import studiosBar from '../assets/logos/studios-bar.webp'
import studiosBarWhite from '../assets/logos/studios-bar-white.webp'
import constructionLockup from '../assets/logos/construction-lockup.webp'
import constructionLockupWhite from '../assets/logos/construction-lockup-white.webp'
import constructionBar from '../assets/logos/construction-bar.webp'
import constructionBarWhite from '../assets/logos/construction-bar-white.webp'

// TODO: replace these raster crops with vector SVGs (docs/06 §1.1 "vectorise the logos").
// Intrinsic sizes are kept so <img> can reserve space (no layout shift).
export const LOGOS = {
  inc: { lockup: incLockup, lockupWhite: incLockupWhite, w: 769, h: 239 },
  wordmark: { src: wordmark, white: wordmarkWhite, w: 552, h: 202 },
  tech: {
    lockup: techLockup, lockupWhite: techLockupWhite, lw: 955, lh: 358,
    bar: techBar, barWhite: techBarWhite, bw: 955, bh: 326,
  },
  studios: {
    lockup: studiosLockup, lockupWhite: studiosLockupWhite, lw: 1025, lh: 427,
    bar: studiosBar, barWhite: studiosBarWhite, bw: 1025, bh: 353,
  },
  construction: {
    lockup: constructionLockup, lockupWhite: constructionLockupWhite, lw: 803, lh: 304,
    bar: constructionBar, barWhite: constructionBarWhite, bw: 803, bh: 266,
  },
}

export const brands = [
  { id: 'technologies', key: 'tech', name: 'Infyro Technologies', sub: 'TECHNOLOGIES', tagline: 'Innovative Ideas into Digital Reality.', href: '/technologies', scene: 'grid' },
  { id: 'studios', key: 'studios', name: 'Infyro Studios', sub: 'STUDIOS', tagline: 'Your Story, Our Frame.', href: '/studios', scene: 'bokeh' },
  { id: 'construction', key: 'construction', name: 'Infyro Construction', sub: 'CONSTRUCTION', tagline: 'Building Trust. Creating Futures.', href: '/construction', scene: 'blueprint' },
]
