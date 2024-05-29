export const choice = <T>(array: T[]) => {
  if (array.length <= 0) {
    throw new Error('Array is empty')
  }
  const index = ~~(Math.random() * array.length)
  return array[index]
}
