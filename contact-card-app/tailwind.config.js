module.exports = {
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.{vue,js}',
    './pages/**/*.{vue,js}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#1a1a1a',
        primary: '#4a90e2',
        secondary: '#50e3c2',
        accent: '#d0021b',
        text: '#ffffff',
      },
    },
  },
  plugins: [],
}