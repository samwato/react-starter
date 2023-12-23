import { getSegmentedPaths } from './get-segmented-paths'

export function isPartialMatch(routePath: string, location: string): boolean {
  if (routePath === '/') return true

  const routePathSegments = getSegmentedPaths(routePath)
  const locationSegments = getSegmentedPaths(location)

  return routePathSegments.every((routePathSegment, index) => {
    if (routePathSegment[0] !== ':') {
      return routePathSegment === locationSegments[index]
    }
    return !!locationSegments[index]
  })
}

export function isExactMatch(routePath: string, location: string): boolean {
  const routePathSegments = getSegmentedPaths(routePath)
  const locationSegments = getSegmentedPaths(location)

  if (routePathSegments.length !== locationSegments.length) return false

  return routePathSegments.every((routePathSegment, index) => {
    if (routePathSegment[0] !== ':') {
      return routePathSegment === locationSegments[index]
    }
    return true
  })
}
