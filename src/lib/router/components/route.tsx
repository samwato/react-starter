import * as React from 'react'
import { useLocation } from '../context/router'
import { RouteProvider, useRoute } from '../context/route'
import { resolvePaths } from '../utils/resolve-paths'
import type { RouteProps } from '../types'
import { isExactMatch, isPartialMatch } from '../utils/is-match'
import { getParams } from '../utils/get-params'

export function Route({ children, component, path }: RouteProps) {
  const location = useLocation()
  const { path: inheritPath, params: inheritParams } = useRoute()

  const routePath = resolvePaths(inheritPath, path ?? '')
  const isIndex = !path

  const isMatch =
    isIndex || !children
      ? isExactMatch(routePath, location)
      : isPartialMatch(routePath, location)

  if (!isMatch) return null

  const routeParams = getParams(routePath, location, inheritParams)

  return (
    <RouteProvider params={routeParams} path={routePath} outlet={children}>
      {component}
    </RouteProvider>
  )
}

Route.prototype.isRouteComponent = true
