import * as React from 'react'
import { Layout } from '@/components/layout'
import heroImage from './hero.jpg'
import styles from './dashboard.module.css'

export function Dashboard() {
  return (
    <Layout>
      <h1>Dashboard</h1>
      <div className={styles.container}>
        <img src={heroImage} alt="Hero" width="400" />
      </div>
    </Layout>
  )
}
