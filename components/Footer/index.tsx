import React from "react"
import styles from './Footer.module.css'

const Footer = (): JSX.Element => {
    return <footer className={styles.footer}>
        <p className={styles.copyright}>
        {"© 2022-" + new Date().getFullYear() + " ECKSBEE LLC. All rights reserved.  All XBRL filings came directly from the U.S. Securities and Exchange Commission (SEC) and are publicly available through the SEC's EDGAR system."}
        </p>
    </footer>
}

export default Footer