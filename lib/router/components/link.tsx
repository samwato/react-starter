import * as React from 'react'
import { useNavigate } from '../hooks/navigate'
import type { LinkProps } from '../types'
import { useAbsoluteUrl } from '../hooks/absolute-url'

export const Link = React.forwardRef(function Link(
  { to, children, ...props }: LinkProps,
  ref: React.ForwardedRef<HTMLAnchorElement | null>,
) {
  const navigate = useNavigate()

  const href = useAbsoluteUrl(to)

  function handleClick(event: React.MouseEvent) {
    event.preventDefault()
    navigate(to)
  }

  return (
    <a ref={ref} {...props} href={href} onClick={handleClick}>
      {children}
    </a>
  )
})
