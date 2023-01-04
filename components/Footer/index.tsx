import React from "react"
import styles from './Footer.module.css'

const Footer = (): JSX.Element => {
    return <footer>
        <p className={styles.copyright}>
        {"© 2022-" + new Date().getFullYear() + " ECKSBEE LLC. All rights reserved."}
        </p>
    </footer>
}

export default Footer