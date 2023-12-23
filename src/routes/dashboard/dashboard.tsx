import * as React from 'react'
import styles from './dashboard.module.css'
import { Jokes } from '@/components/jokes'
import human1 from '@/routes/dashboard/human-1.svg'
import { cls } from '@/utils/styles'

export function Dashboard() {
  return (
    <>
      <section className={styles.section}>
        <div className={styles.columns}>
          <div className={styles.column}>
            <div className={styles.imageContainer}>
              <img src={human1} width="250px" alt="human 1" />
            </div>
          </div>
          <div className={cls(styles.column, styles.columnCenter)}>
            <Jokes />
          </div>
        </div>
      </section>
    </>
  )
}
