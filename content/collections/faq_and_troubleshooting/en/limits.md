---
id: de87be4d-9370-44b2-b5c7-051dea5df54f
blueprint: faq_and_troubleshooting
title: Limits
source: 'https://amplitude.zendesk.com/hc/en-us/articles/115002923888'
this_article_will_help_you:
  - 'Understand the limits Amplitude places on the amount of data you can send, and how to avoid exceeding them'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1721083346
landing: false
---
There are some limits to the amount of data that you can send to Amplitude.

## Event volume limits

All organizations have a monthly event volume limit. Your company's signed agreement with Amplitude specifies the limit that applies to you, and you can see it in your Settings.   

{{partial:admonition type='note'}}
 Identify and Group Identify calls do **NOT** count against total event volume.
{{/partial:admonition}}

Customers who exceed these limits may be subject to overage fees. If you're close to exceeding this limit, Amplitude alerts you through email and in-product notifications. Email alerts automatically go out to users with the Admin role when you reach certain percentages of your limit (80%, 90%, 100%, and 110% for paid plans).

If you're a non-paying customer and you exceed your monthly limit three times, Amplitude **blocks your account**. With a blocked account, you can't access any charts and dashboards, but you can still use certain administrative functions, like the User API, to meet compliance obligations. Amplitude continues to ingest data **up to your limit**; however, Amplitude **doesn't ingest** any data beyond your limit. If you continue to exceed your monthly limit without upgrading to a paid plan, Amplitude **deletes your account** six months after the initial block.

## Instrumentation limits

The allowed per-project maximums for **event types**, **event properties**, and **user properties** are:

* Event types: 2000
* Event properties: 2000
* User properties: 1000

Once you reach these limits, Amplitude stops indexing new values. You can no longer query data for any event types and event or user properties that exceed these limits, and you can only access them in the raw data by exporting data via a CSV file or Amplitude's [Export API](/docs/apis/analytics/export).

As an example, imagine an instrumentation bug causes your product to send several extra event types to Amplitude, and your project exceeds its instrumentation limit by five as a result. Data for those excess event types are visible within Amplitude once you've brought your project down under the instrumentation limit. However, you can't query any data received for those excess event types **during the period** when your account was over the instrumentation limit. 

There is **no limit** to the number of event or user property values you can send. However, for a specific event or user property, you can select only the first 1000 values sent to Amplitude from dropdown menus.

There is **no limit** to the number of event properties you can apply to an event.

You can [delete unneeded event types in Amplitude Data](/docs/data/remove-invalid-data). Once you're under the limit, it can take around 24 hours for the new event types, event properties, and user properties to appear in Amplitude.

### Character limit for strings

String values have a limit of 1024 characters (user ID, event or user property values, etc.). Arrays have a limit of 10000 characters when append or prepend is used (this is available for user property types only). Amplitude truncates any strings that exceeds this limit.

## Chart limits

All limits described in this section apply to the Event Segmentation chart only.

### Segmentation module

Inline behavioral cohorts have a maximum range of three years. Any date range exceeding three years in the segmentation module results in a 404 error.

You can add a maximum of ten user segments to a chart.

### Date picker

Depending on the scale, each visualization has its own date range limit. Your charts show a warning message when you've reached or exceeded these time limits:

* Real-time: maximum range of one day
* Hourly: maximum range of seven days
* Daily: maximum range of 365 days
* Weekly: maximum range of 52 weeks
* Monthly: maximum range of 36 months
* Quarterly: maximum range of 12 quarters

### Breakdown table: Segment selection

You can select up to 30 segments and show them all on a chart at once.

## Limit warnings

Amplitude warns you when you are getting close to event type, event property, or user property instrumentation limits. View your current instrumentation usage by navigating to *Settings > [Organization settings](/docs/admin/account-management/account-settings) > Projects* and selecting a project.

Amplitude uses orange text to highlight the limits you're approaching, and red text for limits you've already exceeded.

![Limits_-_1_-_Max_Properties__orange_red_.png](/docs/output/img/faq/limits-1-max-properties-orange-red-png.png)

{{partial:admonition type='note'}}
if you have exceeded your event type limits, Amplitude still displays them in orange. This is because event types beyond that limit are no longer indexed.
{{/partial:admonition}}

Additionally, an orange warning bar appears at the top of the page when you're within 10% of the limit. A red warning bar appears when you've exceeded your limits.

![Limits_-_3_-_Orange_butter_bar.png](/docs/output/img/faq/limits-3-orange-butter-bar-png.png)

![Limits_-_4_-_Red_Butter_Bar.png](/docs/output/img/faq/limits-4-red-butter-bar-png.png)

## CSV download limits

The breakdown data table in the UI will only list the top 100 property values (for when you perform a [group-by](/docs/analytics/charts/group-by)). You can export roughly 10,000 rows as a .CSV file. This is specifically a limitation on the number of group-by values you can export.

The group-by limits vary from chart to chart:

| **CHART** | **GROUP-BY LIMIT** |
| --- | --- |
| Event Segmentation | 10,000 |
| User Composition | 10,000 |
| User Sessions | 10,000 |
| Funnel Analysis | 300 |
| Retention Analysis | 300 |
| Stickiness | 2,000 |
| Revenue Analysis | 10,000 |
| Revenue LTV | 300 |
| Data Tables | 10,000 (**see below**) |

For example, in the [Event Segmentation](/docs/analytics/charts/event-segmentation/event-segmentation-build) chart, you can export a .CSV that includes 10,000 distinct property values. If you apply a group-by to a property with more than 10,000 possible values, Amplitude only exports the top 10,000 of those values. However, you can export the full data table to the warehouse of your choice.

The baseline group-by limit for Data Tables is 10,000, with some exceptions:

* The limit is 300 with a conversion metric
* The limit is 100 with a session metric
* The limit is 10 with attribution

For any combination of these exceptions, the limit is the lowest limit included in the combination. For example, if a group-by includes both a conversion metric and attribution, the limit is 10.