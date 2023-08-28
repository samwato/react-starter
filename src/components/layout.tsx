import * as React from 'react'
import { Link } from '@/lib/router'
import styles from '@/components/layout.module.css'

const logoText = 'React Starter'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className={styles.menu}>
        <h1 className={styles.title}>{logoText}</h1>
        <ul className={styles.menu_list}>
          <li>
            <Link className={styles.link} to="/">
              Dashboard
            </Link>
          </li>
          <li>
            <Link className={styles.link} to="/reports">
              Reports
            </Link>
          </li>
          <li>
            <Link className={styles.link} to="/whoops">
              404
            </Link>
          </li>
        </ul>
      </div>
      <main className={styles.main}>{children}</main>
    </div>
  )
}
