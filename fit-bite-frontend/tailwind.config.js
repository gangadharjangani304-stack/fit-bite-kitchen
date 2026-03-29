/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          brown: '#5D4037', brownLight: '#8D6E63',
          green: '#2E7D32', greenLight: '#4CAF50',
          gold: '#FFC107', goldDark: '#FFB300', cream: '#FFF8E1',
        }
      }
    },
  },
  plugins: [],
}