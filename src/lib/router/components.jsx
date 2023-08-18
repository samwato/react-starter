import React, { useLayoutEffect } from 'react'
import { useNavigate } from './hooks'
import { useRouter, registerRoute } from './context'

export function Link({ to, ...props }) {
  const navigate = useNavigate()

  function handleClick(event) {
    event.preventDefault()
    navigate(to)
  }

  return <a href={to} onClick={handleClick} {...props} />
}

export function Route({ component, fallback, path }) {
  const [{ location, routes }, dispatch] = useRouter()

  useLayoutEffect(() => {
    registerRoute(dispatch, path)
  }, [dispatch, path])

  if (location === path) {
    return component
  } else if (!routes.includes(location) && fallback) {
    return component
  } else {
    return null
  }
}
