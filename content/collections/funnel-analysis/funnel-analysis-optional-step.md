---
id: 45aaaf38-62c7-49d9-9817-bfc8d765a0ff
blueprint: funnel-analysi
title: 'Mark a step in your funnel as optional'
source: 'https://help.amplitude.com/hc/en-us/articles/19458278060571-Mark-a-step-in-your-funnel-as-optional'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717015624
this_article_will_help_you:
  - 'Add an optional step to your Funnel Analysis charts, and compare conversion rates between the two versions'
---
At times you will need to define a conversion where some of the steps are optional. For example, a funnel has steps A, B, C, and D, where B is optional. If a user performs steps A, C, and D, they would still convert.

Click **More Options** in the Events side control and select *Optional step* to make a step optional. 

![optional_step.png](/docs/output/img/funnel-analysis/optional-step-png.png)

When an event is marked optional, the side control will say *\*Optional* and have a dotted line around it. 

![optional_side_control.png](/docs/output/img/funnel-analysis/optional-side-control-png.png)

The chart will then show two funnels - one with the step and one without the step. The conversion take-aways and breakdown table will also reflect these two scenarios.

There are some limitations to marking a step as optional:

* It is available for Conversion and Conversion Over Time only.
* Only one step can be optional at a time.
* Only middle steps can be optional. First and last steps can never be optional.
* Optional events cannot be reordered.
* Events with a group-by cannot be optional.
* Events comparing multiple events cannot be optional.

In-line custom events can also be created in Funnel and Event Segmentation charts. [Read this article for more information](/docs/analytics/charts/event-segmentation/event-segmentation-in-line-events).