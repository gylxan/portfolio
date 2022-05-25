import type {NextPage} from 'next'
import Head from 'next/head'
import Page from '../components/Page/Page'

import styles from '../styles/Home.module.css'
import AnimatedTitle from '../components/AnimatedTitle/AnimatedTitle'

const Home: NextPage = () => {
  return (
    <Page>
      <Head>
        <title>Portfolio</title>
        <meta name="description" content="Portfolio of Guido Lange" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container flex justify-center gap-4">
        <div className={styles.container}>
          <AnimatedTitle title="Guido Lange" subTitle="Frontend Engineer" />
        </div>
      </div>
    </Page>
  )
}

export default Home
