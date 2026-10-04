/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A227',
          50: '#FDF8E7',
          100: '#F9EFC3',
          200: '#F3DC89',
          300: '#ECC84F',
          400: '#E0B830',
          500: '#C9A227',
          600: '#A07D18',
          700: '#7A5E10',
          800: '#54400A',
          900: '#2E2205',
          dark: '#8B6914',
          light: '#F0D080',
          shine: '#FFE566',
        },
        ivory: {
          DEFAULT: '#FBF7F0',
          dark: '#F2EBE0',
        },
        sand: {
          DEFAULT: '#EFE4D2',
          dark: '#D9C8B0',
        },
        charcoal: {
          DEFAULT: '#1A1A2E',
          light: '#2B2B3A',
          muted: '#4A4A5A',
        },
        rose: {
          gold: '#B76E79',
          light: '#D4A5AC',
          dark: '#8B4E58',
        },
        jewel: {
          emerald: '#0A3D2B',
          ruby: '#9B1B30',
          sapphire: '#1B2D9B',
          pearl: '#F5F0E8',
          amethyst: '#6B2D8B',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        '7xl': ['5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1.05' }],
        '9xl': ['7rem', { lineHeight: '1' }],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
        34: '8.5rem',
        38: '9.5rem',
        128: '32rem',
        144: '36rem',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #8B6914 0%, #C9A227 40%, #F0D080 60%, #C9A227 80%, #8B6914 100%)',
        'gold-radial': 'radial-gradient(ellipse at center, #F0D080 0%, #C9A227 40%, #8B6914 100%)',
        'luxury-dark': 'linear-gradient(135deg, #1A1A2E 0%, #0D0D1A 100%)',
        'hero-overlay': 'linear-gradient(to right, rgba(26,26,46,0.92) 0%, rgba(26,26,46,0.65) 50%, rgba(26,26,46,0.1) 100%)',
        'hero-overlay-mobile': 'linear-gradient(to bottom, rgba(26,26,46,0.5) 0%, rgba(26,26,46,0.9) 100%)',
        'card-hover': 'linear-gradient(135deg, rgba(201,162,39,0.08) 0%, rgba(201,162,39,0.02) 100%)',
        'gold-shine': 'linear-gradient(90deg, transparent 0%, rgba(240,208,128,0.6) 50%, transparent 100%)',
        'section-warm': 'linear-gradient(180deg, #FBF7F0 0%, #EFE4D2 100%)',
        'section-dark': 'linear-gradient(180deg, #1A1A2E 0%, #0D0D1A 100%)',
        'ticker-bg': 'linear-gradient(90deg, #1A1A2E, #2B1F06, #1A1A2E)',
      },
      animation: {
        'ticker': 'ticker 40s linear infinite',
        'ticker-fast': 'ticker 20s linear infinite',
        'shine-slide': 'shineSlide 2.5s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-right': 'slideRight 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'slide-left': 'slideLeft 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        shineSlide: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-8px) rotate(1deg)' },
          '66%': { transform: 'translateY(-4px) rotate(-1deg)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201, 162, 39, 0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(201, 162, 39, 0)' },
        },
      },
      boxShadow: {
        'gold-sm': '0 2px 10px rgba(201, 162, 39, 0.25)',
        'gold': '0 4px 20px rgba(201, 162, 39, 0.35)',
        'gold-lg': '0 8px 40px rgba(201, 162, 39, 0.45)',
        'gold-xl': '0 16px 60px rgba(201, 162, 39, 0.5)',
        'luxury': '0 20px 60px rgba(26, 26, 46, 0.35)',
        'luxury-sm': '0 8px 30px rgba(26, 26, 46, 0.2)',
        'card': '0 4px 24px rgba(26, 26, 46, 0.07)',
        'card-hover': '0 16px 48px rgba(26, 26, 46, 0.15)',
        'inner-gold': 'inset 0 1px 0 rgba(201, 162, 39, 0.4)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      letterSpacing: {
        'widest-2': '0.3em',
        'widest-3': '0.4em',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [],
}
