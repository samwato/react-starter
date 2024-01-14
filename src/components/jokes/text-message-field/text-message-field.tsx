import * as React from 'react'
import { useMemo } from 'react'
import styles from './text-message-field.module.css'

const firstMessage = 'Tell me a Joke!'

const availableMessages = [
  'Not very funny, how about another?',
  'That was pretty good, haha!',
  'Okay, that was funny',
  "I don't get it, try again",
  'I think I heard that one before',
  'That was a good one!',
]

function getRandomMessage(messages: string[]) {
  return messages[Math.floor(Math.random() * messages.length)]
}

export function TextMessageField({
  sentMessageCount,
  waitingForBot,
}: {
  sentMessageCount: number
  waitingForBot: boolean
}) {
  const message = useMemo(
    () =>
      sentMessageCount === 0
        ? firstMessage
        : waitingForBot
          ? ''
          : getRandomMessage(availableMessages),
    [sentMessageCount, waitingForBot],
  )

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        name="message"
        type="text"
        value={message}
        readOnly
      />
    </div>
  )
}
