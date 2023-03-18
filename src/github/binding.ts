import { Issue } from "~/entity";

export type IssueLike = {
  number: number;
  title: string;
  body?: string | null | undefined;
};

export function convertIssue(issue: IssueLike): Issue {
  return {
    id: issue.number,
    title: issue.title,
    body: issue.body ?? "",
  };
}
