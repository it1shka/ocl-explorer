export const toTitle = (original: string) => {
  const [first, ...tail] = [...original]
  const firstUpper = first.toUpperCase()
  const tailLower = tail.join('').toLowerCase()
  return firstUpper + tailLower
}

export const getFileExtension = (filename: string) => {
  const parts = filename.split('.')
  if (parts.length < 2) return ''
  return parts.pop() ?? ''
}

export const getMessage = (error: unknown) => {
  return error instanceof Error
    ? error.message
    : String(error)
}
