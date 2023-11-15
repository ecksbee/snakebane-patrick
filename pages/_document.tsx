import { Html, Head, Main, NextScript } from 'next/document'

const tagline = "Browse XBRL files within EDGAR that has been accepted by the SEC.  XBRL rendering is powered by TeleFacts, an ECKSBEE software."
export default function Document() {
  return (
    <Html lang="en">
    <Head>
      <meta name="description" content={tagline} />
			<meta property='og:type' content='website' />
			<meta property='og:title' content='EDGARBrowser' key='title' />
			<meta property='og:description' content={tagline} key='description' />
			<meta property='og:image' content='/logo.png' key='image' />
      <link rel="icon" href="/logo.png" />
    </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
