// eslint-disable-next-line @typescript-eslint/no-var-requires
const tailwindConfig = require('./tailwind.config');

module.exports = {
  plugins: {
    tailwindcss: {
      ...tailwindConfig,
    },
    autoprefixer: {},
  },
};
