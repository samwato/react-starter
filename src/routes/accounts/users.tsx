import * as React from 'react'
import { Link } from '@lib/router'

const users = [
  { id: 'user-1', name: 'User 1' },
  { id: 'user-2', name: 'User 2' },
  { id: 'user-3', name: 'User 3' },
]

export function Users() {
  return (
    <div>
      <h1>Users</h1>

      <menu>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={user.id}>{user.name}</Link>
          </li>
        ))}
      </menu>
    </div>
  )
}
