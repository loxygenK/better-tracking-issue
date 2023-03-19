import { dedupDiff, getStringDiff } from "./diff";

describe("Diff utiltiy", () => {
  it("can get string diff line by line", () => {
    const diff = getStringDiff("1\n2\n3\n4\n5", "0\n1\n5\n4\n6");

    expect(diff).toStrictEqual({
      added: ["0", "5", "6"],
      removed: ["2", "3", "5"],
    });
  });

  it("can dedup diffs", () => {
    const dedupped = dedupDiff({
      added: [1, 2, 2, 3, 5, 5, 7, 8],
      removed: [5, 6, 6, 7, 9],
    });

    expect(dedupped).toStrictEqual({
      added: [1, 2, 3, 8],
      removed: [6, 9],
    });
  });
});
