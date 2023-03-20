/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://example.com';
const ignoredPaths = ['/server-sitemap.xml', '/post'];
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    // Add server-sitemap.xml to sitemap index and robots.txt.
    additionalSitemaps: [`${siteUrl}/server-sitemap.xml`],
    // Remove server-sitemap.xml from robots.txt to prevent duplicated entries
    transformRobotsTxt: async (config, robotsTxt) =>
      config.robotsTxtOptions.additionalSitemaps
        .slice(1)
        .reduce(
          (res, item) => res.replace(`Sitemap: ${item}\n`, ''),
          robotsTxt,
        ),
    alternateRefs: [
      {
        href: `${siteUrl}/de`,
        hreflang: 'de'
      }
    ]
  },
  transform: (config, path) => {
    // Remove entries from static sitemap which are contained in the server-sitemap.xml
    if (ignoredPaths.some((dynamicPath) => path.startsWith(dynamicPath))) {
      return null;
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
