import { HTMLProps } from 'react';
import Head from 'next/head';
import clsx from 'clsx';

interface PageProps extends HTMLProps<HTMLDivElement> {
  title?: string;
  fullHeight?: boolean;
}

const Page = ({ fullHeight, title, ...props }: PageProps) => (
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
        fullHeight ? ' flex h-full flex-col justify-center' : ' mt-10 mb-6',
      )}
    />
  </>
);

export default Page;
