import { dbg } from "~/log";
import { Context } from "./types";

import { IssuesEvent } from "@octokit/webhooks-definitions/schema";

export function getIssueEvent(context: Context): IssuesEvent | undefined {
  dbg(`event name is ${context.eventName}`);
  if (context.eventName !== "issue") {
    return;
  }

  return context.payload as IssuesEvent;
}
