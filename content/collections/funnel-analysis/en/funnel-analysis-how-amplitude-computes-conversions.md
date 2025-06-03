---
title: "How Amplitude computes conversions through funnels"
source: "https://help.amplitude.com/hc/en-us/articles/4448893756315-How-Amplitude-computes-conversions-through-funnels"
id: 4eda9c61-73d1-425a-a28a-5f15b8fb0356
this_article_will_help_you:
  - 'Familiarize yourself with conversion computations using funnels'
  - 'Identify key differences between Funnel and Event Segmentation charts'
---
Identify key differences between Funnel and Event Segmentation charts

When calculating conversion for a funnel in which users can complete the steps more than once, Amplitude will bucket each user based on the values tied to the **first** occurrence of each event.

![hold constant or group by.png](/docs/output/img/funnel-analysis/hold-constant-or-group-by-png.png)

Understanding these implications is vital in drawing accurate conclusions from your analyses.

## First-touch attribution scenarios

Let's assume we have a funnel to track registrations (`complete registration`) **broken down by** the landing page each user sees (`view landing page`). If we **hold constant** by `session_id`, users must complete **both** steps of the conversion process in the **same session** in order for Amplitude to count them as converted.

### Scenario 1: Funnels using both *Hold property constant* and *group conversions by*

When a funnel analysis uses both the hold constant and broken down by functions, Amplitude bases conversion on the **earliest entry within the session**.

Consider the following events and conversion results as examples:

| **Events** | **Conversion** |
| --- | --- |
| A user sees Landing Page A and completes registration within the **same** session. | The session counts as **converted**, and the conversion is attributed to Landing Page A. |
| A user sees Landing Page A, then Landing Page B in the **same** session, but converts only **after** seeing Landing Page B. | Since that user saw Landing Page A **first**, the conversion within the session would be attributed to Landing Page A. |
| A user sees Landing Page A, then Landing Page B in **different** sessions. | That user **does not** convert in the session where they saw Landing Page A. But, that same user **does** convert in the session where they saw Landing Page B. Amplitude will count the Landing Page A session as **not** converted, and the Landing Page B session as **converted**. |

{{partial:admonition type='note'}}
When holding constant by session ID, your chart will display the **number of user sessions** that included a conversion, and **not** the number of users to convert.
{{/partial:admonition}}

### Scenario 2: Funnels using group conversions by, but not Hold property constant

In cases where only the broken down by function is used, Amplitude bases conversion on the **earliest entry** within the lookback window.

Users are **grouped by** the first landing page they saw within the lookback window (how they entered the funnel). They'll be considered converted if they trigger the **final event** within the duration of the conversion window.

For example, let's consider the following events and related conversions:

| **Events** | **Conversion** |
| --- | --- |
| A user sees Landing Page A and completes registration **within** the conversion window. | That user counts as **converted**, and the conversion is attributed to Landing Page A. |
| A user sees Landing Page A, then Landing Page B, and completes registration **within** the window for Landing Page A. | That user counts as **converted**, and the conversion is attributed to Landing Page A, since they saw that one first. |
| A user sees Landing Page A, then Landing Page B, but **does not convert**. | That user counts as **not converted**. The events negatively affect Landing Page A's performance, but do not count against Landing Page B. |

{{partial:admonition type='note'}}
 Amplitude calculates conversions broken down by a filter differently than a group-by. A group-by will look for the earliest and most complete conversion **first**, and then group by the specified property value. A filter-by will first take into account the property you are filtering by **before** looking for a conversion. 
{{/partial:admonition}}

## The logic of unique user counts in funnel analyses

When counting by **unique users**, the baseline conditions for conversion are:

* **A user must be eligible for inclusion into the funnel**: The user **cannot be filtered out** from consideration via the user segmentation panel. Any filters set in the *Segment by* module only apply at the time that the user triggered the first funnel event.
* **A user must enter the funnel and complete all steps in the conversion window**: The user must enter the funnel, and complete **all** steps of the funnel within the stated **conversion window** to count as converted in the final funnel step. Otherwise, the user will be counted based on how far they progressed through the funnel.

Further, when Amplitude is counting by uniques, it will **only** count the earliest and longest conversion for each unique user:

* **Longest**: In this context, longest means the **most complete** conversion; i.e., the completion of the most required steps within the funnel.

If Amplitude finds multiple conversions meeting the **longest** definition, it selects the first one and counts that as when conversion occurred.

* **Earliest**: Amplitude measures earliest using the **first converting sequence** chronologically, if there is more than one.

When using the broken down by function, Amplitude continues to use the longest/earliest logic to bucket users in accordance with the property that was present at their **point of funnel entry**. 

If you're using *Hold constant by* in your analysis, Amplitude will look for the longest/earliest **converting sequence** within the same user session. When doing so, the unit of measurement changes to unique user and session ID pairings.

However, when counting by **event totals**, the earliest/longest logic **does not apply**. Instead, Amplitude considers **all** conversion paths taken or attempted, rather than just the earliest/longest path per user. The paths are then attributed to the property for the event in the step it was broken down by.

## Funnels versus event segmentation

The Funnel and Event Segmentation charts provide different types of analyses, and as such, could display differing results. The following table highlights some of those differences:

| **Funnel** | **Event Segmentation** |
| --- | --- |
| Shows **steps** a user takes to gauge experience | Shows what **events** users are triggering |
| Filters only apply to the **first** step | Filters apply to **every** event |
| User **must execute step 1** to **enter funnel** | **No funnel** to enter |
