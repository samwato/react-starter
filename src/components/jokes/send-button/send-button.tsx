import * as React from 'react'
import sendIcon from './send-icon.svg'
import styles from './send-button.module.css'

export function SendButton({
  ariaLabel,
  onClick,
}: {
  ariaLabel: string
  onClick: () => void
}) {
  return (
    <button
      aria-label={ariaLabel}
      className={styles.button}
      onClick={onClick}
      type="button"
    >
      <img src={sendIcon} alt={ariaLabel} width="35" height="35" />
    </button>
  )
}
