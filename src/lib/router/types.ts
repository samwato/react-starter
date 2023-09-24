import * as React from 'react'
import { Route } from './components/route'

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
  basePath?: string
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
  component: React.ReactElement
  path?: string
  children?: React.ReactNode
}

export type RouteComponent = React.ReactElement<
  React.ComponentProps<typeof Route>,
  typeof Route
>

export type OutletContextValue = {
  inheritPath: string
  outlet?: React.ReactNode
}

export type OutletProviderProps = {
  children: React.ReactNode
  inheritPath: string
  outlet?: React.ReactNode
}
