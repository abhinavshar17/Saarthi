/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saarthi: {
          dark: '#1a110a',
          maroon: '#5c1a1b',
          brown: '#6b3e2e',
          terracotta: '#9c4b38',
          gold: '#c9a25b',
          ivory: '#f8f5f0',
          cream: '#fffdf9',
          muted: '#84756b',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        serif: ['Prata', 'serif'],
        display: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}