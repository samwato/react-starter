import * as React from 'react'
import { useParams } from '@lib/router/context/route'
import { getTrackById } from '@/api/music'

export function Track() {
  const { trackId } = useParams()
  const track = getTrackById(trackId)

  if (!track) return null

  return (
    <div>
      <h3>{track.name}</h3>
      <p>Album: {track.album}</p>
      <p>Length: {track.length}</p>
      <p>Listens: {track.listens}</p>
    </div>
  )
}
