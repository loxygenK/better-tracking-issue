export function isSameArray(left: unknown[], right: unknown[]): boolean {
  if (left.length !== right.length) {
    return false;
  }

  return left.every((leftElem, i) => leftElem === right[i]);
}
