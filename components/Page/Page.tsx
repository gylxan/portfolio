import { HTMLProps } from 'react';
import Head from 'next/head';

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
      className={
        'container mx-auto px-4' +
        (fullHeight ? ' flex h-full flex-col justify-center' : ' mt-20 mb-6')
      }
    />
  </>
);

export default Page;
