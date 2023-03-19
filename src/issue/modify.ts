import { Config } from "~/config";
import { Issue } from "~/entity";

const ID_TAG = /<<\s*id\s*>>/i;

const MODIFIED_MARKER =
  "<!-- *** Modified by better-tracking-issue (don't remove this comment, it's a marker for me!) *** -->";

export function addTrackTag(
  config: Config,
  issue: Issue,
  trackedBy: number
): Issue {
  const tag = config.tag.replace(ID_TAG, trackedBy.toString());

  return {
    ...issue,
    title: `${tag}${issue.title}`,
    body: `${issue.body}\n${MODIFIED_MARKER}`,
  };
}

export function removeTrackTag(
  config: Config,
  issue: Issue,
  trackedBy: number
): Issue {
  const tag = config.tag.replace(ID_TAG, trackedBy.toString());

  // XXX: Kinda danger since this is not shallow copying
  const newIssue = { ...issue };
  if (issue.title.indexOf(tag) === 0) {
    newIssue.title = issue.title.replace(tag, "");
  }

  if (issue.body.includes(MODIFIED_MARKER)) {
    const markerPosition = issue.body.lastIndexOf(MODIFIED_MARKER);
    newIssue.body = newIssue.body.slice(0, markerPosition).trimEnd();
  }

  return newIssue;
}
