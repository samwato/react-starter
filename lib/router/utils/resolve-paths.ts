import { getSegmentedPaths } from './get-segmented-paths'

export function resolvePaths(...paths: string[]): string {
  if (paths.length < 1) {
    throw new Error('resolvePaths must have at least 1 path!')
  }

  return paths.reduce((resolvedPath, path) => {
    const segmentedPaths = getSegmentedPaths(path)

    segmentedPaths.forEach((segmentedPath) => {
      if (resolvedPath !== '/') resolvedPath += '/'
      resolvedPath += segmentedPath
    })
    return resolvedPath
  }, '/')
}
