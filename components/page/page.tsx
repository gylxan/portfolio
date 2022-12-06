import type { HTMLProps } from 'react';
import clsx from 'clsx';
import { NextSeo } from 'next-seo';
import * as process from 'process';

interface PageProps extends HTMLProps<HTMLDivElement> {
  title?: string;
  fullHeight?: boolean;
}

const Page = ({ fullHeight, title, className, ...props }: PageProps) => {
  return (
    <>
      <NextSeo
        title={title}
        description={process.env.NEXT_PUBLIC_DESCRIPTION}
        canonical={process.env.NEXT_PUBLIC_URL}
        openGraph={{
          title: title,
          description: process.env.NEXT_PUBLIC_DESCRIPTION,
          url: process.env.NEXT_PUBLIC_URL,
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
