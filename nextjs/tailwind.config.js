module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0b1226',
        accent: '#f2c94c',
        glass: 'rgba(255,255,255,0.06)'
      },
      boxShadow: {
        'glow-yellow': '0 10px 30px rgba(242,201,76,0.12)',
      }
    }
  },
  plugins: []
}