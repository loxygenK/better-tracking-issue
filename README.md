
# loxygenK/better-tracking-issue

🚩 A github action for making tracking issues easier to manage and see

## WIP
**This action is still WIP, so there might be very nasty bugs.** Also, important safety features are missing, like...

- **The issue's tag will break if the action's configuration is changed.**<br />
  The old tag will not be removed automatically, and there will be two old and new tags if the tag format changes.

## What does this Action do?

**This action detects the change in the task list and adds the parent issue number to the title and description of issues in the list.**

- ️🗃️ You can see the tracking issue number from the issue list.
- ️🗃️ A tiny tracking issue list is created at the bottom of the body.

<img src="./_readme/recorded.gif" width="500px" />

## Inputs

#### `token` <sup>(🔶 Requried)</sup>
A token to access issues.<br />
**`GITHUB_TOKEN` with `permission.issues: write` can be used.**

#### `tag`
The format of tracking issue number list prepended to the title. `<< id >>` is replaced by the issue number list. <br />
`[🚩 << id >>]` is set in default.

## Roadmaps

- [ ] Deal with the configuration change
- [ ] Add tracking issue's title to the tracked issues (`v0.1.0` here possibly)
- [ ] Make annotation text in the body configurable
