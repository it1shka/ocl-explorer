export const toTitle = (original: string) => {
  const [first, ...tail] = [...original]
  const firstUpper = first.toUpperCase()
  const tailLower = tail.join('').toLowerCase()
  return firstUpper + tailLower
}
