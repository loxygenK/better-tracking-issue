import { parseTag, setTag } from "./tag";

describe("Tag modifier", () => {
  const tagPrefix = "TAG";

  it("can add a new tag to the title", () => {
    const added = setTag("Original", tagPrefix, [1, 2, 3]);

    expect(added).toBe("[TAG #1, #2, #3]Original");
  });

  it("can replace a tag in the title", () => {
    const previous = setTag("Original", tagPrefix, [1, 2, 3]);
    const replaced = setTag(previous, tagPrefix, [4, 5]);

    expect(replaced).toBe("[TAG #4, #5]Original");
  });

  it("can remove a tag in the title", () => {
    const previous = setTag("Original", tagPrefix, [1, 2, 3]);
    const removed = setTag(previous, tagPrefix, []);

    expect(removed).toBe("Original");
  });

  it("can parse the mentioned issue from a tag which has the same prefix to the config", () => {
    const issueList = [1, 2, 3];
    const subject = setTag("Original", tagPrefix, issueList);
    const parsed = parseTag(subject);

    expect(parsed).toStrictEqual(issueList);
  });

  it("can parse the mentioned issue from a tag which has the different prefix to the config", () => {
    const issueList = [1, 2, 3];
    const subject = setTag("Original", tagPrefix + "_old", issueList);
    const parsed = parseTag(subject);

    expect(parsed).toStrictEqual(issueList);
  });

  it("should return undefined if no tag is found when parsing", () => {
    const parsed = parseTag("Blah blah");

    expect(parsed).toBeUndefined();
  });
});
