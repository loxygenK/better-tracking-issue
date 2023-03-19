import { DiffList, dedupDiff, getDiff } from "./diff";
import { safeParseInt } from "./util";

export const DEFAULT_TRACKING_ISSUE_REGEX = /-\s+\[[\sxX]\]\s+#(?<id>\d+)/;

export function getTrackingIssueDiff(
  before: string,
  now: string,
  trackingIssueRegex: RegExp
): DiffList<number> {
  const trackingBefore = [
    ...new Set(parseTrackingIssue(before, trackingIssueRegex)),
  ];
  const trackingNow = [...new Set(parseTrackingIssue(now, trackingIssueRegex))];

  return dedupDiff(getDiff(trackingBefore, trackingNow));
}

export function parseTrackingIssue(
  body: string,
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
