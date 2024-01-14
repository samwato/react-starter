import { useRouter, setRouteLocation } from '../context/router'
import { getAbsoluteUrl } from '../hooks/absolute-url'
import { useRoute } from '../context/route'

export function useNavigate() {
  const [{ location: routerLocation }, dispatch] = useRouter()
  const { location: routeLocation } = useRoute()

  return (path: string) => {
    // Resolve to absolute path
    const url = getAbsoluteUrl(routeLocation, path)

    // Already on location
    if (url === routerLocation) return

    setRouteLocation(dispatch, url)
    window.history.pushState({}, '', url)
  }
}
