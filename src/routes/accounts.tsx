import * as React from 'react'
import { useOutlet } from '@lib/router'

export function Accounts() {
  const outlet = useOutlet()

  return (
    <div>
      <h1>Accounts</h1>
      {outlet}
    </div>
  )
}
