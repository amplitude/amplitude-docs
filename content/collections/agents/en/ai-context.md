---
id: 66afe4e9-7abf-48c1-8e62-f7cc8691f7ab
blueprint: agent
title: 'AI Context'
updated_by: ac74a6d2-0226-45a6-aaa4-c33675b8ca76
updated_at: 1770764884
---
Teach Ask AI how your business works. Define your metrics, terminology, and preferences so every answer is tailored to your organization.

## Getting started

Before you add your context, gather the necessary information and navigate to the right place.

### Find AI Context

Ask AI uses two layers of context: Organization and Project.

Access both from *Project Settings > AI Controls*.

![](statamic://asset::help_center_conversions::ai/ai-controls.png){.full-width}

### What to gather before you start

{{partial:card-grid}}
{{partial:card style="plain" }}
### Business basics {.js-toc-ignore}

- Your business model (B2B, B2C, marketplace, etc.)
- North Star metric and how it's defined
- Fiscal year start date (if not January)
- Key customer segments and how to identify them
{{/partial:card}}
{{partial:card style="plain"}}
### Technical details {.js-toc-ignore}

- Event names for key actions (signup, purchase, etc.)
- Property names that define segments (plan type, ARR)
- Test/internal user identifiers to exclude
- Any deprecated events to avoid
{{/partial:card}}
{{/partial:card-grid}}

## Understanding AI context

Context changes how Ask AI answers questions.

A user asks:

> Show my our activation rate

{{partial:card-grid}}
{{partial:card style="warning" label="Without context" caption="Ask AI guesses. Uses wrong events, wrong timeframe, includes test users."}}
I'll create a chart showing user activation. I'll define activated users as those who completed any event after signing up...
{{/partial:card}} 
{{partial:card style="tip" label="With context" caption="Ask AI knows your exact definition, timeframe, and filters."}}
I'll show activation rate using your definition: users who triggered `first_project_created` within 7 days of signup, excluding @test.com emails...
{{/partial:card}}
{{/partial:card-grid}}

### Two levels of context

{{partial:card-grid}}
{{partial:card style="plain" caption="Limit: 10,000 characters"}}
### Organization context {.js-toc-ignore}
Applies to all projects. Use for company-wide standards.

- Business model and KPI definitions
- Standard terminology
- Global filters (exclude test users)
- Fiscal calendar rules
{{/partial:card}}
{{partial:card style="plain" caption="Limit: 10,000 characters"}}
### Project context {.js-toc-ignore}
Applies to one project. Use for product-specific details.

- Product-specific events and funnels
- Metrics unique to this product
- Product-specific segments
- Override org defaults when needed
{{/partial:card}}
{{/partial:card-grid}}

At runtime, Ask AI combines both contexts. Project context overrides organization context when they conflict.

### What to write

{{partial:card-grid}}
{{partial:card style="tip"}}
### Write this {.js-toc-ignore}
Amplitude can't infer the following:

- **Business model**: "B2B SaaS, annual subscriptions"
- **Key segments**: "Enterprise = ARR > $50K"
- **Metric definitions**: "Activation = first project within 7 days"
- **Date rules**: "Fiscal year starts April 1"
- **Exclusions**: "Filter out @test.com emails"
{{/partial:card}}
{{partial:card style="plain"}}
### Skip this {.js-toc-ignore}
Amplitude understands the following:
- Your event catalog and properties
- Top events by volume
- Official dashboards
- Saved cohort definitions
- Existing chart configurations
{{/partial:card}}
{{/partial:card-grid}}

{{partial:admonition type="note" heading=""}}
Reference your existing cohorts and dashboards by name in any context you provide. For example:

> Use the 'Power Users' cohort when asked about engaged users.

Amplitude includes their definitions by default
{{/partial:admonition}}

## Write good context

Structure your context with markdown so it's easy for Ask AI to parse.

{{partial:two-column-list-grid}}
### Formatting {.js-toc-ignore}

- `##` Use headings to separate sections.
- `-` Use bullets for lists of items.
- `` `backticks` `` Wrap event and property names.
- `**bold**` Highlight key terms.

---SPLIT---

### Common sections {.js-toc-ignore}

- **Business Overview**: Your model, North Star metric.
- **Key Metrics**: Activation, engagement, retention definitions.
- **Segments**: Customer tiers mapped to properties.
- **Do/Don't Rules**: Defaults, filters, things to avoid.
- **Date Rules**: Fiscal year, week start, default ranges.
{{/partial:two-column-list-grid}}

{{partial:admonition type="warning" heading=""}}
Keep it under 10,000 characters. That's the limit for both org and project context. Focus on the 20% of information that covers 80% of questions your team asks.
{{/partial:admonition}}

## Industry templates

Start with a template for your industry and customize it. These are complete examples you can copy and adapt.

{{partial:tabs tabs="B2B SaaS, E-commerce, Media / Content, B2C App"}}
{{partial:tab name="B2B SaaS"}}
Copy this template, replace the event and property names with your own, and adjust the definitions to match your business.
```text
## Business Overview
B2B SaaS platform with annual subscriptions.
North Star: Monthly Active Workspaces (MAW)

## Key Metrics
- **Activation**: User triggers `workspace_created` within 7 days of `signup_completed`
- **Engaged**: 3+ sessions in last 7 days with at least one `feature_used` event
- **Expansion-ready**: `seat_utilization` > 80%

## Segments
- Enterprise: `plan_tier` = "enterprise" OR `arr` > 50000
- Mid-Market: `arr` between 10000 and 50000
- SMB: `plan_tier` in ("starter", "growth")
- Trial: `subscription_status` = "trial"

## Rules
DO:
- Default to last 30 days for time ranges
- Exclude `email` contains "@test.com" or `is_internal` = true
- Use `mrr_change` event for revenue analysis

DON'T:
- Include `environment` = "staging" or "development"
- Use deprecated: `old_signup`, `legacy_workspace_created`

## Date Rules
- Fiscal year starts February 1
- "This quarter" = current fiscal quarter
- Week starts Monday
```
{{/partial:tab}}
{{partial:tab name="E-commerce"}}
Copy this template, replace the event and property names with your own, and adjust the definitions to match your business.
```text
## Business Overview
E-commerce marketplace. We sell products directly and via third-party sellers.
North Star: Gross Merchandise Value (GMV)

## Key Metrics
- **Conversion**: User triggers `purchase_completed` in same session as `product_viewed`
- **Repeat buyer**: 2+ `purchase_completed` events lifetime
- **Cart abandonment**: `cart_add` without `checkout_completed` within 24 hours

## Segments
- VIP: `lifetime_spend` > 1000 OR `purchase_count` > 10
- First-time buyer: `purchase_count` = 1
- Browsers: `session_count` > 5 AND `purchase_count` = 0
- Mobile shoppers: `platform` = "ios" OR "android"

## Rules
DO:
- Default to last 7 days for time ranges (faster purchase cycles)
- Always show revenue in USD (property: `revenue_usd`)
- Group by `category` for product analysis

DON'T:
- Include `order_status` = "cancelled" or "refunded" in revenue
- Include test orders: `email` contains "+test"

## Key Events
- `product_viewed` - browsing behavior
- `cart_add` / `cart_remove` - intent signals
- `checkout_started` → `purchase_completed` - conversion funnel
```
{{/partial:tab}}
{{partial:tab name="Media / Content"}}\
Copy this template, replace the event and property names with your own, and adjust the definitions to match your business.
```text
## Business Overview
Subscription media platform with ad-supported free tier.
North Star: Weekly Active Consumers (WAC)

## Key Metrics
- **Engaged**: 3+ `content_consumed` events per week
- **Subscriber conversion**: Free user triggers `subscription_started`
- **Retention**: Active in 4+ of last 6 weeks

## Segments
- Subscribers: `subscription_status` = "active"
- Free users: `subscription_status` = "free" OR null
- Heavy consumers: `weekly_content_count` > 10
- At-risk: Was active 30 days ago, not active in last 7 days

## Content Types
- `article_read` - text content
- `video_watched` - video (use `watch_time_seconds` for engagement)
- `podcast_played` - audio (use `listen_time_seconds`)

## Rules
DO:
- Default to last 7 days for engagement metrics
- Use `content_id` and `content_type` for content analysis
- Count unique content pieces, not total events

DON'T:
- Include `content_type` = "ad" in engagement metrics
- Include events where `duration_seconds` < 5 (bounces)

## Date Rules
- Week starts Sunday (media consumption patterns)
- "Prime time" = 6pm-10pm local time
```
{{/partial:tab}}
{{partial:tab name="B2C App"}}
Copy this template, replace the event and property names with your own, and adjust the definitions to match your business.
```text
## Business Overview
Consumer mobile app with freemium model and in-app purchases.
North Star: Daily Active Users (DAU)

## Key Metrics
- **Activation**: User completes `onboarding_finished` within 24 hours of install
- **D1 retention**: Returns day after `first_app_open`
- **Paying user**: Has any `purchase_completed` event

## Segments
- Power users: Active 5+ days per week
- Casual: Active 1-2 days per week
- Dormant: Last active > 14 days ago
- Whales: `lifetime_iap_revenue` > 100

## Rules
DO:
- Default to last 14 days for time ranges
- Always segment by `platform` (ios/android) - behavior differs significantly
- Use `session_start` for DAU/MAU calculations

DON'T:
- Include `app_version` < "2.0" (legacy, data quality issues)
- Include `user_id` is null (anonymous sessions)

## Key Funnels
1. Install → Onboarding → First value moment
2. Free user → Trial started → Subscription
3. Browse → Add to cart → Purchase

## Notifications
- `push_received` → `push_opened` for notification effectiveness
- `push_opted_out` signals churn risk
```
{{/partial:tab}}
{{/partial:tabs}}

## Examples

See what makes AI Context effective and what pitfalls to avoid.

### Be specific

{{partial:card-grid}}
{{partial:card style="tip" label="good" caption="Defines exact events, timeframes, and thresholds that Ask AI can use directly."}}
```text
## Key Metrics
- **Activation**: User triggers `project_created` event
  within 7 days of `signup_completed`
- **Engaged User**: 3+ sessions in the last 7 days
- **Churned**: No activity for 30+ days
```
{{/partial:card}}
{{partial:card style="warning" label="bad" caption="No concrete definitions. Ask AI must guess what 'activation' means and what time ranges are 'appropriate.'"}}
```text
Help users understand activation and engagement.
Show relevant metrics when asked about user behavior.
Make sure to use appropriate time ranges.
```
{{/partial:card}}
{{/partial:card-grid}}

### Be concise

{{partial:card-grid}}
{{partial:card style="tip" label="good" caption="Dense, scannable format. Each line is actionable with exact property names."}}
```text
## Segments
- Enterprise: `plan_tier` = "enterprise"
- SMB: `plan_tier` = "starter" OR "growth"
- Trial: `subscription_status` = "trial"

## Filters
- Exclude: `email` contains "@test.com"
- Exclude: `is_internal` = true
```
{{/partial:card}}
{{partial:card style="warning" label="bad" caption="Same information buried in prose. Wastes tokens and is harder to parse."}}
```text
When analyzing our customer base, it's important to
understand that we have several different types of
customers. Enterprise customers are our largest accounts
- they typically have the enterprise plan tier. Small
and medium businesses (SMBs) are customers who use our
starter or growth plans. We also have trial users who
are evaluating the product.
```
{{/partial:card}}
{{/partial:card-grid}}

### Include business context

{{partial:card-grid}}
{{partial:card style="tip" label="good" caption="Establishes context Amplitude cannot infer, like fiscal calendar and business model."}}
```text
## Business Model
B2B SaaS, annual subscriptions.
North Star: Monthly Active Workspaces (MAW)

## Fiscal Calendar
- FY starts April 1
- "This quarter" = current fiscal quarter
- Week starts Monday
```
{{/partial:card}}
{{partial:card style="warning" label="bad" caption="Generic statements that don't help Ask AI understand your specific business."}}
```text
We are a software company that sells to businesses.
Our product helps teams collaborate better.
We care about growth and revenue.
```
{{/partial:card}}
{{/partial:card-grid}}

### Use explicit do/don't rules

{{partial:card-grid}}
{{partial:card style="tip" label="good" caption="Clear instructions with exact property values. Ask AI knows what to do and avoid."}}
```text
## Rules
DO:
- Default to last 30 days for time ranges
- Group by `platform` when comparing mobile vs web
- Use `Total Revenue` event for revenue metrics

DON'T:
- Include events where `environment` = "staging"
- Use deprecated events: `old_signup`, `legacy_purchase`
```
{{/partial:card}}
{{partial:card style="warning" label="bad" caption="Vague guidance that doesn't tell Ask AI what specific actions to take."}}
```text
Be helpful and show relevant data.
Use appropriate filters when needed.
Be careful with sensitive information.
```
{{/partial:card}}
{{/partial:card-grid}}

### Define your terminology

{{partial:card-grid}}
{{partial:card style="tip" label="good" caption="Maps business terms to exact event names. Documents naming conventions."}}
```text
## Terminology
- "Conversion" = `checkout_completed` event
- "Signup" = `account_created` (not `user_registered`)
- "Active" = user with 1+ events in last 7 days

## Naming Conventions
Events: snake_case (`button_clicked`)
Properties: camelCase (`userId`, `planType`)
```
{{/partial:card}}
{{partial:card style="warning" label="bad" caption="Doesn't specify what the correct terms or conventions actually are."}}
```text
Use the correct terminology for our company.
Events should be named properly.
Properties follow our naming conventions.
```
{{/partial:card}}
{{/partial:card-grid}}

## Best practices

{{partial:two-column-list-grid}}
### Do {.js-toc-ignore}

- Use exact event and property names with correct casing
- Be specific: "exclude `email` contains @test.com"
- Put universal rules at org level, overrides at project level
- Test changes by asking questions before saving
- Keep a backup in your wiki or version control

---SPLIT---

### Don't {.js-toc-ignore}

- List events or properties (Amplitude already knows these)
- Write vague instructions like "be helpful" or "use appropriate filters"
- Create conflicting rules between org and project context
- Add edge-case rules that only apply to rare situations
- Make large changes without testing first
{{/partial:two-column-list-grid}}

### Maintain context over time

Keep the following in mind to help maintain context.

- **Assign owners**: Analytics lead for org context. PM or analyst for each project context.

- **Review regularly**: Quarterly, after major launches, or when Ask AI gives unexpected answers.

- **Change carefully**: One change at a time. Test with real questions. Keep backups.

## Frequently asked questions

{{partial:collapse name="How do I test my context before I roll it out?"}}
There's no dedicated preview mode. The best approach is to:
1. Start with project context on a test project
2. Ask questions that should use your new definitions
3. Verify Ask AI responds correctly
4. Then apply to org context or your main project

Keep a backup of your old context so you can roll back if needed.
{{/partial:collapse}}

{{partial:collapse name="What happens if my organization and project contexts conflict?"}}
Project context takes precedence. If your org context says "default to 30 days" but project context says "default to 7 days," Ask AI will use 7 days for that project.

This is intentional—it lets you set sensible org-wide defaults while allowing projects to override when their needs differ.
{{/partial:collapse}}

{{partial:collapse name="Can I reference existing cohorts and dashboards?"}}
Yes. Amplitude automatically includes your saved cohorts, official dashboards, and chart configurations as system context. You can reference them by name in your custom context:

> When asked about engaged users, use the 'Power Users' cohort.

> For revenue metrics, reference the 'Executive Dashboard'.
{{/partial:collapse}}

{{partial:collapse name="How often should I update my context?"}}
Review your context:
- Quarterly as part of regular maintenance
- When you add new key metrics or segments
- When you notice Ask AI giving incorrect answers
- After major product or tracking changes

Assign an owner to each context level so updates don't fall through the cracks.
{{/partial:collapse}}

{{partial:collapse name="What if Ask AI ignores my context?"}}
If Ask AI isn't using your context correctly:
1. Check that your context is saved (refresh the settings page)
2. Make sure you're using exact event/property names with correct casing
3. Simplify conflicting or redundant rules
4. Be more explicit—instead of "exclude test users," say "exclude where email contains @test.com"

Overly long or complex context can also cause issues. Try trimming to essentials.
{{/partial:collapse}}

{{partial:collapse name="What's the character limit?"}}
10,000 characters each for org context and project context (20,000 total). This is roughly 1,500-2,000 words—plenty for most use cases.

If you're hitting the limit, you're probably including too much detail. Focus on definitions and rules that Apply to the majority of questions, not edge cases.
{{/partial:collapse}}

{{partial:collapse name="Should I put everything in organization context or split it up?"}}
Use org context for company-wide standards that apply everywhere:
- Business model and terminology
- Global filters (exclude test users)
- Fiscal calendar
- Core metric definitions

Use project context for product-specific details:
- Product-specific events and funnels
- Metrics unique to that product
- Overrides to org defaults

If you only have one project, org context is fine for everything.
{{/partial:collapse}}