import * as React from 'react'
import {
  createContext,
  useContext,
} from 'react'
import {
  type OutletProviderProps,
  type OutletContextValue,
} from '../types'

const OutletContext = createContext<OutletContextValue | undefined>(undefined)

export const useOutlet = (): OutletContextValue => {
  const outletContext = useContext(OutletContext)

  if (!outletContext) {
    throw new Error('useOutlet must be wrapped with OutletContext')
  }

  return outletContext
}

export function OutletProvider({ children, inheritPath, outlet }: OutletProviderProps) {
  return (
    <OutletContext.Provider value={{ inheritPath, outlet }}>
      {children}
    </OutletContext.Provider>
  )
}
