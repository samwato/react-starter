import * as React from 'react'
import { createContext, useContext, useLayoutEffect, useReducer } from 'react'
import type {
  RouterProviderProps,
  RouterReducer,
  RouterDispatch,
  RouterContextValue,
} from '../types'
import { OutletProvider } from '../context/outlet'
import { getRoutesFromComponents } from '../utils/get-routes'

const RouterContext = createContext<RouterContextValue | undefined>(undefined)

export const useRouter = (): RouterContextValue => {
  const routerContext = useContext(RouterContext)

  if (!routerContext) {
    throw new Error('useRouter must be wrapped with RouterContext')
  }

  return routerContext
}

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
  basePath,
  children,
  fallback,
}: RouterProviderProps) {
  const [state, dispatch] = useReducer(
    routerReducer,
    {
      location: '',
      routes: [],
    },
    () => ({
      location: window.location.pathname,
      routes: getRoutesFromComponents(children),
    }),
  )

  const noRouteMatches = !state.routes.has(state.location)

  useLayoutEffect(() => {
    function listener() {
      setRouteLocation(dispatch, window.location.pathname)
    }

    // Handles back and forward browser buttons
    window.addEventListener('popstate', listener)

    return () => {
      window.removeEventListener('popstate', listener)
    }
  }, [])

  return (
    <RouterContext.Provider value={[state, dispatch]}>
      <OutletProvider inheritPath={basePath || '/'}>{children}</OutletProvider>
      {noRouteMatches && fallback ? fallback : null}
    </RouterContext.Provider>
  )
}
