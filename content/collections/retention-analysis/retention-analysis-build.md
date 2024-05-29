---
id: 6fa8fdca-74d6-4e5b-894d-fed42807a8e8
blueprint: retention-analysi
title: 'Build a retention analysis'
source: 'https://help.amplitude.com/hc/en-us/articles/360050153151-Build-a-retention-analysis'
this_article_will_help_you:
  - 'Understand the purpose of the Retention Analysis chart and familiarize yourself with its interface'
  - 'Understand how Amplitude applies time to a retention analysis'
  - 'Build a Retention Analysis chart'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717015688
---
Amplitude’s **Retention Analysis** chart helps you drive product adoption by showing you how often users return to your product after taking a specific action (known as **triggering an event**). 

Amplitude computes retention data by comparing the date of that starting event to the date of the **return event** you’ve specified. The return event is the event that, when triggered, tells you a user has been retained. When building a retention analysis chart, you can choose any event you like for both the starting and return events. You can also opt not to choose a specific event, and instead tell Amplitude to use any active event.

{{partial:admonition type='note'}}
You may also find [this course on retention analysis](https://academy.amplitude.com/drive-product-adoption-with-retention-analysis) helpful.
{{/partial:admonition}}

You can select up to two return events for your retention analysis. Each event will have its own analysis, and will appear as a separate segment in the chart.

![retention_sidecontrols.png](/output/img/retention-analysis/retention-sidecontrols-png.png)

The Retention Analysis chart’s **usage interval** shows the percentage of active users who’ve triggered the events you’re interested in with a specified daily, weekly, or monthly median frequency. Essentially, it shows how much time elapses between a user firing your product’s critical event. This is a vital piece of your retention analysis puzzle. Knowing how often your product is actually used will help you gauge the health of your product when looking at Retention Analysis and [Lifecycle](/analytics/charts/lifecycle/lifecycle-track-growth) charts.

### Feature availability

This feature is available to users on **all Amplitude plans**. See our [pricing page](https://amplitude.com/pricing) for more details.

## Before you begin

You won’t be able to use the Retention Analysis chart—or any other Amplitude chart, for that matter—until you’ve completed the instrumentation process. You'll definitely want to read our article on [building charts in Amplitude](/analytics/charts/build-charts-add-events), as this is where you'll learn the basics of Amplitude's user interface. 

Also, if you’re new to Amplitude, we recommend you read about our [Event Segmentation](https://help.amplitude.com/hc/en-us/articles/360033852251) chart before moving on to Retention Analysis. You may also want to check out our [playbook on mastering retention](https://amplitude.com/mastering-retention).

## Set up a retention analysis

At its core, a retention analysis measures the amount of time between two different user events. You’ll just need to tell Amplitude what those events are, and which users it should include in the analysis.

{{partial:admonition type='note'}}
You can include both active and inactive events in your retention analyses, but most customers find their Amplitude charts are more insightful when they focus on active events.
{{/partial:admonition}}

To build a Retention Analysis chart, follow these steps:

1. In the Events Module, select the starting event. You can choose a specific event that is instrumented in Amplitude, or you can tell Amplitude to consider any event as the starting event for this analysis, by selecting *Any Event* from the list of available events.
2. If desired, filter by properties on your starting event by clicking on *+ Filter by*, selecting the property name, and specifying the property value you’re interested in.
3. Next, select at least one return event. You can choose up to two, and you can filter by properties on these events as well.  
  
![create_retention.gif](/output/img/retention-analysis/create-retention-gif.gif)
4. In the Segmentation Module, identify the user segment you want to include in this analysis. You can import a previously-saved segment by clicking the *Saved* dropdown and selecting the one you want from the list. Otherwise, Amplitude begins from the assumption that your analysis will target all users.  
  
{{partial:admonition type='note'}}
The user segment you select will only apply to the starting event.
{{/partial:admonition}}
5. If you do not want to import a previously-saved user segment, you can start building your own by adding properties. To do so, click *+ Filter by*, choose the property you want to include, and specify the property value you’re interested in.
6. You can narrow your focus even further by telling Amplitude you only want to include users who have already performed certain actions. To do so, click *+ Performed*, then choose the event you’re interested in.
7. If desired, add another user segment by clicking *+ Add Segment*, and repeating steps 5 and 6.  
  
![segment_by.gif](/output/img/retention-analysis/segment-by-gif.gif)

{{partial:admonition type='note'}}
 You can break out your starting event by user properties by clicking *… grouped by* in the right module, if desired. For example, if you wanted to group users by the cities they were in when they fired the starting event, you would select *City* from the property list. Amplitude will then break out the retention analysis on a city-by-city basis. However, you will only be able to include one user segment in your analysis. 
{{/partial:admonition}}

You should now see your Retention Analysis chart, along with a tabular view of your results in the [breakdown table](/analytics/charts/review-chart-data). Check or uncheck segments in the breakdown table to compare retention rates in the visual. For example, this Retention Analysis chart shows two lines for comparison because its third segment is unchecked: 

![retention_unchecked_segment2.png](/output/img/retention-analysis/retention-unchecked-segment2-png.png)

{{partial:admonition type='note'}}
The users included will be those who triggered the starting event during the time period specified on the date picker, in the upper-right corner of the chart. Users do not have to trigger the return event during that period to be included in the analysis.
{{/partial:admonition}}

### Usage interval analysis

The Retention Analysis chart also supports [usage interval analyses](/analytics/charts/retention-analysis/retention-analysis-usage-interval).

Or [learn how to interpret your Retention Analysis chart](/analytics/charts/retention-analysis/retention-analysis-interpret).