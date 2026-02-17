# Example Interaction

This worked example shows a full conversation between a contributor and the document-feature skill.

---

**Contributor:** "I need to document the new cohort sync feature"

**Skill response:**

"I'll help you document cohort sync. To get started, I have a few questions:

1. **Feature name:** Is 'Cohort Sync' the official feature name?
2. **Product area:** This sounds like CDP/Audiences — is that correct?
3. **User benefit:** What's the main benefit? For example: 'Sync cohorts to marketing platforms in real time.'

Once you answer these, I'll follow up on prerequisites and the primary workflow."

---

**Contributor:** "Yes, Cohort Sync is the name. It's in CDP. The benefit is that users can push audience segments to ad platforms without manual exports."

**Skill response:**

"Got it. Two more questions:

4. **Prerequisites:** Do users need any specific destination integrations configured, a particular plan tier, or special permissions?
5. **Primary workflow:** What's the main task — something like 'Create and configure a cohort sync to a destination'?"

---

**Contributor:** "They need a destination integration enabled. The workflow is: go to Audiences, select a cohort, configure sync settings, and activate."

**Skill response:**

"Based on CDP/Audiences, this goes in the `audiences` collection at `content/collections/audiences/en/cohort-sync.md`, served at `/docs/data/audiences/cohort-sync`.

Here's the generated document structure:

```markdown
---
id: [uuid]
blueprint: audience
title: Cohort Sync
this_article_will_help_you:
  - 'Push audience segments to ad platforms without manual exports'
  - 'Keep your ad platform audiences in sync with Amplitude cohorts'
landing: false
exclude_from_sitemap: false
---

Cohort Sync lets you push Amplitude audience segments directly to ad platforms, eliminating manual exports.

## Prerequisites

- A destination integration enabled in Amplitude Data.

## Configure a cohort sync

To set up a cohort sync, complete the following steps.

1. Navigate to *Audiences*.
2. Select the cohort you want to sync.
3. Select **Sync**.
4. Configure the sync settings:
   - **Destination**: Select the ad platform to sync to.
   - **Frequency**: Choose how often Amplitude syncs the cohort.
5. Select **Activate**.

Amplitude begins syncing the cohort to your destination on the schedule you configured.

## Related resources

- [Destinations](/docs/data/destination-catalog)
- [Cohorts overview](/docs/data/audiences/cohorts)
```

Next steps: add images, test the steps, run `/validate-links`, then commit and open a PR."

---

## Tips for Quality Documentation

When generating documentation:

- Start with "why" — explain the value before diving into steps.
- Use real examples — show actual values, not just placeholders.
- Anticipate questions — address common points of confusion proactively.
- Cross-link effectively — connect to related documentation.
- Show, don't just tell — note where screenshots would help.
- Test the steps — verify the workflow matches the actual product.

## Common Mistakes to Avoid

1. **Using relative links** — always use full `/docs/` web routes.
2. **Passive voice** — search twice for passive constructions.
3. **Future tense** — remove "will"; use present tense.
4. **Missing contractions** — always use "can't" not "cannot".
5. **Using "please"** — instructions are direct imperatives.
6. **Wrong collection** — verify the collection matches the product area.
7. **Missing prerequisites** — if there are plan tier or permission requirements, include them.
