import * as React from 'react'
import styles from '@/components/layout/menu.module.css'

export function MenuList({ children }: { children: React.ReactNode }) {
  return <menu className={styles.menu_list}>{children}</menu>
}

export function MenuItem({ children }: { children: React.ReactNode }) {
  return <li className={styles.menu_item}>{children}</li>
}
