---
id: 23ff249c-45ab-488a-b8aa-ae8fde85249d
blueprint: web_experiment
title: Web Experiment Event Tracking
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1728666820
---
Web Experiment uses impression events for analysis and billing purposes. Impression events are tracked by the Web Experiment script through the [integration](/docs/web-experiment/implementation#integrate-with-a-third-party-cdp). Tracking impression events is required for experiment analysis.

## Impressions

The impression event is the same as the Feature Experiment [exposure event](/docs/feature-experiment/under-the-hood/event-tracking#exposure-events), but has a different event type, `[Experiment] Impression`. Impression events contain the **flag key** and the **variant** of the flag or experiment that the user has been exposed to in the event's event properties.

When Amplitude ingests an impression event, it uses the flag key and variant to **set or unset user properties** on the user associated with the event. Setting user properties is essential for experiment analysis queries on primary and secondary success metrics.

### Impression  transformation

Impression events are sent in one form and transformed into what you see in Amplitude on ingestion. The event type and event properties are modified for consistency with other Amplitude properties, and experiment user properties are set or unset for accurate experiment analysis. If you're tracking impressions through a 3rd party CDP, you will see the event in the CDP in it's pre-transformation state.

| Property Type | Pre-transformation | Post-transformation |
| --- | --- | --- |
| Event Type | `$impression` | `[Experiment] Impression` |
| Event Property | `flag_key` | `[Experiment] Flag Key` |
| Event Property | `variant` | `[Experiment] Variant` |
| Event Property | `experiment_key` | `[Experiment] Experiment Key` |

## Estimation

Amplitude tracks the impression event per experiment, when Web Experiment applies a variant action to a page. To estimate the number of impressions per month, consider:

1. **M** = Your volume of monthly tracked users (MTU)
2. **E** = The number of experiments you run per month
3. **P** = The average number of page views per user, per month

Impressions Estimate = **M** * **E** * **P**

This estimate provides an upper bound. Target specific pages and audiences, or roll out to a subset of users to reduce the total number of impressions.