export function resolvePaths(...paths: string[]): string {
  if (paths.length < 1) {
    throw new Error('resolvePaths must have at least 1 path!')
  }

  return paths.reduce((resolvedPath, path) => {
    const normalizedPaths = path.split('/').slice(1)

    normalizedPaths.forEach((normalizedPath) => {
      if (normalizedPath) {
        if (resolvedPath !== '/') resolvedPath += '/'
        resolvedPath += normalizedPath
      }
    })
    return resolvedPath
  }, '/')
}
