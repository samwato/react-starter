import React from 'react'
import heroImage from './hero.jpg'
import { Layout } from '../../components/layout'
import styles from './dashboard.module.css'

export default function Dashboard() {
  return (
    <Layout>
      <h1>Dashboard</h1>
      <div className={styles.container}>
        <img src={heroImage} alt="Hero" width="400" />
      </div>
    </Layout>
  )
}
