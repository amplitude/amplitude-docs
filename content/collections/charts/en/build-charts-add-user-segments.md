---
id: 042dfad4-dabb-4fc0-99d1-41da803b50ac
blueprint: chart
title: 'Build charts in Amplitude: Add user segments'
source: 'https://help.amplitude.com/hc/en-us/articles/13650690245915-Build-charts-in-Amplitude-Add-user-segments'
this_article_will_help_you:
  - 'Add user segments to your charts'
  - 'Understand how user properties shape your analyses'
  - 'Use conditions to fine-tune your analyses'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717690871
---
{{partial:admonition type='note'}}
If you haven't done so already, read the Help Center article on [adding events to your Amplitude charts](/docs/analytics/charts/build-charts-add-events) before continuing with this one.
{{/partial:admonition}}

Events, as important as they are, are only half of the equation. You’ll also need to specify the users whose behavior you’re interested in analyzing.

Amplitude’s **Segmentation Module** lets you create groups of users to analyze. These groups are called **segments**, and they can be as broad as your entire user base, or very narrowly tailored to match a highly-specific set of user properties.

{{partial:admonition type='note'}}
Because they are designed for different types of analyses, Amplitude’s [Personas](/docs/analytics/charts/compass/compass-aha-moment) charts do not have a Segmentation Module. For more information on how to build analyses using these charts, click through the links above to view the documentation.  
{{/partial:admonition}}
  
Also, be sure to see our Help Center article on the [advanced features available through the Segmentation Module](/docs/analytics/charts/build-charts-segmentation-module).

### Create a user segment

The first step is deciding which category of users your segment will draw from—**any users**, **active users**, or **new users**.

![build_charts_in_amplitude_segment_by_1.png](/docs/output/img/charts/build-charts-in-amplitude-segment-by-1-png.png)

If you select *Any Users*, your analysis will include all users who have triggered the events you’re interested in. This is the broadest possible choice.

You can narrow the focus a bit by selecting *Active Users*. Amplitude defines an active user as one who has **logged at least one event** during a specified time range. When you choose this option, Amplitude will look at events triggered by any user who was active during the days, weeks, or months covered by your analysis.

Even more specific is the *New User* option. A new user is defined as a user who logs an event in Amplitude for the first time. When you opt for this selection, Amplitude will look at events triggered by these users **during the interval**—days, weeks, or months—in which the user was new.

For example: If a user was new on July 17, and you set your analysis interval to *Daily*, only the events that were triggered **on that same day**—July 17—will appear on the chart, regardless of whether that user also triggered events the next day.

You can use [Accounts](/docs/analytics/account-level-reporting) to select any of the custom groups you have instrumented in place of *Users*.

![build_charts_in_amplitude_select_by_custom_group.png](/docs/output/img/charts/build-charts-in-amplitude-select-by-custom-group-png.png)

Once you've decided how to measure your users, use *Filter by* and *Performed* clauses to define your user segments. 

You have now created your first user segment.

### Filters

[To learn how to use filters to refine your user segments into more precise analytical tools, check out this article](/docs/analytics/charts/build-charts-modify-user-segment).

### Add more segments

Amplitude doesn’t limit your analysis to a single segment. To add additional segments, click *+ Add Segment*. Here, there are two segments to compare: one that includes users in the United States, and one that includes users in Brazil.

![build_charts_in_amplitude_multiple_segments.png](/docs/output/img/charts/build-charts-in-amplitude-multiple-segments-png.png)

### Group by user property

The Segmentation Module also includes a G*roup Segment by* function.

If you have only one event in your analysis, it doesn’t matter if you use *group by* in the Events Module or G*roup Segment by* in the Segmentation Module. But if your analysis includes **more than one event**, adding a G*roup Segment by* condition in the Segmentation Module will apply that condition to all the events in your analysis. If you don’t want that, then apply a *group-by* condition in the Events Module, on an event-by-event basis.

{{partial:admonition type='note'}}
Using *group-by* in the Segmentation Module limits your analysis to one user segment. If you need more user segments, apply *group by* conditions to each event in the Events Module.
{{/partial:admonition}}

Your chart will display the top five segments by the measurement selected. You can add or remove segments to the chart via the data table below it. In the example below, the analysis groups by device family. The graph shows the number of daily active users in the last 30 days, grouped by the device family they used.

{{partial:admonition type='note'}}
Users can fall into multiple segments if they have multiple values for a property in this time period.  
{{/partial:admonition}}
Additionally, you can add more than one *group by* conditions.

### Save a user segment

Once you’ve created a user segment, you can save it for re-use in another analysis. Saved user segments are globally available for other team members to use.

To save a user segments, click *Saved*. Next, click *Save Segment* and follow the prompts in the window that follows.

You can also search for previously-saved segments through the *Saved* dropdown. Select the one you need from the list to load it.

To make a segment your default segment—in other words, the one Amplitude automatically loads when you create a new chart—click *Set as default* next to the segment's name. 

![build_charts_in_amplitude_default_segment.png](/docs/output/img/charts/build-charts-in-amplitude-default-segment-png.png)