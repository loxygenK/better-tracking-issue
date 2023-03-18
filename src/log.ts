import core from "@actions/core";

export const IS_IN_CI = process.env["CI"] === "true";

export function logInfo(log: string) {
  if (IS_IN_CI) {
    core.info(log);
  } else {
    console.log(`[info] ${log}`);
  }
}
