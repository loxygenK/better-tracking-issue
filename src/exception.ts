export class ConfigurationException extends Error {
  constructor(part: string, reason: string) {
    super(`Configuration error at '${part}': ${reason}`);
  }
}

export class GitHubRequestError extends Error {
  constructor(reason: string) {
    super(`GitHub request error: ${reason}`);
  }
}
