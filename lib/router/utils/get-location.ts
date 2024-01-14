import { getSegmentedPaths } from './get-segmented-paths'

export function getLocation(routePath: string, routerLocation: string): string {
  const routePathSegments = getSegmentedPaths(routePath)
  const locationSegments = getSegmentedPaths(routerLocation)

  return routePathSegments.reduce((url, _, index) => {
    return (url += `/${locationSegments[index]}`)
  }, '/')
}
