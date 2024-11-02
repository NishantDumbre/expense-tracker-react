/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      colors: {
        primary: '#F8F9FA',
        secondary: '#263238',
        accent: '#FFC107',
        gradient: {
          from: '#F8F9FA',
          to: '#E3E4E6',
        },
      },
    },
  }
}