import { parseAnnotationText, setAnnotationText } from "./annotation";

describe("Annotation text modifier", () => {
  it("can add a new annotation text to the title", () => {
    const added = setAnnotationText("Original", [1, 2, 3]);

    expect(added).toBe(
      "Original\n<sub>This issue is tracked by #1 / #2 / #3</sub>"
    );
  });

  it("can replace an annotation text in the title", () => {
    const previous = setAnnotationText("Original", [1, 2, 3]);
    const replaced = setAnnotationText(previous, [4, 5]);

    expect(replaced).toBe(
      "Original\n<sub>This issue is tracked by #4 / #5</sub>"
    );
  });

  it("can remove an annotation text in the title", () => {
    const previous = setAnnotationText("Original", [1, 2, 3]);
    const removed = setAnnotationText(previous, []);

    expect(removed).toBe("Original");
  });

  it("can parse the mentioned issue from an annotation text", () => {
    const issueList = [1, 2, 3];
    const subject = setAnnotationText("Original", issueList);
    const parsed = parseAnnotationText(subject);

    expect(parsed).toStrictEqual(issueList);
  });

  it("should return undefined if no annotation text is found when parsing", () => {
    const parsed = parseAnnotationText("Blah blah");

    expect(parsed).toBeUndefined();
  });
});
