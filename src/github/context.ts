import { Context } from "./types";

import {
  IssuesOpenedEvent,
  IssuesEditedEvent,
  IssuesReopenedEvent,
} from "@octokit/webhooks-definitions/schema";

type IssueEvent = IssuesOpenedEvent | IssuesEditedEvent | IssuesReopenedEvent;
const matchActionType: Array<IssueEvent["action"]> = [
  "opened",
  "edited",
  "reopened",
];

export function getIssueEvent(context: Context): IssueEvent | undefined {
  if (context.eventName !== "issue") {
    return;
  }

  const payload = context.payload as IssueEvent;
  if (!matchActionType.includes(payload.action)) {
    return;
  }

  return payload;
}
