import * as React from 'react'
import { createContext, useContext, useLayoutEffect, useReducer } from 'react'
import {
  RouterProviderProps,
  RouterReducer,
  RouterDispatch,
  RouterContextValue,
} from '../types'
import { RouteProvider } from '../context/route'
import { getRoutesFromComponents } from '../utils/get-routes'
import { isExactMatch } from '../utils/is-exact-match'

const RouterContext = createContext<RouterContextValue | undefined>(undefined)

const routerReducer: RouterReducer = (state, action) => {
  switch (action.type) {
    case 'set':
      return {
        ...state,
        location: action.payload,
      }
    default:
      throw Error(`Router action type ${action.type} not supported.`)
  }
}

export function setRouteLocation(dispatch: RouterDispatch, path: string) {
  dispatch({ type: 'set', payload: path })
}

export function RouterProvider({
  basePath = '/',
  children,
  fallback,
}: RouterProviderProps) {
  const [state, dispatch] = useReducer(
    routerReducer,
    {
      location: '',
      registeredRoutes: new Set(),
    },
    () => ({
      location: window.location.pathname,
      registeredRoutes: getRoutesFromComponents(children, basePath),
    }),
  )

  const noRouteMatches = !Array.from(state.registeredRoutes).some(
    (registeredRoute) => {
      const match = isExactMatch(registeredRoute, state.location)
      return match
    },
  )

  useLayoutEffect(() => {
    function listener() {
      setRouteLocation(dispatch, window.location.pathname)
    }

    // TODO: Add listener to support search params from window.location.search

    // Handles back and forward browser buttons
    window.addEventListener('popstate', listener)

    return () => {
      window.removeEventListener('popstate', listener)
    }
  }, [])

  return (
    <RouterContext.Provider value={[state, dispatch]}>
      <RouteProvider location={basePath} params={{}} path={basePath}>
        {children}
      </RouteProvider>
      {noRouteMatches && fallback ? fallback : null}
    </RouterContext.Provider>
  )
}

// Internal Hooks
export const useRouter = (): RouterContextValue => {
  const routerContext = useContext(RouterContext)

  if (!routerContext) {
    throw new Error('useRouter must be wrapped with RouterContext')
  }

  return routerContext
}

// Consumer Hooks
export const useLocation = () => {
  const routerContext = useContext(RouterContext)

  if (!routerContext) {
    throw new Error('useLocation must be wrapped with RouterContext')
  }

  return routerContext[0].location
}
