---
id: 23ff249c-45ab-488a-b8aa-ae8fde85249d
blueprint: web_experiment
title: 'Web Experiment event tracking'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1729195928
ai_summary: 'Web Experiment utilizes impression events for analysis and billing. You need to track impression events with the Web Experiment script for experiment analysis. Impression events in Amplitude involve setting user properties based on flag key and variant. When tracking impressions through a third-party CDP, events are transformed for consistency. Amplitude estimates impressions per experiment based on monthly tracked users, experiments, and page views. This estimation helps you manage and target impressions effectively to optimize your experiments.'
---
Web Experiment uses impression events for analysis and billing purposes. Impression events are tracked by the Web Experiment script through the [integration](/docs/web-experiment/implementation#integrate-with-a-third-party-cdp). Tracking impression events is required for experiment analysis.

{{partial:admonition type='note'}}
See [Amplitude's pricing page](https://amplitude.com/pricing) to find out if this feature is available on your Amplitude plan.
{{/partial:admonition}}

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