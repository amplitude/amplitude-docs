---
id: 9a636606-4c3e-4452-915c-b153146b9116
blueprint: data-table
title: 'Use session metrics in Data Tables'
source: 'https://help.amplitude.com/hc/en-us/articles/10442602260507-Use-session-metrics-to-evaluate-content-paths'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717103382
landing: true
landing_blurb: 'Understand and use session metrics in Data Tables, including inline filters and event-level vs session-level group-bys.'
---
Session metrics, such as bounce rate, exit rate, entry rate, entries, exits, and session totals, are useful diagnostic tools for understanding the performance of campaigns, landing pages, or other key touchpoints. You can use these metrics in Data Tables to compare how different pages, screens, or content perform.

![image1.png](/docs/output/img/data-tables/image1-png.png)

In Analytics, you can find session metrics in the Data Tables charts, on the *Metrics* tab. Other than session totals, session metrics aren't available as standalone metrics in Analytics. Instead, Amplitude calculates these session metrics from the group-by you select, and only includes active events in the computation. Amplitude Analytics uses the group-by to decide how many values are present, and the sequence to be used for calculation.

{{partial:admonition type='note'}}
Analyze other marketing metrics with Amplitude charts. Go to [Marketing metrics recipes](/docs/analytics/charts/user-sessions/marketing-metrics-recipes). 
{{/partial:admonition}}

## Filter session metrics inline in Data Tables

You can filter session metrics directly from the column header in a Data Table. This lets you focus your analysis on sessions that match specific conditions, without changing the underlying metric definition.

To filter a session metric inline:

1. Open or create a **Data Table**.
2. Add a **session metric column** by either:
   - Selecting a session metric (for example, **Session totals**, bounce rate, entry rate, or exit rate) from the **Metrics** tab, or
   - Selecting an event column and changing **Measured as** to **Session Totals**.
3. In the header for the session metric column, select the **Options** icon (three dots) and click **Add filter**.
4. Define the conditions that sessions must meet to be included in the metric. For example, you can restrict the metric to sessions that include a `Page Viewed` event where **Page URL** contains `/pricing`.

Inline filters on session metrics are evaluated at the session level. They work alongside any other filters or segments in your Data Table definition.

### Session filter types

When you add a filter on a session metric column, the filter menu shows session-specific options. These filters are always applied at the **session** level:

- **Contains Event**: Include only sessions that contain at least one event matching the conditions you specify. For example, you can filter to sessions that contain a `Page Viewed` event where Page URL contains `/pricing`.
- **Session Duration**: Filter sessions based on how long they lasted (for example, sessions longer than 30 seconds or shorter than 5 minutes).
- **First Property Value**: Filter sessions by the first non-null value of a property in the session (for example, sessions where the first Page URL in the session is `/home`).
- **Last Property Value**: Filter sessions by the last non-null value of a property in the session (for example, sessions where the last Page URL in the session is `/checkout`).

These filters affect which sessions are counted in the session metric column, on top of any existing global filters or column filters in the Data Table.

## Select a good group-by property

The most common properties to select for your group-by are page- or screen-level properties that change as a user interacts with your app or site. These work well because they're likely to vary between most of the relevant events, and are set frequently enough to signal a bounce when needed.

{{partial:admonition type='note'}}
 Session metrics can't combine more than one top-level group-by.
{{/partial:admonition}}

## Example: Group-bys and session metrics

Amplitude uses the number of values of your group-by property to decide whether to classify a session as a specific metric, such as bounce, entry, or exit.

Here are three example sessions:

### Session 1

1. Event: `Page View`  
	`Page` = A
2. Event: `Click`  
	`Name` = 1A  
	`Type` = Ad
3. Event: `Page View`  
	`Page` = B

### Session 2

1. Event: `Page View`  
	`Page` = B  
	`Name` = 1A  
	`Type` = Ad

2. Event: `Click`  
	`Name` = 1B  
	`Type` = Ad

### Session 3

1. Event: `Buy`  
	`Amt` = $15  
	`Prod` = 1

A `Page View` event is either a default event captured through the Browser SDK, specified in the settings in Amplitude’s Marketing Space, or defined in a Data Tables analysis as a bounce rate metric.

### Bounce

A bounce is a session where the user triggers only one `Page View` event. This is also known as a single-page session. 

Amplitude calculates the bounce rate as a percentage based on the following formula: 

```
count of single-page sessions / the **total** number of sessions
```

Amplitude calculates bounce rates with a group-by by:

```
count of single-page sessions grouped by the first **non-null** property value /   
the total number of sessions grouped by the first **non-null** property value
```

To decide if the example sessions above are a bounce:

* Regardless of the group-by property, like `Page` or `Name`, **Session 1** would **not** be counted as a bounce because it contains more than one `Page View` event.
* **Session 2** only contains one `Page View` event. If you grouped by the `Name` event property, Amplitude Analytics **will** classify this session as a bounce. It would be grouped by the `Name` value of "1A" since it appears first in the session, and the bounce rate would be 1 / 2 (50 percent).
* Regardless of the group-by property, **Session 3** would **not** be counted as a bounce because it does not contain any `Page View` events.

### Entry and exit

Session Entries are defined by the **first** non-null value for the group by's property within the session. Session Exits are defined by the **last** non-null value for the group by's property within the session.

The entry and exit rates are then calculated as a percentage using the following formula:

```
the number of entries or exits / the **total** number of sessions
```

{{partial:admonition type='note'}}
 Overall entry/exit rates are always 100 percent because every session has entry/exit values.
{{/partial:admonition}}

Example, for the same sessions above:

* If you group by the `Name` event property, both the entry and exit rates are grouped under "1A" because it's the first property value of `Name`. The entry rate would be 2 / 3 (66.66 percent) and the exit rate 1 / 3, or 33.33 percent.
* If you group by the `Page` event property, the entry and exit rates are grouped by “B.” The entry rate would be 1 / 3, or roughly 33.33 percent. The exit rate would be 2 / 3 (66.66 percent).

{{partial:admonition type='note'}}
When you use a session metric that includes an event filter, you can choose whether group-bys use properties from the entire session (**Session level**) or only from the filtered event (**Event level**). Go to [Choose event-level or session-level group-bys for session metrics](#choose-event-level-vs-session-level-group-bys-for-session-metrics) for details.
{{/partial:admonition}}

## Choose event-level or session-level group-bys for session metrics

When you use a session metric that includes an event filter, you can choose whether group-bys are evaluated at the session level or the event level.

- **Session level** (default): group-by values are taken from all events in the session.
- **Event level**: group-by values are taken only from the events included in the metric's event filter.

This choice is available when:

- You define a **session metric** in the Metrics tab with an **event filter**, and
- You add a **group-by property** for that session metric column in a Data Table.

In that case, the session metric column includes a control that lets you select **Session level** or **Event level**.

### Example

Suppose you define a session metric as:

- **Metric**: Session totals
- **Filter**: Sessions that contain a `Page Viewed` event where **Page URL** contains `/pricing`
- **Group-by**: `utm_source`

- With **Session level** selected, `utm_source` can come from any event in the session that has that property set (for example, earlier campaign events or other page views).
- With **Event level** selected, `utm_source` is taken only from the filtered `Page Viewed` events that match the metric definition (for example, page views where **Page URL** contains `/pricing`).

Event-level vs session-level controls are only available for session metrics that have an event filter. If a session metric doesn't have an event filter, group-bys always use session-level semantics.

## Differences between session totals and PROPCOUNT(session IDs)

It's common to want to compare results of one Amplitude chart versus another, but not all chart analyses are interchangeable.

For example, you can't compare the results of a session totals query in a Session Metrics chart versus the [PROPCOUNT](/docs/analytics/charts/event-segmentation/event-segmentation-custom-formulas)(session IDs) formula in the Event Segmentation chart.

These two analyses can't be compared because of the following differences in their logic:

| Session totals query in Session Metrics chart                 | PROPCOUNT(session IDs) formula in an Event Segmentation chart                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Measures an **exact** total                                        | Measures an **estimate** of distinct property values                                                                                                                                                                                                                                                                                                             |
| Measurement **counts unique pairings** of user IDs and session IDs | **Does not count unique pairings** of user IDs and session IDs, and have different results when multiple users have the same session ID                                                                                                                                                                                                                       |
|                                                                    | Session IDs aren't tracked for [custom session](/docs/data/sources/instrument-track-sessions#custom-session-property) definitions, so they cannot be counted with the PROPCOUNT(session IDs) formula |