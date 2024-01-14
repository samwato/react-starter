import * as React from 'react'
import { Link } from '@lib/router'
import { getBands } from '@/api/music'

export function Bands() {
  const bands = getBands()

  return (
    <menu>
      {bands.map((band) => (
        <li key={band.id}>
          <Link to={band.id}>{band.name}</Link>
        </li>
      ))}
    </menu>
  )
}
