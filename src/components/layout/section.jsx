import React from 'react'
import styles from './section.module.css'

export function Section({ children }) {
  return <div className={styles.section}>{children}</div>
}
