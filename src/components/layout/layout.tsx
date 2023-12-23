import * as React from 'react'
import { Link, useOutlet } from '@/lib/router'
import { MenuList, MenuItem } from '@/components/layout/menu'
import { Logo } from '@/components/layout/logo'
import styles from '@/components/layout/layout.module.css'

export function Layout() {
  const outlet = useOutlet()

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div>
          <Logo />
        </div>
        <div>
          <MenuList>
            <MenuItem>
              <Link to="/">Dashboard</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/reports">Reports</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/accounts/users">Users</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/whoops">404</Link>
            </MenuItem>
          </MenuList>
        </div>
      </header>

      <main className={styles.main}>{outlet}</main>
    </div>
  )
}
