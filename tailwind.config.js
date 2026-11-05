import animate from "tailwindcss-animate"

/** @type {import('tailwindcss').Config} */

// Palette is taken from the INFYRO logo only: blue #1B83F2, navy #041020, white.
// Every other shade below is a mix of those three, so nothing foreign enters the UI.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1B83F2',
          50: '#EDF5FE',
          100: '#D6E8FD',
          200: '#ADD1FA',
          300: '#7BB4F7',
          400: '#4C9CF5',
          500: '#3B91F3',
          600: '#1B83F2',
          700: '#1668C0',
          800: '#114E90',
          900: '#0B345F',
        },
        ink: '#041020',
        navy: {
          DEFAULT: '#071A30',
          800: '#0A2340',
          700: '#0F2F54',
        },
        paper: '#EDF5FE',
        // Neutral text/border shades: navy mixed toward white
        slate: {
          50: '#F3F6FA',
          100: '#E4EAF2',
          200: '#C9D3E0',
          300: '#AEBBCC',
          400: '#8D9CB1',
          500: '#6D7E96',
          600: '#4F6079',
          700: '#344760',
          800: '#1B2C44',
          900: '#0B1B30',
        },
      },
      // One typeface across the whole site: San Francisco via the system font stack (Apple devices). Inter is the web fallback elsewhere, since SF cannot be self-hosted. `display` and `mono` are aliases so existing classes keep working.
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        cue: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%,100%': { opacity: '0.55' },
          '50%': { opacity: '0.9' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-reverse': {
          from: { transform: 'translateX(calc(-100% - var(--gap)))' },
          to: { transform: 'translateX(0)' },
        },
        pop: {
          '0%': { opacity: '0', transform: 'translateY(10px) scale(.97)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        bar: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        cue: 'cue 2.2s cubic-bezier(0.65, 0, 0.35, 1) infinite',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'fade-up': 'fadeUp .7s ease-out both',
        glow: 'glow 6s ease-in-out infinite',
        bar: 'bar 1.2s cubic-bezier(.2,.8,.2,1) both',
        // Magic UI marquee: duration and gap come from CSS variables set on the component
        marquee: 'marquee var(--duration, 40s) linear infinite',
        'marquee-reverse': 'marquee-reverse var(--duration, 40s) linear infinite',
        pop: 'pop .35s ease-out both',
        'accordion-down': 'accordion-down 0.25s ease-out',
        'accordion-up': 'accordion-up 0.25s ease-out',
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(4, 16, 32, 0.4)',
        glow: '0 20px 60px -20px rgba(27, 131, 242, 0.55)',
        panel: '0 50px 90px -40px rgba(27, 131, 242, 0.55), 0 18px 40px -24px rgba(4, 16, 32, 0.9)',
        cta: '0 12px 32px -12px rgba(27, 131, 242, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      },
    },
  },
  plugins: [animate],
}
