// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')({
  dest: 'public'
})
/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['drive.google.com', 'lh3.googleusercontent.com'],
  },
});

module.exports = nextConfig;
