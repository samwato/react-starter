import * as React from 'react'
import { useFetch } from '@/lib/fetch'

interface JokeData {
  id: string
  joke: string
  status: number
}

export function Jokes() {
  const { data, error, status } = useFetch<JokeData>(
    'https://icanhazdadjoke.com',
  )

  console.log(data, error, status)

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

  return <div>{content}</div>
}
