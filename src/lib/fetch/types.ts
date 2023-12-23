import * as React from 'react'

export type FetchState<TData> =
  | {
      data: undefined
      error: undefined
      status: 'idle'
    }
  | {
      data: undefined
      error: undefined
      status: 'pending'
    }
  | {
      data: undefined
      error: string
      status: 'rejected'
    }
  | {
      data: TData
      error: undefined
      status: 'resolved'
    }

export type FetchAction<TData> =
  | {
      type: 'pending'
    }
  | {
      type: 'rejected'
      payload: string
    }
  | {
      type: 'resolved'
      payload: TData
    }

export type FetchDispatch<TData> = React.Dispatch<FetchAction<TData>>

export type UseFetchResponse<TData> = FetchState<TData> & {
  runFetch: () => Promise<TData | undefined>
}

export type UseFetchOptions = {
  headers?: HeadersInit
  fetchOnMount?: boolean
}
