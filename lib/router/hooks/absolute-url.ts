import { resolvePaths } from '../utils/resolve-paths'

export function getAbsoluteUrl(routeLocation: string, path: string): string {
  return path.startsWith('/') ? path : resolvePaths(routeLocation, path)
}
