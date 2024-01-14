import * as React from 'react'
import { useParams, Link } from '@lib/router'
import { getTracksByBandId } from '@/api/music'

export function Tracks() {
  const { bandId } = useParams()
  const tracks = getTracksByBandId(bandId)

  return (
    <div>
      {tracks.map((track) => (
        <li key={track.id}>
          <Link to={track.id}>{track.name}</Link>
        </li>
      ))}
    </div>
  )
}
