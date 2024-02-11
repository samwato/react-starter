import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'

type UseLocalStorageStateOptions<TValue> = {
  defaultValue?: TValue
  storageSync?: boolean
}

const serialize = JSON.stringify
const deserialize = (value: string) =>
  value === JSON.stringify('undefined') ? undefined : JSON.parse(value)

/**
 * A hook to help persist React state in local storage
 */
export function useLocalStorageState<TValue>(
  key: string,
  options: UseLocalStorageStateOptions<TValue> = {},
): [TValue | undefined, Dispatch<SetStateAction<TValue | undefined>>] {
  const [state, setState] = useState<TValue | undefined>(() => {
    let storedValue: string | null = null

    try {
      storedValue = localStorage.getItem(key)
    } catch (err) {
      return options.defaultValue
    }

    if (storedValue === null) {
      return options.defaultValue
    }

    try {
      return deserialize(storedValue)
    } catch (err) {
      try {
        // Remove item to invalid values
        localStorage.removeItem(key)
      } catch (err) {
        // Do nothing
      }
      return options.defaultValue
    }
  })

  const prevKeyRef = useRef(key)

  useEffect(() => {
    // Handle key change
    if (prevKeyRef.current !== key) {
      try {
        localStorage.removeItem(prevKeyRef.current)
      } catch (err) {
        // Do nothing
      }
    }

    // Remove item for undefined or null values
    if (state === undefined || state === null) {
      try {
        localStorage.removeItem(key)
      } catch (err) {
        // Do nothing
      }
      return
    }

    prevKeyRef.current = key
    try {
      localStorage.setItem(key, serialize(state))
    } catch (err) {
      // Do nothing
    }
  }, [key, state])

  useEffect(() => {
    // Opt out of storage sync
    if (!options.storageSync) return undefined

    function onLocalStorage(event: StorageEvent) {
      if (event.storageArea !== localStorage) return
      if (event.key !== key) return

      try {
        const newValue =
          event.newValue === null ? undefined : deserialize(event.newValue)
        setState(newValue)
      } catch (err) {
        // Do nothing to the state
      }
    }

    addEventListener('storage', onLocalStorage)

    return () => {
      removeEventListener('storage', onLocalStorage)
    }
  }, [key, options.storageSync])

  return [state, setState]
}
