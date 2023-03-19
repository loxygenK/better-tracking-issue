export type PartialUnless<T, K extends keyof T> = Pick<T, K> &
  Partial<Pick<T, Exclude<keyof T, K>>>;
