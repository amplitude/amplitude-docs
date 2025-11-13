---
id: d8d5e604-10a9-40e7-9d76-752e02df08fd
blueprint: data
title: 'Warehouse Metric Calculations'
this_article_will_help_you:
  - 'Understand how Amplitude aggregates Warehouse Metric values'
  - 'Choose the right calculation type for your business questions'
  - 'Apply Sum, User Average, Min, and Max calculations effectively'
landing: false
exclude_from_sitemap: false
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1762795802
enable_math: true
---
When you create a Warehouse Metric, Amplitude provides calculation definitions (Sum, User Average, Min, and Max) that determine how numeric values aggregate from your connected warehouse table.

These calculation types help you choose the right measurement for your specific business or product question.

## Sum calculation

Use the Sum calculation to measure total values, for example, total revenue, total purchases, or total number of sign-ups during a period.

This option adds up all numeric values from the selected column (such as `revenue` or `count`) across all rows returned from your warehouse query.

### Definition

Adds all numeric values from newly imported rows.

Amplitude doesn't apply per-user grouping. Each row contributes its full value to the total.

### Example

| User ID | Daily Spend | Timestamp   |
| ------- | ----------- | ----------- |
| U1      | 2           | 01 Jan 2025 |
| U1      | 5           | 06 Jan 2025 |
| U2      | 3           | 01 Jan 2025 |
| U3      | 10          | 03 Jan 2025 |
| U3      | 0           | 04 Jan 2025 |
| U3      | 5           | 06 Jan 2025 |

$$
\text{Sum of Daily Spend = } 2 + 5 + 3 + 10 + 0 + 5 = 25
$$

### When to use Sum

| Use Case                   | Description                                                |
| -------------------------- | ---------------------------------------------------------- |
| Revenue and spend tracking | Measure total revenue or spend from all users.             |
| Event counts               | Count total events (such as purchases or sessions).        |
| Operational totals         | Aggregate numeric values like impressions or transactions. |

Example question: 

> What's the total revenue generated this month?

## User Average calculation

Use the User Average calculation to measure average user-level behavior, for example, the average weekly spend per user or average number of sessions per user.

### Definition

Amplitude first aggregates data per user (summing values such as daily spend to get weekly totals), then computes the average of those per-user totals across all users. Each user contributes equally to the final metric.

### Example

| User ID | Daily Spend | Timestamp   |
| ------- | ----------- | ----------- |
| U1      | 2           | 01 Jan 2025 |
| U1      | 5           | 06 Jan 2025 |
| U2      | 3           | 01 Jan 2025 |
| U3      | 10          | 03 Jan 2025 |
| U3      | 0           | 04 Jan 2025 |
| U3      | 5           | 06 Jan 2025 |

Step 1: Per-user roll-up (SUM)

| User | User Sum |
| ---- | -------- |
| U1   | 7        |
| U2   | 3        |
| U3   | 15       |

Step 2: Average across users

$$
\frac{7 + 3 + 15}{3} = 8.33
$$

Each user contributes one aggregated value (sum) to the final average.

### When to use User Average

| Use Case            | Description                                                        |
| ------------------- | ------------------------------------------------------------------ |
| Experiment metrics  | Align with Experiment's User Average computation for A/B testing.  |
| Per-user KPIs       | Measure average user engagement, revenue, or behavior.             |
| Behavioral analysis | Understand what a *typical* user does, rather than total activity. |

Example question:

> What's the average total spend per user this week?

## Min calculation

Use the Min calculation when you need to find the lowest value observed within the selected time window or user group.

This helps answer questions like "What's the minimum purchase amount a user made this week?" or "What's the lowest daily spend among all users?"

### Definition

Amplitude first determines each user's minimum value within the selected column and time bucket, then selects the lowest value overall.

### Example

| User ID | Daily Spend | Timestamp   |
| ------- | ----------- | ----------- |
| U1      | 2           | 01 Jan 2025 |
| U1      | 5           | 06 Jan 2025 |
| U2      | 3           | 01 Jan 2025 |
| U3      | 10          | 03 Jan 2025 |
| U3      | 0           | 04 Jan 2025 |
| U3      | 5           | 06 Jan 2025 |

Per-user minimums:

| User | Min Spend |
| ---- | --------- |
| U1   | 2         |
| U2   | 3         |
| U3   | 0         |

$$
\text{Overall Min} = 0
$$

### When to use Min

| Use Case              | Description                                                       |
| --------------------- | ----------------------------------------------------------------- |
| Performance baselines | Track the lowest measured metric (such as minimum daily revenue). |
| Data quality checks   | Identify outliers or unexpected zeros.                            |
| Threshold analysis    | View the minimum observed value across users or segments.         |

Example question:

> What's the minimum spend any user recorded this month?

## Max calculation

Use the Max calculation to find the highest value observed within the selected time window or user group.

This answers questions such as "What's the maximum amount a user spent in a day?" or "What's the peak Lifetime Value (LTV) achieved so far?"

### Definition

Amplitude first finds each user's maximum value within the selected column and time bucket, then returns the highest value overall.

### Example

| User ID | Daily Spend | Timestamp   |
| ------- | ----------- | ----------- |
| U1      | 2           | 01 Jan 2025 |
| U1      | 5           | 06 Jan 2025 |
| U2      | 3           | 01 Jan 2025 |
| U3      | 10          | 03 Jan 2025 |
| U3      | 0           | 04 Jan 2025 |
| U3      | 5           | 06 Jan 2025 |

Per-user maximums:

| User | Max Spend |
| ---- | --------- |
| U1   | 5         |
| U2   | 3         |
| U3   | 10        |

$$
\text{Overall Max} = 10
$$

### When to use Max

| Use Case             | Description                                         |
| -------------------- | --------------------------------------------------- |
| Performance tracking | Track the highest spend, usage, or value recorded.  |
| Capacity analysis    | Monitor peak activity levels or spikes.             |
| Goal attainment      | Identify the best performing users or time periods. |

Example question: 

> What's the maximum amount a single user spent in one day?

## Summary: Choose between calculation types

| Calculation  | Aggregation Logic                              | Use When You Want to Measure… | Example Metric                |
| ------------ | ---------------------------------------------- | ----------------------------- | ----------------------------- |
| Sum          | Adds all numeric values (no per-user grouping) | Total activity or revenue     | Total Purchases               |
| User Average | Sum per user, then average across users        | Typical user behavior         | Average Weekly Spend per User |
| Min          | Minimum per user, then select lowest value     | Minimum observed value        | Lowest Daily Spend            |
| Max          | Maximum per user, then select highest value    | Maximum observed value        | Peak Daily Spend              |

