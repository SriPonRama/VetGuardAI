/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#171717',
        dark: '#111111',
        terracotta: {
          DEFAULT: '#B65F45',
          dark: '#8F4937',
        },
        'warm-ivory': '#F7F3ED',
        sand: '#E8D8C3',
        muted: '#8B8178',
        border: '#DDD4CA',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(0,0,0,0.08)',
        'float': '0 20px 40px -10px rgba(0,0,0,0.12)',
      }
    },
  },
  plugins: [],
}

