import * as React from 'react'
import { useOutlet } from '@lib/router'

export function Artists() {
  const outlet = useOutlet()

  return (
    <div>
      <h1>Artists</h1>
      {outlet}
    </div>
  )
}
