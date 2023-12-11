import * as React from 'react'
import { Link } from '@/lib/router'

export function Users() {
  return (
    <div>
      <h1>Users</h1>
      <Link to="/accounts/users/1">User 1</Link>
    </div>
  )
}
