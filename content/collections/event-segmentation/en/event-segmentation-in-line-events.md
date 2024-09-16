---
id: f74a2f4f-6b98-4533-802f-e706987a423e
blueprint: event-segmentation
title: 'Create in-line custom events'
source: 'https://help.amplitude.com/hc/en-us/articles/13321766657947-Create-in-line-custom-events-in-funnel-and-event-segmentation-analyses'
this_article_will_help_you:
  - 'Combine multiple existing events into a custom event from within your event segmentation or funnel charts'
landing: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1724884451
---
Sometimes an analysis calls for combining multiple events, but you might not know which events you need. You can explore event combinations directly in the chart controls without needing to create and save a permanent custom event. Amplitude offers in-line OR logic to combine events for funnels and event segmentation charts.

{{partial:admonition type='note'}}
This feature is in closed beta. To gain access, contact your Customer Success Manager.
{{/partial:admonition}}

Follow these steps to add a custom event:

1. Click *More Options* in the *Events* side control and select *Combine events inline*.

2. Next, click *Add event inline* to add a custom event. Add any number of custom events.

  {{partial:admonition type='note'}}
  The in-line event that you create is relevant to that specific chart and isn't accessible anywhere else unless you save it as a custom event. 
  {{/partial:admonition}}

3. If desired, hover on the event and click *Filter* to add event properties. Add as many filter properties as needed for each in-line event.

4. Save the in-line events as a [custom event](/docs/analytics/charts/group-events) to use it in other charts. Click **More Options** and choose *Save Custom Event*.

  ![inline_to_custom.png](/docs/output/img/event-segmentation/inline-to-custom-png.png)

5. Click *Remove* to remove properties and in-line events, as needed.

{{partial:admonition type="note" heading=""}}
Custom events can't contain other custom events. Also, *Show User Journeys*, *Explore Conversion Drivers* and *Show User Paths* aren't available from the Microscope for in-line event steps in funnels.
{{/partial:admonition}}