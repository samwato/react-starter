// Mock Functions for Demo Purposes

interface Band {
  id: string
  name: string
  bio: string
  monthly_listeners: number
  followers: number
}

const bands: Band[] = [
  {
    id: 'band-1',
    name: 'Hollow Coves',
    bio: "An Aussie indie folk group built around the talents of singer/songwriters Ryan Henderson and Matt Carins, Hollow Coves' employ a rich amalgam of reflective lyrics, dynamic harmonies, and earthy melodies.",
    monthly_listeners: 6_001_796,
    followers: 622_032,
  },
]

export const getBands = (): Band[] => bands

export const getBandById = (id: Band['id']): Band | undefined =>
  bands.find((band) => band.id === id)

interface Track {
  id: string
  bandId: Band['id']
  name: string
  album: string
  length: string
  listens: number
}

const tracks: Track[] = [
  {
    id: 'track-1',
    bandId: 'band-1',
    name: 'Coastline',
    album: 'Wanderlust',
    length: '3:53',
    listens: 232_045_080,
  },
  {
    id: 'track-2',
    bandId: 'band-1',
    name: 'The Woods',
    album: 'Wanderlust',
    length: '4:02',
    listens: 54_740_886,
  },
  {
    id: 'track-3',
    bandId: 'band-1',
    name: 'Home',
    album: 'Wanderlust',
    length: '3:22',
    listens: 65_313_246,
  },
]

export const getTracksByBandId = (bandId: Band['id']): Track[] =>
  tracks.filter((track) => track.bandId === bandId)

export const getTrackById = (id: Track['id']): Track | undefined =>
  tracks.find((track) => track.id === id)
