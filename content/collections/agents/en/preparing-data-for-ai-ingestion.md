---
id: 7c3e9a2b-4f81-4d6e-b2c8-1a5b9e7d0f3c
blueprint: agent
title: 'Preparing data for AI ingestion'
updated_at: 1739782800
---
AI features in Amplitude—including the Global Agent and Chat—help you move faster, uncover insights, and take action. The quality of those results depends on how clear your data is.

Think of AI as a new analyst on your team. It's fast, thorough, and available 24/7. The more context you give it, the better it performs. When your data is well-structured, AI interprets questions the way your team would, so you get from question to insight faster.

This guide walks through practical steps to strengthen your data so AI can deliver accurate, reliable insights. Most of these steps also make your data easier for your team to work with. Clear naming, clean taxonomies, and thoughtful governance improve the Amplitude experience for everyone. AI raises the bar on how much that clarity pays off.

## Make event and property names understandable

AI relies on your event names, display names, and descriptions to understand what your data represents. The clearer those are, the more accurately it can match questions to the right events and properties.

For example, someone might ask: "How often do customers browse categories from our navigation?"

If your data looks like this:

| **Field** | **Value** |
| --- | --- |
| Event name (ingested) | `catSelectClick` |
| Display name | _(none)_ |
| Description | _(none)_ |

AI may not connect `catSelectClick` to "browsing categories." It could return a result using the wrong event, or report that it can't find a match. The user loses trust, and the analyst ends up doing the work manually.

If your data looks like this:

| **Field** | **Value** |
| --- | --- |
| Event name (ingested) | `catSelectClick` |
| Display name | Category Selected |
| Description | Triggered when a customer selects a product category from the navigation menu in the web store. Example categories include Electronics, Apparel, and Home. |

AI can match the question to the right event, return an accurate chart, and suggest follow-up analyses, such as breaking down by category.

### What to do

Start with your most-queried events and properties. [Data Assistant](/docs/amplitude-ai/agents-overview) can help you identify which ones matter most.

- **Add display names in natural language.** For example, `catSelectClick` becomes "Category Selected" and `pgVw` becomes "Page Viewed."
- **Write descriptions that explain intent, not implementation.** "Fired on click handler for nav component" may be useful to note, but also explain the action. "Triggered when a customer selects a product category from the navigation menu" gives AI (and your team) the context they need.
- **Map coded values to human-readable labels.** If a property value is `sku_29881`, AI can't interpret it. Use lookup tables to map it to something like "Women's BrandX Running Shoe." This matters especially for properties used in group-bys or filters.
- **Categorize events** to organize your taxonomy and help AI narrow its search when answering questions.

**How this helps AI:** AI uses display names and descriptions to match natural-language questions to the right events. Without them, it picks the wrong event or returns no result. With them, it resolves ambiguity correctly and your team can trust the output. These same improvements make dashboards more readable and reduce back-and-forth about what an event means.

## Clean up ambiguity in your existing data

Confusion happens when multiple events capture the same action or when differences between similar events aren't obvious. That affects your team when they read dashboards and charts, and it affects AI when it selects events to analyze.

This doesn't mean renaming events for the sake of consistency. If an event called "played song" has existed for years and is widely used, changing it to "Played Song" can add consistency for future implementation. Clarity of meaning matters more than formatting.

### What to do

- **Audit for semantic duplicates.** Search your taxonomy for events that describe the same user behavior with different names. Common patterns include legacy vs. current naming, platform-specific variants (such as `ios_signup` vs. `signup`), and test events that were never cleaned up.
- **Merge or transform where possible.** If `played song` and `song_play_event` capture the same behavior, use Amplitude's merge or transformation features to roll them into a single event.
- **When merging isn't feasible, add descriptions that disambiguate.** State explicitly: "This event captures X. For Y, use [other event] instead." This helps AI and your team.
- **Delete what's clearly unused.** If an event hasn't fired in months and isn't referenced in any saved chart, it's likely noise.

**How this helps AI:** AI evaluates your full taxonomy when selecting events. Duplicate or near-duplicate events create false matches. The fewer irrelevant events it has to sort through, the more consistently it picks the right one. This cleanup also helps your team. Analysts onboarding to a new project or domain can trust what they see without needing tribal knowledge to know which event is "the real one."

## Remove or hide data you don't want to use

If you wouldn't trust an event enough to build a dashboard around it, AI shouldn't rely on it either. Stale, test, and deprecated events don't just clutter your taxonomy. They introduce noise that can reduce confidence in AI-generated analyses.

### What to do

- **Hide or delete events that are deprecated, stale, or test-related.** If an event was created for a QA cycle or is no longer instrumented, remove it from the visible taxonomy.
- **For Enterprise customers:** Automated Tasks can remove stale events and identify test data automatically, reducing this from a manual audit to a recurring cleanup.

**How this helps AI:** AI treats every visible event as a candidate when building an analysis. By removing noise, you help it focus on the events that matter. Fewer, higher-quality signals mean higher-confidence results. For your team, a leaner taxonomy also means faster event discovery, cleaner dashboards, and less confusion when exploring data.

## Provide business context for AI

Clear events and properties are only part of the picture. To be truly helpful, AI also needs to understand how your business works and how your teams define success.

When you share your revenue model, internal terminology, and how your team defines metrics such as "conversion," "activation," or "retention," AI can interpret questions the same way your team would. That shared context helps ensure analyses reflect how your business operates, rather than relying entirely on raw event structure.

### What to do

Go to *Project Settings > AI Controls* and define:

- **What your company does** and who your users are. This helps AI interpret questions in the right domain. An "order" means something different for an ecommerce company, a restaurant delivery app, or a healthcare platform.
- **Core metrics and how they're defined.** What counts as activation? Conversion? Retention? A qualified user? Be specific: include the events, thresholds, and time windows your team uses.
- **Internal terminology.** If your team calls something a "workspace," "campaign," or "deal," define it. AI encounters these terms in user questions and maps them to the right events and properties.
- **Analysis preferences.** Do you typically look at weekly or monthly granularity? Do you exclude internal users from analyses? Do you have standard segments (such as free vs. paid, or by region)? Include these defaults so AI starts from the right baseline.

**Why this matters:** Business context acts as a foundation for every AI-powered interaction in Amplitude—from the Global Agent in Chat to other AI features built on your data. Without it, AI is a capable analyst with no onboarding. With it, AI behaves like a team member who's been briefed on how your business works, what you care about, and how you measure it.

For more on configuring this context, see [AI Context](/docs/amplitude-ai/ai-context).

## Establish conventions to improve data over time

The steps above address the data you have today. This section is about protecting that progress as your implementation grows.

It's easier to instrument events correctly from the start than to consolidate, merge, or clean them up later. AI performs best when patterns are consistent and naming is predictable. Clear conventions reduce rework, prevent duplication, and help maintain data quality as new teams, features, and use cases are added. They also make it easier for new team members and AI to understand your data model.

### What to do

- **Define naming conventions** and document them in Amplitude Data's settings. Choose a format (for example, Title Case for events and snake_case for properties) and enforce it during implementation.
- **Use the tracking plan proactively.** Add event definitions before instrumentation begins, not after. The tracking plan is your single source of truth, and it's easier to name something correctly upfront than to merge or rename it later.
- **Include naming standards in implementation reviews.** Treat taxonomy hygiene the same way you treat code review: catch issues before they ship.

**How this helps AI:** Consistent naming reduces the number of disambiguation decisions AI has to make. When patterns are predictable, it can confidently match questions to events, even for events it hasn't seen queried before. For your team, conventions also reduce rework, prevent duplication, and make it easier for new team members to understand your data model without a guided tour.

## Clean data unlocks better AI

Preparing your data for AI isn't a one-time task. As your product evolves, your taxonomy will too—and keeping it clear requires ongoing attention.

When events are well defined and consistently maintained:

- AI-powered answers match how your team measures performance, not how a generic model interprets raw event names.
- Teams spend less time correcting or rebuilding AI-generated analyses.
- Questions move from ask to insight to action faster, because the first answer is trustworthy.

Clean data doesn't improve reporting alone. It makes AI a tool your team relies on and strengthens your entire Amplitude experience in the process.

## Related resources

- [AI Context](/docs/amplitude-ai/ai-context)
- [AI Controls](/docs/amplitude-ai/ai-controls)
- [Agents overview](/docs/amplitude-ai/agents-overview)
