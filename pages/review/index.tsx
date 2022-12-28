import React from 'react'
import { useRouter } from 'next/router'
import logo from '../../public/logo.jpg'
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

  } else {
    renderer = id?  <iframe src={`/browser/?id=${id}`} style={{
      position: 'fixed',
      left: '0',
      bottom: '0',
      height: 'calc(100vh - 54px)',
      width: '100vw',
      border: 'none'
    }}
    title="Concept Network Browser, powered by TeleFacts" />
    :
    <div>An error ocurred.  Please hit the browser's refresh/reload button.</div>
  }
  return <div>
    <h1 className={styles.Brand}>
                <img src={logo.src} style={{verticalAlign: 'bottom'}} alt="ECKSBEE Logo" width={64.1} height={49.5} />
                <a href="https://ecksbee.com" target="_blank">ECKSBEE</a> - EDGARBrowser
    </h1>
    <nav className={styles.Nav}>
      <ul className={styles.NavList}>
        <li><a href={`https://www.sec.gov/${path}`} target="_blank">Go to sec.gov</a></li>
        <li><a href="/">Start over</a></li>
      </ul>
      </nav>
      { renderer }
  </div>
}
