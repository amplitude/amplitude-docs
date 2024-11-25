---
id: 15beca8e-5e6a-4e5f-9aa1-01fe53f81014
blueprint: stickiness
title: 'Stickiness: Identify the features that drive users back to your product'
source: 'https://help.amplitude.com/hc/en-us/articles/230901928-Stickiness-Identify-the-features-that-drive-users-back-to-your-product'
this_article_will_help_you:
  - 'Use events and properties to create a Stickiness chart'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717104135
landing: true
landing_blurb: 'Use events and properties to create a Stickiness chart'
---
To get the most of your product analytics, you need to understand what drives engagement and retention. What about your product that makes it so appealing to your most engaged users and what's causing other users to fall short? 

Amplitude's **Stickiness** chart helps you answer these questions by showing you how often users fire specific events over a given period of time. You can segment your power users and include them in a stickiness analysis to help you uncover what they're doing differently. This information can then be used to effectively redirect the product interactions of your regular users.

### Feature availability

This feature is available to users on **all Amplitude plans**. See our [pricing page](https://amplitude.com/pricing) for more details.

## Before you begin

Remember that event's don't appear in Amplitude charts until instrumentation is complete, so make sure you've got that done. 

## Create a Stickiness chart

As described above, a Stickiness chart shows how often your users are firing specific events. You’ll need to tell Amplitude what event you're interested in, and which users it should include in the analysis.

To build a Stickiness analysis, follow these steps:

1. To open a new Stickiness chart, click *Create* *New > Reports*, then select *Stickiness* from the list of available charts.
2. In the Events Module, select the event you're interested in. You can choose a specific event that's instrumented in Amplitude, or you can tell Amplitude to consider any event for this analysis, by selecting *Any Event* from the list of available events.
3. If desired, add properties to your starting event by clicking on *+ where*, selecting the property name, and specifying the property value you’re interested in.  
  
  {{partial:admonition type='note'}}
  Unlike other Amplitude charts, Stickiness charts support analysis of one event.
  {{/partial:admonition}}

1. In the Segmentation Module, identify the user segment you want to include in this analysis. You can import a saved segment by clicking *Saved Segments* and selecting the one you want from the list. Otherwise, Amplitude begins from the assumption that your analysis targets all users.
2. If you don't want to import a saved user segment, you can start building your own by adding properties. To do so, click *+ where*, choose the property you want to include, and specify the property value you’re interested in.
3. You can narrow your focus even further by telling Amplitude you only want to include users who have already performed certain actions. To do so, click *+ perform*, then choose the event you’re interested in.
4. If desired, add another user segment by clicking *+ Add Segment*, and repeating steps 5 and 6.  
5. Finally, choose the time zone, frequency (weekly or monthly), and the time frame your analysis covers. Find the date picker in the top-right corner of the chart area.

{{partial:admonition type='note'}}
 You can break out your starting event by user properties by clicking *… grouped by* in the Segmentation Module, if desired. For example, if you wanted to group users by the cities they were in when they fired the starting event, you would select *City* from the property list. Amplitude then breaks out the segmentation analysis on a city-by-city basis. However, you will only be able to include one user segment in your analysis. 
{{/partial:admonition}}

In the chart area, you should now see your Stickiness chart, along with a tabular view of your results. To learn how to interpret your stickiness analysis, [check out this Help Center article](/docs/analytics/charts/stickiness/stickiness-interpret).