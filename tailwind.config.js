/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'

// Design tokens — one blue + navy across every company.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  // hover: utilities only apply on devices that can hover (no stuck hover states on touch)
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      colors: {
        blue: { DEFAULT: '#0A78F2', 600: '#0063D1', 300: '#3B95F5', 50: '#EAF3FE' },
        navy: '#0A1428',
        ink: { DEFAULT: '#0A1428', 2: '#3A4356' },
        muted: '#6B7280',
        subtle: '#8B93A1',
        paper: { DEFAULT: '#FFFFFF', 2: '#F3F5F9' },
        line: '#E5E9F0',
        'line-strong': '#CBD3DF',
        hairline: '#E3E8F0',
        surface: '#F6F8FB',
        night: '#0A1428',
        brand: {
          DEFAULT: 'var(--brand)',
          hover: 'var(--brand-hover)',
          tint: 'var(--brand-tint)',
          ink: 'var(--brand-ink)',
          'ink-hover': 'var(--brand-ink-hover)',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', '"SF Mono"', 'Menlo', 'Consolas', 'monospace'],
        sans: ['"Inter Variable"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        input: '10px',
        media: '16px',
        xl2: '24px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(10,20,40,.04), 0 12px 32px -12px rgba(10,20,40,.14)',
        float: '0 24px 64px -16px rgba(10,20,40,.22)',
        lift: '0 18px 40px -18px rgba(10,120,242,.45)',
        soft: '0 1px 2px rgba(10,20,40,.05), 0 10px 30px -14px rgba(10,20,40,.16)',
        'soft-lg': '0 2px 4px rgba(10,20,40,.05), 0 24px 48px -20px rgba(10,20,40,.28)',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      },
      animation: {
        marquee: 'marquee 45s linear infinite',
      },
      transitionTimingFunction: {
        apple: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      // Hover-capable fine pointers only
      addVariant('can-hover', '@media (hover: hover) and (pointer: fine)')
    }),
  ],
}
