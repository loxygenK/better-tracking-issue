import { Issue } from "~/entity";

import { Issue as PayloadIssue } from "@octokit/webhooks-definitions/schema";

export function convertIssue(issue: PayloadIssue): Issue {
  return {
    id: issue.id,
    title: issue.title,
    body: issue.body ?? "",
  };
}
