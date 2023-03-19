import * as github from "@actions/github";
import { getSubjectIssue } from "./github/issue";
import { convertInputToConfig } from "./github/input";
import { DEFAULT_TRACKING_ISSUE_REGEX, parseTrackingIssue } from "./tracker";
import { logInfo } from "./log";
import { promptTexts } from "./promptTexts";

async function main(): Promise<void> {
  const config = convertInputToConfig();
  const octokit = github.getOctokit(config.token);

  const subjectIssue = await getSubjectIssue(github.context);

  if (subjectIssue === undefined) {
    logInfo(promptTexts.noIssue);
    return;
  }

  const tracking = parseTrackingIssue(
    subjectIssue?.addedLines,
    DEFAULT_TRACKING_ISSUE_REGEX
  );

  console.dir(subjectIssue);
  console.log("Tracking:", tracking);
}

(async () => {
  try {
    await main();
  } catch (e) {
    console.error(e);
  }
})();
