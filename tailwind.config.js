/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#DC143C',
          darkRed: '#8B0000',
          gold: '#FFD700',
          darkBlue: '#0D1B2A',
        }
      },
      fontFamily: {
        'press': ['"Press Start 2P"', 'monospace'],
        'sans': ['"Noto Sans SC"', 'sans-serif'],
        'serif': ['"Cinzel Decorative"', 'serif'],
      }
    },
  },
  plugins: [],
}
