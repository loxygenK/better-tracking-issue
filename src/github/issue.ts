import { Issue } from "~/entity";
import { Context, OctoKit } from "./types";
import { getIssueEvent } from "./context";
import { GitHubRequestError } from "~/exception";
import { convertIssue } from "./binding";

export async function getSubjectIssue(
  context: Context,
  octokit: OctoKit
): Promise<Array<Issue>> {
  const issuePayload = getIssueEvent(context);
  if (issuePayload === undefined) {
    return getLatestIssue(context, octokit);
  }

  return [convertIssue(issuePayload.issue)];
}

export async function getLatestIssue(
  context: Context,
  octokit: OctoKit
): Promise<Array<Issue>> {
  // TODO: Make this configurable
  const issues = await octokit.rest.issues.listForRepo({
    owner: context.repo.owner,
    repo: context.repo.repo,
    sort: "updated",
    per_page: 100,
  });

  if (issues.status < 200 || issues.status >= 400) {
    throw new GitHubRequestError(
      "Failed to retrieve issues list (tried since the action was not invoked via issue events)"
    );
  }

  return issues.data.map(convertIssue);
}
