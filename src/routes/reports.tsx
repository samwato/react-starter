import * as React from 'react'
import { Route } from '@/lib/router'
import type { RouteProps } from '@/lib/router/types'

export function ReportsRoute(routeProps: RouteProps) {
  return <Route {...routeProps} />
}
