import type { NextPage } from 'next'
import Head from 'next/head'
import Page from '../components/Page/Page'

import styles from '../styles/Home.module.css'
import AnimatedTitle from '../components/AnimatedTitle/AnimatedTitle'
import Intro from '../components/Intro/Intro'

const Home: NextPage = () => {
  return (
    <Page>
      <Head>
        <title>Portfolio</title>
        <meta name="description" content="Portfolio of Guido Lange" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container flex justify-center gap-4">
        <Intro />
        <div className={styles.container}>
          <AnimatedTitle title="Guido Lange" subTitle="Frontend Developer" />
        </div>
      </div>
    </Page>
  )
}

export default Home
