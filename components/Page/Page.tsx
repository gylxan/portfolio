import type { HTMLProps } from 'react';
import Head from 'next/head';
import clsx from 'clsx';

interface PageProps extends HTMLProps<HTMLDivElement> {
  title?: string;
  fullHeight?: boolean;
}

const Page = ({ fullHeight, title, className, ...props }: PageProps) => (
  <>
    <Head>
      <title>
        {`${process.env.NEXT_PUBLIC_NAME}${title ? ` - ${title}` : ''}`}
      </title>
    </Head>
    <div
      {...props}
      className={clsx(
        'container mx-auto px-4 md:px-8',
        fullHeight
          ? 'flex h-full flex-col justify-center'
          : 'mt-4 mb-6 md:mt-12',
        className,
      )}
    />
  </>
);

export default Page;
