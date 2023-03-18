export class ConfigurationException extends Error {
  constructor(part: string, reason: string) {
    super(`Configuration error at '${part}': ${reason}`);
  }
}
