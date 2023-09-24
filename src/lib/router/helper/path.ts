export function normalizePath(path: string): string {
  if (path === '/') return path

  let normalizedPath = path
  if (!normalizedPath.startsWith('/')) normalizedPath = '/' + normalizedPath
  if (normalizedPath.endsWith('/')) normalizedPath = normalizedPath.substring(0, normalizedPath.length - 1)
  normalizedPath = normalizedPath.replace('//', '/')

  return normalizedPath
}