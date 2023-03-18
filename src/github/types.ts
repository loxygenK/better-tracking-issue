import { GitHub } from "@actions/github/lib/utils";

import * as github from "@actions/github";

export type Context = (typeof github)["context"];
export type OctoKit = InstanceType<typeof GitHub>;
