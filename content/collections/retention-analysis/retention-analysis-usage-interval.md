---
id: 529e064a-b201-430b-b217-67bc3d35ed1e
blueprint: retention-analysi
title: 'Build a usage interval analysis'
source: 'https://help.amplitude.com/hc/en-us/articles/19687889786011-Build-a-usage-interval-analysis'
this_article_will_help_you:
  - "Discover how long it takes users to trigger your product's critical event"
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717015719
---
A usage interval analysis is related to a [retention analysis](/docs/analytics/charts/retention-analysis/retention-analysis-build), but it works a little differently. While a simple retention analysis measures the amount of time between a starting event and a return event, a usage interval analysis considers return events only. It’s intended to show you how long users go between triggering your product’s most important event—its **critical event**.

For more details on usage interval analyses and what they mean, see our Help Center article on [interpreting your retention analysis](/docs/analytics/charts/retention-analysis/retention-analysis-interpret-usage). 

![segment_by_2.gif](/docs/output/img/retention-analysis/segment-by-2-gif.gif)

To build a usage interval analysis, follow these steps:

1. In the Measured As module, click *Usage Interval*.
2. In the Events Module, select the return event. This should be your product’s critical event.
3. If desired, add properties to your return event by clicking on *+ Filter by*, selecting the property name, and specifying the property value you’re interested in.

{{partial:admonition type='note'}}
You can add up to two return events for your usage interval analysis.
{{/partial:admonition}}

3. In the Segmentation Module, identify the user segment you want to include in this analysis. You can import a previously-saved segment by clicking the *Saved* dropdown and selecting the one you want from the list. Otherwise, Amplitude begins from the assumption that your analysis will target all users.
4. If you do not want to import a previously-saved user segment, you can start building your own by adding properties. To do so, click *+ Filter by*, choose the property you want to include, and specify the property value you’re interested in.
5. You can narrow your focus even further by telling Amplitude you only want to include users who have already performed certain actions. To do so, click *+ Performed* and choose the event you’re interested in.
6. If desired, add another user segment by clicking *+ Add Segment*, and repeating steps 4 and 5.

You should now see your usage interval analysis, along with a tabular view of your results. 

But what does it mean? For the answer to that, check out our Help Center article on [interpreting your usage interval analysis](/docs/analytics/charts/retention-analysis/retention-analysis-interpret-usage).