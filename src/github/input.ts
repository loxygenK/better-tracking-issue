import * as core from "@actions/core";

import { Config } from "~/config";

export function convertInputToConfig(): Config {
  return {
    token: core.getInput("token", { required: true }),
  };
}
