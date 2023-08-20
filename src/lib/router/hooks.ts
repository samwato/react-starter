import { useRouter, setRouteLocation } from './context'

export function useNavigate() {
  const [, dispatch] = useRouter()

  return (path: string) => {
    if (window.location.pathname !== path) {
      setRouteLocation(dispatch, path)
      window.history.pushState({}, '', path)
    }
  }
}
