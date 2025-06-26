---
id: 06fa7873-19a6-47ac-9ae0-f5da83396d11
blueprint: analytic
title: 'Historical Count, part 2: Order of operations'
source: 'https://help.amplitude.com/hc/en-us/articles/21037928991259-Historical-Count-part-2-Order-of-operations'
this_article_will_help_you:
  - "Understand where Historical Counts fall into Amplitude's order of operations"
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1723652404
---
Amplitude's Historical Count feature helps you achieve a deeper level of understanding when you're investigating why your users are retaining, converting, or engaging—or why they're failing to do that.

{{partial:admonition type='note'}}
This article is second in a series about Historical Counts. If you haven't done so already, read [Historical Count, part 1: Track user behavior for different instances of each user action](/docs/analytics/historical-count-1). 
{{/partial:admonition}}

## Historical Count in the Amplitude order of operations

Whenever Amplitude applies filters to an event (including filters in segments), it does so in a specific order. **The Historical Count filter is always applied last**. 

Let's take this Historical Count filter as an example:

![historical_count_2.png](/docs/output/img/analytics/historical-count-2-png.png)

With the Historical Count filter applied, this chart will **not** show you everyone whose third time triggering that event just happened to take place in Germany (i.e., where the first and second instances could have happened anywhere in the world). Instead, it shows the **third Germany-located instance** of that event—in other words, **both previous instances** will also have taken place in Germany. It could be the user's third, eighth, or hundredth time performing that event overall, as long as it was only their third that took place in Germany.

{{partial:admonition type='note'}}
Any group-bys will apply to the first event selected in the Funnel Analysis, Pathfinder, and Retention Analysis charts. When you apply a group-by, Amplitude will show the user's property value at the time of triggering the event for the Nth time.
{{/partial:admonition}}

## Event Historical Count

The Event Historical Count filter works very similarly to the Historical Count filter. While both capture a user's Nth instance of performing a specified action, Historical Count is applied **after** all other filters have been applied. By contrast, Event Historical Count is applied **first**, **before** any other filters.

This can have important implications for your analyses. Let's use the table below to illustrate the difference:

| **Time** | **Maya’s event** | **Loc’s event** |
| --- | --- | --- |
| 1 | run |   |
| 2 | walk | walk |
| 3 |   | run |

If we were to set up an event segmentation analysis that searches for `Any Event` where:

* `Historical Count` = `1st`
* `Event Name` = `Run`

This will yield two results: Maya at time 1, and Loc at time 3.

By contrast, let's consider a similar analysis that searches for `Any Event` where:

* `Event Historical Count` = `1st`
* `Event Name` = `Run`

This will give us only one result: Maya at time 1. This is because `Run` is Loc's **second** event, and the Event Historical Count filters out everything but first events.

## Historical Count and custom events

The custom event logic will be considered **before** the Historical Count filter, and will count all of the underlying events triggered by the user.

For example, imagine a `custom_event_c`, that is triggered when a user triggers **either** `event_a` **or** `event_b`. Let's say that the user triggers events on the following days: 

**Day 1:** `event_a`

**Day 3:** `event_b`

**Day 7:** `event_b`

**Day 14:** `event_a`

If we apply the Historical Count filter of 1 to `custom_event_c` within the time frame, the user will be counted in the data point for **Day 1** since `event_a` was triggered for the first time on that day. The user's events triggered on **Day 3**, **7**, and **14** will not be counted for those days.

When we apply the Historical Count filter of 2 for `custom_event_c`, the Historical Count will register **Day 3** as the day on which `custom_event_c` was triggered for the second time. 

Continue on with the third article in the Historical Count series: [Historical Count, part 3: Funnels and behavioral cohorts](https://help.amplitude.com/hc/en-us/articles/21065498729243).