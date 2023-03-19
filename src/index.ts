import * as github from "@actions/github";
import { getSubjectIssue, retrieveIssue } from "./github/issue";
import { logInfo } from "./log";
import { promptTexts } from "./promptTexts";
import { DEFAULT_TRACKING_ISSUE_REGEX, getTrackingIssueDiff } from "./tracker";
import { convertInputToConfig } from "./github/input";

async function main(): Promise<void> {
  const config = convertInputToConfig();
  const octokit = github.getOctokit(config.token);

  const subjectIssue = await getSubjectIssue(github.context);
  if (subjectIssue === undefined) {
    logInfo(promptTexts.noIssue);
    return;
  }

  const trackingIssueDiff = getTrackingIssueDiff(
    subjectIssue.before ?? "",
    subjectIssue.issue.body,
    DEFAULT_TRACKING_ISSUE_REGEX
  );

  console.log("=== Added ===");
  await Promise.all(
    trackingIssueDiff.added.map(async (id) => {
      const issue = await retrieveIssue(github.context, octokit, id);

      console.dir(issue);
    })
  );

  console.log("\n\n=== Removed ===");
  await Promise.all(
    trackingIssueDiff.removed.map(async (id) => {
      const issue = await retrieveIssue(github.context, octokit, id);

      console.dir(issue);
    })
  );
}

(async () => {
  try {
    await main();
  } catch (e) {
    console.error(e);
  }
})();
