import * as React from 'react'
import { useRouter } from '../context/router'
import { OutletProvider, useOutlet } from '../context/outlet'
import { resolvePaths } from '../utils/resolve-paths'
import type { RouteProps } from '../types'

export function Route({ children, component, path }: RouteProps) {
  const [{ location }] = useRouter()
  const { inheritPath } = useOutlet()

  const routePath = resolvePaths(inheritPath, path ?? '')
  const isIndex = !path

  if (!location.startsWith(routePath)) return null

  // index paths needs to be exact
  if (isIndex && location !== routePath) return null

  return (
    <OutletProvider inheritPath={routePath} outlet={children}>
      {component}
    </OutletProvider>
  )
}

Route.prototype.isRouteComponent = true
