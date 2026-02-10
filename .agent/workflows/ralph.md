---
description: Run the Ralph autonomous agent loop for feature implementation
---

# Ralph Workflow

This workflow allows you to use `ralph`, an autonomous agent loop that implements features from a PRD.

## Prerequisites

- `ralph` installed in `~/.gemini/ralph`.
- `amp` OR `claude` (Claude Code) CLI installed and authenticated.

## How to use Ralph

### 1. Prepare the PRD

Ralph requires a `prd.json` file. You can generate this from a markdown PRD or create it manually.

**Option A: Generate from Markdown (Recommended)**
1.  Ask the user for the feature requirements.
2.  Create a markdown PRD (e.g., `tasks/prd-feature.md`).
3.  Use the `ralph` skill (if installed in your CLI) to convert it:
    `claude "convert tasks/prd-feature.md to prd.json using ralph format"`

**Option B: Create Manually**
Create `prd.json` in the project root with this structure:
```json
{
  "branchName": "feature/my-feature",
  "userStories": [
    {
      "id": "1",
      "title": "Implement X",
      "details": "Details here...",
      "acceptanceCriteria": ["Criteria 1", "Criteria 2"],
      "passes": false
    }
  ]
}
```

### 2. Run Ralph

Once `prd.json` exists, start the Ralph loop:

```bash
# If using Amp
/home/parzival/.gemini/ralph/ralph.sh

# If using Claude Code
/home/parzival/.gemini/ralph/ralph.sh --tool claude
```

Ralph will:
1.  Read `prd.json`.
2.  Create/checkout the feature branch.
3.  Pick the next failing story.
4.  Implement it using the AI tool.
5.  Run tests.
6.  Mark the story as passed in `prd.json` if successful.
7.  Repeat until all stories pass.

## Maintenance

- **Archives**: Previous runs are archived in `archive/`.
- **Progress**: Check `progress.txt` for learnings from the current run.
