import * as React from 'react'
import heroImage from '@/routes/dashboard/hero.jpg'
import { Layout } from '@/components/layout'
import styles from '@/routes/dashboard/dashboard.module.css'

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
