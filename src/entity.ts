export type Issue = {
  id: number;
  title: string;
  body: string;
};

export type ChangedIssue = {
  issue: Issue;
  before: string | undefined;
};

export type AnalyzedIssue = {
  issue: Issue;
  tracking: Array<number>;
  trackedBy: number | "not-tracked" | "unknown";
};
