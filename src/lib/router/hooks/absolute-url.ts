import { useLocation } from '../context/router'
import { resolvePaths } from '../utils/resolve-paths'

export function useAbsoluteUrl(path: string): string {
  const location = useLocation()

  return resolvePaths(location, path)
}
