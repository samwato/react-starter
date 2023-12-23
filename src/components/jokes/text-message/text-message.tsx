import * as React from 'react'
import styles from './text-message.module.css'
import { cls } from '@/utils/styles'

export function TextMessage({
  message,
  sender,
}: {
  message: string
  sender: 'user' | 'bot'
}) {
  return (
    <div className={cls(styles.container, styles[sender])}>
      <span>{message}</span>
    </div>
  )
}
