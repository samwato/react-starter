import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useReducer,
} from 'react'

const RouterContext = createContext()

export const useRouter = () => {
  const routerContext = useContext(RouterContext)

  if (!routerContext) {
    throw new Error('useRouter must be wrapped with RouterContext')
  }

  return routerContext
}

function routerReducer(state, action) {
  switch (action.type) {
    case 'register':
      return {
        ...state,
        routes: [...new Set(state.routes).add(action.payload)],
      }
    case 'set':
      return {
        ...state,
        location: action.payload,
      }
    default:
      throw Error(`Router action type ${action.type} not supported.`)
  }
}

export function registerRoute(dispatch, path) {
  dispatch({ type: 'register', payload: path })
}

export function setRouteLocation(dispatch, path) {
  dispatch({ type: 'set', payload: path })
}

export function RouterProvider({ ...props }) {
  const [state, dispatch] = useReducer(routerReducer, {
    location: window.location.pathname,
    routes: [],
  })

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

  const value = [state, dispatch]

  return <RouterContext.Provider value={value} {...props} />
}
