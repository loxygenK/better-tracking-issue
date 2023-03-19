import { Config } from "./config";
import { Issue } from "./entity";

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
