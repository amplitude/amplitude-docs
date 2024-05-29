---
id: 9a636606-4c3e-4452-915c-b153146b9116
blueprint: data-table
title: 'Use session metrics to evaluate content paths'
source: 'https://help.amplitude.com/hc/en-us/articles/10442602260507-Use-session-metrics-to-evaluate-content-paths'
this_article_will_help_you:
  - 'Use legacy metrics to enhance your analyses'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717023239
---
Sometimes considered "legacy metrics," **session metrics**, like bounce rate or exit rate—are helpful diagnostic tools for obtaining a deeper understanding of the performance of campaigns or content items. 

![image1.png](/output/img/data-tables/image1-png.png)

In Amplitude Analytics, you can find session metrics in the Data Tables charts, on the *Metrics* tab. Other than session totals, session metrics—bounce rate, exit rate, entry rate, entries, and exits—are not available as standalone metrics in Amplitude Analytics. Instead, these session metrics are calculated from the group-by you select, and will only include **active events** in the computation. Amplitude Analytics uses the group-by to determine how many values are present, and the sequence to be used for calculation. 

{{partial:admonition type='note'}}
 In addition to bounce, exit, and entry rates, other marketing metrics can be analyzed using Amplitude charts. Read this [Help Center article for recipes to recreate common marketing analytics](https://help.amplitude.com/hc/en-us/articles/23990255180443-Marketing-metrics-recipes). 
{{/partial:admonition}}

### Feature availability

This feature is available to users on **Growth** and **Enterprise plans** only. See our [pricing page](https://amplitude.com/pricing) for more details.

## Select a good group-by property

The most common properties to select for your group-by are page- or screen-level properties that change as a user interacts with your app or site. These work well because they are likely to vary between most of the relevant events, and are set frequently enough to signal a bounce when needed.

{{partial:admonition type='note'}}
 Session metrics cannot combine more than one top-level group-by.
{{/partial:admonition}}

## Example: Group-bys and session metrics

Amplitude Analytics will use the number of values of your group-by property to determine whether to classify a session as a specific metric, such as bounce, entry, or exit.

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

A `Page View` event is either a default event captured via the Browser SDK, specified via the settings in Amplitude’s Marketing Space, or defined in a Data Tables analysis as a bounce rate metric.

### Bounce

A bounce is a session where only one `Page View` event is triggered; this is also known as a single-page session. 

Amplitude calculates the bounce rate as a percentage based on the following formula: 

```
count of single-page sessions / the **total** number of sessions
```

Bounce rates with a group-by are calculated by:

```
count of single-page sessions grouped by the first **non-null** property value /   
the total number of sessions grouped by the first **non-null** property value
```

To determine if the example sessions above are a bounce:

* Regardless of the group-by property, like `Page` or `Name`, **Session 1** would **not** be counted as a bounce because it contains more than one `Page View` event.
* **Session 2** only contains one `Page View` event. If you grouped by the `Name` event property, Amplitude Analytics **will** classify this session as a bounce. It would be grouped by the `Name` value of "1A" since it appears first in the session, and the bounce rate would be 1 / 2 (50 percent).
* Regardless of the group-by property, **Session 3** would **not** be counted as a bounce because it does not contain any `Page View` events.

### Entry and exit

Session **Entries** are defined by the **first** non-null value for the group by's property within the session. Session **Exits** are defined by the **last** non-null value for the group by's property within the session.

The entry and exit rates are then calculated as a percentage using the following formula:

```
the number of entries or exits / the **total** number of sessions
```

{{partial:admonition type='note'}}
 Overall entry/exit rates are always 100 percent because every session has entry/exit values.
{{/partial:admonition}}

Example, for the same sessions above:

* If you group by the `Name` event property, both the entry and exit rates will be grouped under "1A" because it's the first property value of `Name`. The entry rate would be 2 / 3 (66.66 percent) and the exit rate 1 / 3, or 33.33 percent.
* If you group by the `Page` event property, the entry and exit rates will be grouped by “B.” The entry rate would be 1 / 3, or roughly 33.33 percent. The exit rate would be 2 / 3 (66.66 percent).

## Differences between session totals and PROPCOUNT(session IDs)

It's common to want to compare results of one Amplitude chart versus another, but not all chart analyses are interchangeable.

For example, you cannot compare the results of a session totals query in a Session Metrics chart versus the [PROPCOUNT](/analytics/charts/event-segmentation/event-segmentation-custom-formulas)(session IDs) formula in the Event Segmentation chart.

These two analyses cannot be compared because of the following differences in their logic:

| Session totals query in Session Metrics chart                 | PROPCOUNT(session IDs) formula in an Event Segmentation chart                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Measures an **exact** total                                        | Measures an **estimate** of distinct property values                                                                                                                                                                                                                                                                                                             |
| Measurement **counts unique pairings** of user IDs and session IDs | **Does not count unique pairings** of user IDs and session IDs, and will have different results when multiple users have the same session ID                                                                                                                                                                                                                       |
|                                                                    | Session IDs are not tracked for [custom session](https://help.amplitude.com/hc/en-us/articles/115002323627-Track-sessions#h_a832c1ce-717a-4ab3-b205-9d7ed418ef1a "https://help.amplitude.com/hc/en-us/articles/115002323627-Track-sessions#h_a832c1ce-717a-4ab3-b205-9d7ed418ef1a") definitions, so they cannot be counted with the PROPCOUNT(session IDs) formula |

