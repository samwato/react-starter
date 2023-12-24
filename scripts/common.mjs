export function getPublicEnvs() {
  return Object.entries(process.env).reduce((acc, [key, value]) => {
    if (key.startsWith('PUBLIC_')) {
      acc[key] = isNaN(parseInt(value)) ? `"${value}"` : value
    }
    return acc
  }, {})
}
