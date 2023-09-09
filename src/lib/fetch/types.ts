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
      type: 'idle'
    }
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

export type FetchReducer<TData> = (
  state: FetchState<TData>,
  action: FetchAction<TData>,
) => FetchState<TData>
