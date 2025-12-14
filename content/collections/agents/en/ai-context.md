---
id: ai-context-page-8342
blueprint: agent
title: 'AI Context'
this_article_will_help_you:
  - 'Understand what AI Context is and how it improves Amplitude AI'
  - 'Configure AI Context for your organization'
  - 'Write effective context that helps AI understand your business'
updated_by: cursor-agent
updated_at: 1734192000
---
AI Context lets admins provide additional context to Amplitude's AI features. This context is used by Amplitude's Agents, Ask AI, and other AI features when generating responses, helping them better understand your business context, data conventions, and preferred practices.

This feature is similar to Claude Projects or Cursor rules—by providing high-level context to Amplitude's AI, you can influence the responses you get and ensure consistency across your team's work.

## Configure AI Context

To configure AI Context for your organization:

1. Navigate to *Organization Settings*.
2. Find *AI Controls* in the sidebar.
3. Click **Edit** to open the markdown editor.
4. Add your business context, guidelines, and preferences.
5. Click **Save** to apply the changes.

AI Context is limited to 10,000 characters and you can make changes through the markdown editor or upload markdown files directly. AI Context is visible to all users but only editable by admins.

## What to include in AI Context

Your AI Context can include any information that would help Amplitude's AI better understand your business context and generate more relevant responses. Here are some examples:

**Business context:** Company-specific terminology and definitions, product names and definitions, key metrics and KPIs your team focuses on, business workflows, industry-specific considerations.

**Data conventions:** Event and property naming conventions, preferred segment definitions, common calculations and formulas, data quality guidelines.

**Analysis preferences:** Preferred chart types for different scenarios, common analysis patterns and approaches, metric definitions and business logic.

## Best practices

**Jargon:** Companies often have terms or phrases that are specific to them. Explain what specific words or phrases mean to give AI the best chance of understanding this terminology.

Example: "P0 feature" refers to a feature in our highest priority tier for the current quarter.

**Synonyms:** Companies sometimes use multiple words to describe the same concept. Giving this context helps AI provide suggestions more consistently.

Example: "Organization," "workspace," and "account" are used interchangeably, but "organization" is the property name in our event taxonomy.

AI Context teaches Amplitude's AI your organization's unique context—the tribal knowledge that distinguishes your product team from others. The AI already knows product analytics, experimentation, and funnel analysis. What it needs from you is your business context, your event taxonomy, and your specific ways of working.

Think of AI Context as onboarding a brilliant new analyst who needs to learn your company's specifics, not how to build a funnel chart. This context passes at the beginning of every AI interaction, so use it for "universal truths" about your data and business.

### General tips

**Keep it concise:** Focus on the most important context that improves AI responses. Including too much context can distract the model.

**Focus on general-purpose rules:** Limit the content to context you want included in every prompt. Documentation related to specific events or properties can live in your event taxonomy descriptions.

**Test and iterate:** Try different rules and see how they affect AI responses. Changes apply immediately, so you can test in Ask AI right away.

## High-impact categories

### 1. Business definitions & logic

Define what metrics mean at YOUR company. The AI can calculate retention, but it doesn't know you exclude trial users from the denominator.

**Good:**

* Active user: Triggered 3+ key events in rolling 7 days (not just logged in).
* Churned: No session events for 30 days after subscription end.
* Activation: Completed onboarding AND created first project within 7 days.

**Avoid:**

* Calculate retention properly (too generic).
* Use appropriate metrics (too vague).

### 2. Event taxonomy guidance

Map your actual event structure—which events are canonical and which are deprecated.

**Good:**

* Primary purchase event: purchase_completed (not transaction_success, which is deprecated).
* Page views: Use screen_viewed for mobile, page_viewed for web.
* Signup: account_created is the canonical event, ignore signup_started.

**Avoid:**

* Use the right events (unhelpful).
* Check event names (agent does this).

### 3. User & account context

Document how you segment users and define key populations.

**Good:**

* Enterprise users: plan_type = 'enterprise' OR employee_count > 500.
* Test accounts: Exclude where email CONTAINS '@yourcompany.com' or is_internal = true.
* Power users: 20+ sessions in last 30 days with 5+ distinct features used.

**Avoid:**

* Segment users appropriately (too vague).
* Filter out test data (agent assumes this).

### 4. Domain intelligence

Share industry context and product knowledge the AI couldn't know.

**Good:**

* Seasonality: 60% of new signups occur Mon-Wed, plan experiments accordingly.
* Benchmarks: Our 40% D7 retention exceeds industry average of 25%.
* Product context: Feature X launched Oct 2024, expect adoption spike in that cohort.

**Avoid:**

* Consider business context (too generic).
* Think about product (obvious).

## Writing principles

**Be specific:** Replace "filter appropriately" with "exclude users where is_internal = true".

**Show, don't tell:** Include actual event names, real thresholds, specific examples.

**Explain why when non-obvious:** "Use purchase_completed not checkout_finished (checkout_finished fires before payment confirmation)".

**Front-load critical rules:** User definitions and common pitfalls should appear first.

**Keep it scannable:** Use bullet points, consistent formatting, clear sections.

## Anti-patterns to avoid

### Don't state the obvious

* ❌ "Build good funnels"
* ❌ "Analyze data properly"
* ❌ "Consider user behavior"

### Don't overspecify analysis methods

* ❌ Step-by-step instructions for building charts.
* ❌ Detailed statistical formulas.
* ❌ UI navigation instructions.

### Don't include secrets

* ❌ API keys or passwords.
* ❌ Individual customer names or PII.
* ❌ Confidential revenue targets.
