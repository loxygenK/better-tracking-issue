import { ChangedIssue, Issue } from "~/entity";
import { Context, OctoKit } from "./types";
import { getIssueEvent } from "./context";
import { GitHubRequestError } from "~/exception";
import { convertIssue } from "./binding";
import Diff = require("diff");

export async function getSubjectIssue(
  context: Context
): Promise<ChangedIssue | undefined> {
  const issuePayload = getIssueEvent(context);
  if (issuePayload === undefined) {
    return undefined;
  }

  const issue = convertIssue(issuePayload.issue);

  if (issuePayload.action === "opened") {
    return {
      issue,
      diff: {
        added: issuePayload.issue.body.split("\n"),
        removed: [],
      },
    };
  }

  if (issuePayload.action === "edited") {
    const from = issuePayload.changes.body?.from;
    const current = issuePayload.issue.body;

    if (from === undefined) {
      return undefined;
    }

    const diffs = Diff.diffLines(from, current);
    const addedLines = diffs
      .filter((diff) => diff.added)
      .map((diff) => diff.value);

    const removedLines = diffs
      .filter((diff) => diff.removed)
      .map((diff) => diff.value);

    return {
      issue,
      diff: {
        added: addedLines,
        removed: removedLines,
      },
    };
  }

  return undefined;
}
