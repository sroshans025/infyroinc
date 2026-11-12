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
        cinema: '#0B0B0C',
        motif: 'var(--motif)',
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
      },
      transitionTimingFunction: {
        apple: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        kenburns: { from: { transform: 'scale(1)' }, to: { transform: 'scale(1.05)' } },
        floaty: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-4px)' } },
        scan: { '0%': { transform: 'translateY(0)', opacity: '0' }, '10%': { opacity: '1' }, '85%': { opacity: '1' }, '100%': { transform: 'translateY(100svh)', opacity: '0' } },
        spinslow: { to: { transform: 'rotate(360deg)' } },
        blink: { '0%, 49%': { opacity: '1' }, '50%, 100%': { opacity: '0.2' } },
        pulsenode: { '0%, 100%': { opacity: '0.35' }, '50%': { opacity: '1' } },
        trace: { from: { strokeDashoffset: '100' }, to: { strokeDashoffset: '0' } },
      },
      animation: {
        kenburns: 'kenburns 12s ease-out forwards',
        floaty: 'floaty 6s ease-in-out infinite',
        scan: 'scan 1.1s cubic-bezier(0.22,1,0.36,1) forwards',
        spinslow: 'spinslow 90s linear infinite',
        blink: 'blink 1.2s steps(1) infinite',
        pulsenode: 'pulsenode 2.4s ease-in-out infinite',
        trace: 'trace 1.6s linear infinite',
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
