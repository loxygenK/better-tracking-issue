import * as github from "@actions/github";
import { getSubjectIssue } from "./github/issue";
import { Config } from "./config";
import { convertInputToConfig } from "./github/input";

async function main(): Promise<void> {
  const config = convertInputToConfig();
  const octokit = github.getOctokit(config.token);

  const subjectIssue = await getSubjectIssue(github.context, octokit);

  subjectIssue.forEach((issue) => {
    console.dir(issue);
  });
}

main();
