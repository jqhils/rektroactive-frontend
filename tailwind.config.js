module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        hacker: ['Courier New', 'Courier', 'monospace'],
      },
      colors: {
        hackerGreen: '#00FF00',
        hackerBlack: '#000000',
      },
    },
  },
  plugins: [],
};