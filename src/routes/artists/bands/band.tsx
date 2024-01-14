import * as React from 'react'
import { Link, useOutlet, useParams } from '@lib/router'
import { getBandById } from '@/api/music'

export function Band() {
  const outlet = useOutlet()
  const { bandId } = useParams()
  const band = getBandById(bandId)

  if (!band) return null

  return (
    <div>
      <h1>{band.name}</h1>
      <p>Bio: {band.bio}</p>
      <p>Followers: {band.followers}</p>
      <p>Monthly Listeners: {band.monthly_listeners}</p>

      <Link to="tracks">View Tracks</Link>
      {outlet}
    </div>
  )
}
