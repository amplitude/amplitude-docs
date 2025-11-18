## Update docs for UI changes

This command searches merged PRs in Amplitude's product repositories to identify UI/UX changes that require documentation updates.

**IMPORTANT:** 
- Always use the GitHub CLI (`gh`) to search for PRs. Don't use web search.
- After completing the report, **STOP and ask** if the user wants a Jira ticket created
- All updates are batched into ONE ticket and ONE git branch for efficient workflow

## Target Repositories

- **amplitude/amplitude** - Main product repository

## Step 1: Search for UI-Related PRs

**Use these `gh` commands to search for recently merged PRs:**

```bash
# Search amplitude/amplitude repository
gh pr list --repo amplitude/amplitude --state merged --limit 20 \
  --json number,title,mergedAt,labels,url \
  --search "UI OR button OR label OR navigation OR modal OR text"

# Search amplitude/javascript repository
gh pr list --repo amplitude/javascript --state merged --limit 20 \
  --json number,title,mergedAt,labels,url \
  --search "UI OR button OR label OR component OR text"
```

Search recently merged PRs (last 30 days) for these patterns:

### Code Patterns to Search
- Changes to button text, labels, or UI literals
- Navigation structure changes
- Modal or dialog text updates
- Form field labels or placeholder changes
- Menu item additions/removals
- Page title or heading changes
- Tooltip or help text modifications
- Error message updates
- Onboarding flow changes

### Search Keywords in PR Titles/Descriptions
- UI, UX, button, label, text
- navigation, menu, sidebar
- modal, dialog, tooltip
- rename, rebrand, relabel
- onboarding, wizard, flow
- settings, configuration UI

### Files to Inspect
Look for changes in:
- `*.tsx`, `*.jsx` files (React components)
- `*.vue` files (Vue components)
- Language/locale files (for example, `en.json`, `translations.json`)
- Component prop definitions
- Route definitions
- Navigation config files

## Step 2: Analyze Each PR for Documentation Impact

For each identified PR, extract:

1. **PR Title and Number**
2. **Repository** (amplitude/amplitude or amplitude/javascript)
3. **Merge Date**
4. **Changed UI Elements:**
   - Old text → New text (if renamed)
   - New features added
   - Removed features
   - Navigation path changes
5. **Product Area Affected:**
   - Analytics (charts, dashboards)
   - Data (sources, destinations, audiences)
   - Experiment (feature flags, A/B tests)
   - Session Replay
   - Admin/Settings
   - SDK integration

## Step 3: Map to Documentation Areas

Based on the product area, identify which documentation collections need updates:

| Product Area | Documentation Collections | Web Path |
|---|---|---|
| Event Segmentation | `event-segmentation` | `/docs/analytics/charts/event-segmentation/` |
| Funnel Analysis | `funnel-analysis` | `/docs/analytics/charts/funnel-analysis/` |
| Retention | `retention-analysis` | `/docs/analytics/charts/retention-analysis/` |
| Lifecycle | `lifecycle` | `/docs/analytics/charts/lifecycle/` |
| Cohorts/Audiences | `audiences` | `/docs/data/audiences/` |
| Sources | `sources`, `source-catalog` | `/docs/data/sources/`, `/docs/data/source-catalog/` |
| Destinations | `destination-catalog` | `/docs/data/destination-catalog/` |
| Data Management | `data` | `/docs/data/` |
| Experiment | `experiment` | `/docs/feature-experiment/` |
| Web Experiment | `web_experiment` | `/docs/web-experiment/` |
| Session Replay | `session-replay` | `/docs/session-replay/` |
| SDK - Browser | `browser_sdk` | `/docs/sdks/analytics/browser/` |
| SDK - iOS | `ios_sdk` | `/docs/sdks/analytics/ios/` |
| SDK - Android | `android_sdk` | `/docs/sdks/analytics/android/` |
| Admin | `admin`, `account-management` | `/docs/admin/` |
| Settings | `account-management` | `/docs/admin/account-management/` |

## Step 4: Generate Documentation Recommendations

For each PR, provide specific recommendations:

### If Button/Label Renamed
- **Action:** Update all occurrences of old button/label text
- **Search command:** Grep for old text across relevant collections
- **Replace with:** New button/label text
- **Files to check:** Step-by-step instructions, screenshots, UI element references

### If Navigation Changed
- **Action:** Update navigation paths in instructions
- **Example:** "**Settings** > **Projects**" → "**Admin** > **Projects**"
- **Files to check:** Any docs with navigation instructions

### If Feature Added
- **Action:** Create new documentation or update existing
- **Template:** Use new-feature-template.mdc
- **Consider:** Prerequisites, permissions, use cases

### If Feature Removed/Deprecated
- **Action:** Add deprecation notice or remove documentation
- **Update:** Related docs that reference the removed feature
- **Consider:** Adding migration guide if replacement exists

### If Settings/Configuration Changed
- **Action:** Update configuration docs and screenshots
- **Verify:** Field names, default values, validation rules
- **Files to check:** Admin docs, setup guides, quick starts

## Step 5: Create Summary Table

Generate a markdown table with findings:

```markdown
## UI Changes Requiring Documentation Updates

Found [X] merged PRs with UI changes that may impact documentation.

| PR | Repository | Change Type | Description | Affected Docs | Recommended Action | Priority |
|---|---|---|---|---|---|---|
| [#1234](link) | amplitude/amplitude | Button rename | "Export" → "Download" in cohorts | `/docs/data/audiences/` | Update button references in cohort export docs | High |
| [#1235](link) | amplitude/amplitude | Navigation | Moved "API Keys" under "Data" | `/docs/admin/` | Update navigation paths in API key setup | High |
| [#1236](link) | amplitude/javascript | New feature | Added TypeScript type exports | `/docs/sdks/analytics/browser/` | Document new TypeScript types | Medium |
```

### Priority Levels
- **High:** User-facing text changes, navigation changes, breaking changes
- **Medium:** New features, setting additions, minor UX improvements
- **Low:** Internal refactors, styling changes, tooltips

## Step 6: Provide Detailed Action Items

For each high/medium priority item, provide:

```markdown
### Action Item: [Description]

**Source PR:** [#1234](link) in amplitude/amplitude
**Product Area:** [Cohorts/Audiences]
**Change:** Button text changed from "Export" to "Download"

**Documentation to Update:**

1. `/docs/data/audiences/cohort-export.md`
   - Line 45: Update "Click **Export**" → "Click **Download**"
   - Line 67: Update screenshot showing Export button
   
2. `/docs/data/audiences/cohorts-overview.md`
   - Line 23: Update "export your cohort" → "download your cohort"
   
**Search Command:**
```bash
grep -r "Export" content/collections/audiences/
grep -r "export" content/collections/audiences/ | grep -i button
```

**Verification:**
- [ ] Updated all button references
- [ ] Updated screenshots if needed
- [ ] Verified no broken cross-references
- [ ] Tested internal links still work
```

## Step 7: Prompt for Jira Ticket Creation

**After generating the full report, STOP and ask the user:**

> "I found [X] UI changes requiring documentation updates. Would you like me to create a single Jira ticket to batch all these updates together?"

**If the user says yes:**

0. Verify that you can authenticate with Jira through the MCP. If authentication fails. Stop and prompt the user to reauthenticate.

1. Create ONE consolidated Jira ticket with:
   - Project: DOC
   - Issue Type: Task
   - Summary: "Update docs for UI changes from [date range]"
   - Description: Include full summary with all PRs, affected docs, and action items
   - Format description with tables and checklists from the report

2. After creating the ticket:
   - Display the ticket ID and URL
   - Remind user to create a single branch with the ticket ID
   - Example: `git checkout -b DOC-XXX-ui-updates-nov-2025`

**If the user says no:**
- End the report and let them handle ticket creation manually

### Jira Ticket Description Format

When creating the consolidated ticket, format the description like this:

```markdown
# UI Documentation Updates - [Date Range]

## Summary
Found [X] merged PRs with UI changes requiring documentation updates across [Y] product areas.

## High Priority Updates ([N] items)

### 1. [Change Description]
- **Source PR:** #[number] in [repo]
- **Merged:** [date]
- **Change:** [description]
- **Affected Docs:** [collection paths]
- **Action:** [what needs updating]

### 2. [Change Description]
...

## Medium Priority Updates ([N] items)
[Same format as above]

## Files to Update
- [ ] `content/collections/[path]/[file].md` - [what to change]
- [ ] `content/collections/[path]/[file].md` - [what to change]

## Search Commands
```bash
grep -r "old text" content/collections/[collection]/
```

## Verification Checklist
- [ ] All button/label references updated
- [ ] Screenshots updated where needed
- [ ] Navigation paths verified
- [ ] Internal links tested
- [ ] Product team review requested
```

## Usage Example

When this command is run, you should:

1. **Use GitHub CLI (gh) by default** to search for merged PRs
2. Analyze PR diffs for UI-related changes
3. Categorize by product area
4. Generate the complete summary report with all findings
5. **STOP and prompt user:** Ask if they want a Jira ticket created
6. **If yes:** Create ONE consolidated Jira ticket with all updates batched together
7. **If no:** End report and let user handle ticket creation

### Required: Use GitHub CLI Commands

Always use the `gh` command-line interface to search for PRs. Do NOT use web search.

**Example commands to run:**

```bash
# Search for UI-related PRs in amplitude/amplitude (last 30 days)
gh pr list --repo amplitude/amplitude --state merged --limit 20 \
  --json number,title,mergedAt,labels,url \
  --search "UI OR button OR label OR navigation OR modal OR text"

# Search for UI-related PRs in amplitude/javascript (last 30 days)
gh pr list --repo amplitude/javascript --state merged --limit 20 \
  --json number,title,mergedAt,labels,url \
  --search "UI OR button OR label OR component OR text"

# Get detailed PR information
gh pr view <PR_NUMBER> --repo amplitude/amplitude \
  --json title,body,files,mergedAt,url

# View PR diff for specific files
gh pr diff <PR_NUMBER> --repo amplitude/amplitude
```

### Workflow Steps with gh CLI

1. **Check gh is installed and authenticated:**
   ```bash
   gh --version
   gh auth status
   ```

2. **Search both repositories for UI-related PRs:**
   - Run search queries for amplitude/amplitude
   - Run search queries for amplitude/javascript
   - Capture JSON output for analysis

3. **Analyze high-priority PRs:**
   - Use `gh pr view` to get detailed information
   - Check the files changed (look for i18n files, component files)
   - Extract old/new text from PR descriptions

4. **Generate recommendations:**
   - Map PRs to documentation collections
   - Search docs for affected content
   - Create detailed action items

5. **Create Jira tickets:**
   - Use MCP Atlassian tools to create DOC tickets
   - Link to source PRs in descriptions

## Output Format

```markdown
## UI Changes Documentation Update Report
Generated: [Date]

## Summary
- Repositories checked: amplitude/amplitude, amplitude/javascript
- Date range: [Last 30 days]
- Total PRs analyzed: [X]
- PRs with UI changes: [Y]
- Documentation updates required: [Z]

## High Priority Updates ([N] items)
[Detailed table and action items]

## Medium Priority Updates ([N] items)
[Detailed table and action items]

## Low Priority Updates ([N] items)
[Brief list]

## Jira Ticket (if created)
- DOC-XXX: Update docs for UI changes from [date range]
  - [Link to ticket]
  - Contains: [N] high priority, [N] medium priority updates

## Next Steps
1. **If Jira ticket was created:**
   - Create single branch: `git checkout -b DOC-XXX-ui-updates-nov-2025`
   - Work through high priority items first
   - Commit changes as you complete each update
   - Submit single PR with all updates when complete
   
2. **If no Jira ticket created:**
   - User will handle ticket creation manually
   - Provide report for reference

3. **Always:**
   - Request review from product team to verify accuracy
   - Update screenshots where needed
   - Test all navigation paths and links
```

## Notes

- Focus on user-facing changes that affect how users interact with the product
- Screenshots are often needed when UI text changes
- Cross-check related documentation that might reference the changed UI
- Consider if video tutorials or GIFs need updates
- Verify changes with product team if unclear