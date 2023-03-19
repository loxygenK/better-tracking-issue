const NUMERIC = /-?[0-9]+/;

export function safeParseInt(raw: string): number | undefined {
  if (!NUMERIC.test(raw)) {
    return undefined;
  }

  const maybeNumeric = parseInt(raw);
  if (isNaN(maybeNumeric)) {
    return undefined;
  }

  return maybeNumeric;
}

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

export function filterOutUndef<T>(array: Array<T | undefined>): Array<T> {
  return array.filter((elem) => elem !== undefined) as Array<T>;
}

export type PartialUnless<T, K extends keyof T> = Pick<T, K> &
  Partial<Pick<T, Exclude<keyof T, K>>>;
