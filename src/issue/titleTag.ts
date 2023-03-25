// Espace character before `（` and `）` is not required, since they're not half-width brackets.
const TITLE_TAG_MATCH = /\s+（.+by.+）$/;

export function createTitleTag(
  tagPrefix: string,
  addingIssueTitle: string,
  hasMoreThanTwo: boolean
) {
  const continuingEllipsis = hasMoreThanTwo ? ", ..." : "";

  return `  （${tagPrefix} by "${addingIssueTitle}"${continuingEllipsis}）`;
}

export function setTitleTag(
  currentTitle: string,
  tagPrefix: string,
  addingIssueTitle: string | undefined,
  hasMoreThanTwo: boolean
): string {
  let newTitle = currentTitle;

  const existingTag = currentTitle.match(TITLE_TAG_MATCH);

  if (existingTag !== null && existingTag.index !== undefined) {
    newTitle = newTitle.slice(0, existingTag.index);
  }

  if (addingIssueTitle !== undefined) {
    newTitle =
      newTitle + createTitleTag(tagPrefix, addingIssueTitle, hasMoreThanTwo);
  }

  return newTitle;
}

export function hasTitleTag(title: string): boolean {
  return TITLE_TAG_MATCH.test(title);
}
