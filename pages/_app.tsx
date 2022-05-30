import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { ThemeProvider } from 'next-themes'

config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider enableSystem>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </ThemeProvider>
  )
}

export default MyApp
