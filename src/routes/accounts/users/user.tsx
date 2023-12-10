import * as React from 'react'
import { useOutlet, useParams } from '@/lib/router'

export function User() {
  const outlet = useOutlet()
  const { userId } = useParams()

  return (
    <div>
      <h1>User: {userId}</h1>
      {outlet}
    </div>
  )
}
