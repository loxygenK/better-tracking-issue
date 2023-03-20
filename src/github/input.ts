import * as core from "@actions/core";

import { Config, defaultConfig } from "~/config";

export function convertInputToConfig(): Config {
  return {
    token: getInput("token", true),
    prefix: getInput("prefix", false) ?? defaultConfig.prefix,
  };
}

function getInput(name: string, required: true): string;
function getInput(name: string, required: false): string | undefined;
function getInput(name: string, required: boolean): string | undefined {
  const input = core.getInput(name, { required });

  if (!required && input === "") {
    return undefined;
  }

  return input;
}
