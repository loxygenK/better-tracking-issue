export function ifUndefined<T, U>(
  value: T | undefined,
  fn: (value: T) => U
): U | undefined {
  return value === undefined ? undefined : fn(value);
}
