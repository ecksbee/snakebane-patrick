import React from "react"
import styles from './CookieBanner.module.css'

const consentKey = "ECKSBEE.cookie.consent"
const CookieBanner = (): JSX.Element | null => {
    const [understood, setUnderstood] = React.useState(false)
    const [computed, setComputed] = React.useState(false)
    React.useEffect(() => {
        const sixyMinutes = 60 * 60 * 1000
        const consentValue = window.localStorage.getItem(consentKey)
        const consentTime: number = consentValue
            ? +consentValue
            : Date.now() - sixyMinutes - 1000
        const diff = (Date.now() - consentTime)
        setComputed((diff > sixyMinutes))
    }, [])
    if (understood) {
      return null
    }
    if (computed) {
      return (
        <div className={styles.cookie}>
          <p>
            Our website uses cookies. By continuing to use our website, you are
            granting us permission to deploy our cookies as detailed in our{" "}
            <a href="https:ecksbee.com/privacy">privacy</a> and{" "}
            <a href="https:ecksbee.com/cookie">cookie</a> policy.
          </p>
          <button
            className={styles.btnCookie}
            onClick={(e) => {
              window.localStorage.setItem(consentKey, Date.now().toString())
              setUnderstood(true)
            }}
          >
            Understood
          </button>
        </div>
      )
    }
    return null
}

export default CookieBanner