---
id: a7f4e2c9-8d3a-4f1b-9c5e-7e8f3d9a2b1c
blueprint: experiment_troubleshooting
title: 'Debug metric spikes and dips'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1737570000
---
When you notice unexpected spikes or dips in experiment metrics, identify what changed and determine if the data is trustworthy. This guide provides systematic approaches to debug these anomalies.

## Check cumulative exposures for traffic changes

Start by examining the cumulative exposures chart in your experiment dashboard. This chart shows exposure patterns over time and highlights data quality issues.

Orange dots on the cumulative exposures chart indicate detected anomalies in exposure traffic. These can signal:

- Sudden increases or decreases in exposure counts.
- Changes to experiment configuration.
- Instrumentation or tracking issues.

Data quality check failures appear when traffic to the experiment has decreased significantly. Review these warnings to understand if the spike or dip relates to exposure problems rather than metric changes.

For more details, see [Interpret the cumulative exposures graph](/docs/feature-experiment/advanced-techniques/cumulative-exposure-inflection-points).

## Review experiment configuration changes

Check if the experiment's percentage rollout or traffic allocation increased during the period when you noticed the metric spike or dip.

To review recent changes:

1. Navigate to the experiments or flags table on your Amplitude homepage.
2. Sort by *Last Modified* to see which experiments changed recently.
3. Check the experiment's configuration history to identify what changed and when.

You can also use the [Experiment Management API](/docs/apis/experiment/experiment-management-api-version-endpoints) to retrieve versions of flag configurations during a specific time period. Compare configurations to identify changes that might explain the metric spike or dip.

## Check for releases and deployments

Review whether any code releases, app version updates, or feature deployments occurred during the time window of the metric change.

Releases and annotations in your dashboard can help identify temporal correlations between deployments and metric changes. If you haven't added annotations yet, consider adding them after you identify the cause to document the incident.

## Segment by platform and version

Metric spikes or dips often affect specific platforms or app versions rather than all users. Group your analysis by these default user properties:

- App version: New app releases can introduce bugs or behavioral changes.
- OS version: Operating system updates can affect app performance.
- Platform: Issues might only affect iOS, Android, or web users.
- Device type: Specific device models or screen sizes might behave differently.

Amplitude SDKs track these properties automatically, making them reliable dimensions for debugging. See [user properties](/docs/data/user-properties-and-events#user-properties) for more information.

To analyze by these dimensions:

1. In your experiment results, add a group-by clause for the relevant property.
2. Look for spikes or dips that affect only specific segments.
3. Investigate what's unique about the affected segment.

## Identify and filter outliers

Outlier users or data quality issues cause some metric spikes:

### Bot traffic

Automated bot traffic can skew metrics significantly. Amplitude provides several ways to handle bots:

- Use [bot traffic blocking](/docs/data/block-bot-traffic) to filter known bots automatically.
- Configure [block filters and drop filters](/docs/faq/block-and-filter-internal-users) to exclude specific traffic patterns.

### Instrumentation issues

Rapid-fire events from a single user can indicate instrumentation bugs:

- Components that re-render frequently might send events on each render.
- Events might need debouncing to prevent duplicate tracking.
- Event handlers might fire multiple times unintentionally.

Use the [frequency chart](/docs/feature-experiment/advanced-techniques/winsorization-in-experiment#filtering-out-users) to identify users with unusually high event counts. These outliers can distort your metrics and should be investigated.

To filter outliers from your analysis:

1. Create a frequency distribution of your metric.
2. Identify users with extreme values.
3. Investigate whether these users represent genuine behavior or data quality issues.
4. Apply filters to exclude confirmed outliers from your experiment results.

## Analyze exposure events by flag key

Create an event segmentation chart to identify spikes in exposure events for specific flag keys:

1. Navigate to *Analytics > Event Segmentation*.
2. Select the `[Experiment] Exposure` event.
3. Group by the `flag_key` property.
4. Sort by *Row Change* to see which flags had the largest exposure changes.

This analysis can reveal if a specific experiment suddenly received more traffic, which might explain metric changes.

## Use Root Cause Analysis

The Root Cause Analysis feature can help identify which user segments contributed most to a metric change. While you can't filter exclusively by experiment properties, you can:

1. Navigate to the metric that showed a spike or dip.
2. Use Root Cause Analysis to identify contributing factors.
3. Look for patterns in user properties, behaviors, or segments.

To request the ability to filter Root Cause Analysis by experiment properties, contact Amplitude support.

## Next steps

After identifying the cause of a metric spike or dip:

1. Document your findings with annotations in your dashboard.
2. If a bug caused the issue, fix the instrumentation.
3. If bots or outliers caused the issue, configure filters to prevent future occurrences.
4. If a configuration change caused the issue, consider restarting the experiment with stable settings.
5. Review [sample ratio mismatch troubleshooting](/docs/feature-experiment/troubleshooting/sample-ratio-mismatch) if the spike or dip correlates with exposure distribution changes.
