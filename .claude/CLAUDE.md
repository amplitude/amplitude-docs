# Amplitude Documentation - Claude Code Configuration

## Project Overview

This is the Amplitude product documentation repository. You're working with a sophisticated documentation system built on Statamic CMS that serves comprehensive product documentation for Amplitude's product suite.

### Team Context

**Scaling challenge**: This documentation system enables a 2-person technical writing team to scale to support 125+ engineers through AI-assisted documentation with enforced quality standards.

**Your role**: Help engineers and contributors create high-quality documentation that meets Amplitude's style standards automatically.

### Documentation Philosophy

1. **Engineer-authored docs**: Engineers write documentation with AI assistance
2. **AI-enforced quality**: Style rules apply automatically during editing
3. **Tech writer polish**: Technical writers provide final review and enhancement
4. **Consistent standards**: Vale linting + Claude Code rules ensure quality

### Repository Structure

```
amplitude-docs/
├── content/
│   └── collections/          # All documentation lives here
│       ├── analytics/        # Analytics product docs
│       ├── data/            # Data management (CDP) docs
│       ├── experiment/      # Experiment docs
│       ├── session-replay/  # Session Replay docs
│       ├── guides_and_surveys/ # Guides & Surveys docs
│       ├── sdks/            # SDK documentation
│       ├── apis/            # API documentation
│       ├── admin/           # Admin and settings
│       └── [70+ more]/      # Each product area has a collection
│
├── .claude/                 # Claude Code configuration (this directory)
│   ├── CLAUDE.md           # This file - always-active context
│   ├── skills/             # Executable workflows
│   ├── docs/               # Reference documentation
│   └── README.md           # Navigation hub
│
├── .cursor/                # Cursor rules (parallel system)
├── .github/                # CI/CD and Vale configuration
└── public/                 # Built site

```

### Technologies Used

- **Statamic CMS**: Laravel-based CMS for content management
- **Laravel**: PHP framework powering Statamic
- **Markdown**: All documentation written in markdown
- **Vale**: Style linting (runs in CI/CD)
- **Vercel**: Deployment and preview environments

### Documentation Workflows

**For engineers** (most common):
1. Use `/document-feature` skill to create new feature documentation
2. Use `/edit-doc` skill to apply all style rules to existing documentation
3. Use `/validate-links` skill to check internal links

**For technical writers**:
1. Review PRs for technical accuracy and completeness
2. Enhance documentation with additional context
3. Manage documentation architecture

---

## Core Style Rules

All documentation must follow these style standards. These rules apply automatically when you're editing or creating documentation.

### 1. Active Voice (HIGHEST PRIORITY)

**Use active voice** to make documentation clear and direct. Active voice emphasizes who performs the action.

This is the **MOST COMMONLY VIOLATED** rule. When applying style rules, you MUST do a **TWO-PASS CHECK** for active voice:
1. First pass: Convert obvious passive voice
2. Second pass: Search specifically for remaining passive voice patterns

#### Common Passive Voice Patterns to Find

Search for these patterns and convert them to active voice:
- `is/are/was/were [verb]ed` → Rewrite with subject performing action
- `can be [verb]ed` → "You can [verb]" or "[subject] [verbs]"
- `will be [verb]ed` → "[subject] [verbs]"
- `should be [verb]ed` → "[subject] should [verb]"

#### Examples

**Events and actions:**
- ❌ "Events are sent to the API endpoint."
- ✅ "Send events to the API endpoint." or "The SDK sends events to the API endpoint."

**Configuration:**
- ❌ "The configuration is created by the system."
- ✅ "The system creates the configuration."

**User actions:**
- ❌ "Users can be assigned to groups."
- ✅ "You can assign users to groups."

**Permissions:**
- ❌ "Permissions are granted at the organization level."
- ✅ "Amplitude grants permissions at the organization level."

**Data processing:**
- ❌ "Data is processed in real time."
- ✅ "Amplitude processes data in real time."

**Removal/deletion:**
- ❌ "If a user is removed from a group, their access is revoked."
- ✅ "If you remove a user from a group, Amplitude revokes their access."

#### Critical Two-Pass Process

**Pass 1**: Read through and convert obvious passive voice.

**Pass 2**: Search explicitly for these patterns:
```
is assigned | are assigned | is removed | are removed | can be |
will be | is granted | are granted | is created | are created |
was assigned | were assigned | is sent | are sent | is processed
```

Convert ALL instances to active voice before considering the document complete.

---

### 2. Present Tense

**Use present tense** to describe current functionality. Avoid future tense constructions.

#### Patterns to Avoid

- `will` → Use present tense instead
- `would be` → Use "is" or imperative form
- `we are going to` → Use present tense
- `going to` → Use present tense

#### Examples

**Features:**
- ❌ "This feature will allow you to configure settings."
- ✅ "This feature lets you configure settings."

**API responses:**
- ❌ "The API will return a response."
- ✅ "The API returns a response."

**User actions:**
- ❌ "You'll need to configure the endpoint."
- ✅ "You need to configure the endpoint." or "Configure the endpoint."

**Modal windows:**
- ❌ "The modal will open."
- ✅ "The modal opens."

#### Implementation Tips

- Start instructions with imperative verbs: Configure, Create, Navigate, Use
- Describe what the product **does**, not what it **will do**
- When referring to user actions, use second person ("you") with present or imperative forms

---

### 3. Contractions (Required)

**Contractions make documentation more conversational and easier to read.** Use contractions except at the end of sentences or when emphasis is needed.

#### Required Contractions

Use these contractions instead of their expanded forms:

- "don't" instead of "do not"
- "can't" instead of "cannot"
- "isn't" instead of "is not"
- "aren't" instead of "are not"
- "doesn't" instead of "does not"
- "hasn't" instead of "has not"
- "haven't" instead of "have not"
- "wasn't" instead of "was not"
- "weren't" instead of "were not"
- "won't" instead of "will not" (but prefer present tense)
- "shouldn't" instead of "should not"
- "couldn't" instead of "could not"
- "wouldn't" instead of "would not"

#### Examples

**Before:**
```
You cannot configure the API until you do not have valid credentials.
This feature is not available in the free tier.
```

**After:**
```
You can't configure the API until you have valid credentials.
This feature isn't available in the free tier.
```

#### Exceptions

- End of sentences where emphasis is needed: "That is important." not "That's important."
- Technical terms or formal contexts where contraction would be unclear

---

### 4. Second Person (You/Your)

**Write in second person** to directly address readers. Minimize first-person usage.

#### Use Second Person ("You")

Address the reader directly using "you" and "your."

**Examples:**
- ✅ "You can configure your API settings in the dashboard."
- ✅ "Your organization has access to these features."
- ✅ "When you create a new project, Amplitude generates a unique ID."

#### Avoid First Person Plural ("We")

Don't use "we," "our," or "us" unless specifically referring to collaborative actions or the Amplitude team in appropriate contexts.

**Examples:**
- ❌ "We recommend using the latest SDK version."
- ✅ "Use the latest SDK version." or "Amplitude recommends using the latest SDK version."
- ❌ "Let's configure the API endpoint."
- ✅ "Configure the API endpoint."
- ❌ "In our example, we'll use React."
- ✅ "This example uses React."

#### Avoid First Person Singular ("I")

Never use "I," "me," "my," or "mine" in documentation.

**Examples:**
- ❌ "I'll show you how to configure..."
- ✅ "This guide shows how to configure..."
- ❌ "In my experience, this approach works best."
- ✅ "This approach works best for most use cases."

#### Product and Company References

When referring to Amplitude as a product or company:
- Use "Amplitude" as the subject: "Amplitude provides..."
- Focus on what users do: "You send events to Amplitude."

---

### 5. Direct Instructions (No "Please")

**Write instructions directly** without unnecessary politeness markers. Be clear and imperative.

#### Never Use "Please"

Don't ask users to perform actions. Tell them what to do.

**Examples:**
- ❌ "Please navigate to the Settings page."
- ✅ "Navigate to the Settings page."
- ❌ "Please make sure to save your changes."
- ✅ "Save your changes."
- ❌ "Please refer to the documentation for more details."
- ✅ "See the documentation for more details."

#### Use Imperative Mood

Start instructions with action verbs in the imperative mood.

**Common instruction verbs:**
- Configure, Create, Delete, Update, Edit
- Navigate, Select, Choose, Click
- Enter, Type, Specify, Define
- Install, Run, Execute, Deploy
- Enable, Disable, Toggle, Set
- Review, Check, Verify, Validate
- Export, Import, Upload, Download

**Examples:**
- ✅ "Configure the API endpoint in the settings file."
- ✅ "Create a new project in the Amplitude dashboard."
- ✅ "Navigate to *Settings > API Keys*."
- ✅ "Select the events you want to track."

#### Avoid Hedging Language

Remove qualifiers that weaken instructions:

- ❌ "You might want to configure..."
- ✅ "Configure..."
- ❌ "You should probably check..."
- ✅ "Check..."
- ❌ "It would be good to review..."
- ✅ "Review..."

---

### 6. Concise Language

**Use simple, direct language.** Avoid wordy phrases and bureaucratic constructions.

#### Prepositions and Conjunctions

- ❌ "in order to" → ✅ "to"
- ❌ "via" → ✅ "through"
- ❌ "prior to" or "previous to" → ✅ "before"
- ❌ "subsequent to" → ✅ "after"
- ❌ "in spite of" → ✅ "despite"
- ❌ "with regard to" → ✅ "regarding"
- ❌ "in addition" → ✅ "also"

#### Time-Related Phrases

- ❌ "at the present time" → ✅ "now"
- ❌ "at this point in time" → ✅ "at this point"
- ❌ "in the near future" → ✅ "soon"
- ❌ "at a later date" → ✅ "later"
- ❌ "during the time that" → ✅ "while"
- ❌ "for the duration of" → ✅ "during"

#### Causal Phrases

- ❌ "due to the fact that" → ✅ "because"
- ❌ "because of the fact that" → ✅ "because"
- ❌ "based on the fact that" → ✅ "because"
- ❌ "as a result of" → ✅ "because of"

#### Conditional Phrases

- ❌ "in the event that" → ✅ "if"
- ❌ "if this is not the case" → ✅ "if not"
- ❌ "except when" → ✅ "unless"

#### Verbal Phrases

- ❌ "utilize" or "make use of" → ✅ "use"
- ❌ "perform an assessment of" → ✅ "assess"
- ❌ "conduct an investigation" → ✅ "investigate"
- ❌ "take action" → ✅ "act"
- ❌ "make reference to" → ✅ "refer to"
- ❌ "has the ability to" → ✅ "can"
- ❌ "has the capacity to" → ✅ "can"

#### Quantifiers

- ❌ "a large number of" → ✅ "many"
- ❌ "a majority of" → ✅ "most"
- ❌ "an adequate number of" → ✅ "enough"

#### Remove Temporal Qualifiers

- ❌ "currently" - Documentation always represents the current state
- ❌ "at present"
- ❌ "right now"

**Exception:** When describing version-specific behavior or deprecated features, temporal qualifiers may be necessary.

---

### 7. Grammar and Punctuation

Follow these grammar and punctuation standards for consistency and clarity.

#### Oxford Comma (Serial Comma) - REQUIRED

Always use the Oxford comma in lists of three or more items.

**Examples:**
- ❌ "Configure events, properties and user attributes."
- ✅ "Configure events, properties, and user attributes."
- ❌ "Amplitude supports iOS, Android and web platforms."
- ✅ "Amplitude supports iOS, Android, and web platforms."

#### Avoid "etc."

Don't end lists with "etc." Start the sentence with "for example" or use "such as" instead.

**Examples:**
- ❌ "You can track events like clicks, page views, etc."
- ✅ "For example, you can track events like clicks and page views."
- ✅ "You can track events such as clicks, page views, and form submissions."

#### Sentence Length

Keep sentences under 30 words when possible. Break long sentences into multiple shorter ones.

**Example:**
- ❌ "When you configure the API endpoint in the settings file, you need to ensure that you have the correct credentials and that the endpoint URL is properly formatted, otherwise the connection fails."
- ✅ "Configure the API endpoint in the settings file. Ensure you have the correct credentials and that the endpoint URL is properly formatted. Otherwise, the connection fails."

#### Lists

**Bulleted Lists**: Use for unordered items. Maintain parallel structure.

**Numbered Lists**: Use for sequential steps or ordered items.

**Capitalization and Punctuation in Lists**:
- Capitalize the first word of each list item
- Always use ending punctuation for all list items (periods, question marks, or exclamation points as appropriate)
- Use periods for both complete sentences and fragments

---

### 8. Headings and Structure

Follow these rules for creating clear, consistent headings in documentation.

#### Never Use H1 in Document Body

The page title is always H1. Start document content with H2 (`##`) headings.

**Examples:**
- ❌ `# Introduction` (in document body)
- ✅ `## Introduction`

#### No End Punctuation in Headings

Don't use periods, question marks, exclamation points, or colons at the end of headings.

**Examples:**
- ❌ `## How do I configure the API?`
- ✅ `## Configure the API`
- ❌ `## Prerequisites:`
- ✅ `## Prerequisites`

#### Use Sentence Case

Use sentence case (capitalize only the first word and proper nouns) rather than title case.

**Examples:**
- ❌ `## Configure Your API Settings` (title case)
- ✅ `## Configure your API settings` (sentence case)

**Exception:** Proper nouns and product names retain their capitalization:
- ✅ `## Configure Amplitude Analytics`
- ✅ `## Send data to Amazon S3`

#### Use Descriptive, Action-Oriented Headings

**Task-based headings** (preferred for procedures):
- ✅ `## Configure authentication`
- ✅ `## Send your first event`
- ✅ `## Create a custom dashboard`

**Concept-based headings** (for explanatory content):
- ✅ `## How authentication works`
- ✅ `## Event tracking overview`
- ✅ `## Data privacy and compliance`

#### Maintain Proper Heading Hierarchy

Don't skip heading levels.

**Examples:**
```markdown
## Main section (H2)

### Subsection (H3)

#### Detail (H4)
```

❌ **Don't skip levels:**
```markdown
## Main section (H2)

#### Detail (H4) ← Skipped H3
```

---

### 9. Inclusive Terminology

Use inclusive, modern terminology that avoids potentially offensive or outdated terms.

#### Access Control Terms

- ❌ "blacklist" → ✅ "block list" or "deny list"
- ❌ "whitelist" → ✅ "allow list" or "accept list"

#### Process Termination

- ❌ "kill" → ✅ "end", "cancel", "stop", or "terminate"
- ❌ "abort" → ✅ "end", "cancel", or "stop"

#### Legacy and Exemption

- ❌ "grandfathered" → ✅ "legacy" or "exempt"

#### Placeholder Terms

- ❌ "dummy" → ✅ "placeholder", "mock", "stub", or "sample"

#### UI State Terms

- ❌ "grayed-out" → ✅ "disabled" or "inactive"

#### Verification Terms

- ❌ "sanity-check" → ✅ "validate", "verify", or "final check"

#### Navigation Terms

- ❌ "see" (when referring to other documentation) → ✅ "go to", "navigate to", "review", or "refer to"

#### Latin Terminology

Avoid Latin terms and phrases. Use plain English alternatives:

- ❌ "versus" or "vs." → ✅ "compared to" or "compared with"
- ❌ "via" → ✅ "through" or "using"
- ❌ "per" → ✅ "for each" or "according to"
- ❌ "e.g." → ✅ "for example"
- ❌ "i.e." → ✅ "that is"
- ❌ "etc." → ✅ Start with "for example" or "such as"

#### Gender-Neutral Language

Use gender-neutral pronouns and terms:
- Use "they/their" for singular when gender is unknown
- Use role-based terms: "developer," "user," "administrator"
- Avoid "guys" when referring to groups

**Examples:**
- ❌ "Each developer should configure his API key."
- ✅ "Each developer should configure their API key."
- ✅ "Developers should configure their API keys."

---

### 10. Technical Writing

Follow these guidelines when documenting technical concepts, code, and APIs.

#### Code Formatting

Use backticks for all code-related elements:

**Inline code elements:**
- File names and paths: `config.json`, `/etc/amplitude/settings`
- Function and method names: `logEvent()`, `setUserId()`
- Variable names: `api_key`, `userId`
- Parameter names: `event_name`, `event_properties`
- API endpoints: `/api/v2/events`
- Class names: `AmplitudeClient`, `EventData`
- Package names: `@amplitude/analytics-browser`
- Command-line commands: `npm install`, `php artisan`

**Examples:**
- ✅ "Set the `api_key` parameter in your `config.json` file."
- ✅ "Call the `logEvent()` method to track user actions."
- ❌ "Set the api_key parameter in your config.json file." (missing backticks)

#### UI Element References

**CRITICAL FORMATTING RULE:**

**Bold = Interactive UI literals only**
**Italics = Orientation elements**

##### Bold for Interactive Elements

Use bold ONLY for UI elements that users directly interact with:

- Buttons: **Save**, **Cancel**, **Create Project**
- Clickable tabs: **Configuration**, **Analytics**, **Settings**
- Input field labels: **Project Name**, **API Key**, **Event Type**
- Checkboxes and radio buttons: **Enable tracking**, **Advanced mode**
- Menu items: **File**, **Edit**, **View**
- Dropdowns and selectable options: **Select all**, **None**

**Examples:**
- ✅ "Enter your project name in the **Project Name** field."
- ✅ "Select **Save** to save your changes."
- ✅ "In the **Region** dropdown, select **US**."
- ✅ "Select the **Advanced** tab to view more options."

##### Italics for Orientation Elements

Use italics for UI elements that orient users but aren't directly interactive:

- Page headings visible in the UI: *Settings*, *Dashboard*, *Analytics*
- Section titles within pages: *API Configuration*, *User Management*
- Navigation paths and hierarchies: *Settings > API Keys*, *Data > Sources*
- Panel or card titles: *Recent Activity*, *Quick Stats*
- Non-interactive labels or headings: *Overview*, *Details*

**Examples:**
- ✅ "Navigate to *Settings > API Keys* to view your credentials."
- ✅ "Go to *Settings > Data > Sources* to configure your data sources."
- ✅ "The *Dashboard* page displays your project metrics."
- ✅ "Under the *API Configuration* section, enter your credentials."
- ❌ "Navigate to **Settings** > **API Keys**" (don't use bold for navigation paths)
- ❌ "The **Dashboard** page displays..." (don't use bold for page names unless instructing to click)

##### Navigation Paths

Always use italics for navigation hierarchies with angle brackets (>) to show paths:

```markdown
*Settings > API Keys*
*Data > Sources > Integrations*
*Analytics > Reports > Custom*
```

##### When Both Formatting Types Appear

Sometimes you need both in one instruction:

- ✅ "On the *Settings* page, select **Save Changes**." (page name in italics, button in bold)
- ✅ "Navigate to *Data > Sources*, then select **Add Source**." (path in italics, button in bold)
- ✅ "In the *API Configuration* section, enter your key in the **API Key** field." (section in italics, field label in bold)

#### Numbers and Units

**Numbers:**
- Spell out numbers one through nine in prose
- Use numerals for 10 and above
- Use numerals for all technical measurements, versions, and quantities

**Units:**
- Use standard abbreviations: KB, MB, GB, TB (not kb, mb)
- Include a space between number and unit: "100 MB" not "100MB"
- For time: ms (milliseconds), s (seconds), min (minutes)

---

### 11. Amplitude Vocabulary

Use these approved terms consistently throughout the documentation.

#### Product Names

Always capitalize Amplitude product and feature names:
- **Amplitude** (the product)
- **Amplitude Analytics**
- **Session Replay**
- **Heatmaps**
- **Guides & Surveys** (note the ampersand)
- **Resource Center**
- **Experiment** (for the experimentation product)
- **Data**

#### Core Concepts

**Events and Properties:**
- **event** - An action a user takes
- **event type** - The name/category of an event
- **event properties** - Attributes describing an event (use "properties" not "attributes")
- **user properties** - Attributes describing a user
- **group properties** - Attributes describing a group

**User Identification:**
- **user ID** (not userId in prose, but `userId` in code)
- **device ID**
- **anonymous user**
- **identified user**

#### Technical Terms (Approved Spellings)

- **API** (Application Programming Interface)
- **SDK** (Software Development Kit)
- **HTTP** / **HTTPS**
- **JSON** (not Json)
- **OAuth** (not oAuth or OAUTH)
- **UUID**
- **JavaScript** (not Javascript or javascript in prose)
- **TypeScript**
- **Node.js** (note the capitalization and period)
- **iOS** (not IOS or ios)
- **Android**
- **npm** (not NPM)

#### Amplitude-Specific Terms

- **Ampli** - Amplitude's type-safe analytics wrapper
- **API key** (not api key or API-key)
- **tracking plan** - Definition of events and properties
- **cohort** - A group of users with shared characteristics
- **real-time** (hyphenated as adjective: "real-time analytics")

#### Third-Party Product Names

Maintain official capitalization:
- **GitHub** (not Github)
- **BigQuery**
- **Snowflake**
- **AWS** (Amazon Web Services)

---

### 12. Images and Accessibility

Always include descriptive alt text for images to ensure accessibility.

#### Always Include Alt Text

Never use empty brackets for images. All images must have descriptive alt text.

**Examples:**
- ❌ `![](screenshot.png)` (empty alt text)
- ✅ `![Dashboard showing event analytics](screenshot.png)`
- ✅ `![API configuration settings page](config-screenshot.png)`

#### Writing Good Alt Text

Alt text should:
1. Describe the content and purpose of the image
2. Be concise but meaningful (typically under 150 characters)
3. Not include phrases like "image of" or "screenshot of" (screen readers announce this automatically)
4. Focus on the information the image conveys, not just what it looks like

**Examples:**

For a UI screenshot:
```markdown
![Settings page with API key configuration form](settings-api-keys.png)
```

For a diagram:
```markdown
![Data flow from client SDK through Amplitude servers to analytics dashboard](data-flow-diagram.svg)
```

---

## Statamic Routing for Internal Links

### CRITICAL RULE: Use Web Routes, Not File Paths

When creating internal links between documentation pages, you MUST use the web route defined in the collection's YAML file, NOT the file path or relative path.

All internal documentation links must:
1. Start with `/docs/`
2. Follow the route pattern from the collection YAML
3. Use the document's slug (filename without `.md`)
4. Never use relative paths (`../`) or file extensions (`.md`)

### Examples

#### ✅ Correct Internal Links

```markdown
[Lifecycle chart](/docs/analytics/charts/lifecycle/lifecycle-track-growth)
[Event Segmentation](/docs/analytics/charts/event-segmentation/event-segmentation-build)
[Browser SDK](/docs/sdks/analytics/browser/browser-sdk-2)
[Taxonomy API](/docs/apis/analytics/taxonomy)
[Account settings](/docs/admin/account-management/account-settings)
```

#### ❌ Incorrect Internal Links

```markdown
<!-- Don't use relative paths -->
[Lifecycle](../lifecycle/lifecycle-track-growth.md)

<!-- Don't use file paths -->
[API](/content/collections/api/en/taxonomy.md)

<!-- Don't use collection paths without /docs/ -->
[Settings](/admin/account-management/account-settings)
```

### Top 20 Collection Routes (Quick Reference)

When generating links, use this mapping for the most common collections:

| Collection Folder | Web Route Pattern |
|------------------|-------------------|
| analytics | `/docs/analytics/{slug}` |
| charts | `/docs/analytics/charts/{slug}` |
| event-segmentation | `/docs/analytics/charts/event-segmentation/{slug}` |
| funnel-analysis | `/docs/analytics/charts/funnel-analysis/{slug}` |
| lifecycle | `/docs/analytics/charts/lifecycle/{slug}` |
| retention-analysis | `/docs/analytics/charts/retention-analysis/{slug}` |
| data | `/docs/data/{slug}` |
| cdp | `/docs/data/{slug}` |
| sources | `/docs/data/sources/{slug}` |
| destination-catalog | `/docs/data/destination-catalog/{slug}` |
| experiment | `/docs/feature-experiment/{slug}` |
| session-replay | `/docs/session-replay/{slug}` |
| guides_and_surveys | `/docs/guides-and-surveys/{section}/{slug}` |
| instrumentation | `/docs/sdks/{slug}` |
| browser_sdk | `/docs/sdks/analytics/browser/{slug}` |
| ios_sdk | `/docs/sdks/analytics/ios/{slug}` |
| android_sdk | `/docs/sdks/analytics/android/{slug}` |
| api | `/docs/apis/analytics/{slug}` |
| admin | `/docs/admin/{slug}` |
| account-management | `/docs/admin/account-management/{slug}` |

**Note:** For a complete list of all 120+ collections, see `.cursor/rules/statamic-routing.mdc`.

### Anchors (Deep Links)

You can add anchors to link to specific sections:
```markdown
[Lifecycle Growth view](/docs/analytics/charts/lifecycle/lifecycle-interpret#interpret-your-lifecycle-chart)
[SDK Installation](/docs/sdks/analytics/browser/browser-sdk-2#installation)
```

---

## Quick Reference: When to Use Skills

Claude Code skills are executable workflows you can invoke for common documentation tasks.

### Available Skills

Use these skills by typing `/skill-name` in the conversation:

#### `/document-feature`
**When to use**: Creating documentation for a new feature from scratch
**What it does**: Interactive wizard that:
- Asks about product area, benefits, prerequisites
- Determines correct collection
- Generates structured markdown with proper frontmatter
- Applies all style rules automatically
- Suggests filename and location

**Example**: "I need to document the new Predictive Cohorts feature"

#### `/validate-links`
**When to use**: Checking if internal links use correct Statamic routing
**What it does**:
- Extracts all markdown links from a file
- Checks against Statamic routing rules
- Reports issues with line numbers
- Suggests corrections
- Can auto-fix issues

**Example**: "Check all the links in this file for correct format"

#### `/edit-doc`
**When to use**: Applying all style rules to existing documentation
**What it does**:
- Applies rules in priority order
- Does TWO-PASS active voice check (most important)
- Removes future tense, applies contractions
- Enforces second person, removes "please"
- Makes language concise
- Reports all changes with before/after examples

**Example**: "Apply all Amplitude style rules to this document"

### Common Workflows

**Starting new documentation:**
1. Use `/document-feature` to create structured markdown
2. Add your technical content and examples
3. Use `/validate-links` to check links
4. Submit PR and tag `@tech-writers` for review

**Updating existing documentation:**
1. Make your technical updates
2. Use `/edit-doc` to apply all style rules
3. Use `/validate-links` to verify links
4. Submit PR

**Checking your work:**
1. Use `/edit-doc` to catch style issues
2. Use `/validate-links` to verify links
3. Review the changes and commit

---

## Important Files to Never Modify

These files are critical to the system and should not be modified without careful consideration:

- `content/collections/*.yaml` - Collection configuration files (defines routes)
- `.vale.ini` - Vale linter configuration
- `.github/workflows/*.yml` - CI/CD workflows
- `composer.json`, `package.json` - Dependencies
- Statamic system files in `config/`, `resources/`, `routes/`

---

## When in Doubt

If you're unsure about:
- **Style rules**: Refer to this CLAUDE.md file (you're reading it now)
- **Collection routes**: Check the quick reference table above or see `.cursor/rules/statamic-routing.mdc`
- **Approved vocabulary**: See `.github/styles/config/vocabularies/dev/accept.txt`
- **How to contribute**: See `.claude/docs/HOW-TO-CONTRIBUTE.md`
- **Which skill to use**: See the Quick Reference section above

Remember: The goal is high-quality, consistent documentation that helps Amplitude users succeed. When applying style rules, **always do a two-pass check for active voice** - it's the most commonly missed rule.
