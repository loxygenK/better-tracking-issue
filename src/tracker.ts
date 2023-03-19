import { safeParseInt } from "./util";

export const DEFAULT_TRACKING_ISSUE_REGEX = /-\s+\[[\sxX]\]\s+#(?<id>\d+)/;

export function parseTrackingIssue(
  body: Array<string>,
  trackingIssueRegex: RegExp
): Array<number> {
  const trackings: Array<number> = [];

  for (const line of body.split("\n")) {
    const matches = line.trim().match(trackingIssueRegex)?.groups;
    if (matches === undefined) {
      continue;
    }

    if (!Object.keys(matches).includes("id")) {
      continue;
    }

    const id = safeParseInt(matches.id);
    if (id === undefined) {
      continue;
    }

    trackings.push(id);
  }

  return trackings;
}
