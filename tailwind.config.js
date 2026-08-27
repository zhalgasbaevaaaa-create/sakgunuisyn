/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lora: ['Lora', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        gold: {
          400: '#f3d179',
          500: '#d4af37',
          600: '#b89222',
          700: '#8c6b12',
        },
        parchment: {
          100: '#f9f6ef',
          200: '#f2e8d5',
          300: '#e5d5b7',
          800: '#2c251a',
          900: '#1c1710',
        },
        obsidian: {
          800: '#161a23',
          900: '#0b0d12',
          950: '#06070a',
        },
        crimson: {
          600: '#b91c1c',
          700: '#8b1e1e',
          900: '#450a0a',
        }
      },
      backgroundImage: {
        'radial-vignette': 'radial-gradient(circle, rgba(11,13,18,0.2) 0%, rgba(11,13,18,0.95) 100%)',
      }
    },
  },
  plugins: [],
}
