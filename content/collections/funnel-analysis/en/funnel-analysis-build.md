---
id: 1683dae2-34bd-4da2-9d02-007416a1836b
blueprint: funnel-analysi
title: 'Build a funnel analysis'
source: 'https://help.amplitude.com/hc/en-us/articles/360052745632-Build-a-funnel-analysis'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1743538336
landing: true
landing_blurb: "Build your funnel analysis following Amplitude's best practices"
academy_course:
  - 7d137320-f0f2-4b00-8f77-2f2adb07de68
ai_summary: "Amplitude's Funnel Analysis chart helps you track user paths in your product to find drop-off points. You can set up a funnel analysis in Amplitude by selecting starting events, adding properties, defining event order, excluding users, and segmenting users. This chart shows how users move through specific event sequences. Make sure to understand how charts work in Amplitude before you begin. Once you've built your funnel analysis, you can interpret the results to optimize your product experience."
---
Amplitude’s **Funnel Analysis** chart helps you understand how users are navigating defined paths ("funnels") within your product, and identify potential problem areas where users tend to drop off. 

A common example of a funnel is successfully onboarding. To Amplitude, a converted user is one who triggers the events you specified, in the specified order.

This article explains the steps required to build a funnel analysis in Amplitude. Before you begin, you should familiarize yourself with the basics of [how charts work in Amplitude](/docs/analytics/charts/build-charts-add-events).

If you've already built your funnel analysis chart, you can move on to [interpret your funnel analysis](/docs/analytics/charts/funnel-analysis/funnel-analysis-interpret) chart.

## Set up a funnel analysis

A funnel analysis shows how your users are navigating specific sequences of events in your product. Build Funnel Analysis charts using the Events Module and the Segmentation Module. To create a Funnel Analysis chart, you’ll just need to tell Amplitude what those events are, and which users it should include in the analysis.

{{partial:admonition type='note'}}
You can include both active and inactive events in your funnel analyses, but most customers find their Amplitude charts are more insightful when they focus on active events.
{{/partial:admonition}}

To build a Funnel Analysis chart, follow these steps:

1. In the Events module, select the **starting event**. You can choose a specific event that's instrumented in Amplitude, or you can tell Amplitude to consider any event as the starting event for this analysis, by selecting *Any Event*from the list of available events.
2. If desired, add **properties** to your starting event by clicking on *+* *Filter by*, selecting the property name, and specifying the property value you’re interested in.
3. Next, select at least **one other event**. You can add properties to these events as well.
4. Specify the **order** in which a user must trigger these events to convert through the funnel—this order, any order, or exact order.  
  
    ![build_funnel.gif](/docs/output/img/funnel-analysis/build-funnel-gif.gif)  

    Selecting *This order* tells Amplitude Analytics that a user must complete all the steps you've included, in the order you've included them, to count as a conversion. However, along the way they can **also** trigger other steps not specified here. *Any order* means the user must complete all the steps you've included, but the order in which that happens doesn't matter. And *Exact order* works the same as *This order*, except the user isn't permitted to include any other steps at all.

5. To **exclude** users from your funnel who trigger specific events between steps of your funnel, click *+* *Exclude users who did* and select the exclusion event from the drop-down list. You can apply the exclusion between all steps in the funnel, or between two specific steps. For any-order funnels, users exclude themselves if they fire the exclusion event between any of the funnel steps.

![excluded_who_did.png](/docs/output/img/funnel-analysis/excluded-who-did-png.png)  

6. In the Segmentation module, identify the user segment you want to include in this analysis. You can import a saved segment by clicking *Saved* and selecting the one you want from the list. Otherwise, Amplitude begins from the assumption that your analysis targets all users.  
  
{{partial:admonition type='note'}}
The user segment you select will only apply to the starting event.
{{/partial:admonition}}

7. If you don't want to import a saved user segment, you can start building your own by adding properties. To do so, click *+ Filter by*, choose the property you want to include, and specify the property value you’re interested in.

8. You can narrow your focus even further by telling Amplitude you only want to include users who have already performed certain actions. To do so, click *+ Performed*, then choose the event you’re interested in.

9. If desired, add another user segment by clicking *+ Add Segment*, and repeating steps 6 and 7.

![segment.gif](/docs/output/img/funnel-analysis/segment-gif.gif)  

Your new funnel analysis should now be visible in the chart module.

To read about [interpreting your funnel analysis, click here](/docs/analytics/charts/funnel-analysis/funnel-analysis-interpret).