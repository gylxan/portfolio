import type { NextPage } from 'next'
import Head from 'next/head'
import Page from '../components/Page/Page'
import TagCloud from '../components/TagCloud/TagCloud'
import AnimatedTitle from '../components/AnimatedTitle/AnimatedTitle'
import Link from '../components/Link/Link'

const Projects: NextPage = () => {
  return (
    <Page>
      <Head>
        <title>Projects</title>
        <meta name="description" content="Projects" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AnimatedTitle title="Projects" />
      <div className="container mt-8 flex flex-col items-center gap-4 lg:flex-row lg:justify-between"></div>
    </Page>
  )
}

export default Projects
