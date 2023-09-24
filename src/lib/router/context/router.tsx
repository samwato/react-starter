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
import { resolvePaths } from '@/lib/router/helper/path'

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

function getRoutesFromComponents(
  node: React.ReactNode,
  baseRoute: string = '/',
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
