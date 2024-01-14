import * as React from 'react'
import { useState } from 'react'
import styles from './jokes.module.css'
import { SendButton } from '@/components/jokes/send-button'
import { TextMessage } from '@/components/jokes/text-message'
import { TextMessageField } from '@/components/jokes/text-message-field'
import { useJokes } from '@/api/jokes'

interface ChatMessage {
  id: string
  message: string
  sender: 'user' | 'bot'
}

export function Jokes() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const sentMessageCount = chatMessages.filter(
    ({ sender }) => sender === 'user',
  ).length
  const waitingForBot = chatMessages[0]?.sender === 'user'

  const { status, runFetch } = useJokes()

  async function handleSendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const sendMessage = new FormData(event.currentTarget).get('message')

    if (sendMessage && typeof sendMessage === 'string') {
      setChatMessages((messages) => [
        {
          id: `${messages.length}:${sendMessage}`,
          message: sendMessage,
          sender: 'user',
        },
        ...messages,
      ])
    }

    const resData = await runFetch()

    if (resData) {
      setChatMessages((messages) => [
        {
          id: `${messages.length}:${resData.joke}`,
          message: resData.joke,
          sender: 'bot',
        },
        ...messages,
      ])
    }
  }

  return (
    <div className={styles.jokes_container}>
      <div className={styles.chat_container}>
        {chatMessages.map((chatMessage) => (
          <TextMessage key={chatMessage.id} {...chatMessage} />
        ))}
      </div>
      <form className={styles.send_container} onSubmit={handleSendMessage}>
        <TextMessageField
          waitingForBot={waitingForBot}
          sentMessageCount={sentMessageCount}
        />
        <SendButton
          ariaLabel="Fetch A Joke"
          isSubmitting={status === 'pending'}
        />
      </form>
    </div>
  )
}
