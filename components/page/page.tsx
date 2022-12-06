import type { HTMLProps } from 'react';
import clsx from 'clsx';
import { NextSeo } from 'next-seo';
import * as process from 'process';
import useSanityImage from 'hooks/useSanityImage';
import { SanityImageObject } from "@sanity/image-url/lib/types/types";

interface PageProps extends HTMLProps<HTMLDivElement> {
  title?: string;
  fullHeight?: boolean;
  openGraphImage?: SanityImageObject;
  description?: string;
}

const Page = ({
  fullHeight,
  title,
  openGraphImage,
  className,
  description,
  ...props
}: PageProps) => {
  const ogImage = useSanityImage(openGraphImage)?.src || null;
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={process.env.NEXT_PUBLIC_URL}
        openGraph={{
          title: title,
          description: description,
          url: process.env.NEXT_PUBLIC_URL,
          images: ogImage
            ? [
                {
                  url: ogImage,
                  height: 600,
                  width: 800,
                  alt: title,
                },
              ]
            : undefined,
          siteName: title
        }}
      />
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
    </>
  );
};

export default Page;
