import * as React from 'react'
import { createContext, useContext } from 'react'
import type { RouteProviderProps, RouteContextValue } from '../types'

const RouteContext = createContext<RouteContextValue | undefined>(undefined)

export function RouteProvider({ children, ...value }: RouteProviderProps) {
  return <RouteContext.Provider value={value}>{children}</RouteContext.Provider>
}

// Internal Hooks
export const useRoute = (): RouteContextValue => {
  const routeContext = useContext(RouteContext)

  if (!routeContext) {
    throw new Error('useRoute must be wrapped with RouteContext')
  }

  return routeContext
}

// Consumer Hooks
export const useOutlet = (): RouteContextValue['outlet'] => {
  const routeContext = useContext(RouteContext)

  if (!routeContext) {
    throw new Error('useOutlet must be wrapped with RouteContext')
  }

  return routeContext.outlet
}

export const useParams = (): RouteContextValue['params'] => {
  const routeContext = useContext(RouteContext)

  if (!routeContext) {
    throw new Error('useParams must be wrapped with RouteContext')
  }

  return routeContext.params
}
