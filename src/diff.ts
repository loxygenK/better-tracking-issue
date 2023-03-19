import * as Diff from "diff";

export type DiffList<T> = {
  added: Array<T>;
  removed: Array<T>;
};

export function getDiff<T>(
  oldArray: Array<T>,
  newArray: Array<T>
): DiffList<T> {
  const diffs = Diff.diffArrays(oldArray, newArray);

  const added = diffs
    .filter((diff) => diff.added)
    .flatMap((diff) => diff.value);

  const removed = diffs
    .filter((diff) => diff.removed)
    .flatMap((diff) => diff.value);

  return { added, removed };
}

export function getStringDiff(
  oldStr: string,
  newStr: string
): DiffList<string> {
  const diffs = Diff.diffLines(oldStr, newStr);
  const addedLines = diffs
    .filter((diff) => diff.added)
    .flatMap((diff) => diff.value.trimEnd().split("\n"));

  const removedLines = diffs
    .filter((diff) => diff.removed)
    .flatMap((diff) => diff.value.trimEnd().split("\n"));

  return {
    added: addedLines,
    removed: removedLines,
  };
}

export function dedupDiff<T>(original: DiffList<T>): DiffList<T> {
  const added = new Set(original.added);
  const removed = new Set(original.removed);

  const modified = new Set(
    [...added].filter((issueId) => original.removed.includes(issueId))
  );

  return {
    added: [...added].filter((diff) => !modified.has(diff)),
    removed: [...removed].filter((diff) => !modified.has(diff)),
  };
}
