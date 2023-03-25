import * as core from "@actions/core";

import { Config, defaultConfig } from "~/config";

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export function convertInputToConfig(): Config {
  return {
    token: getInput("token", true)!,
    numberTagPrefix:
      getInput("number-tag-prefix", false) ?? defaultConfig.numberTagPrefix,
    titleTagPrefix:
      getInput("title-tag-prefix", false) ?? defaultConfig.titleTagPrefix,
    titleTagStrategy:
      getInput("title-tag-strategy", false, [
        "fixed-lowest",
        "fixed-highest",
        "latest-lowest",
        "latest-highest",
      ]) ?? defaultConfig.titleTagStrategy,
  };
}
/* eslint-enable @typescript-eslint/no-non-null-assertion */

function getInput<const T extends string = string>(
  name: string,
  required: boolean,
  candicate?: Array<T>
): T | undefined {
  const input = core.getInput(name, { required });

  if (!required && input === "") {
    return undefined;
  }

  if (candicate === undefined) {
    return input as T;
  }

  if (candicate.includes(input as T)) {
    return input as T;
  }

  throw new Error(
    `Configuration problem: '${name}' should be one of the following: ${candicate.join(
      ", "
    )}`
  );
}
