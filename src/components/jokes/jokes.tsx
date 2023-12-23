import * as React from 'react'
import { useState } from 'react'
import { useFetch } from '@/lib/fetch'
import styles from './jokes.module.css'
import { SendButton } from '@/components/jokes/send-button'

interface JokeData {
  id: string
  joke: string
  status: number
}

export function Jokes() {
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
      <SendButton ariaLabel="Retch A Joke" onClick={() => {}} />
      <h3 className={styles.tagline}>Tell me a Joke!</h3>

      <div className={styles.joke}>{content}</div>

      <div className={styles.actionsContainer}>
        <button className={styles.button} type="button" onClick={runFetch}>
          New Joke
        </button>

        <label className={styles.checkbox}>
          Auto Fetch
          <input
            type="checkbox"
            onChange={(event) => setAutoFetch(event.target.checked)}
          />
        </label>
      </div>
    </div>
  )
}
