import * as core from "@actions/core";
import { greet } from "~/main";

async function main(): Promise<void> {
  core.notice("Hey, the action is working!");
  core.notice(`Let me do some greeting: ${greet()}`);
}

main();
