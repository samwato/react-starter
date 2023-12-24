import * as React from 'react'
import { isValidElement } from 'react'
import type { RouteComponent } from '../types'

export function isRouteComponent(
  node: React.ReactNode,
): node is RouteComponent {
  return (
    !!node &&
    isValidElement(node) &&
    typeof node.type !== 'string' &&
    node.props.path &&
    node.props.component
  )
}
