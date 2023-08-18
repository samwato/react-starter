import React from 'react'
import { Route, RouterProvider } from './lib/router'
import Home from './routes/home'
import Dashboard from './routes/dashboard'
import Reports from './routes/reports'
import NotFound from './routes/not-found'

export default function App() {
  return (
    <RouterProvider>
      <Route path="/" component={<Home />} />
      <Route path="/dashboard" component={<Dashboard />} />
      <Route path="/reports" component={<Reports />} />
      <Route fallback component={<NotFound />} />
    </RouterProvider>
  )
}
