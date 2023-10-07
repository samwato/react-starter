import * as React from 'react'
import styles from './dashboard.module.css'
import { Joke } from '@/components/joke'
import heroImage from '@/routes/dashboard/hero.jpg'
import { cls } from '@/utils/styles'

export function Dashboard() {
  return (
    <>
      <section className={styles.section}>
        <div className={styles.columns}>
          <div className={cls(styles.column, styles.columnCenter)}>
            <Joke />
          </div>
          <div className={cls(styles.column, styles.columnCenter)}>
            <div className={styles.imageContainer}>
              <img src={heroImage} width="400px" height="600px" alt="wave" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
