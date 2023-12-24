export function getSegmentedPaths(path: string): string[] {
  return path.split('/').filter((segmentedPath) => segmentedPath !== '')
}
