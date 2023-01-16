import React from "react"
import styles from './Footer.module.css'

const Footer = (): JSX.Element => {
    return <footer className={styles.footer}>
        <p className={styles.copyright}>
        {"© 2022-" + new Date().getFullYear() + " ECKSBEE LLC. All rights reserved.  ECKSBEE LLC is not affiliated, associated, endorsed by, or in any way officially connected with the SEC.  The name EDGAR as well as names, marks, emblems and images of issuers are registered trademarks of their respective owners."}
        </p>
    </footer>
}

export default Footer