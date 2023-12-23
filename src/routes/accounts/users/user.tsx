import * as React from 'react'
import { useParams, Link } from '@/lib/router'

export function User() {
  const { userId } = useParams()

  return (
    <div>
      <h1>User: {userId}</h1>
      <Link to="posts/post-1">Post 1</Link>
    </div>
  )
}
