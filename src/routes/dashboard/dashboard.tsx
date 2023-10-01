import * as React from 'react'
import styles from './dashboard.module.css'
import { Joke } from '@/components/joke'

export function Dashboard() {
  return (
    <>
      <section className={styles.section}>
        <div className={styles.pill}>
          <h3>Over 3 million ready-to-work creatives in our community!</h3>
        </div>
      </section>
      <Joke />
    </>
  )
}
