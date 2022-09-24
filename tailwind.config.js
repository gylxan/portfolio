module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      translate: {
        'screen-w' : "100vw"
      }
    },
    colors: {
      primary: 'var(--primary)',
      secondary: 'var(--secondary)',
      tertiary: 'var(--tertiary)',
      background: 'var(--background)',
      white: 'var(--white)',
      darkblue: 'var(--dark-blue)',
      'secondary-ghost': 'var(--secondary-ghost)',
    },
  },
  plugins: [],
}
