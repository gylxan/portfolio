import nextPwa from 'next-pwa';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = nextPwa({
  dest: 'public',
  register: true,
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/\/studio(.*)$/],
  publicExcludes: ['!studio/**/*'],
});

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
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

export default nextConfig;
