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
export async function asyncMapDiff<T, U>(
  diffList: DiffList<T>,
  mapper: (value: T[], type: "added" | "removed") => Promise<U>[]
): Promise<DiffList<U>> {
  const [added, removed] = await Promise.all([
    await Promise.all(mapper(diffList.added, "added")),
    await Promise.all(mapper(diffList.removed, "removed")),
  ]);

  return { added, removed };
}

export function mapDiff<T, U>(
  diffList: DiffList<T>,
  mapper: (value: T[], type: "added" | "removed") => U[]
): DiffList<U> {
  return {
    added: mapper(diffList.added, "added"),
    removed: mapper(diffList.removed, "removed"),
  };
}

export async function traverseDiffListPromise<T>(
  diffList: DiffList<Promise<T>>
): Promise<DiffList<T>> {
  const [added, removed] = await Promise.all([
    await Promise.all(diffList.added),
    await Promise.all(diffList.removed),
  ]);
  return { added, removed };
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
