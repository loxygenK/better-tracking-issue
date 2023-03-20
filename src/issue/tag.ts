import { filterOutUndef } from "~/util/filterOutUndef";
import { safeParseInt } from "~/util/safeParseInt";

const TAG_ID_MATCH = /\.*? (?<list>(#?\d+(,\s*)?)+)\]/;

export function createTag(tagPrefix: string, trackedBy: Array<number>) {
  return `[${tagPrefix} #${trackedBy.join(", #")}]`;
}

export function setTag(
  tag: string,
  tagPrefix: string,
  trackedBy: Array<number>
): string {
  let newTag = tag;

  const existingTag = tag.match(TAG_ID_MATCH);

  if (existingTag !== null && existingTag.index !== undefined) {
    const length = existingTag[0].length;
    newTag = newTag.slice(existingTag.index + length);
  }

  if (trackedBy.length !== 0) {
    newTag = createTag(tagPrefix, trackedBy) + newTag;
  }

  return newTag;
}

export function parseTag(tag: string): Array<number> | undefined {
  const extracted = tag.match(TAG_ID_MATCH)?.groups?.list;
  if (extracted === undefined) {
    return undefined;
  }

  return filterOutUndef(
    extracted.split(",").map((ids) => safeParseInt(ids.trim().replace("#", "")))
  );
}
