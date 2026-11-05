/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // INFYRO brand blue (#2563EB) and its shades
        brand: {
          DEFAULT: '#2563EB',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        ink: '#050B1A',
        navy: {
          DEFAULT: '#0A1630',
          800: '#0E1D3F',
          700: '#14284F',
        },
      },
      fontFamily: {
        display: ['Syne', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      keyframes: {
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
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pop: {
          '0%': { opacity: '0', transform: 'translateY(10px) scale(.97)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        bar: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'fade-up': 'fadeUp .7s ease-out both',
        glow: 'glow 6s ease-in-out infinite',
        bar: 'bar 1.2s cubic-bezier(.2,.8,.2,1) both',
        marquee: 'marquee 38s linear infinite',
        'marquee-rev': 'marquee 44s linear infinite reverse',
        pop: 'pop .35s ease-out both',
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(15, 23, 42, 0.18)',
        glow: '0 20px 60px -20px rgba(37, 99, 235, 0.55)',
      },
    },
  },
  plugins: [],
}
