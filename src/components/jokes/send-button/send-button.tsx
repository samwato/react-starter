import * as React from 'react'
import sendIcon from './send-icon.svg'
import styles from './send-button.module.css'

export function SendButton({
  ariaLabel,
  isSubmitting,
}: {
  ariaLabel: string
  isSubmitting?: boolean
}) {
  return (
    <button aria-label={ariaLabel} className={styles.button} type="submit">
      {isSubmitting ? (
        '...'
      ) : (
        <img src={sendIcon} alt={ariaLabel} width="25" height="25" />
      )}
    </button>
  )
}
