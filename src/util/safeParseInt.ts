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
