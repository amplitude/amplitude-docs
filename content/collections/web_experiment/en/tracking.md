---
id: 23ff249c-45ab-488a-b8aa-ae8fde85249d
blueprint: web_experiment
title: Tracking
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1728666820
---
Web Experiment uses impression events for analysis and billing purposes.

## Impressions

The impression event is the same as the Feature Experiment exposure event, but has a different event type, `[Experiment] Impression`.

## Estimation

Amplitude tracks the impression event per experiment, when Web Experiment applies a variant action to a page. To estimate the number of impressions per month, consider:

1. Your volume of monthly tracked users (MTU)
2. The number of experiments you run per month
3. The average number of page views per user, per month

For example:

```text
Impressions = # of MTU to test * # of experiments per month * average page views per user, per month
```

This estimate provides an upper bound. Target specific pages and audiences, or roll out to a subset of users to reduce the total number of impressions.