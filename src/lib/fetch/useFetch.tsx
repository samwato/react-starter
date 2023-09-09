import { useEffect, useReducer } from 'react'
import { type FetchReducer, FetchState } from '@/lib/fetch/types'

/*
  Features TODO
  - Sort out loop in useEffect, also allow props to be object without looping in useEffect
  - Add caching from key
  - Multiple mounts does only one network request
 */

export function useFetch<TData>(url: string, init): FetchState<TData> {
  const [state, dispatch] = useReducer<FetchReducer<TData>>(
    (_, action) => {
      switch (action.type) {
        case 'pending': {
          return { status: 'pending', data: undefined, error: undefined }
        }
        case 'resolved': {
          return { status: 'resolved', data: action.payload, error: undefined }
        }
        case 'rejected': {
          return { status: 'rejected', data: undefined, error: action.payload }
        }
        default: {
          throw new Error(`Unhandled action type: ${action.type}`)
        }
      }
    },
    {
      data: undefined,
      error: undefined,
      status: 'idle',
    },
  )

  useEffect(() => {
    dispatch({ type: 'pending' })

    // if (state.status === 'pending') return

    const request = new Request(url, {
      headers: {
        Accept: 'application/json',
        ...init,
      },
    })
    const promise = fetch(request)
    promise
      .then((res) => {
        if (request.headers.get('Accept') === 'application/json') {
          return res.json()
        } else {
          // TODO make better
          return res.text()
        }
      })
      .then((data) => {
        console.log('data')
        dispatch({ type: 'resolved', payload: data })
      })
      .catch((err) => {
        console.log(err)
        dispatch({ type: 'rejected', payload: err.message })
      })
  }, [init, url])

  return state
}
