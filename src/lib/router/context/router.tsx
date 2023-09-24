import * as React from 'react'
import {
  createContext,
  useContext,
  useLayoutEffect,
  useReducer,
  isValidElement,
} from 'react'
import {
  type RouterProviderProps,
  type RouterReducer,
  type RouterDispatch,
  type RouterContextValue,
  RouteComponent,
} from '../types'
import { OutletProvider } from '@/lib/router/context/outlet'

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

function isRouteComponent(node: React.ReactNode): node is RouteComponent {
  return (
    !!node &&
    isValidElement(node) &&
    typeof node.type !== 'string' &&
    node.type.prototype.isRouteComponent
  )
}

function getRoutesFromComponents(children: React.ReactNode): string[] {
  const routes: string[] = []

  // Handle single react element
  if (isRouteComponent(children)) {
    if (children.props.path) routes.push(children.props.path)
  }

  // Handle multiple react elements
  if (Array.isArray(children)) {
    children.forEach((node: React.ReactNode) => {
      if (isRouteComponent(node)) {
        if (node.props.path) routes.push(node.props.path)
      }
    })
  }

  return routes
}

export function RouterProvider({ basePath, children, fallback }: RouterProviderProps) {
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

  const noRouteMatches = !state.routes.includes(state.location)

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
      <OutletProvider inheritPath={basePath || '/'}>
        {children}
      </OutletProvider>
      {noRouteMatches && fallback ? fallback : null}
    </RouterContext.Provider>
  )
}
