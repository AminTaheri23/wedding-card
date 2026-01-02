/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wedding-gold': '#D4AF37',
        'wedding-cream': '#FDFBF7',
        'wedding-dark': '#2C3E50',
        'wedding-red': '#800000',
      },
      fontFamily: {
        'persian-title': ['Lalezar', 'cursive'],
        'persian-body': ['Scheherazade New', 'serif'],
      },
      backgroundImage: {
        'pattern': "url('https://www.transparenttextures.com/patterns/arabesque.png')",
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    }
  },
  plugins: [],
}
