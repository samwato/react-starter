import type { RouteParams } from '../types'

export function getParams(
  routePath: string,
  location: string,
  initialParams: RouteParams = {},
): RouteParams {
  const routePathParts = routePath.split('/').slice(1)
  const locationParts = location.split('/').slice(1)

  return routePathParts.reduce((params, routePathPart, index) => {
    if (
      !!routePathPart &&
      routePathPart[0] === ':' &&
      locationParts[index] &&
      routePathPart.slice(1)
    ) {
      params[routePathPart.slice(1)] = locationParts[index]
    }
    return params
  }, initialParams)
}
