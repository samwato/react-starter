import React from 'react'
import { Link } from '../../lib/router'
import styles from './layout.module.css'

export function Layout({ children }) {
  return (
    <div>
      <div className={styles.menu}>
        <h1>Hi, from React</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/reports">Reports</Link>
          </li>
        </ul>
      </div>
      <div>{children}</div>
    </div>
  )
}
