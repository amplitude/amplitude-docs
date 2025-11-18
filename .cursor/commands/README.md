# Cursor Commands Documentation

This directory contains workflow commands that automate common documentation tasks for the Amplitude documentation repository.

## Available Commands

### 1. UI Updates (`ui-updates.md`)

**Purpose:** Identifies UI/UX changes in Amplitude product repositories that require documentation updates.

**What it does:**
- Searches merged PRs in `amplitude/amplitude` repositories using GitHub CLI
- Analyzes PRs for UI-related changes (button text, navigation, modals, labels, etc.)
- Maps changes to affected documentation collections
- Generates a detailed report with recommendations
- Optionally creates a consolidated Jira ticket (DOC project) for all updates

**Requirements:**
- **GitHub CLI (`gh`)** installed and authenticated
- **Jira MCP** connection enabled for ticket creation
- Access to Amplitude product repositories

**Usage:**
Invoke the command and it will:
1. Search for UI-related PRs from the last 30 days
2. Analyze changes and generate summary table
3. Map changes to documentation collections
4. Provide detailed action items
5. **Stop and ask** if you want a Jira ticket created
6. If yes, creates ONE consolidated ticket with all updates

**Output:**
- Summary report with PR details, affected docs, and priorities
- Search commands to find affected documentation
- Verification checklist
- Optional Jira ticket (DOC-XXX) with complete details

**Best Practices:**
- Uses GitHub CLI by default (not web search)
- Batches all updates into one ticket and one git branch
- Focus on high-priority user-facing changes first

---

### 2. Edit Document (`edit.md`)

**Purpose:** Edits documentation to match Amplitude writing style guidelines.

**What it does:**
- Parses document content
- Applies all Amplitude style rules from `.cursor/rules`
- Ensures compliance with voice, tense, formatting, and terminology standards

**Requirements:**
- Access to Amplitude style rules (`.cursor/rules` directory)

**Usage:**
Invoke the command on any documentation file to automatically apply style corrections.

**Output:**
- Updated document content
- Summary of changes made
- List of style rules referenced

**Style Rules Applied:**
- Active voice (no passive constructions)
- Present tense (no future tense)
- Contractions (can't, don't, isn't)
- Second person (you/your)
- Direct instructions (no "please")
- Concise language (remove wordy phrases)
- Proper heading structure
- Inclusive terminology
- Statamic routing for internal links

---

### 3. Fix Jira Issue (`fix-issue.md`)

**Purpose:** Retrieves Jira issue details and updates documentation to resolve the issue.

**What it does:**
- Connects to Jira through Atlassian MCP
- Retrieves issue details from provided ticket URL
- Creates a new git branch from main
- Identifies impacted documentation
- Proposes and implements solution
- Applies Amplitude style rules
- Explains changes made

**Requirements:**
- **Atlassian MCP** enabled and authenticated
- **Git CLI** access
- Jira ticket URL or key (DOC-XXX format)

**Usage:**
1. Invoke command with Jira ticket URL
2. Workflow will:
   - Verify MCP connection
   - Retrieve ticket details
   - Switch to `main` branch and pull latest
   - Create branch named `DOC-###` (or recreate if exists)
   - Analyze issue and propose solution
   - Make updates following style guidelines
   - Explain issue and resolution

**Output:**
- New git branch with ticket ID
- Updated documentation files
- Summary of issue and changes made
- Ready for PR submission

**Safety Features:**
- Stops immediately if MCP is unreachable
- Stops if unclear about next steps
- Deletes and recreates branch if it already exists

---

## Requirements Summary

### Essential Tools

| Tool | Required For | Installation |
|---|---|---|
| GitHub CLI (`gh`) | ui-updates | `brew install gh` then `gh auth login` |
| Git CLI | fix-issue | Usually pre-installed |
| Atlassian MCP | fix-issue, ui-updates (optional) | Configure in Cursor settings |

### MCP Connections

**Atlassian MCP** must be configured to:
- Read Jira issues
- Create Jira tickets in DOC project
- Access Amplitude Jira instance (`amplitude.atlassian.net`)

### Repository Access

- Read access to `amplitude/amplitude` (product repo)
- Read access to `amplitude/javascript` (SDK repo)
- Write access to `amplitude-docs` (this repo)

---

## Workflow Integration

### Recommended Workflow for UI Changes

1. **Run ui-updates command** → Generates report
2. **Create consolidated Jira ticket** → DOC-XXX with all updates
3. **Create single branch** → `DOC-XXX-ui-updates-nov-2025`
4. **Make all updates in one branch** → Efficient batching
5. **Submit single PR** → Easier to review

### Recommended Workflow for Jira Tickets

1. **Receive Jira ticket** → DOC-XXX assignment
2. **Run fix-issue command** → Automatic branch creation and updates
3. **Review changes** → Verify accuracy
4. **Commit and push** → Submit PR

### Recommended Workflow for Style Updates

1. **Edit documentation content**
2. **Run edit command** → Apply style rules
3. **Review changes** → Verify improvements
4. **Commit** → Style-compliant documentation

---

## Command Locations

All commands are stored in:
```
.cursor/commands/
├── README.md           # This file
├── ui-updates.md       # UI change tracking workflow
├── edit.md             # Style guide enforcement
└── fix-issue.md        # Jira issue resolution
```

---

## Style Rules Reference

All commands reference rules in:
```
.cursor/rules/
├── link-validation.mdc     # Internal link validation
└── new-feature-template.mdc # New feature documentation template
```

Workspace-level style rules are automatically applied from `.cursorules`.

---

## Collection Route Mapping

All commands use the collection-to-route mapping defined in Statamic:

| Collection | Web Route Pattern |
|---|---|
| analytics | `/docs/analytics/{slug}` |
| event-segmentation | `/docs/analytics/charts/event-segmentation/{slug}` |
| funnel-analysis | `/docs/analytics/charts/funnel-analysis/{slug}` |
| audiences | `/docs/data/audiences/{slug}` |
| source-catalog | `/docs/data/source-catalog/{slug}` |
| destination-catalog | `/docs/data/destination-catalog/{slug}` |
| session-replay | `/docs/session-replay/{slug}` |
| experiment | `/docs/feature-experiment/{slug}` |
| browser_sdk | `/docs/sdks/analytics/browser/{slug}` |
| api | `/docs/apis/analytics/{slug}` |

*Full mapping available in `ui-updates.md`*

---

## Troubleshooting

### GitHub CLI Issues

```bash
# Check installation
gh --version

# Check authentication
gh auth status

# Re-authenticate
gh auth login
```

### Atlassian MCP Issues

1. Verify MCP is enabled in Cursor settings
2. Check authentication to `amplitude.atlassian.net`
3. Test connection by running a simple Jira query
4. If failing, reauthenticate through Cursor

### Git Issues

```bash
# Verify you're on main
git branch

# Pull latest changes
git pull origin main

# Force delete existing branch
git branch -D DOC-XXX
```

---

## Best Practices

### For UI Updates
- Run monthly to catch recent changes
- Prioritize high-impact user-facing changes
- Batch updates into single ticket/branch
- Request product team review before merging

### For Issue Resolution
- Always read full Jira issue before starting
- Ask clarifying questions if requirements unclear
- Follow style guidelines consistently
- Test navigation paths and links after updates

### For Style Edits
- Run on completed drafts, not work-in-progress
- Review changes before committing
- Focus on high-impact style issues first
- Use automated fixes for consistent patterns

---

## Support

For questions or issues with these workflows:
- Check `.cursor/rules` for style guidelines
- Review Statamic route mapping in collection YAML files
- Consult #amplitude-docs Slack channel
- Tag @tech-writers for documentation questions

