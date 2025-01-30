---
id: fb3c2b70-88d2-4521-8b60-6e09adf673dd
blueprint: analytic
title: 'Out-of-the-box Metrics'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1738269005
---
Amplitude’s Out-of-the-Box (OOTB) metrics provide consistent, validated definitions for common performance indicators. Whether you’re tracking page views on the web, ad performance, or time spent, OOTB metrics share one synced definition across all your Amplitude projects. When you edit an OOTB metric once, it updates everywhere—saving you time, reducing errors, and aligning teams around a single source of truth.

## Advantages of OOTB metrics

* **Consistency and alignment**: These metrics are both dynamic and synced. You don't need to worry about mismatched definitions or manual updates in more than one place.
* **Speed and scalability**: Amplitude provides default metrics, so you can start analyzing key performance indicators quickly, and keep consistent definitions across teams and projects.

## Available metrics

Amplitude provides the following metrics for web analytics, which use the `[Amplitude] Page Viewed` event:

* Visitors
* Page Views
* Bounce Rate
* Entry Rate
* Exit Rate
* Page Views per Session
* Session Entries
* Session Exits

Regardless of where you use them, for example in a [Data Table](docs/analytics/charts/data-tables), [Event Segmentation](/docs/analytics/charts/event-segmentation) chart, or OOTB Web Analytics, they reference the same underlying definitions. Updates you make to the metric definition in one place applies everywhere else you use that metric.

## Edit existing metrics

Access OOTB metrics from any [Data Table](docs/analytics/charts/data-tables) or [Event Segmentation](/docs/analytics/charts/event-segmentation) chart. To edit an OOTB metric:

1. Add the metric to the chart.
2. Hover over the metric name and click the pencil icon, or click **Edit Metric** on the *More options* menu.
3. The Metric dialog appears. Update the definition and click **Save**. 
   
   The updated definition applies across your project. This includes changes to the label. Changes apply to charts you create going forward, and any chart that includes the metric definition.

For information about creating metrics from scratch, see [Create a metric](/docs/analytics/charts/data-tables/data-tables-create-metric)

{{partial:admonition type="note" heading="Permissions"}}
Editing an OOTB metric requires the **Manager** [role](/docs/admin/account-management/user-roles-permissions) or higher.
{{/partial:admonition}}
