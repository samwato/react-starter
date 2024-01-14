import * as React from 'react'
import { Route, RouterProvider } from '@lib/router'
import { Layout } from '@/components/layout'
import { Dashboard } from '@/routes/dashboard'
import { ReportsRoute, Reports } from '@/routes/reports'
import { Artists } from '@/routes/artists'
import { Bands } from '@/routes/artists/bands'
import { Band } from '@/routes/artists/bands/band'
import { Tracks } from '@/routes/artists/bands/tracks'
import { Track } from '@/routes/artists/bands/tracks/track'
import { NotFound } from '@/routes/not-found'

export function App() {
  return (
    <RouterProvider fallback={<NotFound />}>
      <Route path="/" component={<Layout />}>
        <Route component={<Dashboard />} />
        <ReportsRoute path="/reports" component={<Reports />} />
        <Route path="/artists" component={<Artists />}>
          <Route path="/bands" component={<Bands />} />
          <Route path="/bands/:bandId" component={<Band />}>
            <Route path="/tracks" component={<Tracks />} />
            <Route path="/tracks/:trackId" component={<Track />} />
          </Route>
        </Route>
      </Route>
    </RouterProvider>
  )
}
