export function filterOutUndef<T>(array: Array<T | undefined>): Array<T> {
  return array.filter((elem) => elem !== undefined) as Array<T>;
}
