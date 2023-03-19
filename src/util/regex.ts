const specialCharacters = /[.+*?^$()[\]{}|\\]/g;
export function escapeRegex(rawString: string): string {
  return rawString.replaceAll(specialCharacters, "\\$&");
}
