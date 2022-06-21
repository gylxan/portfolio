import type { NextPage } from 'next'
import Head from 'next/head'
import Page from '../components/Page/Page'
import TagCloud from '../components/TagCloud/TagCloud'
import AnimatedTitle from '../components/AnimatedTitle/AnimatedTitle'
import Link from '../components/Link/Link'

const About: NextPage = () => {
  return (
    <Page>
      <Head>
        <title>About</title>
        <meta name="description" content="About me" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <AnimatedTitle title="Me, Myself and I" />
      <div className="container mt-8 flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-4">
          <p>
            I&apos;m a passionated frontend developer currently working for{' '}
            <Link href="https://thalia-drs.de" target="_blank">
              Thalia drs
            </Link>
            .
          </p>

          <p>
            After graduating in 2012 with a Bachelor&apos;s Degree in Applied
            Computer Sciences, I moved to Berlin and spent the years afterwards
            working as frontend developer as part of multiple teams in various
            companies.
          </p>

          <p>
            Since 2020 I work as Web Frontend Tech Lead to gain and share more
            of my technical knowledge, be a consultant to our clients and
            product owners and keep our teams on track.
          </p>

          <p>
            I spend my free time reading, cooking, working in my garden spot and
            going on travel adventures whenever I&apos;m not writing code.
          </p>

          <p>
            Haven&apos;t heard enough of me?{' '}
            <Link
              href='mailto:"Guido Lange"<guidolange90@gmail.com>'
              target="_blank"
            >
              Contact me!
            </Link>
          </p>
        </div>
        <TagCloud />
      </div>
    </Page>
  )
}

export default About
