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
        'pop-in': 'pop-in 1.5s linear forwards',
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
          'from,20%,40%,60%,80%,to': {
            animationTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          },

          '0%': {
            opacity: 0,
            transform: 'scale3d(0.3, 0.3, 0.3)',
          },

          '20%': {
            transform: 'scale3d(1.5, 1.5, 1.5)',
          },

          '40%': {
            transform: 'scale3d(0.9, 0.9, 0.9)',
          },

          '60%': {
            opacity: 1,
            transform: 'scale3d(1.03, 1.03, 1.03)',
          },

          '80%': {
            transform: 'scale3d(0.97, 0.97, 0.9)',
          },

          to: {
            opacity: 1,
            transform: 'scale3d(1, 1, 1)',
          },
        },
      },
      screens: {
        '-sm': { max: '639px' },
      },
      transitionProperty: {
        top: 'top',
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
      skeleton: 'var(--dark-grey)',
    },
  },
  plugins: [],
};
