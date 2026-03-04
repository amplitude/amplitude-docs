# Claude Code Configuration for Amplitude Docs

Welcome to the Claude Code configuration for the Amplitude documentation repository. This directory contains skills, documentation, and configuration that enable AI-assisted documentation with enforced quality standards.

## Quick Start

### For engineers and contributors

**New to documenting?** Just ask Claude Code for help:

| What you need | Say this |
|---|---|
| Document a new feature | `/document-feature` or "Document new feature: [name]" |
| Check your writing style | `/edit-doc` or "Apply style rules to this document" |
| Validate internal links | `/validate-links` or "Check links in this file" |
| Fix a Jira doc ticket | `/fix-issue DOC-####` |

Claude Code automatically applies Amplitude's documentation standards as you work.

### For tech writers and doc system administrators

| What you need | Say this |
|---|---|
| Apply style rules to all docs at scale | `/bulk-edit all` or `/bulk-edit group:developers` |
| Update nav section labels after a bulk edit | `/taxonomy-nav group:developers branch:bulk-edit/developers` |
| Check style compliance on a branch | `/validate-style branch:bulk-edit/developers` |

### What Happens Automatically

Claude Code enforces these standards:

✅ **Active voice, present tense** - "Configure settings" not "Settings are configured"
✅ **Contractions** - "can't", "don't", "isn't" for conversational tone
✅ **Second person** - Uses "you" to address the reader
✅ **Concise language** - Removes wordy phrases
✅ **Correct links** - Uses web routes, not file paths
✅ **Proper formatting** - Headings, lists, code blocks

You write naturally, Claude Code formats correctly.

## Directory structure

```
.claude/
├── CLAUDE.md                              # Main configuration (always-active context)
│                                          # Contains: project overview, all 12 style rules, routing reference
│
├── skills/                                # Executable workflows (invoke with /skill-name)
│   ├── document-feature/SKILL.md         # Interactive wizard for new feature docs
│   ├── validate-links/SKILL.md           # Check internal links for correct format
│   ├── edit-doc/SKILL.md                 # Apply all style rules to one document
│   ├── fix-issue/SKILL.md                # Resolve a Jira DOC ticket
│   ├── bulk-edit/SKILL.md                # Apply style rules to all docs at scale
│   │   └── references/
│   │       └── collection-groups.md      # Collection → persona group mapping
│   ├── taxonomy-nav/SKILL.md             # Update nav section labels and audit doc titles
│   └── validate-style/SKILL.md           # QA compliance sampling for bulk edits
│
├── docs/                                  # Reference documentation
│   ├── HOW-TO-CONTRIBUTE.md              # Engineer onboarding guide
│   └── personas.md                       # Reader persona definitions (used by bulk-edit)
│
└── README.md                              # This file — navigation hub
```

## Available skills

### `/document-feature`
**Purpose**: Create new feature documentation from scratch

**When to use**: Starting documentation for a new Amplitude feature

**What it does**:
- Asks about product area, benefits, prerequisites, workflow
- Determines correct collection and location
- Generates structured markdown with proper frontmatter
- Applies all style rules automatically
- Suggests filename and next steps

**Example**: "I need to document the new Predictive Cohorts feature"

---

### `/validate-links`
**Purpose**: Check internal links for correct Statamic routing

**When to use**: Verifying links before submitting a PR

**What it does**:
- Extracts all markdown links from file
- Checks against Statamic routing rules (must use /docs/ web routes)
- Reports issues with line numbers
- Suggests corrections
- Can auto-fix issues

**Example**: "Check all the links in this file"

---

### `/edit-doc`
**Purpose**: Apply all Amplitude style rules to existing documentation

**When to use**: Cleaning up documentation to meet style standards

**What it does**:
- Searches for common style violations
- Reports all findings before making changes
- Applies fixes systematically by priority
- Does TWO-PASS check for active voice (most commonly missed)
- Provides detailed summary of changes

**Example**: "Apply all Amplitude style rules to this document"

---

### `/bulk-edit`
**Purpose**: Apply style rules to all documentation at scale using parallel agents

**When to use**: Large-scale standardization across one or more persona groups; running the full documentation quality pass

**What it does**:
- Loads persona definitions from `.claude/docs/personas.md`
- Groups collections by reader persona (8 groups, ~1,026 files total)
- Creates a feature branch per persona group (`bulk-edit/<group-name>`)
- Spawns parallel Collection Editor agents (up to 3 at a time) for 20-file batches
- After all batches complete, spawns the Taxonomy & Navigation agent
- Runs the QA Sampler (`/validate-style`) to confirm compliance
- Creates a PR for tech writer review
- Tracks progress in `.claude/bulk-edit-state/progress.json` (resumable)

**Examples**:
- "Run the bulk edit for developer docs" → `/bulk-edit group:developers`
- "Apply style rules to all collections" → `/bulk-edit all`
- "Resume the bulk edit from where it stopped" → `/bulk-edit resume`

---

### `/taxonomy-nav`
**Purpose**: Audit and update navigation section labels and document title structure

**When to use**: After bulk content edits, or any time you want to check that navigation section labels follow style rules

**What it does**:
- Builds a UUID-to-title map from changed documents' frontmatter
- Applies sentence case to section group labels in `content/trees/navigation/en/*.yaml`
- Flags frontmatter `title` violations for tech writer review (does not auto-change them)
- Reports structural observations — pages that may be misplaced in the nav hierarchy

**Example**: "Update the navigation section titles for the analytics group"

---

### `/validate-style`
**Purpose**: Spot-check style compliance on a sample of files from a branch

**When to use**: After a bulk edit run, or any time you want to verify that a set of files meets Amplitude style standards

**What it does**:
- Samples 5 files (or more) from a branch's changed files
- Runs edit-doc Phase 1 pattern search (read-only — no edits)
- Calculates a compliance score per rule category
- Emits PASS / WARN / FAIL for each category and an overall result
- Recommends whether to merge, flag for review, or re-run editing

**Example**: "Check style compliance on the bulk-edit/developers branch"

---

## Core Style Rules (Quick Reference)

All documentation must follow these standards (automatically enforced via CLAUDE.md):

### 1. Active Voice (HIGHEST PRIORITY)
- ❌ "Events are sent to the API"
- ✅ "Send events to the API" or "The SDK sends events to the API"

### 2. Present Tense
- ❌ "This feature will allow you to"
- ✅ "This feature lets you"

### 3. Contractions Required
- ❌ "cannot", "does not", "is not"
- ✅ "can't", "doesn't", "isn't"

### 4. Second Person
- ❌ "Users should navigate..."
- ✅ "Navigate to..."

### 5. Direct Instructions (No "Please")
- ❌ "Please click the button"
- ✅ "Select the button"

### 6. Concise Language
- ❌ "in order to", "via", "currently"
- ✅ "to", "through", (remove "currently")

### 7. Internal Links Must Use Web Routes
- ❌ `[Link](../relative-path.md)`
- ✅ `[Link](/docs/collection-path/slug)`

### 8. UI Element Formatting
- **Bold** for interactive elements: buttons, tabs, fields (Example: **Save**, **Cancel**)
- *Italics* for navigation paths: *Settings > API Keys*

For complete style rules, see `.claude/CLAUDE.md`.

## Typical Workflows

### Creating New Documentation

1. **Start the wizard:**
   ```
   /document-feature
   ```

2. **Answer questions** about the feature:
   - Product area (Analytics, CDP, Experiment, etc.)
   - User benefit
   - Prerequisites
   - Main workflow

3. **Claude Code generates** structured markdown with:
   - Proper frontmatter
   - Style-compliant content
   - Correct collection routing

4. **Enhance the documentation:**
   - Add screenshots if helpful
   - Include real code examples
   - Test the steps yourself

5. **Validate and submit:**
   ```
   /validate-links
   ```
   Then create PR and tag `@tech-writers` for review

### Updating Existing Documentation

1. **Make your technical updates** to the content

2. **Apply style rules:**
   ```
   /edit-doc
   ```

3. **Check links:**
   ```
   /validate-links
   ```

4. **Review changes** and commit

5. **Submit PR** and tag `@tech-writers`

### Checking Your Work

Before submitting a PR:

1. **Style check:**
   ```
   /edit-doc
   ```

2. **Link validation:**
   ```
   /validate-links
   ```

3. **Review the Vercel preview** (auto-generated on PR)

4. **Tag tech writers** for review

## Important Files

### `.claude/CLAUDE.md`
**Main configuration file** - Always loaded, contains:
- Project overview and team context
- All 12 core style rules (consolidated)
- Statamic routing reference (top 20 collections)
- Quick reference for when to use skills

This is the single source of truth for Amplitude documentation standards.

### `.claude/docs/HOW-TO-CONTRIBUTE.md`
**Engineer onboarding guide** - How to contribute to documentation using Claude Code

## Repository Context

### What is This Repository?

This is the Amplitude product documentation repository, built on Statamic CMS and serving comprehensive documentation for Amplitude's product suite (Analytics, CDP, Experiment, Session Replay, etc.).

### Team Context

**Challenge**: Scale a 2-person technical writing team to support 125+ engineers

**Solution**: AI-assisted documentation with enforced quality standards
- Engineers write documentation with Claude Code assistance
- Style rules apply automatically during editing
- Technical writers provide final review and enhancement

### Collections and Routing

Documentation is organized into 120+ collections in `content/collections/`. Each collection has a web route defined in its YAML file.

**Important**: All internal links must use web routes starting with `/docs/`, not file paths or relative links.

Examples:
- Analytics: `/docs/analytics/{slug}`
- Session Replay: `/docs/session-replay/{slug}`
- Browser SDK: `/docs/sdks/analytics/browser/{slug}`

See CLAUDE.md for the top 20 collection routes.

## Integration with Cursor

This repository also has `.cursor/` directory with Cursor rules. Both systems are **compatible and complementary**:

- **Cursor rules**: 30+ files with detailed style guidance
- **Claude Code config**: 6 files focused on essential workflows
- **Both enforce**: The same Amplitude documentation standards

Use whichever AI assistant you prefer - both support the same quality standards.

## Success Metrics

This AI-assisted documentation system aims to:
- Enable 70% of documentation tasks without manual style review
- Maintain Vale linting standards (zero critical violations)
- Keep feature documentation time at 15-30 minutes
- Achieve 4+/5 satisfaction from both engineers and tech writers

## Getting Help

### Common Questions

**"Where should I document this feature?"**
Use `/document-feature` - it determines the correct collection based on product area.

**"How do I know if my links are correct?"**
Use `/validate-links` - it checks all links against Statamic routing rules.

**"What if I'm not sure about the style?"**
Use `/edit-doc` after writing - it applies all style rules systematically.

**"Can I see examples?"**
Check existing documentation in the target collection for examples of similar features.

### Resources

- **Style rules**: `.claude/CLAUDE.md`
- **Contributing guide**: `.claude/docs/HOW-TO-CONTRIBUTE.md`
- **Statamic routing**: See CLAUDE.md or `.cursor/rules/statamic-routing.mdc`
- **Vale configuration**: `.vale.ini` and `.github/styles/`
- **Approved vocabulary**: `.github/styles/config/vocabularies/dev/accept.txt`

### Support Channels

- **GitHub**: Create issues or PRs in this repository
- **Slack**: `#amplitude-docs` channel
- **Tech Writers**: Tag `@tech-writers` in PRs for review

## Migration Notes from Cursor

If you're switching from Cursor to Claude Code:

### What's Different

1. **Configuration structure**:
   - Cursor: 30+ separate .mdc files
   - Claude Code: Single CLAUDE.md + 3 skills

2. **Invocation**:
   - Cursor: Natural language detection or commands
   - Claude Code: Explicit `/skill-name` invocation

3. **Always-active rules**:
   - Cursor: Multiple .mdc files with `alwaysApply: true`
   - Claude Code: Everything in CLAUDE.md is always active

### What's the Same

- **Style standards**: Identical (both based on Vale config)
- **Collection routes**: Same Statamic routing rules
- **Workflows**: Similar (document features, validate links, apply style)
- **Quality bar**: Same expectations for documentation quality

### Migration Checklist

- ✅ `.claude/` directory created
- ✅ CLAUDE.md consolidates all style rules
- ✅ Seven skills available (/document-feature, /validate-links, /edit-doc, /fix-issue, /bulk-edit, /taxonomy-nav, /validate-style)
- ✅ HOW-TO-CONTRIBUTE.md adapted for Claude Code
- ✅ .cursor/ directory preserved for reference (still usable)

Both systems can run in parallel. Choose the AI assistant that fits your workflow.

## Version History

- **v1.1 (Current)**: Full bulk-edit system — `/bulk-edit`, `/taxonomy-nav`, `/validate-style`, `/fix-issue` added; persona-based parallel editing for 1,026 files across 8 reader personas
- **v1.0**: Essential skills — `/document-feature`, `/validate-links`, `/edit-doc`, consolidated style rules, core workflows

## Contributing to This Configuration

To improve the Claude Code configuration:

1. **Update CLAUDE.md** for style rule changes
2. **Update skills** for workflow improvements
3. **Test changes** with pilot engineers before rolling out
4. **Keep in sync** with `.cursor/` rules and Vale configuration
5. **Document changes** in this README

---

**Ready to contribute?** Read `.claude/docs/HOW-TO-CONTRIBUTE.md` to get started!
