import * as React from 'react'
import { Link, useOutlet } from '@/lib/router'

export function Users() {
  const outlet = useOutlet()

  return (
    <div>
      <h1>Users</h1>
      <Link to="/accounts/users/1">User 1</Link>
      {outlet}
    </div>
  )
}
