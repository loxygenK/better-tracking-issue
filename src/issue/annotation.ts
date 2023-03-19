import { filterOutUndef } from "~/util/filterOutUndef";
import { safeParseInt } from "~/util/safeParseInt";

const TAG_ID_MATCH =
  /<sub>This issue is tracked by (?<list>(#?\d+(\s*\/\s*)?)+)<\/sub>/;

export function createAnnotation(issues: Array<number>): string {
  return `<sub>This issue is tracked by #${issues.join(" / #")}</sub>`;
}

export function setAnnotationText(
  body: string,
  trackedBy: Array<number>
): string {
  let newBody = body;
  const existingAnnotation = body.match(TAG_ID_MATCH);
  if (existingAnnotation !== null && existingAnnotation.index !== undefined) {
    newBody = newBody.slice(0, existingAnnotation.index).trimEnd();
  }

  if (trackedBy.length !== 0) {
    newBody += "\n" + createAnnotation(trackedBy);
  }

  return newBody;
}

export function parseCurrentAnnotation(
  body: string
): Array<number> | undefined {
  const extracted = body.match(TAG_ID_MATCH)?.groups?.list;
  if (extracted === undefined) {
    return undefined;
  }

  return filterOutUndef(
    extracted.split(",").map((ids) => safeParseInt(ids.trim().replace("#", "")))
  );
}
