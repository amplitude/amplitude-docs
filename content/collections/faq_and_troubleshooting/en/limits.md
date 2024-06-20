---
id: de87be4d-9370-44b2-b5c7-051dea5df54f
blueprint: faq_and_troubleshooting
title: Limits
source: 'https://amplitude.zendesk.com/hc/en-us/articles/115002923888'
---
#### This article will help you:

* Ensure you do not experience "missing" data due to exceeding your Amplitude data limits

There are some limits to the amount of data that you can send to Amplitude.

## Event volume limits

All organizations have a monthly event volume limit. The exact number will be specified in the signed agreement between Amplitude and each customer, and should be listed in your Settings.   

{{partial:admonition type='note'}}
 Identify and Group Identify calls do **NOT** count against total event volume.
{{/partial:admonition}}

Customers who exceed these limits may be subject to overage fees. If you're ever close to exceeding this limit, we'll alert you via email and through in-product notifications. Email alerts automatically go out to users in an Admin role when a % of your limit is reached (intervals 80%, 90%, 100%, and 110% for paid plans).

If you're a non-paying customer and you exceed your monthly limit three times, your account will be **blocked**. You will no longer be able to access any of your charts and dashboards (you will still have access to certain Admin functions, like the User API, so you can meet your compliance obligations). Data you send to Amplitude **up to your limit** will continue to be ingested; however, data **past** the limit will **not** be ingested. If you continue to exceed your monthly limit without upgrading to a paid plan, your account will be **deleted** six months after it was first blocked.

## Instrumentation limits

The allowed per-project maximums for **event types**, **event properties**, and **user properties** are:

* Event types: 2000
* Event properties: 2000
* User properties: 1000

Once these limit are reached, Amplitude will stop indexing new values. Data for any event types and event or user properties that exceed these limits **cannot be queried** from Amplitude, and can only be accessed in the raw data by exporting data via a CSV file or Amplitude's [Export API](https://www.docs.developers.amplitude.com/analytics/apis/export-api/).

As an example, imagine an instrumentation bug causes your product to send several additional event types to Amplitude, causing your project to exceed its instrumentation limit by five. Data for those excess event types will be visible within Amplitude once you have brought your project back down under the instrumentation limit. However, you will be unable to query any data received for those excess event types **during the period** when your account was over the instrumentation limit. 

There is **no limit** to the number of event or user property values you can send. However, for a specific event or user property, only the first 1000 values sent to Amplitude will be selectable from dropdown menus.

There is **no limit** to the number of event properties you can apply to an event.

You can [delete unneeded event types in Amplitude Data](/docs/data/remove-invalid-data). Once you are under the limit, it will take approximately 24 hours for the new event types, event properties, and user properties to appear in Amplitude.

### Character limit for strings

String values are limited to 1024 characters (user ID, event or user property values, etc.). Arrays have a limit of 10000 characters when append or prepend is used (this is available for user property types only). Any string that exceeds this limit will be truncated.

## Chart limits

### Segmentation module

Inline behavioral cohorts have a maximum range of three years. Any date range exceeding three years in the segmentation module will result in a 404 error.

A maximum of ten user segments can be added to a chart.

### Date picker

Depending on the scale, each visualization has its own date range limit. Your charts will show a warning message when these time limits have been reached or exceeded:

* Real-time: maximum range of 1 day
* Hourly: maximum range of 7 days
* Daily: maximum range of 365 days
* Weekly: maximum range of 52 weeks
* Monthly: maximum range of 36 months
* Quarterly: maximum range of 12 quarters

### Breakdown table: Segment selection

Up to 30 segments can be selected and shown on the chart at once.

## Limit warnings

Amplitude will warn you when you are getting close to event type, event property, or user property instrumentation limits. View your current instrumentation usage by navigating to *![gear icon for settings.png](/docs/output/img/faq/gear-icon-for-settings-png.png) > [Organization settings](/docs/admin/account-management/account-settings) > Projects* and selecting a project.

Any limits you are approaching will be delineated with orange text. Any limits you have already exceeded will be delineated with red text.

![Limits_-_1_-_Max_Properties__orange_red_.png](/docs/output/img/faq/limits-1-max-properties-orange-red-png.png)

{{partial:admonition type='note'}}
if you have exceeded your event type limits, they will still be displayed in orange. This is because event types beyond that limit are no longer indexed. 
{{/partial:admonition}}

Additionally, an orange warning bar will appear at the top of the page when you are within 10% of the limit. This will be replaced by a red warning bar when you've exceeded your limits.

![Limits_-_3_-_Orange_butter_bar.png](/docs/output/img/faq/limits-3-orange-butter-bar-png.png)

![Limits_-_4_-_Red_Butter_Bar.png](/docs/output/img/faq/limits-4-red-butter-bar-png.png)

## CSV download limits

The breakdown data table in the UI will only list the top 100 property values (for when you perform a [group-by](/docs/analytics/charts/group-by)). You can export approximately 10,000 rows as a CSV file. This is specifically a limitation on the number of group-by values you can export.

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

For example, in the [Event Segmentation](https://help.amplitude.com/hc/en-us/articles/360033852251) chart, you can export a CSV of data for 10,000 distinct property values. If you perform a group-by on a property with more than 10,000 possible values, Amplitude would only export the top 10,000 values. However, you can export the full data table to the warehouse of your choice. Learn more about how to [export from Amplitude to a data warehouse](https://www.docs.developers.amplitude.com/data/destination-warehouse-overview/).

As stated in the table, the baseline group-by limit for Data Tables is 10,000. However, there are several exceptions:

* The limit is 300 if a conversion metric is involved
* The limit is 100 if a session metric is involved
* The limit is 10 if attribution is involved

For any combination of these exceptions, the limit is the lowest limit included in the combination. For example, if both a conversion metric and attribution are involved, the limit is 10.
