import * as React from 'react'
import { useRouter } from '../context/router'
import { RouteProvider, useRoute } from '../context/route'
import { resolvePaths } from '../utils/resolve-paths'
import type { RouteProps } from '../types'
import { isExactMatch } from '../utils/is-exact-match'
import { isPartialMatch } from '../utils/is-partial-match'
import { getParams } from '../utils/get-params'
import { getLocation } from '../utils/get-location'

export function Route({ children, component, path }: RouteProps) {
  const [{ location: routerLocation }] = useRouter()
  const { path: inheritPath, params: inheritParams } = useRoute()

  const routePath = resolvePaths(inheritPath, path ?? '')
  const isIndex = !path

  const isMatch =
    isIndex || !children
      ? isExactMatch(routePath, routerLocation)
      : isPartialMatch(routePath, routerLocation)

  if (!isMatch) return null

  const routeParams = getParams(routePath, routerLocation, inheritParams)
  const routeLocation = getLocation(routePath, routerLocation)

  return (
    <RouteProvider
      location={routeLocation}
      params={routeParams}
      path={routePath}
      outlet={children}
    >
      {component}
    </RouteProvider>
  )
}
