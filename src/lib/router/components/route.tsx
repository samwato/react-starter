import * as React from 'react'
import { useRouter } from '../context/router'
import { type RouteProps } from '../types'
import { OutletProvider, useOutlet } from '@/lib/router/context/outlet'
import { normalizePath } from '@/lib/router/helper/path'

export function Route({ children, component, path }: RouteProps) {
  const [{ location }] = useRouter()
  const { inheritPath } = useOutlet()


  const normalizedPath = path ? normalizePath(path) : undefined
  const normalizedInheritPath = normalizePath(inheritPath)

  const routePath = normalizedPath ? normalizedInheritPath + normalizedPath : normalizedInheritPath
  const normalizedRoutePath = normalizePath(routePath)

  return location === normalizedRoutePath ? (
    <OutletProvider inheritPath={normalizedRoutePath} outlet={children}>
      {component}
    </OutletProvider>
  ) : null
}

Route.prototype.isRouteComponent = true
