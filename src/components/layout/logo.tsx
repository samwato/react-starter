import * as React from 'react'
import { Link } from '@/lib/router'
import logo from './logo.svg'
import styles from '@/components/layout/logo.module.css'

const logoText = 'react-starter'

export function Logo() {
  return (
    <div className={styles.container}>
      <img src={logo} alt="Logo" width="40px" className={styles.logo} />
      <h1 className={styles.title}>
        <Link to="/">{logoText}</Link>
      </h1>
    </div>
  )
}
