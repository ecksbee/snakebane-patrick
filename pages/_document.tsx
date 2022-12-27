import { Html, Head, Main, NextScript } from 'next/document'

const tagline = "Browse XBRL files within EDGAR that has been accepted by the SEC.  XBRL rendering is powered by TeleFacts, an ECKSBEE software."
export default function Document() {
  return (
    <Html lang="en">
    <Head>
      <meta name="description" content={tagline} />
      <link rel="icon" href="/logo.jpg" />
    </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
