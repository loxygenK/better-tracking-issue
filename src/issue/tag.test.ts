import { setTag } from "./tag";

describe("Tag modifier", () => {
  const tagTemplate = "[TAG(<< id >>)]";

  it("can add a new tag to the title", () => {
    const added = setTag("Original", tagTemplate, [1, 2, 3]);

    expect(added).toBe("[TAG(#1, #2, #3)]Original");
  });

  it("can replace a tag in the title", () => {
    const previous = setTag("Original", tagTemplate, [1, 2, 3]);
    const added = setTag(previous, tagTemplate, [4, 5]);

    expect(added).toBe("[TAG(#4, #5)]Original");
  });

  it("can remove a tag in the title", () => {
    const previous = setTag("Original", tagTemplate, [1, 2, 3]);
    const added = setTag(previous, tagTemplate, []);

    expect(added).toBe("Original");
  });
});
