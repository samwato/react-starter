import * as React from 'react'
import { Route, RouterProvider } from '@/lib/router'
import { Layout } from '@/components/layout'
import { Dashboard } from '@/routes/dashboard'
import { Reports } from '@/routes/reports'
import { NotFound } from '@/routes/not-found'

export function App() {
  return (
    <RouterProvider fallback={<NotFound />}>
      <Route path="/" component={<Layout />}>
        <Route component={<Dashboard />} />
        <Route path="/reports" component={<Reports />} />
      </Route>
    </RouterProvider>
  )
}
