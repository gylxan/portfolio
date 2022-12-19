import type { HTMLProps } from 'react';
import clsx from 'clsx';
import { NextSeo } from 'next-seo';
import useSanityImage from 'hooks/useSanityImage';
import { useRouter } from 'next/router';
import { Footer, Header } from 'components/index';
import type { SiteConfig } from 'types/siteConfig';
import type { SanityImage } from "types/image";

interface PageProps extends HTMLProps<HTMLDivElement> {
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
}: PageProps) => {
  const ogImage = useSanityImage(openGraphImage)?.src || null;
  const appleTouchIcon = useSanityImage(siteConfig.appleTouchIcon)?.src || null;
  const safariTabIcon = useSanityImage(siteConfig.safariTabIcon)?.src || null;
  const globalOgImage = useSanityImage(siteConfig.openGraphImage)?.src || null;
  const { pathname } = useRouter();

  const url = `${siteConfig.url}${
    slug ? slug : pathname === '/' ? '' : pathname
  }`;

  console.warn(title);
  return (
    <>
      <Header siteConfig={siteConfig} />
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
                    alt: 'Og Image Alt',
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
          ...(appleTouchIcon
            ? [
                {
                  rel: 'apple-touch-icon',
                  sizes: '180x180',
                  href: appleTouchIcon,
                },
              ]
            : []),
          ...(safariTabIcon
            ? [
                {
                  rel: 'mask-icon',
                  href: safariTabIcon,
                },
              ]
            : []),
        ]}
      />

      <main>
        <div
          {...props}
          className={clsx(
            'container mx-auto max-w-screen-lg px-4 md:px-8',
            fullHeight
              ? 'flex h-full flex-col justify-center'
              : 'mt-4 mb-6 md:mt-12',
            className,
          )}
        />
      </main>
      <Footer siteConfig={siteConfig} />
    </>
  );
};

export default Layout;
