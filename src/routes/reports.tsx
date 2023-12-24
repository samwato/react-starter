import * as React from 'react'
import { Route, type RouteProps } from '@lib/router'

export function ReportsRoute(routeProps: RouteProps) {
  return <Route {...routeProps} />
}

export function Reports() {
  return <h1>Reports</h1>
}
