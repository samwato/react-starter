import React from 'react'
import { Route, RouterProvider } from './lib/router'
import Dashboard from './routes/dashboard/dashboard'
import Reports from './routes/reports'
import NotFound from './routes/not-found'

export default function App() {
  return (
    <RouterProvider fallback={<NotFound />}>
      <Route path="/" component={<Dashboard />} />
      <Route path="/reports" component={<Reports />} />
    </RouterProvider>
  )
}
