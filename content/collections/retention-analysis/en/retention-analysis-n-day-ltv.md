---
id: b3f2a1c4-8e57-4d9a-b6f1-2c3d4e5f6a7b
blueprint: retention-analysi
title: 'N-Day LTV in retention analysis'
this_article_will_help_you:
  - 'Understand how N-Day LTV measures cumulative revenue for user cohorts'
  - 'Enable and configure N-Day LTV in a Retention Analysis chart'
  - 'Interpret N-Day LTV results, including how Amplitude handles immature cohorts'
landing: false
exclude_from_sitemap: false
---

N-Day LTV (Lifetime Value) helps you understand how much revenue a cohort of users generates within a fixed time window after their first activity. By combining retention cohorts with revenue, you can measure not just whether users return, but how valuable they are over time.

## Before you begin

If you haven't already read the overview of [Amplitude's Retention Analysis chart](/docs/analytics/charts/retention-analysis/retention-analysis-build), start there before continuing.

N-Day LTV requires a purchase event (or equivalent revenue-generating event) with a numeric revenue property such as `amount`, `revenue`, or `price`. Amplitude uses this value to compute cumulative revenue over time.

## What is N-Day LTV

N-Day LTV measures the cumulative revenue a cohort of users generates within the first N time units after their start event. Amplitude calculates it as:

```
Cumulative revenue during the window ÷ Number of users in the cohort
```

This gives you an average revenue per user over time.

## When to use N-Day LTV

N-Day LTV is useful when you want to:

- Measure how quickly new users generate revenue.
- Understand revenue impact beyond retention rates.
- Track changes in user value after product or pricing updates.

## How N-Day LTV works

N-Day LTV is built directly into Retention Analysis charts and uses the same cohort structure:

- Users enter a cohort when they perform a **Start Event**.
- Amplitude tracks revenue based on a **Return Event** (a purchase event or equivalent).
- Revenue accumulates over the selected N-day window.

When you enable N-Day LTV mode, the Return Event logic changes to **Return On or Before**. Amplitude counts users as returning if they perform the return event at any point up to that interval. This creates a cumulative view that aligns with how revenue accrues over time.

## Enable N-Day LTV

To enable N-Day LTV in a Retention Analysis chart:

1. Open a Retention Analysis chart.
2. Select your **Start Event** (for example, *Sign Up*).
3. Select your **Return Event** (for example, *Purchase*).
4. Select the **N-Day LTV** button under the Return Event controls.

The chart switches into revenue-based LTV mode.

## Choose your N-day window

N-Day LTV supports flexible time windows. You can measure LTV in hours, days, weeks, months, or quarters.

This helps answer questions like:

- "How much revenue do users generate in their first three days?"
- "What is 30-day LTV for users acquired from paid search?"
- "How does value grow over the first quarter?"

## All users compared to paying users only

When you enable N-Day LTV, you can calculate LTV for two groups:

### All users

This option includes every user in the cohort, even those who generate $0 in revenue. This gives you a complete picture of average revenue across the full cohort.

### Paying users only

This option restricts the cohort to users who generate revenue at any point during the selected window. This is useful for analyzing value among monetizing users without dilution from non-paying users.

## How Day 0 is defined

Day 0 is based on the first time a user performs the Start Event (in accordance with the limitations for [Historical Count](/docs/analytics/historical-count-1#how-amplitude-defines-historical-count)). A user enters the cohort the first day they trigger the starting event, and revenue is tracked forward from that point.

## Example: 3-Day LTV across multiple cohorts

Amplitude calculates N-Day LTV separately for each cohort.

For each cohort:

```
3-Day LTV = Cumulative revenue in the first 3 days ÷ Number of users in the cohort
```

Amplitude also shows an overall 3-Day LTV value, calculated only from cohorts that have fully matured through Day 3.

### Example 1: Three mature cohorts

In this example, all cohorts have completed the full 3-day window.

| Cohort | Users in cohort | Revenue in first 3 days | 3-Day LTV |
| --- | --- | --- | --- |
| Cohort 1 | 100 | $500 | $5.00 |
| Cohort 2 | 120 | $720 | $6.00 |
| Cohort 3 | 80 | $320 | $4.00 |

Amplitude combines revenue and users across all mature cohorts to calculate the overall value:

- **Total revenue:** $500 + $720 + $320 = $1,540
- **Total users:** 100 + 120 + 80 = 300
- **Overall 3-Day LTV:** $1,540 ÷ 300 = **$5.13**

Because all cohorts are mature, the overall value represents the true average revenue per user within the first three days.

### Example 2: One cohort is not yet mature

Recent cohorts may not have completed the full N-day window. Amplitude excludes immature cohorts from the overall calculation until they mature, and labels them as *(current)*.

| Cohort | Users in cohort | Revenue collected so far | Days observed | (current) 3-Day LTV |
| --- | --- | --- | --- | --- |
| Cohort 1 | 100 | $500 | 3/3 | $5.00 |
| Cohort 2 | 120 | $720 | 2/3 | $6.00 |
| Cohort 3 | 80 | $200 | 1/3 | $2.50 |

Because Cohort 2 has only reached Day 2 and Cohort 3 has only reached Day 1, Amplitude excludes both from the overall Day 3 calculation.

**Overall 3-Day LTV (mature cohorts only):** $500 ÷ 100 = **$5.00**
