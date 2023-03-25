import { hasTitleTag, setTitleTag } from "./titleTag";

describe("Tag modifier", () => {
  const tagPrefix = "TRACKED";

  const issueTitles = {
    a: "<Issue A>",
    b: "<Issue B>",
  };

  it("can add a new tag to the title with one issue", () => {
    const added = setTitleTag("Original", tagPrefix, issueTitles.a, false);

    expect(added).toBe("Original (TRACKED by <Issue A>)");
  });

  it("can add a new tag to the title with multiple issues", () => {
    const added = setTitleTag("Original", tagPrefix, issueTitles.a, true);

    expect(added).toBe("Original (TRACKED by <Issue A>, ...)");
  });

  it("can replace a tag in the title", () => {
    const previous = setTitleTag("Original", tagPrefix, issueTitles.a, false);
    const replaced = setTitleTag(previous, tagPrefix, issueTitles.b, true);

    expect(replaced).toBe("Original (TRACKED by <Issue B>, ...)");
  });

  it("can remove a tag in the title", () => {
    const previous = setTitleTag("Original", tagPrefix, issueTitles.a, true);
    const removed = setTitleTag(previous, tagPrefix, undefined, false);

    expect(removed).toBe("Original");
  });

  it("can check if the title includes the tag or not", () => {
    const subject = setTitleTag("Original", tagPrefix, issueTitles.a, true);
    const parsed = hasTitleTag(subject);

    expect(parsed).toBe(true);
  });

  it("should return false if no tag is found when parsing", () => {
    const parsed = hasTitleTag("Blah blah");

    expect(parsed).toBe(false);
  });
});
