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
