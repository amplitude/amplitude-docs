---
id: e60222af-17b8-480f-98cd-c8c5fbeab897
blueprint: funnel-analysi
title: 'Combine funnel events inline'
source: 'https://help.amplitude.com/hc/en-us/articles/19458351187483-Combine-funnel-events-inline'
this_article_will_help_you:
  - 'Combine multiple events into a single event slot in your Funnel Analysis chart'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717014959
---
Explore event combinations directly in the chart controls without creating and saving a permanent custom event. Follow these steps to add a custom event for inline comparison:

1. Click **More Options** in the Events side control and select *Combine events inline*.

![inline.png](/output/img/funnel-analysis/inline-png.png)

2. Next, click *Add event inline* to add a custom event. Add the number of custom events you need.

![add_event_inline.png](/output/img/funnel-analysis/add-event-inline-png.png)

{{partial:admonition type='note'}}
 The in-line event that you create will only be relevant to that specific chart and will not be accessible anywhere else. 
{{/partial:admonition}}

3. If desired, hover on the event and click **Filter** to add event properties. Add as many filter properties as needed for each in-line event.

![filter_props.png](/output/img/funnel-analysis/filter-props-png.png)

4. Click **Remove** to remove properties and in-line events, as needed.

{{partial:admonition type="note" heading=""}}
Custom events can't contain other custom events. Also, *Show User Journeys*, *Explore Conversion Drivers* and *Show User Paths* are not available via the Microscope for in-line event steps in funnels.
{{/partial:admonition}}