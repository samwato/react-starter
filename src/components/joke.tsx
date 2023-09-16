import * as React from 'react'
import { useState } from 'react'
import { useFetch } from '@/lib/fetch'

interface JokeData {
  id: string
  joke: string
  status: number
}

export function Joke() {
  const [autoFetch, setAutoFetch] = useState<boolean>(false)

  const { data, error, status, runFetch } = useFetch<JokeData>(
    'https://icanhazdadjoke.com/',
    {
      headers: {
        Accept: 'application/json',
      },
      fetchOnMount: autoFetch,
    },
  )

  let content = null

  switch (status) {
    case 'idle':
      content = null
      break
    case 'pending':
      content = <p>Loading ...</p>
      break
    case 'rejected':
      content = <p>{error}</p>
      break
    case 'resolved':
      content = <p>{data.joke}</p>
      break
  }

  return (
    <div>
      <label>
        Auto Fetch
        <input
          type="checkbox"
          onChange={(event) => setAutoFetch(event.target.checked)}
        />
      </label>
      <p>{content}</p>
      <button type="button" onClick={runFetch}>
        New Joke
      </button>
    </div>
  )
}
