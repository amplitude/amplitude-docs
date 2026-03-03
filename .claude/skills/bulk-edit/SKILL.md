---
name: bulk-edit
description: This skill should be used when the user wants to "bulk edit all docs", "apply style rules to all collections", "run the bulk edit", "process the developer docs", "edit all articles in a group", "standardize documentation style", or wants to trigger large-scale style correction across multiple documentation collections.
version: 1.0.0
---

# Bulk Edit

Orchestrate large-scale style correction across 1,026 documentation files in 74 collections using parallel editor agents, persona-aware writing, a Taxonomy & Navigation agent, and a QA sampler.

## About This Skill

This skill coordinates bulk application of all Amplitude style rules (from CLAUDE.md and the `/edit-doc` skill) across the documentation library. It:

1. Groups collections by reader persona
2. Creates one Git branch per persona group
3. Spawns parallel Collection Editor agents for each 20-file batch
4. Runs the Taxonomy & Navigation agent to update nav section titles and flag structural issues
5. Runs the QA Sampler (`/validate-style`) to confirm compliance
6. Creates a PR for tech writer review
7. Tracks all progress in a resumable state file

## Invocation

```
/bulk-edit [target]
```

Targets:
- `/bulk-edit all` — process all 8 persona groups in recommended order
- `/bulk-edit group:developers` — process one persona group by name
- `/bulk-edit collection:browser_sdk` — process a single collection
- `/bulk-edit resume` — resume from the last saved state in `.claude/bulk-edit-state/progress.json`

If no target is provided, ask the user which target to use.

## Step 0: Check for existing progress

Check whether `.claude/bulk-edit-state/progress.json` exists.

- If it exists and the target is not `resume`, ask the user: "A previous bulk-edit session exists. Resume from where it left off, or start fresh?"
- If resuming, load the existing state and skip completed items.
- If starting fresh, initialize a new progress file.

## Step 1: Load reference files

Load these files before doing any other work:

- `.claude/docs/personas.md` — persona definitions and collection assignments
- `.claude/skills/bulk-edit/references/collection-groups.md` — collection-to-group lookup table

## Step 2: Build the work queue

For the target scope, identify the collections and files to process.

### Batch size rules

| Collection file count | Batch size |
|---|---|
| 1–20 files | 1 batch (all files) |
| 21–50 files | 15 files per batch |
| 51–130 files | 20 files per batch |

For short-file collections (glossary entries, RBAC permissions — `glossary_events`, `glossary_properties`, `rbac_permissions`, `pages`), use batch sizes of 20–25 since each file requires minimal editing time.

### Excluded collections

Do not process these collections — they are out of scope:

- `japanese_translation` — non-English content
- `sections` — structural navigation pages with minimal prose
- `workflow` — internal workflow templates, not customer-facing
- `academy_content` — managed separately

## Step 3: Create the Git branch

For the persona group being processed:

```bash
git checkout main
git pull origin main
git checkout -b bulk-edit/<group-name>
```

Group branch names:
- `bulk-edit/developers`
- `bulk-edit/api-users`
- `bulk-edit/data-engineers`
- `bulk-edit/analysts-pms`
- `bulk-edit/experimenters`
- `bulk-edit/engagement-survey-authors`
- `bulk-edit/admins-it`
- `bulk-edit/general-onboarding`

If resuming, check out the existing branch:
```bash
git checkout bulk-edit/<group-name>
git pull origin bulk-edit/<group-name>
```

## Step 4: Spawn parallel Collection Editor agents

For each batch, spawn a Collection Editor agent using the Agent tool. Run a maximum of **3 agents in parallel** at once to avoid context exhaustion.

Pass each agent this prompt:

---

```
You are a Collection-Batch Editor Agent for Amplitude documentation.

## Your assignment

Collection: <collection_name>
Batch: <batch_index> of <total_batches>
Branch: <branch_name>

Files to edit:
<list of absolute file paths, one per line>

## Reader persona

<paste the full persona definition from personas.md for this group>

## Instructions

Apply all Amplitude style rules to every file in your batch. Follow the
edit-doc skill phases:

**Phase 1 — Pattern search:** Search all files for style violations.
Report findings with file names and line numbers.

**Phase 2 — Apply fixes in priority order:**
1. Active voice (first pass)
2. Present tense (no "will", "would", "going to")
3. Contractions (don't, can't, isn't, etc.)
4. Direct instructions (remove "please", use imperative mood)
5. Concise language ("to" not "in order to", "through" not "via", remove "currently")
6. Second person (remove "we/our/us", use "you/your")
7. UI formatting (bold for interactive elements, italics for navigation paths)
8. List punctuation (all list items end with a period)
9. Headings (sentence case, no end punctuation, starts at ##)

**Phase 3 — Second active voice pass (mandatory):** Search all files
again for these patterns and convert every remaining instance:
is assigned | are assigned | is removed | are removed | is granted |
are granted | is created | are created | is available | are available |
was assigned | were assigned | is sent | are sent | can be configured |
can be accessed | will be displayed | will be shown | should be checked

**Phase 4 — Verify:** Re-run passive voice search. Confirm zero remaining
passive constructions.

## Persona-specific adjustments

In addition to the universal style rules, apply these persona-specific
adjustments for this reader:

<paste persona-specific writing adjustments from personas.md>

## Guardrails — NEVER modify these

- Frontmatter fields (id, blueprint, title, updated_at, parent, etc.)
- Content inside {{partial:...}} Statamic tags
- Content inside markdown code fences (``` blocks)
- URLs, API endpoints, or technical parameter names
- Image file paths (only alt text may be updated if missing)
- Internal link paths (/docs/... links must not be altered)
- Heading anchor IDs ({#anchor} syntax)

## After editing all files in your batch

1. Stage and commit:
   git add <list of edited files>
   git commit -m "style(bulk-edit): apply Amplitude style rules to <collection_name> batch <n>"

2. Output a JSON summary:
{
  "collection": "<name>",
  "batch_index": <n>,
  "files_edited": <count>,
  "violations_fixed": {
    "active_voice": <n>,
    "present_tense": <n>,
    "contractions": <n>,
    "please_removed": <n>,
    "wordy_phrases": <n>,
    "first_person": <n>,
    "list_punctuation": <n>,
    "heading_issues": <n>
  },
  "files": ["filename1.md", "filename2.md"]
}

Do NOT push. The orchestrator handles pushing and PR creation.
```

---

## Step 5: Collect batch results

After each batch agent completes:

1. Parse its JSON summary.
2. Update `.claude/bulk-edit-state/progress.json` — mark the batch as `complete` and record violation counts.
3. If the batch failed (agent reported errors or no commit), mark it as `failed` and flag for human review. Do not retry automatically.

## Step 6: After all batches — spawn the Taxonomy & Navigation agent

When all batches for the persona group are complete, invoke `/taxonomy-nav`:

```
/taxonomy-nav group:<group-name> branch:<branch-name>
```

Wait for the Taxonomy agent to complete before proceeding. Review its report.

## Step 7: After taxonomy — run the QA Sampler

Invoke `/validate-style`:

```
/validate-style branch:<branch-name> sample:5
```

Parse the QA result:
- **PASS** (≥ 95% on all categories): proceed to PR creation.
- **WARN** (85–94% on any category): flag for tech writer review, but create the PR with a warning note.
- **FAIL** (< 85% on any category): do not create the PR. Report which files and categories failed. Re-run failed files with additional instructions.

## Step 8: Create the PR

For groups that pass QA, create a pull request:

```bash
gh pr create \
  --base main \
  --head bulk-edit/<group-name> \
  --title "style(bulk-edit): apply Amplitude style rules to <group-name> group" \
  --body "$(cat <<'EOF'
## Summary

Automated bulk application of Amplitude documentation style rules to all
<N> files in the <group-name> persona group.

**Collections included:** <comma-separated list>

## Style rules applied

- Active voice (two-pass check — highest priority)
- Present tense (no "will", "would")
- Contractions (don't, can't, isn't)
- Second person (you/your, no we/our)
- Direct instructions (no "please", imperative mood)
- Concise language (no "in order to", "via", "currently")
- Grammar and punctuation (Oxford comma, list punctuation)
- Headings (sentence case, no end punctuation, starts at ##)
- Inclusive terminology
- UI element formatting (bold for interactive, italics for navigation)
- Amplitude vocabulary

## Reader persona

**<persona name>** — <one-sentence persona description>

## Statistics

- Files edited: <N>
- Total violations fixed: <N>
- Most common fix: <category>

## Taxonomy & Navigation

Nav section titles corrected: <N>
Frontmatter title flags for tech writer review: <N>
Structural observations: <N> (see Taxonomy agent report in PR comments)

## QA sampling

Files sampled: <N>. Overall compliance score: <N>%. Result: PASS/WARN.

## Review guidance

Focus tech writer review on:
1. Active voice conversions — verify semantic accuracy
2. Persona-specific tone — confirm it matches the reader audience
3. Technical content — confirm no technical meaning was altered

@tech-writers please review before merging.

Bulk edit session: <session_id>
EOF
)"
```

## Step 9: Update progress and report

After creating the PR:

1. Update `.claude/bulk-edit-state/progress.json` group status to `pr_ready`.
2. Report to the user: PR URL, statistics, QA score, next group in queue.
3. **Pause before starting the next group.** Ask the user to confirm the PR looks good before continuing. This ensures human review at each group boundary.

## Processing order (recommended)

Run groups in this order — smallest and lowest-risk first:

| Order | Group | ~Files | Rationale |
|---|---|---|---|
| 1 | `developers` | 75 | Pilot — engineers can review accuracy fast |
| 2 | `experimenters` | 54 | Small, validates statistical language adjustments |
| 3 | `api-users` | 40 | Smallest group, fast to complete |
| 4 | `analysts-pms` | 144 | Medium size, core product docs |
| 5 | `admins-it` | 81 | Medium, many short RBAC entries |
| 6 | `engagement-survey-authors` | 67 | Medium, newer product area |
| 7 | `general-onboarding` | 280 | Large, includes many short glossary entries |
| 8 | `data-engineers` | 285 | Largest — coordinate with @amplitude/dwh first |

## Stop conditions

Stop and ask for human input when:
- QA fails (< 85%) for a group.
- A batch agent reports an error it can't resolve.
- A git merge conflict is detected.
- A PR receives review comments requiring changes.
- `git diff --name-only` shows any `.yaml` file was modified (abort immediately — collection config files must never change).

## Resumability

The orchestrator reads `.claude/bulk-edit-state/progress.json` before every action. Items with status `complete`, `qa_passed`, or `pr_ready` are skipped. Only `pending` or `failed` items are processed.

## Additional resources

- `.claude/docs/personas.md` — full persona definitions
- `.claude/skills/bulk-edit/references/collection-groups.md` — collection-to-group mapping
- `.claude/skills/taxonomy-nav/SKILL.md` — Taxonomy & Navigation agent
- `.claude/skills/validate-style/SKILL.md` — QA sampler
- `.claude/skills/edit-doc/SKILL.md` — core style rules (Phases 1–4)
