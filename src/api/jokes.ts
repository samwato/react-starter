import { useFetch } from '@libfetch'

interface JokeData {
  id: string
  joke: string
  status: number
}

const JOKES_URL = 'https://icanhazdadjoke.com/'

export const useJokes = () =>
  useFetch<JokeData>(JOKES_URL, {
    headers: {
      Accept: 'application/json',
    },
  })
