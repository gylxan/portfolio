import type { HTMLProps } from 'react';
import clsx from 'clsx';
import { NextSeo } from 'next-seo';
import useSanityImage from 'hooks/useSanityImage';
import { useRouter } from 'next/router';
import { Footer, Header } from 'components/index';
import type { SiteConfig } from 'types/siteConfig';
import type { SanityImage } from 'types/image';

export interface LayoutProps extends HTMLProps<HTMLDivElement> {
  title?: string;
  fullHeight?: boolean;
  openGraphImage?: SanityImage;
  description?: string;
  slug?: string;
  type?: string;
  publishedTime?: string;
  siteConfig: SiteConfig;
}

const Layout = ({
  fullHeight,
  title,
  openGraphImage,
  className,
  description,
  slug,
  type,
  publishedTime,
  siteConfig,
  ...props
}: LayoutProps) => {
  const { logo, menuLinks, appleTouchIcon, safariTabIcon, resume } = siteConfig;
  const ogImage = useSanityImage(openGraphImage)?.src || null;
  const appleIcon = useSanityImage(appleTouchIcon)?.src || null;
  const safariIcon = useSanityImage(safariTabIcon)?.src || null;
  const globalOgImage = useSanityImage(siteConfig.openGraphImage)?.src || null;
  const { pathname } = useRouter();

  const subPath = slug ?? pathname;
  const url = `${siteConfig.url}${subPath === '/' ? '' : subPath}`;

  return (
    <>
      <Header logo={logo} menuLinks={menuLinks} resume={resume} />
      <NextSeo
        title={title}
        defaultTitle={siteConfig.title}
        titleTemplate={`%s | ${siteConfig.title}`}
        description={description || siteConfig.description}
        canonical={url}
        openGraph={{
          title: title ? `${title} | ${siteConfig.title}` : siteConfig.title,
          description: description || siteConfig.description,
          url,
          type: type || 'website',
          siteName: siteConfig.title,
          ...(type === 'article'
            ? {
                article: {
                  publishedTime,
                },
              }
            : {}),
          images: [
            ...(ogImage
              ? [
                  {
                    url: ogImage,
                    height: 600,
                    width: 800,
                    alt: `Open Graph image - ${title}`,
                  },
                ]
              : []),
            ...(globalOgImage
              ? [
                  {
                    url: globalOgImage,
                    alt: 'Open Graph image alt',
                    width: 800,
                    height: 600,
                  },
                ]
              : []),
          ],
        }}
        additionalMetaTags={[
          ...(siteConfig.keywords.length
            ? [
                {
                  name: 'keywords',
                  content: siteConfig.keywords.join(','),
                },
              ]
            : []),
        ]}
        additionalLinkTags={[
          ...(appleIcon
            ? [
                {
                  rel: 'apple-touch-icon',
                  sizes: '180x180',
                  href: appleIcon,
                },
              ]
            : []),
          ...(safariIcon
            ? [
                {
                  rel: 'mask-icon',
                  href: safariIcon,
                },
              ]
            : []),
        ]}
      />

      <main className="overflow-auto">
        <div
          {...props}
          className={clsx(
            'container mx-auto max-w-screen-lg px-4 md:px-8',
            fullHeight
              ? 'flex h-full flex-col justify-center'
              : 'mt-4 mb-6 md:mt-6',
            className,
          )}
        />
      </main>
      <Footer siteConfig={siteConfig} />
    </>
  );
};

export default Layout;
