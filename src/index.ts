import * as github from "@actions/github";
import { getSubjectIssue, modifyIssue, retrieveIssue } from "./github/issue";
import { logInfo } from "./log";
import { promptTexts } from "./promptTexts";
import {
  DEFAULT_TRACKING_ISSUE_REGEX,
  getTrackingIssueDiff,
} from "./issue/tracker";
import { convertInputToConfig } from "./github/input";
import { asyncMapDiff, mapDiff } from "./diff";
import { filterOutUndef } from "./util/filterOutUndef";
import { setTag } from "./issue/tag";
import { parseAnnotationText, setAnnotationText } from "./issue/annotation";

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

  const resolvedIssue = mapDiff(
    await asyncMapDiff(trackedIssueDiff, (ids) =>
      ids.map((id) => retrieveIssue(github.context, octokit, id))
    ),
    filterOutUndef
  );

  const modifiedIssues = mapDiff(resolvedIssue, (issues, diffType) => {
    return issues.map((issue) => {
      const newIssue = { ...issue };
      let trackingIssues = parseAnnotationText(issue.title) ?? [];

      if (diffType === "added") {
        trackingIssues.push(subjectIssue.issue.id);
      } else {
        trackingIssues = trackingIssues.filter(
          (id) => id === subjectIssue.issue.id
        );
      }

      newIssue.title = setTag(issue.title, config.tag, trackingIssues);
      newIssue.body = setAnnotationText(issue.body, trackingIssues);

      return newIssue;
    });
  });

  await asyncMapDiff(modifiedIssues, (issues) => {
    return issues.map(
      async (issue) => await modifyIssue(github.context, octokit, issue)
    );
  });
}

(async () => {
  try {
    await main();
  } catch (e) {
    console.error(e);
  }
})();
