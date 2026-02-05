---
name: document-feature
description: Interactive wizard for creating new feature documentation with proper structure and style.
---

# Document Feature

Interactive wizard for creating new feature documentation with proper structure and style.

## When to Use This Skill

Use this skill when you need to create documentation for a new Amplitude product feature from scratch.

**Invoke with:**
- `/document-feature`
- "I need to document a new feature called [name]"
- "Create feature docs for [feature name]"

## What This Skill Does

This skill guides you through a multi-step process to create properly structured, style-compliant feature documentation:

1. Gathers essential information about the feature
2. Determines the correct collection and location
3. Generates structured markdown with proper frontmatter
4. Applies all Amplitude style rules automatically
5. Suggests filename and provides next steps

## Step 1: Gather Information

Ask these questions to understand the feature:

### 1. Feature Name
**Question:** What's the feature called?

### 2. Product Area
**Question:** Which product is this for?

Options:
- **Analytics** - Charts, analysis tools, dashboards
- **CDP/Audiences** - Cohorts, syncing, destinations
- **Data Management** - Taxonomy, governance, sources, ingestion
- **Session Replay** - Session recording and playback
- **Feature Experiment** - Experimentation and A/B testing
- **Web Experiment** - Web-specific experiments
- **SDK/API** - Software development kits or APIs
- **Admin/Account Management** - Settings, permissions, billing
- **Other** - Let user specify

### 3. User Benefit
**Question:** What problem does this solve or what does it enable? (1-2 sentences)

This becomes the opening description and helps determine the "this_article_will_help_you" bullets.

### 4. Prerequisites
**Question:** What do users need before using this feature?

Consider:
- Plan tier requirements (Free, Growth, Enterprise)
- Permissions/roles required
- Prior setup or configuration needed
- Integrations that must be enabled
- Dependencies on other features

If none, note that and skip the Prerequisites section.

### 5. Primary Workflow
**Question:** What's the main task or workflow users complete with this feature?

Understand the key steps so you can write clear, numbered instructions.

## Step 2: Determine Collection

Based on the product area, determine the correct collection folder and web route:

| Product Area | Collection Folder | Web Route Pattern |
|--------------|------------------|-------------------|
| Analytics (general) | `analytics` | `/docs/analytics/{slug}` |
| Event Segmentation | `event-segmentation` | `/docs/analytics/charts/event-segmentation/{slug}` |
| Funnel Analysis | `funnel-analysis` | `/docs/analytics/charts/funnel-analysis/{slug}` |
| Retention Analysis | `retention-analysis` | `/docs/analytics/charts/retention-analysis/{slug}` |
| Lifecycle | `lifecycle` | `/docs/analytics/charts/lifecycle/{slug}` |
| Other Analytics Charts | `charts` | `/docs/analytics/charts/{slug}` |
| CDP/Audiences | `audiences` | `/docs/data/audiences/{slug}` |
| Data Management | `data` | `/docs/data/{slug}` |
| Sources | `sources` | `/docs/data/sources/{slug}` |
| Destinations | `destination-catalog` | `/docs/data/destination-catalog/{slug}` |
| Session Replay | `session-replay` | `/docs/session-replay/{slug}` |
| Feature Experiment | `experiment` | `/docs/feature-experiment/{slug}` |
| Web Experiment | `web_experiment` | `/docs/web-experiment/{slug}` |
| Experiment SDKs | `experiment-sdks` | `/docs/sdks/experiment-sdks/{slug}` |
| Browser SDK | `browser_sdk` | `/docs/sdks/analytics/browser/{slug}` |
| iOS SDK | `ios_sdk` | `/docs/sdks/analytics/ios/{slug}` |
| Android SDK | `android_sdk` | `/docs/sdks/analytics/android/{slug}` |
| Analytics API | `api` | `/docs/apis/analytics/{slug}` |
| Experiment API | `experiment-apis` | `/docs/apis/experiment/{slug}` |
| Account Management | `account-management` | `/docs/admin/account-management/{slug}` |
| Admin | `admin` | `/docs/admin/{slug}` |

**Tell the user:**
"Based on [product area], this should go in the `[collection-name]` collection."

## Step 3: Generate Document Structure

Create a new markdown file with this structure:

```markdown
---
id: [Generate a UUID using uuidv4 format]
blueprint: [Determine from collection - see Blueprint Reference below]
title: [Feature Name]
this_article_will_help_you:
  - '[Key benefit 1]'
  - '[Key benefit 2]'
landing: false
exclude_from_sitemap: false
---

[One-sentence description of what this feature does and why it matters]

## Prerequisites

[If prerequisites exist, list them. Otherwise, remove this section]

- [Prerequisite 1]
- [Prerequisite 2]

## [Primary Task Heading - Use Action Verb]

[Brief introduction to the workflow - 1-2 sentences]

1. Navigate to *[Location in Product]*.
2. Select **[Button or Option]**.
3. Configure the settings:
   - **[Setting Name]**: [What it does]
   - **[Setting Name]**: [What it does]
4. Select **[Action Button]**.

[Result description - what happens after these steps]

### Example

[If applicable, show a code example, configuration example, or concrete scenario]

## Common use cases

[Optional: If there are multiple distinct ways to use this feature]

### [Use case 1]

[Brief description and key steps]

### [Use case 2]

[Brief description and key steps]

## Common questions

### [Question 1 - phrase as user would ask]

[Answer in 2-3 sentences]

### [Question 2]

[Answer in 2-3 sentences]

## Related resources

- [Related documentation](/docs/[collection]/[slug])
- [Another related doc](/docs/[collection]/[slug])
```

## Step 4: Apply Style Rules

Ensure ALL generated content follows Amplitude documentation standards:

### Active Voice (CRITICAL - Do Two Passes)
- "Settings can be configured by users"
- "Configure the settings"

Search for passive patterns and convert:
- `is/are/was/were [verb]ed`
- `can be`, `will be`, `should be`

### Present Tense
- "The feature will allow you to"
- "The feature lets you"

Remove: `will`, `would be`, `going to`

### Contractions Required
- "cannot", "does not", "is not"
- "can't", "doesn't", "isn't"

### Second Person
- "Users should navigate to..."
- "Navigate to..."

Use "you" throughout, avoid "we", "users"

### Direct Instructions (No "Please")
- "Please click the button"
- "Select the button"

### Concise Language
- "in order to", "via", "desired"
- "to", "through", "want/need"

### UI Formatting
- **Bold** for interactive elements: buttons, tabs, fields
- *Italics* for navigation paths: *Settings > API Keys*

### Internal Links
- `[Link text](/docs/collection-path/slug)`
- `[Link](../relative-path.md)`

## Step 5: Suggest Filename and Location

Recommend to the user:

**Filename:** `[feature-name-in-kebab-case].md`
- Use lowercase
- Separate words with hyphens
- Keep it concise but descriptive
- Example: `predictive-cohorts.md`, `custom-dashboards.md`

**Location:** `content/collections/[collection-name]/en/[filename]`

**Web URL (after deployment):** `/docs/[route-path]/[slug]`

## Step 6: Remind About Next Steps

After generating the document, remind the contributor:

### Before Submitting PR:

1. **Add images** if helpful
   - Place in `public/docs/output/img/[collection]/`
   - Include descriptive alt text
   - Example: `![Dashboard with event analytics](dashboard.png)`

2. **Add code examples** (for SDK/API docs)
   - Use realistic examples
   - Include language identifiers in code blocks
   - Test that code actually works

3. **Test the steps**
   - Verify the workflow matches the product
   - Ensure all links work
   - Check screenshots are current

4. **Validate links**
   - Use `/validate-links` skill to check
   - Ensure all internal links use web routes

### Submitting:

1. **Create a branch:**
   ```bash
   git checkout -b docs/[feature-name]
   ```

2. **Commit changes:**
   ```bash
   git add .
   git commit -m "Add docs for [feature name]"
   ```

3. **Push and create PR:**
   ```bash
   git push origin docs/[feature-name]
   ```

4. **Tag for review:**
   - Tag `@tech-writers` in the PR
   - Or mention in `#amplitude-docs` Slack
   - Tech writers review within 2 business days

5. **Vercel preview:**
   - Automatically generated on PR
   - Review the preview to see how it looks

## Blueprint Reference

Each collection uses specific blueprints for frontmatter. Check existing files in the target collection to confirm, but common blueprints include:

- `analytic` - Analytics collection
- `lifecycle`, `funnel_analysis`, `event_segmentation` - Chart-specific collections
- `data` - Data collection
- `audience` - Audiences collection
- `sdk` - SDK documentation
- `api` - API documentation
- `experiment` - Experiment features
- `admin` - Admin/settings documentation
- `session_replay` - Session Replay features

**To verify:** Look at the frontmatter of an existing file in the target collection.

## Example Interaction

**User:** "I need to document the new cohort sync feature"

**Your Response:**
"I'll help you document cohort sync. Let me gather some information:

1. **Feature name:** Is "Cohort Sync" the official feature name?
2. **Product area:** This sounds like CDP/Audiences - is that correct?
3. **User benefit:** What's the main benefit? For example, 'Sync cohorts to marketing platforms in real time'?
4. **Prerequisites:** Do users need:
   - Specific destination integrations configured?
   - A particular plan tier?
   - Any permissions?
5. **Primary workflow:** What's the main task? Something like 'Create and configure a cohort sync'?

Once you provide these details, I'll generate the documentation with proper structure, style, and routing."

## Tips for Quality Documentation

When generating or reviewing documentation:

- **Start with "why"** - Explain the value before diving into steps
- **Use real examples** - Show actual values, not just placeholders
- **Anticipate questions** - What would confuse users? Address it proactively
- **Cross-link effectively** - Connect to related documentation
- **Show, don't just tell** - Suggest where screenshots would help
- **Test the steps** - Verify the workflow matches the actual product

## Common Mistakes to Avoid

1. **Using relative links:** Always use full `/docs/` web routes
2. **Passive voice:** Search twice for passive constructions
3. **Future tense:** Remove "will" - use present tense
4. **Missing contractions:** Always use "can't" not "cannot"
5. **Using "please":** Instructions should be direct imperatives
6. **Wrong collection:** Verify collection matches product area
7. **Missing prerequisites:** If there are plan tier or permission requirements, include them

## Follow-up Actions

After completing the document generation:

1. Ask if they want to use `/validate-links` to check the links
2. Offer to use `/edit-doc` if they modify the content later
3. Remind them about PR process and tech writer review
