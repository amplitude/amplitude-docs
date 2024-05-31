---
id: 7f411988-132d-4623-89d3-730f4bc54d52
blueprint: funnel-analysi
title: 'How Amplitude handles simultaneous events in a funnel'
source: 'https://help.amplitude.com/hc/en-us/articles/19458044599195-How-Amplitude-handles-simultaneous-events-in-a-funnel'
this_article_will_help_you:
  - 'Understand how Amplitude accounts for events fired within the same second'
  - 'Learn how to more precisely track events with millisecond resolution'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717015451
---
Amplitude rounds all time to the nearest second. For that reason, it maintains a one-second window to account for **simultaneous events**. If a user fires two different events within one second, Amplitude will not try to make a determination of which one came first. Instead, it will consider **either** order correct and apply that to your funnel.

For example, if a user fires Event B first, and then fires Event A within one second, a funnel will count this as a conversion from **either** Event A -> Event B, **or** Event B -> Event A.

If, in an exact order funnel, an event that is not part of your funnel definition is simultaneously fired in the same second, Amplitude will still consider that user to have converted.

{{partial:admonition type='note'}}
When using [Historical Count](/analytics/historical-count-1) filters on the *same* events that occur within the *same* second, users will appear to have dropped off. This is because the funnel query doesn't distinguish between events that happen within the same second, but the Historical Count filter does. 
{{/partial:admonition}}

## Same events fire at once

If two of the same event types are sent within the same second, Amplitude will count only one of them. This is also true if you're using `Any Event` within the step of a funnel, or if custom events within your funnel steps share the same sub-events: Amplitude will assume they're the same event if they fire at the same second and will not count each instance. To combat this, ensure the step conditions are mutually exclusive, or turn on [millisecond resolution](#millisecond-resolution) to ensure events are precisely captured.

## Millisecond Resolution

By default, Amplitude assumes events will not be triggered within one second of each other. However, if you have multiple events that fire at the same time and you want to observe the precise order of events, you can opt to turn on millisecond resolution.

Follow these steps to track events by the millisecond: 

1. From your Funnel Analysis, open the *Advanced* dropdown in the *Measured As* module.

![millisecondResolution.png](/output/img/funnel-analysis/millisecondresolution-png.png)

2. Click *Millisecond resolution*.

The funnel will update automatically, and will show events tracked by the millisecond instead of by the second.