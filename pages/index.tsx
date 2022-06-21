import type { NextPage } from 'next'
import Head from 'next/head'
import Page from '../components/Page/Page'

import styles from '../styles/Home.module.css'
import AnimatedTitle from '../components/AnimatedTitle/AnimatedTitle'

const Home: NextPage = () => {
  return (
    <Page title="Portfolio" description="Portfolio of Guido Lange">
      <div className="container flex justify-center gap-4">
        <div className={styles.container}>
          <AnimatedTitle title="Guido Lange" subTitle="Frontend Developer" />
        </div>
      </div>
    </Page>
  )
}

export default Home
