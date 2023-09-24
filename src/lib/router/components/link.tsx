import * as React from 'react'
import { useNavigate } from '../hooks/navigate'
import { type LinkProps } from '../types'

export function Link({ to, children, ...props }: LinkProps) {
  const navigate = useNavigate()

  function handleClick(event: React.MouseEvent) {
    event.preventDefault()
    navigate(to)
  }

  return (
    <a {...props} href={to} onClick={handleClick}>
      {children}
    </a>
  )
}