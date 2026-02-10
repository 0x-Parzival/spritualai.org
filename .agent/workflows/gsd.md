---
description: Use the Get Shit Done (GSD) system for project planning and execution
---

# Get Shit Done (GSD) Workflow

This workflow allows you to use the `get-shit-done` system to plan, execute, and verify work. GSD operates by providing specialized context and prompts to the agent.

## Prerequisites

- GSD must be installed in `~/.gemini/get-shit-done`.
- The executable script is at `~/.gemini/get-shit-done/bin/gsd-tools.js`.

## How to use GSD

To use a GSD command (like `new-project`, `plan-phase`, `execute-phase`), follow these steps:

1.  **Identify the command**: Determine which GSD command matches the user's request.
    *   Start new project -> `new-project`
    *   Discuss a phase -> `discuss-phase`
    *   Plan a phase -> `plan-phase`
    *   Execute a phase -> `execute-phase`
    *   Verify work -> `verify-work`
    *   ...and so on.

2.  **Read the definition**: Read the corresponding `.toml` file in `~/.gemini/get-shit-done/workflows/`.
    *   Example: `view_file("~/.gemini/get-shit-done/workflows/new-project.toml")`

3.  **Execute the Prompt**:
    *   The `.toml` file contains a `prompt` field. **This is your instruction set.**
    *   Read the `prompt` text and follow its instructions EXACTLY.
    *   Use `run_command` to execute any shell commands specified in the prompt.
        *   **Crucial**: Replace any references to `gsd-tools` or `gsd-tools.js` with the full path: `node /home/parzival/.gemini/get-shit-done/bin/gsd-tools.js`.
    *   If the prompt asks you to ask the user questions, use `notify_user`.

## Common Commands

### Initialize Project
To start a new project:
1.  Read `~/.gemini/get-shit-done/workflows/new-project.toml`.
2.  Follow the `prompt` instructions.
3.  Run the init script: `node /home/parzival/.gemini/get-shit-done/bin/gsd-tools.js init new-project`.

### Plan Phase
To plan a specific phase (e.g., Phase 1):
1.  Read `~/.gemini/get-shit-done/workflows/plan-phase.toml`.
2.  Follow instructions.
3.  Run init: `node /home/parzival/.gemini/get-shit-done/bin/gsd-tools.js init plan-phase 1`.

### Execute Phase
To execute a phase (e.g., Phase 1):
1.  Read `~/.gemini/get-shit-done/workflows/execute-phase.toml`.
2.  Follow instructions.
3.  Run init: `node /home/parzival/.gemini/get-shit-done/bin/gsd-tools.js init execute-phase 1`.

## Tools

You can use the GSD tools script directly for helper functions:
`node /home/parzival/.gemini/get-shit-done/bin/gsd-tools.js <command>`
(Run with `--help` to see available commands)
