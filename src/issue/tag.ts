import { filterOutUndef } from "~/util/filterOutUndef";
import { escapeRegex } from "~/util/regex";
import { safeParseInt } from "~/util/safeParseInt";

const ID_TAG = /<<\s*id\s*>>/i;
const TAG_ID_MATCH = /(?<list>(#?\d+(,\s*)?)+)/;

export function createTag(tagTemplate: string, trackedBy: Array<number>) {
  return tagTemplate.replace(ID_TAG, "#" + trackedBy.join(", #"));
}

export function setTag(
  tag: string,
  tagTemplate: string,
  trackedBy: Array<number>
): string {
  let newTag = tag;

  const tagSegments = tagTemplate.split(ID_TAG).map(escapeRegex);
  const tagRegex = new RegExp(tagSegments.join(TAG_ID_MATCH.source));

  const existingTag = tag.match(tagRegex);

  if (existingTag !== null && existingTag.index !== undefined) {
    const length = existingTag[0].length;
    newTag = newTag.slice(existingTag.index + length);
  }

  if (trackedBy.length !== 0) {
    newTag = createTag(tagTemplate, trackedBy) + newTag;
  }

  return newTag;
}

export function parseTag(
  tag: string,
  tagTemplate: string
): Array<number> | undefined {
  const tagSegments = tagTemplate.split(ID_TAG).map(escapeRegex);
  const tagRegex = new RegExp(tagSegments.join(TAG_ID_MATCH.source));

  const extracted = tag.match(tagRegex)?.groups?.list;
  if (extracted === undefined) {
    return undefined;
  }

  return filterOutUndef(
    extracted.split(",").map((ids) => safeParseInt(ids.trim().replace("#", "")))
  );
}
