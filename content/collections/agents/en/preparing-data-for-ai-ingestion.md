---
id: 7c3e9a2b-4f81-4d6e-b2c8-1a5b9e7d0f3c
blueprint: agent
title: 'Preparing data for AI ingestion'
updated_at: 1739782800
---
AI features in Amplitude help you move faster, uncover insights, and take action. The quality of those results depends on how easy it is for AI to consume and understand your data. You can get the best results possible by preparing your data before it reaches Amplitude's AI. Think of AI as a new analyst on your team. It's fast, thorough, and available at all times. The more context you give it, the better it performs. When your data is well-structured, AI interprets questions the way your team would, so you get from question to insight faster. For more information about Amplitude AI, go to [Agents overview](/docs/amplitude-ai/agents-overview).

This page describes practical steps to strengthen your data so that AI can deliver accurate, reliable insights. Additionally, most of these steps also make your data easier for your human team to work with your data. Clear naming, clean taxonomies, and thoughtful governance improve the Amplitude experience for everyone. 

### Clean data unlocks better AI

Preparing your data for AI isn't a one-time task. As your product evolves, so does your taxonomy. Keeping your data clean requires ongoing attention.

When events are well defined and consistently maintained:

- AI-powered answers match how your team measures performance, not how a generic model interprets raw event names.
- Teams spend less time correcting or rebuilding AI-generated analyses.
- Questions move from ask to insight to action faster, because the first answer is trustworthy.

Align your data to the following best practices for data preparation:

* Make event and property names understandable
* Clean up ambiguity in your existing data
* Remove or hide unwanted data
* Provide business context for your AI
* Establish conventions to improve data over time

Clean data doesn't improve reporting alone. It makes AI a tool your team relies on and strengthens your entire Amplitude experience in the process.

## Make event and property names understandable

AI relies on your event and property names, display names, and descriptions to understand what your data represents. The clearer and more understandable those are, the more accurately the AI can match questions to the right events and properties. Making your event and property names and using the Description field to include context is the single most effective thing you can to do prepare your data for AI. 

For example, an analyst at your organization asks "How often do customers browse categories from our website's navigation?"

If your data contains missing information such as:

| **Field** | **Value** |
| --- | --- |
| Event name (ingested) | `catSelectClick` |
| Display name | _(none)_ |
| Description | _(none)_ |

AI may not connect `catSelectClick` to "browsing categories." Because there is no information for Display name and Description, the AI might not be able to guess the context for how `catSelectClick` is used. It could return a result using the wrong event or report that it can't find a match. This erodes trust in the AI and your analyst ends up doing the work manually.

However, if your data has complete documentation such as:

| **Field** | **Value** |
| --- | --- |
| Event name (ingested) | `catSelectClick` |
| Display name | Category Selected |
| Description | Triggered when a customer selects a product category from the navigation menu in the web store. Example categories include Electronics, Apparel, and Home. |

AI can match the question to the right event, return an accurate chart, and suggest follow-up analyses, such as breaking down by category. The analyst spends their time using the insight rather than trying to generate them.

### How to align your data

Start with your most-queried events and properties. [Data Assistant](/docs/amplitude-ai/agents-overview) helps you identify which ones matter the most. Then, update that subset of your events and properties:

- **Add display names in natural language**: Instead of abbreviations, rename your Display names to something that is easy for AI and humans to understand. For example, `catSelectClick` becomes "Category Selected" and `pgVw` becomes "Page Viewed."
- **Write descriptions that explain intent, not implementation**: Update your Descriptions to give context for why the event matters. The description "Fired on click handler for nav component" describes when the event occurs, but doesn't give any further context. However, "Triggered when a customer selects a product category from the navigation menu" provides needed context for the AI to understand how the event is applied to your larger environment.
- **Map coded values to human-readable labels**: If a property value is `sku_29881`, the AI can't interpret it as that value doesn't carry any inherent information. That SKU number could relate to anything. Use lookup tables to map these types of valuse to the actual description of a product or item. For example, `sku_29881` could map to "Women's BrandX Running Shoe." 

This matters especially for properties used in group-bys or filters.
- **Categorize events**: Organize your taxonomy and help AI narrow its search when answering questions. Go to [Plan your taxonomy](/docs/data/data-planning-playbook) to design your categorization architecture. Having a defined taxonomy also greatly helps your human colleagues. 

AI uses display names and descriptions to match natural-language questions to the correct events. Without them, it can either select the wrong event or return a No Result message. With them, it resolves ambiguity correctly and your team can trust the output. These same improvements make dashboards more readable and reduce back-and-forth about what an event means.

## Clean up ambiguity in your existing data

Ambiguity in your data occurs when multiple events capture the same action. Or, it occurs when differences between similar events aren't obvious. That causes confusion when your dashboards and charts report similar or identical information in different way. It affects AI when it selects events to analyze because the AI might not understand how ambiguous data overlaps.

For example, you have two events "played song" and "song played". They both capture the event of when a song is streamed from a playlist. To clean up ambiguity, align the events to the name "played song" to remove duplicate, but different sounding, events.

This doesn't mean you must rename events purely for the sake of consistency. For example, if an event called "played song" has existed for years and is widely used, changing it to "Played Song" to aligh to a new title-case formatting could cause confusion if analysts aren't expecting the formatting change. Clarity of meaning matters more than formatting.

### How to align your data

- **Audit for semantic duplicates**: Search your taxonomy for events that describe the same user behavior with different names. Common patterns include legacy naming as opposed to current naming initiatives, platform-specific variants (such as `ios_signup` instead of `signup`), and test events that were never removed after the testing ended.
- **Merge or transform where possible**: If `played song` and `song_play_event` capture the same behavior, use Amplitude's [merge or transformation](/docs/data/transformations#merge-events-event-properties-and-user-properties) features to roll them into a single event.
- **When merging isn't feasible, add descriptions that disambiguate**: Sometimes, two events that look similar capture entirely different actions. In this situation, use the Description field to state explicitly: "This event captures X. For Y, use [other event] instead." This helps AI and your team differentiate between the two events.
- **Delete what's clearly unused**: If an event hasn't fired in months and isn't referenced in any saved chart, you can likely delete it.

AI evaluates your full taxonomy when selecting events. Duplicate or near-duplicate events create false matches. The fewer irrelevant events the AI sorts through, the more consistently it picks the correct one. 

This cleanup also helps your team. Analysts onboarding to a new project or domain can trust that all of the events are accurate without spending additional effort to confirm them.

## Remove or hide data unwanted data

If you wouldn't trust an event enough to build a dashboard around it, Amplitude AI shouldn't rely on it, either. Stale, test, and deprecated events don't just clutter your taxonomy, they introduce noise that reduces confidence in AI-generated analyses.

### How to align your data

- **Hide or delete events that are deprecated, stale, or test-related**: If an event was created for a QA cycle or is no longer instrumented, [remove it from the visible taxonomy](/docs/data/remove-invalid-data).
- **For Enterprise customers:** [Automated Tasks](/docs/data/automated-tasks-in-data-assistant) removes stale events and identifies test data automatically. This shifts manual audits to a recurring, automated, clean up effort.

AI treats every visible event as a potential input when building an analysis. By removing unwanted or irrelevant data, you help it focus only on the events that matter. Fewer, higher-quality, signals mean higher-confidence results. For your team, a smaller and more targeted taxonomy also leads to faster event discovery, cleaner dashboards, and less confusion when exploring data.

## Provide business context for AI

Clear events and properties are only part of the picture. To be truly helpful, AI also needs to understand how your business works and how your teams define success.

When you share your revenue model, internal terminology, and how your team defines metrics such as "conversion," "activation," or "retention," Amplitude AI can interpret questions the same way your team would. That shared context ensures analyses reflect how your business operates, rather than relying entirely on raw event structure.

### How to align your data

Go to *Project Settings > AI Controls* and define:

- **What your company does and who your users are**: This helps AI interpret questions in the right domain. An "order" means something different for an ecommerce company, a restaurant delivery app, or a healthcare platform.
- **Core metrics and how they're defined**: What counts as activation? Conversion? Retention? A qualified user? Be specific. Include the events, thresholds, and time windows that your team uses.
- **Internal terminology**: If your team uses terms such as "workspace," "campaign," or "deal," define what those mean to your team. AI encounters these terms in user questions and maps them to the correct events and properties.
- **Analysis preferences**: Answer the following types of questions for the AI: 
    - Do you typically look at weekly or monthly granularity? 
    - Do you exclude internal users from analyses? 
    - Do you have standard segments (such as free, paid, or by region)? 

Business context acts as a foundation for every AI-powered interaction in Amplitude. From the Global Agent in Chat to other AI features built on your data, context and understanding about how you are using Amplitude is important. Without it, the AI is a capable analyst with no onboarding. With it, AI behaves like a team member who's been briefed on how your business works, what you care about, and how you measure it.

For more on configuring this context, go to [AI Context](/docs/amplitude-ai/ai-context).

## Establish conventions to improve data over time

The steps above address the data as it currently exists. The following section focuses on protecting your data structures as your implementation grows.

It's easier to instrument events correctly from the start of your Amplitude journey than to consolidate, merge, or clean them up later. AI performs best when your data patterns are consistent and naming is predictable. Clear conventions reduce rework, prevent duplication, and help maintain data quality as new teams, features, and use cases are added. It's also easier for new team members and AI to understand your data model when you align to these best practices.

### How to align your data

- **Define naming conventions and document them in Amplitude Data's settings**: Choose a format (for example, Title Case for events and snake_case for properties) and enforce it during implementation.
- **Use the tracking plan proactively**: Add event definitions before instrumentation begins. The tracking plan is your single source of truth and it's easier to name something correctly at the beginning of your effort than to merge or rename it later.
- **Include naming standards in implementation reviews**: Treat taxonomy hygiene the same way you treat code review. This means catch issues before they ship.

Consistent naming reduces the number of disambiguation decisions AI has to make. When patterns are predictable, the AII can confidently match questions to events, even for events it hasn't seen queried before. For your team, conventions also reduce rework, prevent duplication, and make it easier for new team members to understand your data model without a guided tour.