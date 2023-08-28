import * as React from 'react'
import { useNavigate } from '@/lib/router/hooks'
import { useRouter } from '@/lib/router/context'
import { type LinkProps, type RouteProps } from '@/lib/router/types'

export function Link({ to, ...props }: LinkProps) {
  const navigate = useNavigate()

  function handleClick(event: React.MouseEvent) {
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
