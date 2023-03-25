import { filterOutUndef } from "~/util/filterOutUndef";
import { safeParseInt } from "~/util/safeParseInt";

const NUMBER_TAG_ID_MATCH = /\[.*? (?<list>(#?\d+(,\s*)?)+)\]:\s/;

export function createNumberTag(tagPrefix: string, trackedBy: Array<number>) {
  return `[${tagPrefix} #${trackedBy.join(", #")}]: `;
}

export function setNumberTag(
  currentTitle: string,
  tagPrefix: string,
  trackingIssueIDs: Array<number>
): string {
  let newTitle = currentTitle;

  const existingTag = currentTitle.match(NUMBER_TAG_ID_MATCH);

  if (existingTag !== null && existingTag.index !== undefined) {
    const length = existingTag[0].length;
    newTitle = newTitle.slice(existingTag.index + length);
  }

  if (trackingIssueIDs.length !== 0) {
    newTitle = createNumberTag(tagPrefix, trackingIssueIDs) + newTitle;
  }

  return newTitle;
}

export function parseNumberTag(title: string): Array<number> | undefined {
  const extracted = title.match(NUMBER_TAG_ID_MATCH)?.groups?.list;
  if (extracted === undefined) {
    return undefined;
  }

  return filterOutUndef(
    extracted.split(",").map((ids) => safeParseInt(ids.trim().replace("#", "")))
  );
}
