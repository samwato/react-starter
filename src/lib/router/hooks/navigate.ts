import { useRouter, setRouteLocation, useLocation } from '../context/router'
import { resolvePaths } from '@/lib/router/utils/resolve-paths'

export function useNavigate() {
  const [, dispatch] = useRouter()
  const location = useLocation()

  return (path: string) => {
    if (window.location.pathname === path) return

    const url = path.startsWith('/') ? path : resolvePaths(location, path)
    setRouteLocation(dispatch, url)
    window.history.pushState({}, '', url)
  }
}
