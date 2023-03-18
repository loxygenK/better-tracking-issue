import * as github from "@actions/github";
import { getSubjectIssue } from "./github/issue";
import { convertInputToConfig } from "./github/input";
import { DEFAULT_TRACKING_ISSUE_REGEX, parseTrackingIssue } from "./tracker";

async function main(): Promise<void> {
  const config = convertInputToConfig();
  const octokit = github.getOctokit(config.token);

  const subjectIssue = await getSubjectIssue(github.context, octokit);

  subjectIssue.forEach((issue) => {
    const tracking = parseTrackingIssue(
      issue.body,
      DEFAULT_TRACKING_ISSUE_REGEX
    );
    console.dir(issue);
    console.log("Tracking:", tracking);
  });
}

(async () => {
  try {
    await main();
  } catch (e) {
    console.error(e);
  }
})();
