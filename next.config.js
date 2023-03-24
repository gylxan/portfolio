// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/\/studio(.*)$/],
  publicExcludes: ['!studio/**/*'],
});

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    scrollRestoration: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org',
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE ?? 'en',
  },
};
const nextConfig = withPWA(config);

module.exports = nextConfig;
