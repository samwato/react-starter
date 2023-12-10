export function isPartialMatch(routePath: string, location: string): boolean {
  if (routePath === '/') return true

  const routePathParts = routePath.split('/').slice(1)
  const locationParts = location.split('/').slice(1)

  return routePathParts.every((routePathPart, index) => {
    if (routePathPart[0] !== ':') {
      return routePathPart === locationParts[index]
    }
    return !!locationParts[index]
  })
}

export function isExactMatch(routePath: string, location: string): boolean {
  const routePathParts = routePath.split('/').slice(1)
  const locationParts = location.split('/').slice(1)

  if (routePathParts.length !== locationParts.length) return false

  return routePathParts.every((routePathPart, index) => {
    if (routePathPart[0] !== ':') {
      return routePathPart === locationParts[index]
    }
    return true
  })
}
