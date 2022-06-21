import type { NextPage } from 'next'
import Head from 'next/head'
import Page from '../components/Page/Page'
import { Routes } from '../constants/routes'
import Link from '../components/Link/Link'
import styles from '../styles/404.module.css'

const FourOhFour: NextPage = () => {
  return (
    <Page fullHeight title="404" description="Page not found">
      <div className="container flex flex-col items-center gap-4">
        <h1 className={styles.title} title="404">
          404
        </h1>
        <h2>Ooops, seems like you are wrong here</h2>
        <Link href={Routes.Home}>Go back to home</Link>
      </div>
    </Page>
  )
}

export default FourOhFour
