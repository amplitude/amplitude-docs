---
id: 43f380ea-7e18-462f-ba73-e7ce7366dfdb
blueprint: funnel-analysi
title: 'How Amplitude handles segmenting on a user property in a Funnel Analysis chart'
source: 'https://help.amplitude.com/hc/en-us/articles/19458172443931-How-Amplitude-handles-segmenting-on-a-user-property-in-a-Funnel-Analysis-chart'
ai_summary: 'When you segment data by a user property in Amplitude, the segmentation applies to the first step of your funnel. For example, if Event A is the first step and a user triggers Event B in Canada and then Event A in the United States, segmenting by Active country(s) will show this user in the United States segment in the Event A step.'
---
When you [segment the data on a user property](/docs/analytics/charts/build-charts-add-events), Amplitude will apply the segmentation to the first step of your funnel.

For example, suppose Event A is the first step of your funnel, and a user triggered:

* Event B with the user property `[Amplitude] Country` = `Canada`; and then
* Event A with the user property `[Amplitude] Country` = `United
 States`

If you were to segment "...by Active country(s)," Amplitude will show this user in the `[Amplitude] Country` = `United States` segment in the Event A step.
