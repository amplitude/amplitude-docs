---
id: 1b822d7f-b62f-419e-a8f5-0ef4b4fe5942
blueprint: data-table
title: 'Entry / Exit Analysis'
landing: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1739560537
---
Entry / Exit Analysis enables you to use the entry (first) or exit (last) in session dimensions across different types of analysis.

## Feature availability

This feature is available on all Amplitude plans. For more information, see the [Pricing page](https://amplitude.com/pricing).

## Supported metric types

Entry / Exit analysis supports the following metric types:

* **Uniques**: The count of unique users
* **Event totals**: The total number of events
* **Session totals**: The total count of sessions
* **PROPSUM**: The sum of a group-by property value

## Enable Entry / Exit Analysis

Apply Entry or Exit semantics to any supported metric type in the Data Table.

To enable this analysis:

1. In a data table with at least one event or metric, click the Options menu in the header of the column to which you want to enable the analysis.
2. Click *Enable Entry/Exit Analysis* in the options menu. The *Enable Entry/Exit Analysis* dialog appears.
3. Select the manner in which you want to apply group-by properties to the column:

    * **Default**: Uses the standard group-by setting for the column
    * **Entry**: Groups data by the first non-null property value of an active event in a session that contains the specified event.
    * **Exit**: Groups data by the last non-null property value of an active event in a session that contains the specified event.

    {{partial:admonition type="note" heading=""}}
    Data table columns support either Attribution **or** Entry / Exit analysis, but not both.
    {{/partial:admonition}}

4. Click **Apply**.

## Processing flow

For each session that contains the event specified in the column:

1. Amplitude identifies all relevant sessions.
2. For each session:
   
    * Amplitude extracts the first property value of an active event for Entry Analysis
    * Amplitude extracts the last property value of an active event for Exit Analysis

3. Amplitude uses these values to compute session-based metrics.

## Calculations

Amplitude uses the following formulas to compute the metrics that support Entry and Exit analysis:

| Metric Type                     | Formula                  |
| ------------------------------- | ------------------------ |
| Uniques                         | `UNIQUES(A)`             |
| Event totals                    | `EVENTTOTALS(A)`         |
| Prop sum                        | `PROPSUM(A)`             |
| Session totals (Entry analysis) | Like **Session Entries** |
| Session totals (Exit analysis)  | Like **Session Exits**   |
