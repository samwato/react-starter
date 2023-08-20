import {
  ReactNode,
  ReactElement,
  Dispatch,
  HTMLAttributes,
  ComponentProps,
} from 'react'
import { Route } from './components'

export type RouterState = {
  location: string
  routes: string[]
}

export type RouterAction = {
  type: 'set'
  payload: string
}

export type RouterDispatch = Dispatch<RouterAction>

export type RouterContextValue = [RouterState, RouterDispatch]

export type RouterProviderProps = {
  children: ReactNode
  fallback?: ReactNode
}

export type RouterReducer = (
  state: RouterState,
  action: RouterAction,
) => RouterState

export interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {
  to: string
}

export type RouteProps = {
  component: ReactNode
  path: string
}

export type RouteComponent = ReactElement<
  ComponentProps<typeof Route>,
  typeof Route
>
