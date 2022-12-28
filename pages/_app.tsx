import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import CookieBanner from '../components/CookieBanner'

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>{`EDGARBrowser | ECKSBEE`}</title>
    </Head>
    <Component {...pageProps} />
    <CookieBanner />
  </>
}
