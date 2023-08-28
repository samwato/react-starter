import * as React from 'react'
import { Route } from '@/lib/router/components'

export type RouterState = {
  location: string
  routes: string[]
}

export type RouterAction = {
  type: 'set'
  payload: string
}

export type RouterDispatch = React.Dispatch<RouterAction>

export type RouterContextValue = [RouterState, RouterDispatch]

export type RouterProviderProps = {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export type RouterReducer = (
  state: RouterState,
  action: RouterAction,
) => RouterState

export interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  to: string
}

export type RouteProps = {
  component: React.ReactNode
  path: string
}

export type RouteComponent = React.ReactElement<
  React.ComponentProps<typeof Route>,
  typeof Route
>
