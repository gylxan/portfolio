module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 2s forwards',
        'fade-in-up': 'fade-in-up 1s ease forwards',
        glitch: 'glitch 1s linear infinite',
        'glitch-bottom': 'glitch-bottom 1.5s linear infinite',
        'glitch-top': 'glitch-top 1s linear infinite',
        'pop-in': 'pop-in 0.8s cubic-bezier(0.74, 0.06, 0.4, 0.92) forwards',
        'shift-in-left':
          'shift-in-left 2s cubic-bezier(0.74, 0.06, 0.4, 0.92) forwards',
      },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: 0,
            transform: 'translateY(40px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0px)',
          },
        },
        glitch: {
          '2%, 64%': {
            transform: 'translate(2px, 0) skew(0deg)',
          },
          '4%, 60%': {
            transform: 'translate(-2px, 0) skew(0deg)',
          },
          '62%': {
            transform: 'translate(0, 0) skew(5deg)',
          },
        },
        'glitch-top': {
          '2%, 64%': {
            transform: 'translate(2px, -2px)',
          },
          '4%, 60%': {
            transform: 'translate(-2px, 2px)',
          },
          '62%': {
            transform: 'translate(13px, -1px) skew(-13deg)',
          },
        },
        'glitch-bottom': {
          '2%, 64%': {
            transform: 'translate(-2px, 0)',
          },
          '4%, 60%': {
            transform: 'translate(-2px, 0)',
          },
          '62%': {
            transform: 'translate(-22px, 5px) skew(21deg)',
          },
        },
        'pop-in': {
          '0%': {
            width: 0,
            height: 0,
            opacity: 0,
          },
          '50%': {
            width: '10px',
            height: '10px',
            opacity: '1',
            bottom: '45px',
          },
          '65%': {
            height: '7px',
            bottom: 0,
            width: '15px',
          },
          '80%': {
            width: '10px',
            height: '10px',
            bottom: '20px',
          },
          '100%': {
            width: '7px',
            height: '7px',
            bottom: '11px',
          },
        },
        'shift-in-left': {
          '0%': {
            width: 0,
            left: 0,
          },
          '50%': {
            width: '100%',
            left: 0,
          },
          '100%': {
            width: 0,
            left: '100%',
          },
        },
      },
      screens: {
        '-sm': { max: '639px' },
      },
      translate: {
        'screen-w': '100vw',
      },
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
};
