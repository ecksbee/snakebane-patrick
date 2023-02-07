import React from "react"
import Link from "next/link"
import styles from './Footer.module.css'

type MyProps = {
    short: boolean
}

const Footer = ({ short } : MyProps): JSX.Element => {
    const copyright = "© 2022-" + new Date().getFullYear() + " ECKSBEE LLC. All rights reserved.  ECKSBEE LLC is not affiliated, associated, endorsed by, or in any way officially connected with the U.S. Securities and Exchange Commission (SEC).  The name EDGAR as well as names, marks, emblems and images of issuers are registered trademarks of their respective owners."
    if (short) {
        return <footer className={styles.footerShort}>
            <p className={styles.copyright}>
            {copyright}
            </p>
        </footer>
    }
    return <footer className={styles.footer}>
        <div className={styles.footerNav}>
            <div className={styles.footerList}>
            <h2>ECKSBEE</h2>
            <ul>
                <li><a href='https://ecksbee.com/about'>About</a></li>
                <li><a href='https://ecksbee.com/telefacts'>TeleFacts</a></li>
                <li><a href='https://ecksbee.com/edgarbrowser'>EDGARBrowser</a></li>
            </ul>
            </div>
            <div className={styles.footerList}>
            <h2>Connect With Us</h2>
            <ul>
                <li><a href='https://github.com/ecksbee'>Github</a></li>
                <li><a href='https://linkedin.com/company/ecksbee'>LinkedIn</a></li>
            </ul>
            </div>
            <div className={styles.footerList}>
            <h2>Legal</h2>
            <ul>
                <li><Link href='privacy'>Privacy</Link></li>
                <li><Link href='cookies'>Cookies</Link></li>
            </ul>
            </div>
        </div>
        <p className={styles.copyright}>
            {copyright}
        </p>
    </footer>
}

export default Footer