import * as React from 'react'
import { resolvePaths } from './resolve-paths'
import { isRouteComponent } from './is-route-component'

export function getRoutesFromComponents(
  node: React.ReactNode,
  baseRoute: string,
  routes: Set<string> = new Set(),
): Set<string> {
  if (!isRouteComponent(node)) return routes

  const route = resolvePaths(baseRoute, node.props.path ?? '')

  if (node.props.path) {
    routes.add(route)
  }

  const children: React.ReactNode[] = Array.isArray(node.props.children)
    ? node.props.children
    : [node.props.children]

  children.forEach((childNode) => {
    const childRoutes = getRoutesFromComponents(childNode, route, routes)
    childRoutes.forEach((childRoute) => {
      routes.add(childRoute)
    })
  })

  return routes
}
