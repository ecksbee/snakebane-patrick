import React from 'react'
import { useRouter } from 'next/router'
import Footer from '../../components/Footer'
import logo from '../../public/logo.png'
import styles from '../../styles/Review.module.css'

export default function Review() {
  const router = useRouter()
  const [id, setId] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(true)
  const { path } = router.query
  React.useEffect(() => {
    if (!path) {
      return
    }
    setIsLoading(true)
    fetch(`/hash?path=${path}`).then(res => res.json())
    .then(data => setId(data?.hash || ''))
    .finally(() => setIsLoading(false))
  }, [path])
  let renderer = null
  if (isLoading) {
    renderer = <div><p>booting up renderer...</p></div>
  } else {
    renderer = id?  <iframe src={`/browser/?id=${id}`} style={{
      position: 'relative',
      left: '0',
      bottom: '0',
      height: 'calc(100vh - 54px - 20px)',
      width: '100vw',
      border: 'none'
    }}
    title="Concept Network Browser, powered by TeleFacts" />
    :
    <div><p>Unable to render XBRL filing.  The EDGAR filing may not have a well-formed XBRL report.  If there is a well-formed XBRL report, an error may have occurred.  There's a chance that hitting the browser's refresh/reload button to re-render will fix most errors.</p></div>
  }
  return <>
    <div>
      <h1 className={styles.Brand}>
                  <img src={logo.src} style={{verticalAlign: 'bottom'}} alt="ECKSBEE Logo" width={64.1} height={49.5} />
                  EDGARBrowser
      </h1>
      <nav className={styles.Nav}>
        <ul className={styles.NavList}>
          <li><a href={`https://www.sec.gov/${path}`} target="_blank">Go to sec.gov</a></li>
          <li><a href="/">Start over</a></li>
        </ul>
        </nav>
        { renderer }
    </div>
    <Footer short={true} />
  </>
}
