export type TryResult<T, E> =
  | { ok: true; awaited: T }
  | { ok: false; error: E };
export function safelyTryPromise<E>() {
  return async <T>(promise: Promise<T>): Promise<TryResult<T, E>> => {
    try {
      const data = await promise;
      return { ok: true, awaited: data };
    } catch (e) {
      return { ok: false, error: e as E };
    }
  };
}
