import { HTMLProps } from 'react'
import Head from 'next/head'

interface PageProps extends HTMLProps<HTMLDivElement> {
  title: string
  description: string
  fullHeight?: boolean
}

const Page = ({ fullHeight, title, description, ...props }: PageProps) => (
  <>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/manifest.json" />
    </Head>
    <div
      {...props}
      className={
        'container mx-auto px-4' +
        (fullHeight ? ' flex h-full flex-col justify-center' : ' mt-20')
      }
    />
  </>
)

export default Page
