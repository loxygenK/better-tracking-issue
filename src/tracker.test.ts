import { DEFAULT_TRACKING_ISSUE_REGEX, parseTrackingIssue } from "./tracker";

const issueBody = `
# Things to do

- [ ] #1
  - [X] #12345678
  - [X] #-10
- [#] #100
- [ ] Oops this is not an issue
- [X] #Sike
`;

const otherIssueBody = `
TRACK: No. 1
TRACK: No. 12345678
TRACK: No. ABCDE
`;

describe("Tracking finding", () => {
  it("can find tracked issue from issue's body", () => {
    const tracked = parseTrackingIssue(issueBody, DEFAULT_TRACKING_ISSUE_REGEX);
    expect(tracked).toStrictEqual([1, 12345678]);
  });

  it("can be customized using a custom regex", () => {
    const tracked = parseTrackingIssue(otherIssueBody, /TRACK: No. (?<id>\d+)/);
    expect(tracked).toStrictEqual([1, 12345678]);
  });
});
