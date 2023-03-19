import * as github from "@actions/github";
import { getSubjectIssue } from "./github/issue";
import { logInfo } from "./log";
import { promptTexts } from "./promptTexts";
import { DEFAULT_TRACKING_ISSUE_REGEX, getTrackingIssueDiff } from "./tracker";

async function main(): Promise<void> {
  // const config = convertInputToConfig();
  // const octokit = github.getOctokit(config.token);

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

  console.dir(subjectIssue);
  console.dir(trackingIssueDiff);
}

(async () => {
  try {
    await main();
  } catch (e) {
    console.error(e);
  }
})();
