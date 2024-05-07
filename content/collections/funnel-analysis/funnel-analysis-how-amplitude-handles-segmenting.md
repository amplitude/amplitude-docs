---
id: 43f380ea-7e18-462f-ba73-e7ce7366dfdb
blueprint: funnel-analysi
title: 'How Amplitude handles segmenting on a user property in a Funnel Analysis chart'
source: 'https://help.amplitude.com/hc/en-us/articles/19458172443931-How-Amplitude-handles-segmenting-on-a-user-property-in-a-Funnel-Analysis-chart'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1715113769
---
When you [segment the data on a user property](/analytics/charts/build-charts-add-events), Amplitude will apply the segmentation to the first step of your funnel.

For example, suppose Event A is the first step of your funnel, and a user triggered:

* Event B with the user property `[Amplitude] Country` = `Canada`; and then
* Event A with the user property `[Amplitude] Country` = `United
 States`

If you were to segment `...by Active country(s),` Amplitude will show this user in the `[Amplitude] Country` = `United States` segment in the Event A step.