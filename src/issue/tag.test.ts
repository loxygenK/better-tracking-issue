import { parseTag, setTag } from "./tag";

describe("Tag modifier", () => {
  const tagTemplate = "[TAG(<< id >>)]";

  it("can add a new tag to the title", () => {
    const added = setTag("Original", tagTemplate, [1, 2, 3]);

    expect(added).toBe("[TAG(#1, #2, #3)]Original");
  });

  it("can replace a tag in the title", () => {
    const previous = setTag("Original", tagTemplate, [1, 2, 3]);
    const replaced = setTag(previous, tagTemplate, [4, 5]);

    expect(replaced).toBe("[TAG(#4, #5)]Original");
  });

  it("can remove a tag in the title", () => {
    const previous = setTag("Original", tagTemplate, [1, 2, 3]);
    const removed = setTag(previous, tagTemplate, []);

    expect(removed).toBe("Original");
  });

  it("can parse the mentioned issue from a tag", () => {
    const issueList = [1, 2, 3];
    const subject = setTag("Original", tagTemplate, issueList);
    const parsed = parseTag(subject, tagTemplate);

    expect(parsed).toStrictEqual(issueList);
  });

  it("should return undefined if no tag is found when parsing", () => {
    const parsed = parseTag("Blah blah", tagTemplate);

    expect(parsed).toBeUndefined();
  });
});
