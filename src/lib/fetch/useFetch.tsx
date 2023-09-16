import { useEffect, useReducer, useRef } from 'react'
import type { FetchAction, FetchState } from './types'

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
  init?: HeadersInit,
): FetchState<TData> {
  const hasFetched = useRef(false)

  const [state, dispatch] = useReducer(fetchReducer<TData>, {
    data: undefined,
    error: undefined,
    status: 'idle',
  })

  useEffect(() => {
    // Early exit conditions
    if (state.status !== 'idle' || hasFetched.current) return

    hasFetched.current = true

    dispatch({ type: 'pending' })

    const request = new Request(url, {
      headers: {
        Accept: 'application/json',
        ...init,
      },
    })

    fetch(request)
      .then((res) => {
        const contentType = res.headers.get('Content-Type')

        if (contentType !== 'application/json') {
          dispatch({
            type: 'rejected',
            payload: `Unsupported content-type of ${contentType}!`,
          })
        }

        return res.json()
      })
      .then((data) => {
        dispatch({ type: 'resolved', payload: data })
      })
      .catch((err) => {
        dispatch({
          type: 'rejected',
          payload: err.message ?? 'Failed to fetch!',
        })
      })
  }, [init, state.status, url])

  return state
}
