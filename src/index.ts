import * as github from "@actions/github";
import { getSubjectIssue } from "./github/issue";

async function main(): Promise<void> {
  const octokit = github.getOctokit(process.env["GITHUB_TOKEN"] ?? "");

  const subjectIssue = await getSubjectIssue(github.context, octokit);

  subjectIssue.forEach((issue) => {
    console.dir(issue);
  });
}

main();
