import { useCallback, useEffect, useReducer, useRef } from 'react'
import type {
  FetchAction,
  FetchState,
  UseFetchOptions,
  UseFetchResponse,
} from '../types'

function fetchReducer<TData>(
  _: FetchState<TData>,
  action: FetchAction<TData>,
): FetchState<TData> {
  switch (action.type) {
    case 'pending':
      return { status: 'pending', data: undefined, error: undefined }
    case 'resolved':
      return { status: 'resolved', data: action.payload, error: undefined }
    case 'rejected':
      return { status: 'rejected', data: undefined, error: action.payload }
    default:
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export function useFetch<TData>(
  url: string,
  options?: UseFetchOptions,
): UseFetchResponse<TData> {
  const hasFetched = useRef(false)

  const [state, dispatch] = useReducer(fetchReducer<TData>, {
    data: undefined,
    error: undefined,
    status: 'idle',
  })

  const runFetch = useCallback(async (): Promise<TData | undefined> => {
    const request = new Request(url, {
      headers: {
        Accept: 'application/json',
        ...options?.headers,
      },
    })

    dispatch({ type: 'pending' })

    try {
      const res = await fetch(request)
      const contentType = res.headers.get('Content-Type')

      if (contentType !== 'application/json') {
        dispatch({
          type: 'rejected',
          payload: `Unsupported content-type of ${contentType}!`,
        })
        return
      }

      const data = await res.json()

      dispatch({ type: 'resolved', payload: data })

      return data
    } catch (err) {
      const errorMessage: string =
        err instanceof Error ? err.message : String(err)

      dispatch({
        type: 'rejected',
        payload: errorMessage,
      })
    }
  }, [options?.headers, url])

  useEffect(() => {
    // Early exit conditions
    if (!options?.fetchOnMount || state.status !== 'idle' || hasFetched.current)
      return

    hasFetched.current = true

    runFetch()
  }, [options?.fetchOnMount, runFetch, state.status, url])

  return {
    ...state,
    runFetch,
  }
}
