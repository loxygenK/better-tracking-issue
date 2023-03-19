import * as github from "@actions/github";
import { getSubjectIssue, modifyIssue, retrieveIssue } from "./github/issue";
import { logInfo } from "./log";
import { promptTexts } from "./promptTexts";
import {
  DEFAULT_TRACKING_ISSUE_REGEX,
  getTrackingIssueDiff,
} from "./issue/tracker";
import { convertInputToConfig } from "./github/input";
import { addTrackTag, removeTrackTag } from "./issue/modify";
import { DiffList } from "./diff";
import { Issue } from "./entity";
import { filterOutUndef } from "./util/filterOutUndef";

async function main(): Promise<void> {
  const config = convertInputToConfig();
  const octokit = github.getOctokit(config.token);

  const subjectIssue = await getSubjectIssue(github.context);
  if (subjectIssue === undefined) {
    logInfo(promptTexts.noIssue);
    return;
  }

  const trackedIssueDiff = getTrackingIssueDiff(
    subjectIssue.before ?? "",
    subjectIssue.issue.body,
    DEFAULT_TRACKING_ISSUE_REGEX
  );

  logInfo(`Newly tracked issue(s) are: ${trackedIssueDiff.added.join(", ")}`);
  logInfo(
    `No longer tacked issue(s) are: ${trackedIssueDiff.removed.join(", ")}`
  );

  const resolvedTrackedIssue: DiffList<Issue> = {
    added: filterOutUndef(
      await Promise.all(
        trackedIssueDiff.added.map(
          async (id) => await retrieveIssue(github.context, octokit, id)
        )
      )
    ),
    removed: filterOutUndef(
      await Promise.all(
        trackedIssueDiff.removed.map(
          async (id) => await retrieveIssue(github.context, octokit, id)
        )
      )
    ),
  };

  const modifiedNewlyTrackedIssue = resolvedTrackedIssue.added.map((issue) =>
    addTrackTag(config, issue, subjectIssue.issue.id)
  );
  const modifiedNoLongerTrackedIssue = resolvedTrackedIssue.removed.map(
    (issue) => removeTrackTag(config, issue, subjectIssue.issue.id)
  );

  console.log(modifiedNewlyTrackedIssue);
  console.log(modifiedNoLongerTrackedIssue);

  await Promise.all(
    [...modifiedNewlyTrackedIssue, ...modifiedNoLongerTrackedIssue].map(
      async (issue) => modifyIssue(github.context, octokit, issue)
    )
  );
}

(async () => {
  try {
    await main();
  } catch (e) {
    console.error(e);
  }
})();
