import { ChangedIssue, Issue } from "~/entity";
import { Context, OctoKit } from "./types";
import { getIssueEvent } from "./context";
import { convertIssue } from "./binding";
import { safelyTryPromise } from "~/util/safelyTryPromise";
import { PartialUnless } from "~/types";

import { RequestError } from "@octokit/types";

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

export async function retrieveIssue(
  context: Context,
  octokit: OctoKit,
  id: number
): Promise<Issue | undefined> {
  const issue = await safelyTryPromise<RequestError>()(
    octokit.rest.issues.get({
      ...context.repo,
      issue_number: id,
    })
  );

  if (!issue.ok) {
    if (issue.error.status === 404) {
      return undefined;
    } else {
      throw issue.error;
    }
  }

  return convertIssue(issue.awaited.data);
}

export async function modifyIssue(
  context: Context,
  octokit: OctoKit,
  issue: PartialUnless<Issue, "id">
) {
  await octokit.rest.issues.update({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: issue.id,
    title: issue.title,
    body: issue.body,
  });
}
