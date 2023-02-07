import React from 'react'
import styles from './MdReader.module.css'

type Props = {
    content: any 
}

const MdReader = ({content} : Props) => {
    return (
        <div className={styles.padded} dangerouslySetInnerHTML={{__html: content}} />
    )
}

export default MdReader