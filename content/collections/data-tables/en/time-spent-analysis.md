---
id: ce3179b6-a501-4c27-bc37-c01b74c7e827
blueprint: data-table
title: 'Time spent analysis'
landing: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1737484059
---
Amplitude calculates the time spent on an event as the duration between consecutive events of the specified type. To prevent long periods of inactivity from skewing the analysis, Amplitude applies a 30 minute timeout. If no events of the specified type occur within a 30 minute window, Amplitude closes the current time spent window, and begins a new window with the next event.

When you specify a group-by property, for example `page URL` or `page type`, any change in its value resets the time spent window. This ensures that Amplitude can accurately attribute time spent to the specific value of the group-by property at the beginning of each window.

In the following example, the timeline represents a set of consecutive page views and their associated page types.

![](statamic://asset::help_center_conversions::data-tables/time-spent.png)

| Page type  | Time spent |
| ---------- | ---------- |
| `Landing`  | 10 minutes |
| `ViewItem` | 20 minutes |
| `Checkout` | 7 minutes  |

## Supported event types

Amplitude supports using any event type to define a time spent metric. However, page view events are most commonly used for this analysis. You can define page view events a few ways:

* **Primitive page view event**: A basic event specifically designed to track page views. For example, the pre-defined `[Amplitude] Page View` event. ![](statamic://asset::help_center_conversions::data-tables/primitive.png)
* **Any active event where Event Name = 'Page View'**: Some taxonomies define page view at the property level. Use a filter to limit event selection to names that contain `page view`. ![](statamic://asset::help_center_conversions::data-tables/filter.png)
* **Custom page view event**: A combination of primitive events that collectively represent a page view. ![](statamic://asset::help_center_conversions::data-tables/custom.png)

## Use time spent metrics in data tables

Time spent metrics are available in data tables. Use these metrics to gain insight into user behavior like:

| Metric                   | Definition                                                                                                                       |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| Total time spent on page | The cumulative time spent by all users on a specific page or set of pages. <br /> <code>TimeSpent(PV)</code>                     |
| Time spent per user      | The average time users spend viewing pages on your site. <br /> <code>TimeSpent(PV) / Uniques(PV where TimeSpent(PV) > 0)</code> |
| Time spent per page view | The average time spent per page view event. <br /> <code>TimeSpent(PV) / Totals(PV where TimeSpent(PV) > 0)</code>               |
| Time spent per session   | The average time spent on page views per session. <br /> <code>TimeSpent(PV) / SessionTotals(where TimeSpent(PV) > 0)            |

Time spent metrics return results in the specified unit of time, for example seconds, minutes, or hours.

{{partial:admonition type="note" heading=""}}
The last page view in a session isn't measured for time spent because there is no subsequent page view event to measure. Sessions with a single page view (bounces) behave similarly for the same reason.
{{/partial:admonition}}

## Create a time spent metric

To create a new time spent metric:

1. Create a new, or open existing Data Table.
2. Click *+Add Event or Metric*.
3. Select the *Metrics* tab in the dialog. Click *+Define new Metric*.
4. In the *Metric Type* selection, scroll down to the **Time Spent** metrics and select the metric you want to use.
5. Optionally apply a filter to the event and select the unit of time.
6. Click *Save*.
