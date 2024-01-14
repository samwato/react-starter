import type { RouteParams } from '../types'
import { getSegmentedPaths } from './get-segmented-paths'

export function getParams(
  routePath: string,
  routerLocation: string,
  initialParams: RouteParams = {},
): RouteParams {
  const routePathSegments = getSegmentedPaths(routePath)
  const locationSegments = getSegmentedPaths(routerLocation)

  return routePathSegments.reduce((params, routePathSegment, index) => {
    if (
      routePathSegment[0] === ':' &&
      locationSegments[index] &&
      routePathSegment.slice(1)
    ) {
      params[routePathSegment.slice(1)] = locationSegments[index]
    }
    return params
  }, initialParams)
}
