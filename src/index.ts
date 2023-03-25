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
import { setNumberTag } from "./issue/numberTag";
import { parseAnnotationText, setAnnotationText } from "./issue/annotation";
import { setTitleTag } from "./issue/titleTag";
import { ifUndefined } from "./util/ifUndefined";

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

  const modifiedIssues = await asyncMapDiff(
    resolvedIssue,
    (issues, diffType) => {
      return issues.map(async (issue) => {
        const newIssue = { ...issue };
        let trackingIssues = parseAnnotationText(issue.body) ?? [];

        if (diffType === "added") {
          trackingIssues.push(subjectIssue.issue.id);
        } else {
          trackingIssues = trackingIssues.filter(
            (id) => id !== subjectIssue.issue.id
          );
        }

        const displayedIssueID =
          diffType === "added" ? subjectIssue.issue.id : trackingIssues[0];
        const displayedIssue = await ifUndefined(displayedIssueID, (id) =>
          retrieveIssue(github.context, octokit, id)
        );

        const plainTitle = ifUndefined(displayedIssue?.title, (title) =>
          setNumberTag(
            setTitleTag(title, config.titleTagPrefix, undefined, false),
            config.numberTagPrefix,
            []
          )
        );

        newIssue.title = setNumberTag(
          newIssue.title,
          config.numberTagPrefix,
          trackingIssues
        );
        newIssue.title = setTitleTag(
          newIssue.title,
          config.titleTagPrefix,
          plainTitle,
          trackingIssues.length >= 2
        );
        newIssue.body = setAnnotationText(issue.body, trackingIssues);

        return newIssue;
      });
    }
  );

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
