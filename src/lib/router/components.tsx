import React, { MouseEvent } from 'react'
import { useNavigate } from './hooks'
import { useRouter } from './context'
import { type LinkProps, type RouteProps } from './types'

export function Link({ to, ...props }: LinkProps) {
  const navigate = useNavigate()

  function handleClick(event: MouseEvent) {
    event.preventDefault()
    navigate(to)
  }

  return <a {...props} href={to} onClick={handleClick} />
}

export function Route({ component, path }: RouteProps) {
  const [{ location }] = useRouter()

  return location === path ? component : null
}

Route.prototype.isRouteComponent = true
