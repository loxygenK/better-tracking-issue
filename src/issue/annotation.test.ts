import { parseAnnotationText, setAnnotationText } from "./annotation";

describe("Tag modifier", () => {
  it("can add a new tag to the title", () => {
    const added = setAnnotationText("Original", [1, 2, 3]);

    expect(added).toBe(
      "Original\n<sub>This issue is tracked by #1 / #2 / #3</sub>"
    );
  });

  it("can replace a tag in the title", () => {
    const previous = setAnnotationText("Original", [1, 2, 3]);
    const added = setAnnotationText(previous, [4, 5]);

    expect(added).toBe("Original\n<sub>This issue is tracked by #4 / #5</sub>");
  });

  it("can remove a tag in the title", () => {
    const previous = setAnnotationText("Original", [1, 2, 3]);
    const added = setAnnotationText(previous, []);

    expect(added).toBe("Original");
  });

  it("can parse the mentioned issue from the tag", () => {
    const issueList = [1, 2, 3];
    const subject = setAnnotationText("Original", issueList);
    const parsed = parseAnnotationText(subject);

    expect(parsed).toStrictEqual(issueList);
  });

  it("should return undefined if no tag is found when parsing", () => {
    const parsed = parseAnnotationText("Blah blah");

    expect(parsed).toBeUndefined();
  });
});
