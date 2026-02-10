---
description: Use CodeRabbit AI for code reviews and analysis
---

# CodeRabbit Workflow

This workflow allows you to use `coderabbit`, an AI-powered code review tool.

## Prerequisites

- `coderabbit` CLI installed.
- Authenticated via `coderabbit auth login`.

## How to use CodeRabbit

### Authentication

First time setup:
1.  Run `coderabbit auth login`.
2.  Follow the instructions to authenticate via browser.

### Review Code

**Review current changes (pre-commit):**
Review uncommitted changes in your working directory:
```bash
coderabbit review
```

**Review a specific commit:**
Review changes in a specific commit:
```bash
coderabbit review <commit-hash>
```

**Review a pull request:**
Review a GitHub pull request:
```bash
coderabbit review <pr-url>
```

### Configuration

CodeRabbit uses a `.coderabbit.yaml` configuration file.
To generate a default config:
```bash
coderabbit init
```

### Troubleshooting

- **Auth issues**: Run `coderabbit auth logout` then login again.
- **Version**: Check `coderabbit --version` to ensure you are on the latest.
