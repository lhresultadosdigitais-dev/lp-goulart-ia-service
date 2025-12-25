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
        background: '#1a1a2e',
        primary: '#e94560',
        secondary: '#0f3460',
        accent: '#00adb5',
        text: '#ffffff',
      },
    },
  },
  plugins: [],
}