import { ChangedIssue } from "~/entity";
import { Context } from "./types";
import { getIssueEvent } from "./context";
import { convertIssue } from "./binding";

export async function getSubjectIssue(
  context: Context
): Promise<ChangedIssue | undefined> {
  const issuePayload = getIssueEvent(context);
  if (issuePayload === undefined) {
    return undefined;
  }

  const issue = convertIssue(issuePayload.issue);

  if (issuePayload.action === "opened") {
    return { issue, before: undefined };
  }

  if (issuePayload.action === "edited") {
    const before = issuePayload.changes.body?.from;
    if (before === undefined) {
      return undefined;
    }

    return { issue, before };
  }

  return undefined;
}
