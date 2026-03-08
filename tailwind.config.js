/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        exo: ['"Exo 2"', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        cinzel: ['Cinzel', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
      },
      colors: {
        bg: {
          DEFAULT: '#000000',
          deep: '#02030a',
          card: '#060818',
        },
        cyan: {
          neon: '#4dd8e6',
          light: '#88f0ff',
          glow: 'rgba(0,255,235,0.8)',
        },
        pink: {
          neon: '#e84393',
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 15px rgba(77,216,230,0.6), 0 0 30px rgba(77,216,230,0.3)',
        'neon-pink': '0 0 15px rgba(232,67,147,0.6), 0 0 30px rgba(232,67,147,0.3)',
        'glass': '0 8px 32px rgba(0,0,0,0.4)',
      },
      animation: {
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.4s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'scan-laser': 'scanLaser 2s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scanLaser: {
          '0%': { top: '8px', opacity: '1' },
          '50%': { top: 'calc(100% - 8px)', opacity: '0.7' },
          '100%': { top: '8px', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
